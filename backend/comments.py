from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import json
import os
from dotenv import load_dotenv
from transformers import pipeline


load_dotenv()

# Set up API credentials
API_KEY = os.getenv("YT_API_KEY")

# Set up YouTube Data API client
youtube = build("youtube", "v3", developerKey=API_KEY)


def get_video_comments(video_id):
    try:
        # Request the comments of the specified video
        response = (
            youtube.commentThreads()
            .list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=100,  # Change the value as per your requirement
            )
            .execute()
        )

        comments = []
        while response:
            for item in response["items"]:
                comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
                comments.append(comment)

            # Check if there are more comments to retrieve
            if "nextPageToken" in response:
                response = (
                    youtube.commentThreads()
                    .list(
                        part="snippet",
                        videoId=video_id,
                        textFormat="plainText",
                        maxResults=100,
                        pageToken=response["nextPageToken"],
                    )
                    .execute()
                )
            else:
                break
        return comments

    except HttpError as e:
        print(f"An HTTP error {e.resp.status} occurred: {e.content}")


def analyze_comments(comments):
    classifier = pipeline(
        "text-classification",
        model="bhadresh-savani/distilbert-base-uncased-emotion",
        return_all_scores=True,
    )
    return classifier(comments)


if __name__ == "__main__":
    # Example usage
    video_id = "JTOJsU3FSD8"

    comments = get_video_comments(video_id)

    print(analyze_comments(comments["comment"]))
