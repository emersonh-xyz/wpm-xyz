
import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js"
import Results from "./components/Results.js";
import { Route, Routes } from "react-router-dom"
import { useState } from "react";



export default function App() {

    // Our global state variables that need to be loaded across components 
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)

    const state = ({correct, setCorrect, incorrect, setIncorrect}) 

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
        </Routes>
    );


}