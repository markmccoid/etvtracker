# Electron TV Tracker
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This application is an Electron based TV Tracker with data stored in a firebase database and pulling data from the TMDb API.

## Required .env file

You will need to create a **.env** file, which will hold the firebase connection details:

Also, the app uses react app rewired to be able to use .babelrc file.
```
REACT_APP_TMDB_API_KEY=
REACT_APP_FB_APIKEY=
REACT_APP_FB_AUTHDOMAIN=
REACT_APP_FB_DATABASEURL=
REACT_APP_FB_PROJECTID=
REACT_APP_FB_STORAGEBUCKET=
REACT_APP_FB_MESSAGINGSENDERID=
```
