
import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js"
import Results from "./components/Results.js";
import { Route, Routes } from "react-router-dom"
import { useState } from "react";
import SharedResults from "./components/SharedResults.js";



export default function App() {

    // Our global state variables that need to be loaded across components 
    const [correct, setCorrect] = useState(0) // Declare our total number of correct words
    const [incorrect, setIncorrect] = useState(0) // Declare our total number of incorrect words 
    const [time, setTime] = useState(30) // Our global time for how long the game lasts
    const [wordCount, setWordCount] = useState(0) // Declare the total number of words the user types & skips
    const [charCount, setCharCount] = useState(0) // Declare the total number of chars the user types


    // Load all of our state variables into a prop
    const state = ({
        correct, 
        setCorrect, 
        incorrect, 
        setIncorrect, 
        wordCount, 
        setWordCount, 
        charCount, 
        setCharCount, 
        time, 
        setTime}) 


    return (

        <Routes>
            <Route path="/" element={
                <div>
                    <Navbar/>
                    <Main 
                    state={state}/>
                </div>
             
            }/>
            <Route path="/results" element={
                <div>
                    <Navbar/>
                    <Results
                    state={state}/>
                </div>
                } />
            <Route path="/shared-results" element={
                <div>
                    <Navbar/>
                    <SharedResults
                    state={state}/>
                </div>
            } />
        </Routes>
    );


}