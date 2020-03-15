# Evaluate News with NLP - FEND Project 4

## Table of Contents
* [Project Summary](#project-summary)
* [API used](#api-used)
* [How TO Run This Project](#how-to-run-this-project)


## Project Summary

This Project is a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites.It will give us back pertinent information about the article, like whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

### About NLP
> Natural language processing (NLP) is a subfield of computer science, information engineering, and artificial intelligence
concerned with the interactions between computers and human (natural) languages, in particular how to program computers to
process and analyze large amounts of natural language data.


## API used
 [Aylien API](https://aylien.com/) is a new Text Analysis API of Natural Language Processing (NLP) where you can send a link or a text to the API and the API will analyse the text and respond with information from textual content.

## How TO Run This Project
1. Download/Clone this repository
2. Install all dependancies 
    * put `npm install` on the terminal
3. Create dist folder
    * `npm run build-prod` on the terminal
4. For using Aylien Api, Get API KEY & ID by signing up [here](https://developer.aylien.com/signup)
    * Create a `.env` file that contain your `API_ID` and your `API_KEY`
5. Start the server by runing `npm start` in the terminal
6. To test the project with jest use: `npm run test`


