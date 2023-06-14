# Dictionary

This is a single-page application built with React that allows users to search for words and retrieve their definitions. Users can create an account, create lists, add their own definitions to words, and create folders and sets inside them. The application also provides the functionality to add meanings and definitions to sets, edit them, and learn words and sets using flashcards.

## Live Demo

You can try the live demo of the application by visiting [https://savchukrm.github.io/dictionary](https://savchukrm.github.io/dictionary).

## Mobile Application

Now is being created mobile version of the application by using React Native. You can visit repository [https://github.com/savchukrm/dictionary-mobile](https://github.com/savchukrm/dictionary-mobile)

## Technologies Used

- Single-Page Application: Built with React, a JavaScript library for building user interfaces.
- Firebase: Provides authentication, data storage, and CRUD functionality.
- React Router: Handles client-side routing for the application.
- Redux Toolkit: Manages application state, fetching, and updating data.
- TypeScript: Enhances code scalability, maintainability, and type safety.
- CSS Modules: Allows for modular and scoped styling.

## Features

- Word Search: Users can search for words and get their definitions from the Words API.

- User Accounts: Users can create accounts to personalize their experience and access their saved lists, folders, and sets.

- Word Lists: Users can create lists and add words to them for easy organization. They can also view and manage their lists.

- Word Definitions: Users have the ability to add their own definitions to words.

- Folders: Users can create folders and add description. Here user can create sets.

- Sets: Users can add meanings and definitions and edit them as needed. This allows for a comprehensive understanding of any terms that user wants to learn.

- Flashcards: Users can learn words, sets, and their definitions through flashcards. This feature facilitates active learning and helps users memorize and retain information effectively.

## Getting Started

To run the application on your local computer, follow these steps:

1. Visit the [RapidAPI website](https://rapidapi.com/dpventures/api/wordsapi/) and register to obtain the API key for accessing word-related APIs.

2. Clone this repository to your local machine:

```
git clone <repository-url>
```

3. Navigate to the project directory:

```
cd dictionary
```

4. Install the dependencies:

```
npm install
```

5. Create a Firebase account and set up a new project.

6. Obtain the Firebase configuration object (apiKey, authDomain, projectId, etc.) for your project.

7. Create a `.env` file in the project root directory and add the Firebase configuration variables:

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID

API_KEY=YOUR_API_KEY

```

8. Start the application:

```
npm start
```

9. Open your browser and visit `http://localhost:3000` to access the application.

## Dependencies

- `react`: A JavaScript library for building user interfaces using a component-based approach.
- `react-dom`: Handles rendering React components into the browser's DOM.
- `react-icons`: A library of customizable icon components for React applications.
- `react-redux`: Official Redux binding for React, connecting components with the Redux store.
- `react-responsive`: Helps make React components responsive and adapt to different screen sizes.
- `react-router-dom`: A popular routing library for React applications.
- `@reduxjs/toolkit`: Simplifies working with Redux by providing utilities and abstractions.
- `axios`: A library for making HTTP requests.
- `firebase`: A platform for building web and mobile applications with various services.
- `@types/firebase`: TypeScript type definitions for Firebase, ensuring proper type checking and editor support.

## Contributing

Contributions to this project are welcome. You can submit bug reports, feature requests, or pull requests through GitHub. Please make sure to follow the project's code of conduct.

## Contact

For any inquiries or questions, you can reach out to rymmasavchuk@gmail.com.
