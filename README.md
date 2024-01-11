# Comment Sense

Youtuber content creators have a variety of analytics available at their fingertips to understand the performance of their videos. However, besides the ratio of likes to dislikes, there is little that creators can use to understand how their audiences truly feel about their video besides read through their comment section. This application serves to provide an aggregate understanding of the emotions displayed in the comment section of a given youtube video. Access the
<a href="https://comment-sense-frontend.vercel.app/" target="_blank">live site here</a> (Use a Chromium based browser for the best experience on desktop).

## Working Demo

https://github.com/knahsirV/CommentSense/assets/64799319/4dfe760d-ff88-4267-ba0b-0267a91ea490

## Tech Stack

- **Frontend**: NextJS app styled with TailwindCSS and deployed to Vercel
- **Backend**: Flask REST API with separate endpoints for youtube video metadata and sentiment analysis. Perviously hosted on AWS Elastic Beanstalk but moved over to Render cloud hosting.

## Dev Proccess & Challenges:

My first task was having a model that could, given a comment, return the emotion expressed in the comment. For this, I used a fined-tuned version of the DistilRoBERTa transformer model on Huggingface created to classify the seven emotions of anger, disgust, fear, joy, neutral, sadness, surprise, as it would provide more nuance over the three categories of positive, negative, and neutral that DistilRoBERTa classifies by default.
<br/> <br/>
In order to use the model, I set up a Flask application with an endpoint that when called, would perform sentiment analysis on a specified youtube video's id. The endpoint gets the comments of a youtube video with the provided id via the Youtube API, cleans up the comments to remove unecessary characters and replace emojis with their meanings, and calls the transformer model via and api while passing it the cleaned up comment section. After the model returns the results, I clean up the results and get some aggregate data using pandas so that the data is readable when called by the frontend. Since the model can take time to analyze the comments, I save the results for a given video in a Supabase as a cache, in case a video is tested again.
<br/> <br/>
After setting up the backend, it was a matter of building a frontend that allowed a user to type in a youtube link and be given data regarding the emotions of the video's comment section. I chose to create a dashboard layout that showed the most common emotion, the number of comments analyzed, a distribution breakdown of the different emotions, and a menu to see all the comments that were classified as a specific emotion.
