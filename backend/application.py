from datetime import datetime
from flask import Flask, send_from_directory, render_template
import comment_tools as comment_tools
import os

application = Flask(__name__)


@application.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(application.root_path, "static"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )


@application.route("/")
def home():
    return render_template("index.html")


@application.route("/sentiments/<video_id>")
def sentiments(video_id):
    try:
        video_id = str(video_id)
        sentiments = comment_tools.check_if_analyzed(video_id)
        if len(sentiments.data) > 0:
            year_analyzed = int(sentiments.data[0]["created_at"][0:4])
            year_now = int(datetime.now().year)
            if year_now - year_analyzed == 0:
                return sentiments.data[0]["sentiments"]
        video_details = comment_tools.get_video_details(video_id)
        comments = comment_tools.get_video_comments(video_id)
        sentiments = comment_tools.analyze_comments(comments)
        res = {
            "video_details": video_details,
            "sentiment_data": sentiments,
        }
        if (not sentiments is dict) and (not sentiments.get("error")):
            comment_tools.add_to_analyzed(video_id, res)
        return sentiments
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    application.run(debug=True)
