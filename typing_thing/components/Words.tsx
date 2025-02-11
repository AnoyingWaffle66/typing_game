'use client'
import { useState } from 'react'
import KeyInput from './keyInput'

function Letter({ letters, current }: { letters: string; current: string }) {
    return (
      <div className="flex p-3">
        {letters.split("").map((char, index) => {
            //Sets the letters color based on if it's correct or not. Currently only changes incorrect colors
          const className = index < current.length ? char === current[index] ? "correct" : "incorrect" : "";
          return (
            
            <span key={index} className={`px-0.5 text-4xl ${className}`}>
              {char}
            </span>
          );
        })}
      </div>
    );
  }
  

export default function Words({words}: {words: string[]}){
  const [typedWords, setTypedWords] = useState<string[]>([])
    // tracks the current word index to know when to move to the next word
    const [currentIndex, setIndex] = useState<number>(0)
    // User input string. This is to compare the word the user types with the word displayed
    const [typedKey, setTypedKey] = useState<string>('');
    // boolean to track if the test has started or ended. used to let the keyinput function to start capturing user input
    const [testStarted, setTestStarted] = useState<boolean>(false);
    // Holds the number of times the space bar has been pressed or when the user has moved to the next word.
    const [spacebarCount, setSpacebarCount] = useState<number>(0);
  
    // Passed into Keyinput so that we can bring back the user input to use in this function/component. Callback function to be used in keyinput
    const handleKeyPress = (keyPress: string | null) => {
        // Is the current word in the array. We keep track of this so that we know where we are in the test.
        const currentWord = words[currentIndex]
        // This if statement is meant to stop capturing user input if the user has entered the last letter of the last word in the list of words.
        if (currentIndex === words.length - 1 && typedKey.length === currentWord.length) {
          console.log("Test complete")
          setTestStarted(false)
          // returns so that it exists the function before the test can be started again.
          return
        }

        // Starts test 
        if (!testStarted) {
          setTestStarted(true)
        }
    
        // Handles the event of when user presses backspace key
        if (keyPress === "Backspace") {
            // removes the most recent char in string
           setTypedKey((prev) => prev.substring(0, prev.length-1))
        }
        // Logic for what happens when a user presses space bar 
        else if (keyPress === " ") {
            // Checks if the user has entered has finished the word before moving to next.
          if (currentIndex < words.length - 1) {
            // moves to next word in list
            setTypedWords(prev => [...prev, typedKey])
            setIndex((prev) => prev + 1)
          }
          // increments spacebar count
           setSpacebarCount((prev) => prev + 1)
          // sets the user input string to empty. Not sure if this is good place to put this.
           setTypedKey("")
        } else {
            // adds any other char the user has entered to the user string
           setTypedKey((prev) => prev + keyPress)
        }

        // for debug purposes
        console.log(spacebarCount)
        console.log(typedKey)
    }

    
    return (
      <div style={{height: 200}} className="flex flex-wrap items-center justify-center overflow-clip">
        <KeyInput onPress={handleKeyPress} testStarted={testStarted}/>
        {
          words.map((word, wordIndex) => {
            const current = wordIndex < currentIndex ? typedWords[wordIndex]
              : wordIndex === currentIndex ? typedKey : "";
              return (
                <div key={wordIndex} className="flex">
                  <Letter letters={word} current={current} />
                  {wordIndex < words.length - 1 && (
                    <span className='px-0.5 whitespace-pre'></span>
                  )}
                  </div>
                )
          })
        }
      </div>
    )
    
}
