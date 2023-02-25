import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import HtmlContent from "../../helpers/HtmlContent";
import classes from "./CodeComponent.module.css";
const CodeComponent = ({addContentHandler}) => {
  const [currentSection,setCurrentSection] = useState('code')
  const [currentSectionText,setCurrentSectionText] = useState("")
  // const buttons = [
  //   <Button key="one" onClick={() => buttonClickHandler('h1')}>H1</Button>,
  //   <Button key="two" onClick={() => buttonClickHandler('h2')}>H2</Button>,
  //   <Button key="three" onClick={() => buttonClickHandler('h3')}>H3</Button>,
  // ];

  
  const addHeaderHandler = () =>{


    // console.log(currentHeading,currentHeadingText)
    addContentHandler(currentSection,currentSectionText);
    setCurrentSectionText("")
  }
  return (
    <>
 
      <div className={classes.InputOuterWrapper}>
        <textarea className={classes.TextArea} onChange={(e) => setCurrentSectionText(e.target.value)} value={currentSectionText} />
        <button className={classes.InputPlus} onClick={addHeaderHandler}>
          +
        </button>
      </div>
      
      {/* <HtmlContent type={currentSection}>{currentSectionText}</HtmlContent> */}
    </>
  );
};

export default CodeComponent;
