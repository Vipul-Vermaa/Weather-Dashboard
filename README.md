# Weather Dashboard


## Overview

This is a weather application that uses Firebase for authentication and OpenWeatherMap API to fetch weather data. The app has registration and login functionality and displays home only if the user is logged in.

## Features
- User registration and login using Firebase Authentication.
- Weather data retrieval from OpenWeatherMap API
- Protected routes based on authentication status
 
## Prerequisites
- Node.js and npm installed on your machine
- Firebase project setup
- OpenWeatherMap API key

## Getting Started
## 1. Clone the Repository

```bash
git clone https://github.com/Vipul-Vermaa/weather-app.git
cd weather-app

```
## 2. Install Dependencies
```bash
npm install

```
## 3. Set Up Environment Variables
Create a .env file in the root directory and add your Firebase and OpenWeatherMap API configuration:

```bash

VITE_FBAPIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APIID=your_firebase_app_id
VITE_MEASUREMENTID=your_firebase_measurement_id
VITE_DATABASEURL=your_firebase_database_url
VITE_WEATHER_API_ID=your_openweathermap_api_key

```

## 4. Configure Firebase
Make sure your Firebase project is set up correctly. Follow the steps in the Firebase Console to set up a new project if you haven't already.

## 5. Run the Application

```bash
npm run dev

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
