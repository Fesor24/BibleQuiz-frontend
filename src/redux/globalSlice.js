import {createSlice} from "@reduxjs/toolkit"

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        countdown: 0,
        isAuthenticated: false,
        hasAccess: false

    },
    reducers:{
        changeCountdownAction: (state, payload) => {
            return{
                ...state,
                countdown: state.countdown = payload
            }
        },
        isAuthenticatedAction: (state, payload) => {
            return{
                ...state,
                isAuthenticated: state.isAuthenticated = payload
            }
        },
        hasAccessAction: (state, payload) =>{
            return{
                ...state,
                hasAccess: state.hasAccess = payload
            }
        }
    }
})

export const { changeCountdownAction, isAuthenticatedAction, hasAccessAction } =
  globalSlice.actions;
export default globalSlice.reducer