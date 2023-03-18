// const redux = require('redux')
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./ToDo"
import authReducer from "./Auth";



const store = configureStore({
    reducer:{
        todo: todoReducer,
        auth: authReducer,
    }
        
})

export default store

