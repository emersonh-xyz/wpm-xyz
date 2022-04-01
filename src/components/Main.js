import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

import randomWords from "random-words"

export default function Main({state}) {


    // Grab our prop data
    const time = state.time
    const wordCount = state.wordCount
    const setWordCount = state.setWordCount
    const charCount = state.charCount
    const setCharCount = state.setCharCount
    const correct = state.correct
    const setCorrect = state.setCorrect
    const incorrect = state.incorrect
    const setIncorrect = state.setIncorrect    


    const TIMER_LENGTH = time; // Our timer length for the game
    const WORD_COUNT = 1 // Our word count for how many words to display to the user

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

        if (status !== "started") { // If we aren't started we can now start
            setStatus("started") // Start
            let interval = setInterval(() => { // Make a new interval that counts down every second
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 0) { // If our interval reaches 0, restart
                        clearInterval(interval)
                        navigate('/results');
                        return TIMER_LENGTH
                    } else {
                        return prevCountdown - 1 
                    }
                })
            }, 1000)
        }



    }




    function handleKeyDown({ keyCode, key }) {
        console.log(keyCode) // Log our keystroke 
        setCharCount(charCount + 1) // Add to our character count 
        if (keyCode === 32) { // Spacebar
            resetWord()
            setWordCount(wordCount + 1)
        } else if (keyCode === 8 && (currCharIndex !== -1)) { // Backspace
            setCurrChar(word[0].charAt(currCharIndex - 1)) // Highlight our character green if it matches
            setCurrCharIndex(currCharIndex - 1)
        } else {
            setCurrChar(key) // Represents
            setCurrCharIndex(currCharIndex + 1)
        }


    }

    function checkMatch() {
        const wordToCompare = word[0]
        const doesItMatch = (wordToCompare === currInput)
        console.log(wordToCompare)
        console.log(currInput)
        console.log({ doesItMatch })
        if (doesItMatch) {
            setCurrInput("")
            setCorrect(correct + 1)
        } else {
            setCurrInput("")
            setIncorrect(incorrect + 1)
            
        }
    }

    function resetWord(){
        checkMatch() // Check if our words are equal
        setCurrCharIndex(-1)
        setWord(generateNewWord()) 
        setCurrInput("") // Reset back to default
    }

    function generateNewWord() {
        return new Array(WORD_COUNT).fill(null).map(() => randomWords())
    }

    function getCharClass(wordIdx, charIdx, char) {
        if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
          if (char === currChar) { // Everytime a character matches
            return 'has-background-success'
          } else if (currInput === "") { // If we have no words reset back to default
            setCurrCharIndex(-1)
            return 'has-text-warning'
          } else if(char !== currChar) {
              return "has-background-danger"
          }
        } else if (wordIdx === currWordIndex && currCharIndex >= word[currWordIndex].length) { // If our index is greater than the length of the word
          return 'has-background-danger'
        } else if (word[0] == currInput){ // If our word mathces our current input, highlight it all green
            return "has-background-success"
        }else {
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
       
                <input ref={textInput} disabled={status !== "started"} className="input is-success " type="text" placeholder={word} onKeyUp={handleKeyDown} value={currInput} onChange={(e) => (setCurrInput(e.target.value.trim()))} />
            </div>
            <div className="section">
                <div className="buttons">
                    <button onClick={start} disabled={status === "started"} className="button is-primary is-fullwidth ">Start</button>
                    <button onClick={stop} disabled={status !== "started"}className="button is-danger is-fullwidth ">Stop</button>
                </div>
            </div>
                                         

        </main >
    )
}
