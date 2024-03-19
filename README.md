[![Bluejay Dashboard](https://img.shields.io/badge/Bluejay-Dashboard_05-blue.svg)](https://dashboard.bluejay.governify.io/dashboard/script/dashboardLoader.js?dashboardURL=https:%2F%2Freporter.bluejay.governify.io%2Fapi%2Fv4%2Fdashboards%2Ftpa-ISPP-2024-GH-ISPP-G5_NexONG_Frontend%2Fmain&orgId=1) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/1dad745d1a86432c99b2d96cdf756fde)](https://app.codacy.com/gh/ISPP-G5/NexONG_Frontend/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
# Getting Started with NexONG_Frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

1. Clone repository (in VSCode)
2. Make sure you have installed: React extension in VSCode and Node.js in your computer
3. Open folder and a new terminal
4. Move to branch develop:
   ```
   git checkout develop
   ```
5. Create your branch (**Do not forget to write develop at the end**):
   ```
   git checkout -b new-branch-name develop
   ```
6. Install dependencies (make sure to install the material design last and to include the `--legacy-peer-deps` tag):
   ```
   npm install react-scripts
   npm install axios
   npm install react-big-calendar
   npm install react-toastify
   npm install @material-ui/core --legacy-peer-deps
   ```
7. If you have any problem installing the dependencies try the tag `--force`.
8. If you need to add any new dependency, please uninstall the material design like follows or include the `--force` tag when installing the new dependency
   ```
   npm uninstall @material-ui/core
   ```
9. When installed, you can run the project with:
   ```
   npm start
   ```

## Stylesheet

For **every homepage screen** has to start with the following Layout (title, description and image can be removed if intro = false):
```
<LayoutHomepage 
   title={titulo} 
   description={descripcion}
   image={imagen} // mirar las distintas imagenes en el intro-container de styles.css
   info={info}
   intro={false} // optional
   toastcontainer={true} //optional
 />   
```

For **every profiles screens** this is not needed but it is needed to call the component **Layoutprofiles** instead. Here is an example of screen Familias from admin, depending which screen modify the profile and selected parameters for the corresponding of your screen (you can see every screen name in **MenuProfiles**):
```
<LayoutProfiles profile={'admin'} selected={'Familias'}>
   /* Your content here */
</LayoutProfiles>
```


There are some **fixed styles** so it has a consistent style over every screen. Those styles are: `h1, h2, h3, p, label, input, textarea, select`

</br>

### - IF NEEDED TO BE CHANGED CHANGE IT FOR YOUR SCREEN LIKE FOLLOWS:

```
.my-screen h1{
  color: white;
  font-size: 2rem;
}
```

This will just change the color and font size of the h1 but still use the rest of the styles for the h1 (f.e: font-family will be the same).

If you want to create a completely new style for a h1 on a specific screen, just create a new class and use it in the component. Like this:

```
.my-screen-h1{
  color: white;
  font-size: 2rem;
  text-align: justify;
}
```
**IF THIS DOESN'T WORK, USE !IMPORTANT TO OVERRIDE THE STYLES OR WRITE INLINE STYLES ON YOUR HTML COMPONENTS.**

</br>

### - IF YOU NEED TO ADD A NEW BACKGROUND IMAGE FOR THE INTRO COMPONENT

Copy this and change the name as liked:
```
.intro-container.name::before {
  background-image: url('../logo/image-wanted.bmp');
}
```



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
