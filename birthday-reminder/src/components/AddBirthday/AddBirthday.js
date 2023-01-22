import React, { useState } from "react";
import classes from "./AddBirthday.module.css";

const AddBirthday = ({addPerson}) => {
  const [state, setState] = useState("");
  const [dob, setDob] = useState("2023-01-01");
  const handleSubmit = (event) => {
    console.log("hi");
    // alert('A name was submitted: ' + this.state.value);
    console.log(state,dob)
    let obj = {
      id : Math.floor(Math.random() * 100),
      name:state,
      date:dob

    }
    addPerson(obj)

    event.preventDefault();
  };

  const handleDobChange = (event) => {
    event.preventDefault();
    console.log("ss", event.target.value);
    setDob(event.target.value);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    event.preventDefault();
    setState(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.FormInnerWrapper}>
        <div><h2>Add details</h2></div>
        <div className={classes.NameWrapper}>
          <label>Name:</label>
          <input type="text" value={state} onChange={handleChange} />
        </div>
        <div className={classes.DateWrapper}>
          <label>Date:</label>
          <input
            type="date"
            id="start"
            name="start"
            // min="1970"
            onChange={handleDobChange}
            value={dob}
          ></input>
        </div>
        <div className={classes.ButtonWrapper}>
          <input type="submit" value="Add" />
        </div>
      </div>
    </form>
  );
};

export default AddBirthday;
