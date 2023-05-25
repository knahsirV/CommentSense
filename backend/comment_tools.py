import datetime
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import json
import os
from dotenv import load_dotenv
from transformers import pipeline
import pandas as pd
from supabase import create_client, Client

load_dotenv()

# Set up API credentials
YT_API_KEY = os.getenv("YT_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Set up YouTube Data API client
youtube = build("youtube", "v3", developerKey=YT_API_KEY)

def check_if_analyzed(video_id):
    try:
        response = supabase.table('AnalyzedVideos').select('*').eq('video_id', video_id).execute()
        return response
    except Exception as e:
        print(e)
        return None


def add_to_analyzed(video_id, sentiments):
    try:
        supabase.table('AnalyzedVideos').insert([{"video_id": video_id, "sentiments": sentiments}]).execute()
    except Exception as e:
        print(e)


def __text_cleaner_and_splitter(text):
    return (
        text.lower()
        .replace("❤️", " heart ")
        .replace("💯", " 100 ")
        .replace("❤", " heart ")
        .replace("🙏", " pray ")
        .replace("😘", " kiss ")
        .replace("🤗", " happy ")
        .replace("💥", " boom ")
        .replace("🔥", "awesome")
        .replace("✔️", " like ")
        .replace("😍", " love ")
        .replace("🐱", " cat ")
        .replace("💔", " broken heart ")
        .replace("😵", " confused ")
        .replace("😄", " awesome ")
        .replace("👍", " thumbs up ")
        .replace("😎", " cool ")
        .replace("🐷", " pig ")
        .replace("🤘", " rock'n roll ")
        .replace("🤣", " laughing hard ")
        .replace("😩", " oh no ")
        .replace("💎", " diamond ")
        .replace("😊", " nice ")
        .replace("☺️", " very nice ")
        .replace("🙃", " upside down smile ")
        .replace("🤔", " not sure ")
        .replace("😂", " laughing ")
        .replace("🙋🏻‍♀️", " hi ")
        .replace("🥰", " lovely ")
        .replace("🥺", " sad ")
        .replace("!!!!", "!")
        .replace("!!!", "!")
        .replace("!!", "!")
        .replace("!", " ! ")
        .replace("????", "?")
        .replace("???", "?")
        .replace("??", "?")
        .replace("?", " ? ")
        .replace("oooo", "o")
        .replace("oooo", "o")
        .replace("ooo", "o")
        .replace("..", "...")
        .replace("......", "...")
        .replace("....", "...")
        .replace("....", "...")
        .replace("...", " ... ")
        .replace(".", " . ")
        .replace(". . .", " ... ")
        .replace("'", " ")
        .replace('"', " ")
        .replace("    ", " ")
        .replace("   ", " ")
        .replace("  ", " ")
        .split()
    )


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

        comments_cleaned = [
            " ".join(__text_cleaner_and_splitter(comment)) for comment in comments
        ]
        return comments_cleaned

    except HttpError as e:
        print(f"An HTTP error {e.resp.status} occurred: {e.content}")


def analyze_comments(comments):
    classifier = pipeline(
        "text-classification",
        model="cardiffnlp/twitter-roberta-base-sentiment",
        top_k=None,
    )
    sentiment_match = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive",
    }
    sentiments = classifier(comments)
    print('sentiments generated')
    df_data = [
        {
            **{"comment": comment},
            **{sentiment_match[item['label']]: item["score"] for item in sentiment},
        }
        for comment, sentiment in zip(comments, sentiments)
    ]
    df = pd.DataFrame(df_data)
    average_sentiments = {
        "Negative": df["Negative"].mean(),
        "Neutral": df["Neutral"].mean(),
        "Positive": df["Positive"].mean(),
    }
    comment_sentiments = []

    for comment, sentiment in zip(comments, sentiments):
        sentiment_scores = {sentiment_match[label['label']]: label["score"] for label in sentiment}
        comment_dict = {"comment": comment, "sentiment_scores": sentiment_scores}
        comment_sentiments.append(comment_dict)

    return {
        "average_sentiments": average_sentiments,
        "comment_sentiments": comment_sentiments,
    }


if __name__ == "__main__":
    # # Example usage
    # video_id = "JTOJsU3FSD8"

    # comments = get_video_comments(video_id)

    # sentiments = analyze_comments(comments)

    is_analyzed = check_if_analyzed('test')
    print(check_if_analyzed('test'))
    current_year = datetime.datetime.now().year
    print(current_year)
    print(int(is_analyzed.data[0]['created_at'][0:4]) - int(current_year))
    # add_to_analyzed('test2', {'test': 'test'})

    # print(sentiments)
