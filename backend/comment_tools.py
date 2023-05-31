from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os
from dotenv import load_dotenv
import requests
import pandas as pd
from supabase import create_client, Client

load_dotenv()

# Set up API credentials
YT_API_KEY = os.getenv("YT_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
MODEL_API_KEY = os.getenv("MODEL_API_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Set up YouTube Data API client
youtube = build("youtube", "v3", developerKey=YT_API_KEY)


def check_if_analyzed(video_id):
    try:
        response = (
            supabase.table("AnalyzedVideos")
            .select("*")
            .eq("video_id", video_id)
            .execute()
        )
        return response
    except Exception as e:
        raise e


def add_to_analyzed(video_id, sentiments):
    try:
        supabase.table("AnalyzedVideos").insert(
            [{"video_id": video_id, "sentiments": sentiments}]
        ).execute()
    except Exception as e:
        raise e


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

        for item in response["items"]:
            comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
            comments.append(comment)

        comments_cleaned = [
            " ".join(__text_cleaner_and_splitter(comment)) for comment in comments
        ]
        return comments_cleaned

    except HttpError as e:
        raise Exception(f"An HTTP error {e.resp.status} occurred: {e.content}")


def analyze_comments(comments):
    API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
    headers = {"Authorization": MODEL_API_KEY}
    response = requests.post(
        API_URL,
        headers=headers,
        json={
            "inputs": comments,
            "parameters": {"truncation": True},
            "options": {"wait_for_model": True},
        },
    )
    sentiments = response.json()

    if sentiments is dict and sentiments.get("error"):
        raise Exception(sentiments)

    comment_sentiments = []
    for comment, sentiment in zip(comments, sentiments):
        highest_sentiment_label = max(sentiment, key=lambda x: x["score"])["label"]
        comment_dict = {"comment": comment, "sentiment": highest_sentiment_label}
        comment_sentiments.append(comment_dict)

    df = pd.DataFrame(comment_sentiments)

    emotes = ["sadness", "joy", "love", "anger", "fear", "surprise", "neutral"]

    response = {}

    response["aggregate"] = {
        "total_comments": len(comments),
        "most_common_sentiment": df["sentiment"].value_counts().idxmax(),
    }

    response["sentiments"] = {}

    for emote in emotes:
        response["sentiments"][emote] = df[df["sentiment"] == emote]["comment"].tolist()

    # if response["aggregate"]["most_common_sentiment"] == "neutral":
    #     next_most_common_sentiment = (
    #         df[df["sentiment"] != "neutral"]["sentiment"].value_counts().idxmax()
    #     )
    #     response["aggregate"]["most_common_sentiment"] = next_most_common_sentiment

    return response


if __name__ == "__main__":
    # # Example usage
    video_id = "8wysIxzqgPI"

    comments = get_video_comments(video_id)

    sentiments = analyze_comments(comments)
    print(sentiments)

    # is_analyzed = check_if_analyzed("test")
    # print(check_if_analyzed("test"))
    # current_year = datetime.datetime.now().year
    # print(current_year)
    # print(int(is_analyzed.data[0]["created_at"][0:4]) - int(current_year))
    # add_to_analyzed('test2', {'test': 'test'})

    # print(sentiments)
