import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import HeaderContent from "./HeaderContent";
import classes from "./HeadingComponent.module.css";
const HeadingComponent = ({addContentHandler}) => {
  const [currentHeading,setCurrentHeading] = useState('h1')
  const [currentHeadingText,setCurrentHeadingText] = useState("")
  const buttons = [
    <Button key="one" onClick={() => buttonClickHandler('h1')}>H1</Button>,
    <Button key="two" onClick={() => buttonClickHandler('h2')}>H2</Button>,
    <Button key="three" onClick={() => buttonClickHandler('h3')}>H3</Button>,
  ];

  const buttonClickHandler = (heading) =>{


    setCurrentHeading(heading)

  }
  const addHeaderHandler = () =>{


    console.log(currentHeading,currentHeadingText)
    addContentHandler(currentHeading,currentHeadingText);
    setCurrentHeadingText("")
  }
  return (
    <>
      <div className={classes.ButtonGroupOuterWrapper}>
        <ButtonGroup size="small" aria-label="small button group" >
          {buttons}
        </ButtonGroup>
      </div>
      <div className={classes.InputOuterWrapper}>
        <input className={classes.Input} onChange={(e) => setCurrentHeadingText(e.target.value)} value={currentHeadingText} />
        <button className={classes.InputPlus} onClick={addHeaderHandler}>
          +
        </button>
      </div>
      
      <HeaderContent type={currentHeading}>{currentHeadingText}</HeaderContent>
    </>
  );
};

export default HeadingComponent;
