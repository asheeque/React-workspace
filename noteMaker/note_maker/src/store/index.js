// const redux = require('redux')
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./ToDo"



const store = configureStore({
    reducer:{
        todo: todoReducer,
    }
        
})

export default store

