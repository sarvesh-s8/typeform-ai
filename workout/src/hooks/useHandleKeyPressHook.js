import { useQuestions, useSharedStateContext } from "../context";
import { useEffect } from "react";

const useHandleKeyPress = () => {
    const { questionNum, setErrorMessage, handleNumUpdate} = useSharedStateContext();
    const {now}= questionNum;
    const {state} = useQuestions();
    const {firstName, lastName, bodyWeight, desiredWeight, diet, desiredWeeks, goals, email, height} = state;
    useEffect(()=>{
        function handleKeyPress(e){
            if(e.key === "Enter"){
                e.preventDefault();
                if(now+1 === 2 && firstName === ""){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        firstName:"Data Cannot be empty"
                    }))
                return;
                }
                else if(now+1 === 3 && lastName === ""){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        lastName:"Data Cannot be empty"
                    }))
                return;
                }
                if(now+1 === 4 && height && height > 4.7){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        height:"Data Cannot be empty"
                    }))
                return;
                }
                if(now+1 === 5 && bodyWeight <= 30){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        bodyWeight:"Data Cannot be empty"
                    }))
                return;
                }
                if(now+1 === 6 && desiredWeight >= 40){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        desiredWeight:"Data Cannot be emptymIN"
                    }))
                return;
                }
                if(now+1 === 7 && desiredWeeks <= 1 && desiredWeeks >= 100){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        desiredWeeks:"Choose between 1 and 100 weeks"
                    }))
                return;
                }
                if(now+1 === 8 && goals.length === 0){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        bodyWeight:"Enter some goals"
                    }))
                return;
                }
                if(now+1 === 9 && diet.length <= 2){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        diet:"Choose more choices"
                    }))
                return;
                }
                if(now+1 === 10 && email === ""){
                    setErrorMessage(prevError => ({
                        ...prevError,
                        email:"Please Enter Email"
                    }))
                return;
                }
                handleNumUpdate()
            }
        }

        document.addEventListener('keypress', handleKeyPress);
        return function(){
            document.removeEventListener('keypress', handleKeyPress)
        }
    }, [now, firstName, lastName, bodyWeight, desiredWeight, diet, desiredWeeks, goals, email, height ])
}

export default useHandleKeyPress