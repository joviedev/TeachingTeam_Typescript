TeachTeam (TT) is a React TypeScript front-end prototype web application designed to assist the School of Computer Science in selecting and hiring casual tutors.
The system allows:
Tutor applicants to submit applications detailing their qualifications, availability, and skills.
Lecturers to browse, select, rank, and comment on tutor candidates.

Technologies Used
React (with TypeScript) — Client-side prototype development
TailwindCSS — Styling and responsive layout
HTML5 LocalStorage — Temporary data storage (no database)
Custom Hooks — State management and reusable logic
Vite — Project scaffolding and fast development serve
Google reCaptcha v2

📋 Core Features
Home Page: Landing page introducing the TeachTeam system.
Navigation Bar: Links to About, Become a Tutor, Sign In, Create Account, and Sign Out. Sign in with different position (tutor or lecturer) will show different elements in navigation bar.
Sign Up/Sign In Pages: (Sign Up link only; Sign In is functional with LocalStorage validation).
Tutor Application Page: Allows tutors to apply, selecting courses and providing personal credentials.
Lecturer Management Page: Allows lecturers to view, rank, and comment on applicants.
LocalStorage: Stores applicant and login session data for simulation.
Responsive Design: Mobile-friendly layouts and professional presentation.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
