import React, { useState } from "react";
import classes from "./NotesAdd.module.css";
import Button from "@mui/material/Button";
import HeadingComponent from "./HeadingComponent/HeadingComponent";
import SectionComponent from "./SectionComponent/SectionComponent";
import CodeComponent from "./CodeComponent/CodeComponent";

const NotesAdd = ({addContentHandler}) => {

  const [currentButton,setCurrentButton] = useState("headings");

  const clickButtonHandler = (type) =>{

    console.log(type)
    setCurrentButton(type)

  }
  return (
    <div className={classes.CardOuterWrapper}>
      <div className={classes.ButtonsOuterWrapper}>
        <Button className={classes.Button} variant="outlined" size="medium" onClick={() => clickButtonHandler("headings")}>
          Headings
        </Button>
        <Button className={classes.Button}  variant="outlined" size="medium" onClick={ () => clickButtonHandler("section")}>
          Section
        </Button>
        <Button className={classes.Button}  variant="outlined" size="medium" onClick={() => clickButtonHandler("images")}>
          Images
        </Button>
        <Button className={classes.Button}  variant="outlined" size="medium" onClick={() => clickButtonHandler("code")}>
          Code Snippets
        </Button>
      </div>
     
      {currentButton =="headings" &&(
        <HeadingComponent addContentHandler={addContentHandler}/>
      )}
      {currentButton =="code" &&(
        <CodeComponent addContentHandler={addContentHandler}/>
      )}
      {currentButton =="section" &&(
        <SectionComponent addContentHandler={addContentHandler}/>
      )}
      {/* <footer>sfd</footer> */}
    </div>
  );
};

export default NotesAdd;
