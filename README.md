### :t-rex: Dino-Land - RS-School 🦥 eCommerce-Application. Stage 2 Final Task

#### Store for smaller replicas of real dinosaurs :sauropod:

### Team members

[kuzmich84](https://github.com/kuzmich84)  
 [vietta7](https://github.com/Vietta7)  
 [kkotess](https://github.com/kkotess)

### Scripts

- npm run dev - starts a local web server with HMR for development
- npm run build - builds the project, and outputs to the folder ./dist
- npm run preview - start a local web server that serves the built solution from ./dist for previewing
- npm run lint - run ESLint
- npm run lint:fix - run ESLint for fixing all fixable errors
- npm run format - run Prettier
- npm run prepare - script, which will run after someone runs npm install among other stages of the npm lifecycle.
- npm run test - run all tests using vitest

### Setup instructions

- Clone a repository into a new directory by using command:  
  **_git clone https://github.com/Vietta7/eCommerce-Application.git_**
- Move to the project directory
  **_cd eCommerce-Application/ecommerce-application_**
- Install all dependencies
  **_npm install_**
- Run local web server
  **_npm run dev_**

### Technology Stack

#### Developing

[React.js](https://react.dev/)  
 [TypeScript](https://www.typescriptlang.org/)

#### Code Quality

[ESLint — Air-bnb base](https://eslint.org/)  
 [Prettier](https://prettier.io/)  
 [Husky](https://typicode.github.io/husky/#/)

### API

[Commercetools](https://docs.commercetools.com/) - The API

https://dino-land.netlify.app/path... - get token for access
For example:

```js
const { access_token } = await fetch('https://dino-land.netlify.app/path...').then((res) =>
  res.json(),
);
```
