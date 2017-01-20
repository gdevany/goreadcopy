# GoRead frontend

This project contains the still-evolving frontend for the GoRead (formerly Reader's Legacy) project.

The codebase for the existing GoRead server / API is at http://gitlab.readerslegacy.com/RL/readerslegacy

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

### Thirdparty services

TODO: add thirdparty services as-needed

### Running the app

```sh
$ yarn start
```

Then visit:
```sh
$ http://localhost:3001
```

## Configuration

TODO: add config here as-needed

## Deployment

### Branches and Deployed Environments

* `master` -> (does not deploy anywhere)
  * Common development branch. For new features or chores, branch from here.
* `staging` -> `staging` (TODO: add staging environment URL)
* `production` -> `production` (TODO: add production environment URL)

Branches are named according to their type:
  * Feature branches should be named with `feature/<the branch name>`
  * Chore branches should be named with `chore/<the branch name>`
  * Hotfix / bug branches should be named with `hotfix/<the branch name>`

### Deployment instructions

TODO: add deployment instructions

## Testing

TODO: add test commands

## Styleguide Enforcement

TODO: add linting commands

## Browser Support

TODO: add browser support matrix

## Misc

### TODO

* Details on good react/redux patterns/conventions we should implement as we build.
* Developers need to know react, redux, es6 and webpack: share links and resources/explain basics.
* Create webpack dev and prod server configs
* Make sure everything works together.
* Will eventually need all .env credentials.

## Developer contacts
* jd@philosophie.is
* masha@philosophie.is
