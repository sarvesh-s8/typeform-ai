import intialStates from "../reducers/state/initialStates";
import reducerFunction from "../reducers/functions";
import { TOTAL_QUESTIONS } from "../constants";

import {createContext, useReducer, useContext, useMemo, useState } from "react"

const StateContext = createContext({
    state: intialStates,
    dispatch:()=> {},
    percent:0
})

export function StateProvider ({children}){
    const [state, dispatch] = useReducer(reducerFunction, intialStates);
    const percent = useMemo(
        function(){
            let answeredQuestion = 0
            const {firstName,
                lastName,
                email,
                goals,
                bodyWeight,
                height,
                desiredWeight,
                desiredWeeks,
                diet} = state
                if(firstName) answeredQuestion+=1
                if(lastName) answeredQuestion+=1
                if(goals) answeredQuestion+=1
                if(bodyWeight) answeredQuestion+=1
                if(email) answeredQuestion+=1
                if(desiredWeeks) answeredQuestion+=1
                if(desiredWeight) answeredQuestion+=1
                if(diet) answeredQuestion+=1
                if(height) answeredQuestion+=1
                return (answeredQuestion * 100) / TOTAL_QUESTIONS
        },
        [state]
    )
    const value = {state, dispatch , percent}
    return <StateContext.Provider value={value}>
        {children}
    </StateContext.Provider>
}

export function useQuestions(){
    const context  = useContext(StateContext)
    if(context){
        return context
    }
    throw new Error("State Context not inside the Provider")
}

const sharedContext = createContext({
    questionNum: {
        prev:null, now:0
    },
    setQuestionNum:()=>{},
    errorMesssage:{},
    setErrorMessage:()=>{},
    showDietList:false,
    showGoals: false,
    setShowDietList:()=>{},
    setShowGoals:()=>{},
    handleOkClick:()=>{},
    handleNumUpdate:()=>{}
})

export function sharedContextProvider({children}){
    const[questionNum, setQuestionNum]= useState(
        {
            prev: null,
            now:0
        }
    )
    const[errorMessage, setErrorMessage] = useState({});
    function handleNumUpdate(){
        setQuestionNum((previous) => {
            previous.now + 1 >= TOTAL_QUESTIONS + 1 ? {...previous}: {prev: previous.now, now: previous.now + 1}
        })
    }

    function handleOkClick(){
        document.dispatchEvent(new KeyboardEvent('keypress', {type:"Enter"}))
    }
    const value = {
        questionNum,setQuestionNum,errorMessage,setErrorMessage, showDietList, showGoals, setShowDietList, setShowGoals, handleNumUpdate, handleOkClick
    }
    return <sharedContext.Provider value={value}>
        {children}
    </sharedContext.Provider>
}

export function useSharedStateContext(){
    const context = useContext(sharedContext)
    if(context) return context;
    throw new Error("Context inside Provider")
}