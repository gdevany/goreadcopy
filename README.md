# GoRead frontend

This project contains the still-evolving frontend for the GoRead (formerly Reader's Legacy) project.

The codebase for the existing GoRead server / API is at http://gitlab.readerslegacy.com/RL/readerslegacy

## Contents

[Project Setup](#project-setup)

**------------------**

[Learn ES6](#learn-es6)
[Learn React, Redux and Webpack](#learn-react-redux-and-webpack)
[React Redux patterns for improved app optimization](#react-redux-patterns-for-improved-app-optimization)
[Commonly Used Libraries](#commonly-used-libraries)
[Useful Tools](#useful-tools)

## Project Setup

Dependencies
* [node js](http://example.co://nodejs.org/en/) (>= 6.0.0)
  * We recommend [nvm](https://github.com/creationix/nvm) for installing and managing node versions
* [yarn](https://github.com/yarnpkg/yarn)

### Setup

After installing the dependencies above, install this project's npm dependencies:

```sh
$ yarn install
```

### Required environment variables

When using the application, you will need to set a `.env` in your project directory.
This is a standard configuration with the appropiate values to communicate the app running locally with the API endpoint running on STG2 server:

```
SOCKET_URL              // URL for the app to set the socket connection for Chat and Notifications feature
REDIRECT_BASE_URL       // URL for the app to set redirections upon special cases submitions
API_URL                 // URL for the API endpoint domain
NODE_ENV                // Value to set the desired environment settings. Can be "development" or "production"
SESSION_COOKIE_DOMAIN   // Domain value for the cookies
PORT                    // Port in which to run the Front End app locally
```

To run backend locally use these settings:
```
SOCKET_URL=ws://localhost:8000/ws/userprofile?subscribe-user
REDIRECT_BASE_URL=http://localhost:8000
API_URL=http://localhost:8000
NODE_ENV='development'
SESSION_COOKIE_DOMAIN='.readerslegacy.com'
PORT=3001
```

To run backend using STG2 server use these settings:
```
SOCKET_URL=wss://staging2.readerslegacy.com/ws/userprofile?subscribe-user
REDIRECT_BASE_URL=https://staging2.readerslegacy.com
API_URL=https://staging2.readerslegacy.com
NODE_ENV='development'
SESSION_COOKIE_DOMAIN='.readerslegacy.com'
PORT=3001
```

### Running the app

```sh
$ yarn start:dev
```

### Branches and Deployed Environments

* `master` -> (does not deploy anywhere)
  * Common development branch. For new features or chores, branch from here.
* `staging` -> `staging` (TODO: add staging environment URL)
* `production` -> `production` (TODO: add production environment URL)

Branches are named according to their type:
  * Feature branches should be named with `feature/<the branch name>`
  * Chore branches should be named with `chore/<the branch name>`
  * Hotfix / bug branches should be named with `hotfix/<the branch name>`

## Misc

### Learn ES6
   * I wrote a series [here](https://medium.freecodecamp.com/learn-es6-the-dope-way-i-const-let-var-ae828580472b#.y5utyen8k).

### Learn React, Redux and Webpack
   * Highly recommend this [course](https://www.udemy.com/react-redux/).
   * And this is the [advanced one](https://www.udemy.com/react-redux-tutorial/).
   * Watch [this](https://www.youtube.com/playlist?list=PLQDnxXqV213JJFtDaG0aE9vqvp6Wm7nBg) series.

### Commonly Used Libraries
   * [redux-thunk](https://github.com/gaearon/redux-thunk)
   * [react-router](https://github.com/ReactTraining/react-router)
   * [material-ui](http://www.material-ui.com/#/)

### Useful Tools
   * [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

### React Redux patterns for improved app optimization:
1. Smart component VS dumb component
    * Smart components are class-based objects. Use these if your component is passing information(ie. props) to another component OR/AND if your component is talking to redux state(ie. using the `connect` method).
   * Dumb components are functional/stateless components. Use these when you simply want to render something. These components don't have to do any kind of thinking except make the view pretty with the information they've been given.
   * Learn more [here](https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc#.dbs2ejuiq).
   * **Note:** Currently React + Webpack does not hot reload stateless dumb components. So if you make any changes to these components make sure to do a hard refresh.
2. Why we use `PureComponent` instead of `Component` for class-based smart components.
   * React re-renders a component every time there is a state change--that sucks. Here's an example: Let's say we have a state with two props: `prop1` and `prop2`. So, `prop1` gets sent to `Component1` through `redux`'s `connect` method and `prop2` gets sent to `Component2` with also the `connect` method. But when `prop1` changes, `Component1` re-renders **and** so does `Component2`. But why should `Component2` have to re-render if nothing in its' props have changed? That's where `PureComponent` comes in. It checks if the current component's props have changed whenever there is any change in the state. That way, if there is no change it renders the component from the cache, otherwise it re-renders the updated component.
   * Learn more [here](https://facebook.github.io/react/docs/react-api.html#react.purecomponent).
3. Passing in only necessary props and actions.
   * By passing in only the actions we need through `redux`'s `connect` method to each component instead of every single action to every single component we reduce the amount of preloading necessary for each component. This also reduces the use of the words `actions`, `dispatch` and `mapDispatchToProps` throughout the app.
   * Same idea as above. We pass only the props from `redux` we need through the use of `destructuring` via the `connect` method.
   * Look for example of each in the code.
   * Learn how ES6 destructuring works [here](https://medium.freecodecamp.com/learn-es6-the-dope-way-part-iv-default-parameters-destructuring-assignment-a-new-es6-method-44393190b8c9#.f5hnmyay5).
4. The benefits of exporting actions/method individually:
   * Less preloading per script.
   * Ability to pass only actions used instead of every single action to a component.
5. Understanding the difference between `export` and `export default`:
   * Great explanation [here](http://stackoverflow.com/questions/31852933/why-es6-react-component-works-only-with-export-default).
   * Currently need only `export default` but we also use`export` on the same component to avoid errors when we test the components.

### Postman

We use the [Postman](https://www.getpostman.com/) app as an API client for testing API endpoints from the readerslegacy API.

The common config for these endpoints is in `api_endpoints.postman_collection`. You can import this file in Postman to hit the endpoints yourself.

As we add new endpoints to the API, be sure to update this file

## Developer Contacts
* jd@philosophie.is
* masha@philosophie.is
* emir@goread.com
