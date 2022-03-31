import React, { useState, } from "react"
import { useNavigate } from 'react-router-dom'



export default function Results({ state }) {


    const navigate = useNavigate(); // Setup our navigation object


    // Grab our prop data
    const charCount = state.charCount
    const wordCount = state.wordCount
    const correct = state.correct
    const incorrect = state.incorrect
    let time = state.time


    // Calculate our results
    time = (state.time / 60)
    
    // Return our Net Wpm
    function GetNetWPM(){
        return (Math.round(charCount / 5) / time);
    }
    
    // Return our Accuracy
    function getAccuracy(){
        return (Math.round(correct / (correct + incorrect) * 100));
    }



    function GenerateURL(){

        const acc = getAccuracy()
        const netWPM = GetNetWPM()
        let url = `/shared-results?netWPM=${netWPM}&acc=${acc}`
        navigate(url)
    }

    return (
        <div className="section">
            <div className="section is-size-2 has-text-centered" >
                Your results:
            </div>
            <div className="columns">
                <div className="column has-text-centered">
                    <p className="is-size-3">WPM:</p>
                    <p className="has-text-primary is-size-1">
                    {GetNetWPM()}
                    </p>
                </div>
                <div className="column has-text-centered">
                    <p className="is-size-3">Accuracy:</p>
                    <p className="has-text-info is-size-1">
                    {getAccuracy()}%
                    </p>
                </div>
            </div>
            <div className="section">
                <div className="buttons">
                <div className="button is-fullwidth is-primary">Play again</div>
                <div onClick={() => GenerateURL()} className="button is-fullwidth is-link">Share your score</div>
                </div>
            </div>

        </div>
    )
}