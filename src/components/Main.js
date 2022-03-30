import React, { useState, useEffect, useRef } from "react"

import { getNextQuote } from "../scripts/randomword"
import "../scripts/randomword"
import randomWords from "random-words"

export default function Main() {

    const TIMER_LENGTH = 60;
    const WORD_COUNT = 1 // Our word count to retrieve

    const [word, setWord] = useState("Waiting for word"); // Return a reandom word for us to use
    const [countDown, setCountdown] = useState(TIMER_LENGTH) // Keep track of our games time length
    const [currInput, setCurrInput] = useState("") // Keep track of our current keyboard input
    const [currCharIndex, setCurrCharIndex] = useState(-1) // Keep track of our current words character index
    const [currChar, setCurrChar] = useState("")
    const [status, setStatus] = useState("waiting") // Game manager for our status
    const [correct, setCorrect] = useState(0) // Keep track of correct, 
    const [incorrect, setIncorrect] = useState(0)
    
    
    const textInput = useRef(null) // Reference our textbox


    useEffect(() => {
        setWord(generateNewWord()) // Generate a new word from "random-words"
    }, []) // Start list as empty


    useEffect(() => {
        if (status === "started") {
          textInput.current.focus() // Focus our textbox if we start
        }
      }, [status]) // If our status changes lock us into the textbox

    function start() {

        if(status === "finished"){
            setWord(generateNewWord())
            setCorrect(0)
            setIncorrect(0)
        }
        if(status !== "started"){
            setStatus("started")
            let interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 0) { // If our interval reaches 0, restart
                        clearInterval(interval)
                        setStatus("finished") 
                        return TIMER_LENGTH
                    } else {
                        return prevCountdown - 1 // Subtract 1 every 1 second
                    }
                })
            }, 1000)
        }

     

    }



    function handleKeyDown({ keyCode, key }) {
        console.log(keyCode) // Log our keystroke 
        getChar()
        if (currInput === word[0]) { 
            console.log("Match found")
            checkMatch() // Run found key functioon
            setCurrInput("") // Reset back to default
            setWord(generateNewWord()) // Reset back to default
            setCurrCharIndex(-1) // Reset back to default
            console.log("current:" + currInput)
            console.log("target:" + word)
        } else if (keyCode === 32) {
            checkMatch()
            setCurrInput("")
            setWord(generateNewWord())
        } else {
            setCurrCharIndex(currCharIndex + 1) // Increment for each key
            setCurrChar(key) // Represents 
        }


    }

    function checkMatch() {
        const wordToCompare = word[0]
        const doesItMatch = wordToCompare === currInput
        console.log({ doesItMatch })
        if (doesItMatch){
            setCorrect(correct + 1)

        } else {
            setIncorrect(incorrect + 1)

        }
    }

    function generateNewWord() {
        return new Array(WORD_COUNT).fill(null).map(() => randomWords())
    }

    function getChar(){
        if (currChar === word[0].charAt(currCharIndex)) {
            return "has-background-success"
        }
    }

    return (
        <main>
            <div className="section">
                <div className="is-size-2 has-text-centered has-text-primary">{countDown}</div>
            </div>
            <div className="section is-half has-text-centered">

                    <div className="target-quote is-size-2">
                        <span className={getChar()}>{word}</span>
                        </div>

                
                <input ref={textInput} disabled={status !== "started"} className="input is-success " type="text" placeholder={word} onKeyUp={handleKeyDown} value={currInput} onChange={(e) => (setCurrInput(e.target.value))} />
            </div>
            <div className="section">
                <div className="buttons">
                    <button onClick={start} className="button is-primary is-fullwidth ">Start</button>
                    <button  className="button is-danger is-fullwidth ">Stop</button>
                </div>
            </div>


        </main >
    )
}