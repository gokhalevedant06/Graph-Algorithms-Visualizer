import {createSlice} from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name:"data",
    initialState:{
        startIndex:{
            row:null,
            col:null
        },
        endIndex:{
            row:null,
            col:null
        },
        isSetStart:false,
        isSetEnd:false
    },
    reducers:{
        setStart:(state,action)=>{
            state = {...state,startIndex:action.payload}
            state = {...state,isSetStart:true}
            console.log("DHSF",state)
            return state;
        },
        setEnd:(state,action)=>{
            console.log("BEFORE",state)
            state = {...state,endIndex:action.payload}
            state = {...state,isSetEnd:true}
            console.log("After",state)
            return state;
        },
        clear:(state)=>{
            state = {...state,isSetStart:false}
            state = {...state,isSetEnd:false}
            return state;
        }
    }
})

export const {setStart, setEnd,clear} = dataSlice.actions;

export const selectData = (state)=>state;

export default dataSlice.reducer;