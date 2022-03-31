
import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js"
import Results from "./components/Results.js";
import { Route, Routes } from "react-router-dom"
import { useState } from "react";



export default function App() {


    const [correct, setCorrect] = useState(0)

    const correctState = ({correct, setCorrect}) 

    return (

        <Routes>
            <Route path="/" element={
                <div>
                    <Navbar/>
                    <Main 
                    correctState={correctState}/>
                </div>
             
            }/>
            <Route path="/results" element={
                <div>
                    <Navbar/>
                    <Results
                    correctState={correctState}/>
                </div>
                } />
        </Routes>
    );


}