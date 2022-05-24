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
            state.startIndex = action.payload
            console.log("START",action.payload)
            state.isSetStart=true;
        },
        setEnd:(state,action)=>{
            state.endIndex = action.payload
            console.log("END",action.payload)
            state.isSetEnd=true;
        },
        
    }
})

export const {setStart, setEnd} = dataSlice.actions;

export const selectData = (state)=>state;

export default dataSlice.reducer;