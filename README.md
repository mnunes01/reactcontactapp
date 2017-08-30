# [React Contact APP](https://mnunes01.github.io/reactcontactapp/)
react contacts manager spa using browser indexedDB storage
a working version of this app can be found on [React Contact APP](https://mnunes01.github.io/reactcontactapp/)

## Instructions
Pull the repo and run **npm install**

- **'npm start'** to run development webpack server
- **'npm run test'** to run JEST tests
- **'npm run build'** to build the project into 'dist' folder


This is a one page aplication
The app uses indexedDB to store a key / value of contacts information.
The collection is persistent on the browser.
The app was based on the flux pattern to handle external [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) data operations.

Navigating to the home page user is presented either with a list of the stored records or a message informing that the contact list is empty.
In case theres already stored contacts on the indexedDB of the browser the user is using to access the app, a list of contacts is rendered
The user can then click over the contact 'chip' to access the view/edit view or click the 'X' to remove the contact of the localStorage.

Add contact presents the user with a new contact view where the user can register a new contact, filling the fields with correct values and clicking on save.

Settings, provide the user with some utils funcionalities:
* Create Dummy Data - creates a dummy static record on the localStorage collection
* Console log stored collection - outputs the localStorage content on the browser console
* Clear collection - removes all contents of the localStorage and cleaning up the contact list

The fields validation is done in two stages
* before submitAction, using 'require' param on html input field
* after submit using npm [validator](https://www.npmjs.com/package/validator) package and testing against empty and email format.


## Available commands
Package.json contains several scrips that can be run with npm

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Used NPM packages list
The following packages are used:

- [country-list](https://www.npmjs.com/package/country-list)
- [css-loader](https://www.npmjs.com/package/css-loader)
- [flux](https://www.npmjs.com/package/flux)
- [loadash](https://www.npmjs.com/package/@shoogi/loadash)
- [localforage](https://www.npmjs.com/package/localforage)
- [material-ui](https://www.npmjs.com/package/material-ui)
- [material-ui-icons](https://www.npmjs.com/package/material-ui-icons)
- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-virtualized-select](https://www.npmjs.com/package/react-virtualized-select)
- [style-loader](https://www.npmjs.com/package/style-loader)
- [validator](https://www.npmjs.com/package/validator)

All of the included packages are maintened used across a significant number of projects

## Testing

For module testing it was used [JEST](https://www.npmjs.com/package/jest)
JEST is configure to search for the tests inside the folders with name *__tests__*

## Music
* Made with love at the sound of:
* [RadioHead - TKOL RMX 123467](https://open.spotify.com/album/47xaqCsJcYFWqD1gwujl1T)
* [minilogue](https://www.youtube.com/watch?v=qgiL7lsIATA)

@Mnunes 2017 hello:[Mnunes01@hotmail.com](mailto:mnunes01@hotmail.com)
