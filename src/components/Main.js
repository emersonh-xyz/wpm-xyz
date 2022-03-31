import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

import randomWords from "random-words"

export default function Main({state}) {

    const TIMER_LENGTH = 5; // Our timer length for the game
    const WORD_COUNT = 1 // Our word count to retrieve

    const [word, setWord] = useState([]); // Return a reandom word for us to use
    const [countDown, setCountdown] = useState(TIMER_LENGTH) // Keep track of our games time length
    const [currInput, setCurrInput] = useState("") // Keep track of our current keyboard input
    const [currWordIndex, setCurrWordIndex] = useState(0) // Keep track of our word index
    const [currCharIndex, setCurrCharIndex] = useState(-1) // Keep track of our current character index
    const [currChar, setCurrChar] = useState("") // Keep tracking our current character 
    const [status, setStatus] = useState("waiting") // Game manager for our status

    const textInput = useRef(null) // Reference our textbox

    const navigate = useNavigate(); // Setup our navigation object

    useEffect(() => {
        setWord(generateNewWord()) // Generate a new word from "random-words"
    }, []) // Start list as empty


    useEffect(() => {
        if (status === "started") {
            textInput.current.focus() // Focus our textbox if we start
        }
    }, [status]) // If our status changes lock us into the textbox


    function start() {

        if (status !== "started") {
            setStatus("started")
            let interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 0) { // If our interval reaches 0, restart
                        clearInterval(interval)
                        navigate('/results');
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
        if (currInput === word[0]) {
            checkMatch() // Run found key functioon
            resetWord()
        } else if (keyCode === 32) {
            checkMatch()
            resetWord()
        } else if (keyCode === 8) {
            setCurrCharIndex(currCharIndex - 1)
            setCurrChar("")
        } else {
            setCurrChar(key) // Represents
            setCurrCharIndex(currCharIndex + 1)
        }


    }

    function checkMatch() {
        const wordToCompare = word[0]
        const doesItMatch = wordToCompare === currInput
        console.log({ doesItMatch })
        if (doesItMatch) {
            state.setCorrect(state.correct + 1)
            console.log(state.correct)

        } else {
            state.setIncorrect(state.incorrect + 1)
            console.log("incorrect: " + state.incorrect)
            
        }
    }

    function resetWord(){
        checkMatch() // Check if our words are equal
        setWord(generateNewWord()) // Reset back to default
        setCurrInput("")
        setCurrCharIndex(-1) // Reset back to default
    }

    function generateNewWord() {
        return new Array(WORD_COUNT).fill(null).map(() => randomWords())
    }

    function getCharClass(wordIdx, charIdx, char) {
        if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
          if (char === currChar) {
            return 'has-background-success'
          } else {
            return 'has-background-danger'
          }
        } else if (wordIdx === currWordIndex && currCharIndex >= word[currWordIndex].length) {
          return 'has-background-danger'
        } else {
          return ''
        }
      }


    function stop(){
        navigate("/results")
    }

    return (
        <main>
            <div className="section">
                <div className="is-size-2 has-text-centered has-text-primary">{countDown}</div>
            </div>
            <div className="section is-half has-text-centered">

                <div className="target-quote is-size-2">
                    <div className="content">
                        {word.map((myWord, i) => (
                            <span key={i}>
                                <span>
                                    {myWord.split("").map((char, idx) => (
                                        <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                                    ))}
                                </span>
                                
                            </span>
                                     ))}
                    </div>
                </div>
       
                <input ref={textInput} disabled={status !== "started"} className="input is-success " type="text" placeholder={word} onKeyUp={handleKeyDown} value={currInput} onChange={(e) => (setCurrInput(e.target.value))} />
            </div>
            <div className="section">
                <div className="buttons">
                    <button onClick={start} className="button is-primary is-fullwidth ">Start</button>
                    <button onClick={stop} className="button is-danger is-fullwidth ">Stop</button>
                </div>
            </div>
                                         

        </main >
    )
}
