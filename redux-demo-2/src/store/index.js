// const redux = require('redux')
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Counter'
import authReducer from './auth'

// const counterReducer = (state = initialState,action) =>{

//     if(action.type === 'increment'){

//         return {
//             counter : state.counter + 1,

//             showCounter:state.showCounter
//         }
//     }

//     if(action.type === 'increase'){

//         return {
//             counter : state.counter + action.value,

//             showCounter:state.showCounter
//         }
//     }

//     if(action.type === 'toggleCounter'){

//         return {
//             counter : state.counter,
//             showCounter: !state.showCounter
//         }
//     }


//     if(action.type === 'decrement'){

//         return {
//             counter : state.counter -  1,

//             showCounter:state.showCounter
//         }
//     }

//     return state


// }


// const store = redux.createStore(counterReducer)


const store = configureStore({
    reducer:{
        counter:counterReducer,
        auth: authReducer,
    }
        
})
console.log(store)


export default store



// const counterSubcribe = () =>{

//     const latestState = store.getState()
//     console.log(latestState)
// }

// store.subscribe(counterSubcribe)

// store.dispatch(
//     action='increment'
// )