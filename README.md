This is a simple URL shortening service built with Node.js, Express, and MongoDB. The service allows users to submit a URL to be shortened and then redirect users from the shortened URL to the original URL.

Prerequisites

Node.js (v18.18.1 or higher)
npm (9.8.1 or higher)
MongoDB (You can use a local MongoDB instance or a MongoDB Atlas cluster)
Setup

Clone the repository
 - git clone https://github.com/dennis-mureti/shorten_url.git
 - cd shorten_url

Install dependencies
 - npm install / yarn install

Run the server
- npm start / npm run dev
This will start the server on port 3000.


API Endpoints
1. Create a shortened URL
URL: /api/shorten
Method: POST

Request Body:
{
  "name": "example",
  "originalUrl": "https://www.example.com"
}

Response:
{
  "status": true,
  "shortenedUrl": "randomId"
}

2. Get all shortened URLs
URL: /api/shortened
Method: GET

Response:
Copy code
[
  {
    "_id": "60c73c41e8d1f82f4c8b4567",
    "name": "example",
    "originalUrl": "https://www.example.com",
    "shortenedUrl": "randomId",
    "__v": 0
  }
]

3. Redirect to the original URL
URL: /:shortUrlId
Method: GET

Response:
Redirects to the original URL. If the shortened URL is not found, returns a 404 status with the message "URL not found".

Running Tests
To run the tests, use the following command:
 - npm test
