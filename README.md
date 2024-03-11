# JetEditor

This is a simple Pokemon Search with Pokemon API which passes images and details to the website

## Features

- Browse through a vast collection of Pokemon (initially loads 150, but you can load more!)
- Search for Pokemon by name (fuzzy search, so no need to be too precise)
- View details of each Pokemon, including their height, weight, and abilities
- Toggle between light and dark mode for a comfortable viewing experience
- Responsive design that looks great on both desktop and mobile devices

## Technologies Used

- React
- Axios (for making API requests)
- CSS (for styling)
- Pokemon API (https://pokeapi.co/)

## Getting Started

### You can directly use the app via this [link](https://bharathajjarapu.github.io/ReactDex) .

### Or Deploy it yourself by

1. Clone this repository to your local machine.
2. Navigate to the project directory using the command line.
3. Run `npm install` to install the required dependencies.
4. Execute `npm start` to launch the development server.
5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the React Markdown Editor.

## Usage

1. Enter your Markdown content in the editor section on the left.
2. Witness the live preview of your Markdown-rendered content on the right.

Feel free to send a pull request if you happen to find errors.

## Deployment

1. Add Homepage to `package.json`

```
+ "homepage": "https://gitname.github.io/react-gh-pages",
```

2. change the `package.json` scripts
```
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
At this point, the React app's package.json file includes deployment scripts.
```
3. Deploy
```
npm run deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy Markdown editing!