// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
    return (
        <div id='about'>
            <h1>About</h1>
            <p>This is a simple recipe app built with Vite, React, TypeScript, Material-UI, Mealdb, and Firebase as an end assignment for the course Cloud Services in Web Development at Haaga-Helia University of Applied Sciences by Kosti Kangasmaa.</p>
            <p>It allows users to search for recipes from the Mealdb database and view details such as ingredients, instructions, and the origin of the meal. Users can save recipes to the Firestore database for later use on the My Recipes page.</p>
            <h2>Testing</h2>
            <p>Browser testing was done with Mozilla Firefox, Microsoft Edge, and Google Chrome. All functions of the application work as intended with all three browsers.</p>
            <p>Responsiveness testing was done on Google Chrome. The application works up to a width of 800 pixels, so usability on phones is marginal unless used in landscape mode. Unfortunately, this application was not developed with mobile phones in mind, and implementing a fully responsive application was beyond the scope of this project's resources. The main problem with responsiveness is the MUI X DataGrid used for listing the recipes, which is not suited for narrower screens.</p>
            <p>Performance testing was done with Mozilla Firefox. The general conclusion of performance testing is that Firebase was the true bottleneck in loading times for this application. Loading times from the Firestore database were up to 1000ms during testing, while all other functions of the page were executed in under 400ms, including fetching recipes from the Mealdb database.</p>
            <p></p>
        </div>
    );
};

export default About;