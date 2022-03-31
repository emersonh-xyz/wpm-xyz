import React, { useState, } from "react"
import { useNavigate } from 'react-router-dom'



export default function SharedResults({ state }) {


    const navigate = useNavigate(); // Setup our navigation object

    // Retrieve the contents of our URL 
    let params = (new URL(window.location.href)).searchParams;
    const netWPM = params.get('netWPM') 
    const acc = params.get("acc")




    return (
        <div className="section">
            <div className="section is-size-2 has-text-centered" >
                Guests' results:
            </div>
            <div className="columns">
                <div className="column has-text-centered">
                    <p className="is-size-3">WPM:</p>
                    <p className="has-text-primary is-size-1">
                    {netWPM}
                    </p>
                </div>
                <div className="column has-text-centered">
                    <p className="is-size-3">Accuracy:</p>
                    <p className="has-text-info is-size-1">
                    {acc}%
                    </p>
                </div>
            </div>
            <div className="section">
                <div className="buttons">
                <div className="button is-fullwidth is-primary">Try it yourself!</div>
                </div>
            </div>

        </div>
    )
}