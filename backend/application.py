from datetime import datetime
from flask import Flask

import comment_tools as comment_tools

application = Flask(__name__)


@application.route("/")
def home():
    return "Hello, Flask!"


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
        comments = comment_tools.get_video_comments(video_id)
        sentiments = comment_tools.analyze_comments(comments)
        if (not sentiments is dict) and (not sentiments.get("error")):
            comment_tools.add_to_analyzed(video_id, sentiments)
        return sentiments
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    application.run(debug=True)
