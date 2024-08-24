import {SET_DESIRED_WEEKS, SET_DESIRED_WEIGHT, SET_DIET,SET_EMAIL, SET_FIRST_NAME,SET_GOALS, SET_HEIGHT, SET_LAST_NAME, SET_WEIGHT} from "../constants"
import { REMOVE_DIET, REMOVE_GOALS } from "../constants";
const reducerFunction = (state, action) => {
    switch(action.type){
        case SET_FIRST_NAME: return {...state, firstName:action.payload};
        case SET_LAST_NAME: return {...state, lastName:action.payload};
        case SET_EMAIL: return {...state, email: action.payload};
        case SET_GOALS: return {...state, goals: [...state.goals, action.payload ]};
        case SET_HEIGHT: return {...state, height: action.payload};
        case SET_WEIGHT: return {...state, weight: action.payload};
        case SET_DESIRED_WEIGHT: return {...state, desiredWeight: action.payload};
        case SET_DESIRED_WEEKS: return {...state, desiredWeeks: action.payload};
        case SET_DIET : return {...state, diet:[...state.diet, action.payload]};
        case REMOVE_DIET: return {...state, diet: state.diet.filter((a) => a != action.payload)}
        case REMOVE_GOALS: return {...state, goals: state.goals.filter(goal=> goal != action.payload)}
        default : return state

    }
}

export default reducerFunction;