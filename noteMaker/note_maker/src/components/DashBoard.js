import React, { useState } from 'react'
import classes from "./DashBoard.module.css"
import NotesAdd from './NotesAdd/NotesAdd'
import NotesView from './NotesView/NotesView'
export default function DashBoard() {
  const [markdownInput, setMarkdownInput] = useState()

  const [currentData,setCurrentData] = useState(() =>[
    // {
    //     tagName:'h1',
    //     content:"Whatsup"
    // },
    // {
    //     tagName:'h1',
    //     content:"Whatsup"
    // }
  ])
 

  const addContentHandler = (tagName,content) =>{


    setCurrentData((prev) => {
        return [...prev,{tagName:tagName,content:content}]
    })


  }
  const setHandler = (e) =>{

    setMarkdownInput(e.target.value)
    console.log(markdownInput)
  }
  return (
    <div className={classes.CreateNotesWrapper}>
      
        <div className={classes.CreateNotesInnerWrapper}>
            <NotesAdd addContentHandler={addContentHandler}/>
        </div>
        <div className={classes.CreateNotesInnerWrapper}>
            <NotesView data={currentData}/>
        </div>
      
    </div>
  )
}
