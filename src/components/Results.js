import React, { useState, useEffect, useRef } from "react"


export default function Results({state}) {
    

    const correct = state.correct 
    const incorrect = state.incorrect

    return (
        <div className="section">


            <div className="section is-size-2 has-text-centered" >
                Your results: 
            </div>
            <div className="columns">
                <div className="column has-text-centered">
                    <p className="is-size-3">WPM:</p>
                    <p className="has-text-primary is-size-1">
                        50
                    </p>
                </div>
                <div className="column has-text-centered">
                    <p className="is-size-3">Accuracy:</p>
                    <p className="has-text-info is-size-1">
                    {Math.round(correct / (correct + incorrect) * 100)}%
                    </p>
                </div>
            </div>
            <div className="section">
            <div className="button is-fullwidth is-primary">Play again</div>
            </div>
        </div>
    )
}