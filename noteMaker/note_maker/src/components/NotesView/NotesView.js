import React, { useState } from "react";
import classes from "./NotesView.module.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import HtmlContent from "../helpers/HtmlContent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  padding: theme.spacing(1),

  color: theme.palette.text.secondary,
}));

const NotesView = ({ data }) => {
  const [currentButton, setCurrentButton] = useState("headings");

  const clickButtonHandler = () => {
    console.log(data);
    setCurrentButton(data);
  };
  return (
    <div className={classes.CardOuterWrapper}>
        <div className={classes.CardInnerWrapper} >
          {data.map((it, idx) => {
            return (
              <div
                onClick={clickButtonHandler}
                key={idx}
                className={classes.ItemWrapper}
              >
                <HtmlContent type={it.tagName}>{it?.content}</HtmlContent>
              </div>
            );
          })}
        </div>
 
    </div>
  );
};

export default NotesView;
