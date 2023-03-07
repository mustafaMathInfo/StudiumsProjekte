import React from 'react';
import classes from "./StartingPageContent.module.css"
const StartingPageContent = () => {
    return (
        <>
            <div className={classes.starting}>
                <h1 className="mt-5 text-center" >Willkommen</h1>
                <h5 className="mb-5 text-center">Rezepte von Studierenden für Studierende</h5>
            </div>
        </>

    );
};

export default StartingPageContent;