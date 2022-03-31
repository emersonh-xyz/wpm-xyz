import React from "react"

export default function Results(){
    return(
        <div className="section">


        <div className="section is-size-2 has-text-centered" >
            Results
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
                100%
              </p>
          </div>
        </div>
      </div>
    )
}