import React from "react"

import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js"
import Results from "./components/Results.js";
import { Route, Routes, Link } from "react-router-dom"



export default function App() {

    return (

        <Routes>
            <Route path="/" element={
                <div>
                        <Navbar/>
                        <Main/>
                </div>
             
            }/>
            <Route path="/results" element={
                <div>
                    <Navbar/>
                    <Results/>
                </div>
                } />
        </Routes>
    );


}