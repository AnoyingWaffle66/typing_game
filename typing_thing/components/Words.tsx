'use client'
import { useState } from 'react'
import KeyInput from './keyInput'
import React from 'react'

function Letter({ letters, current, cursorPos}: { letters: string; current: string; cursorPos?: number }) {

    return (
      <div className="flex p-3">
        {letters.split("").map((char, index) => (
          <React.Fragment key={index}>
            {cursorPos !== undefined && cursorPos === index && (
            <span className='cursor'>|</span>
          )}
          <span key={index} className={`px-0.5 text-4xl ${index < current.length ? char === current[index] ? "correct" : "incorrect" : ""}`}>
          {char}
        </span>
          </React.Fragment>
        ))}
            {cursorPos !== undefined && cursorPos === letters.length && (
            <span className='cursor'>|</span>
          )}
      </div>
    );
  }
  

export default function Words({words}: {words: string[]}){
  const [typedWords, setTypedWords] = useState<string[]>([])
    // tracks the current word index to know when to move to the next word
    const [currentIndex, setIndex] = useState<number>(0)
    // User input string. This is to compare the word the user types with the word displayed
    const [typedKey, setTypedKey] = useState<string>('');
    // Holds the number of times the space bar has been pressed or when the user has moved to the next word.
    const [spacebarCount, setSpacebarCount] = useState<number>(0);

     const resetTest = () => {
      setTypedKey('')
      setTypedWords([])
      setSpacebarCount(0)
      setIndex(0)
     }

    window.addEventListener('storage', () => {
      resetTest();
      console.log("storage event")
    })

    // Passed into Keyinput so that we can bring back the user input to use in this function/component. Callback function to be used in keyinput
    const handleKeyPress = (keyPress: string | null) => {

        // Starts test 
        if (sessionStorage.getItem('testActive') === 'false') {
          resetTest()
          sessionStorage.setItem('testActive', 'true')
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
        // console.log(spacebarCount)
        // console.log(typedKey)
        // const thing = sessionStorage.getItem('testActive')
        // console.log(thing)
    }

    
    return (
      <div  style={{height: 200}} className="flex flex-wrap items-center justify-center overflow-clip">
        <KeyInput onPress={handleKeyPress}/>
        {
          words.map((word, wordIndex) => {
            const current = wordIndex < currentIndex ? typedWords[wordIndex]
              : wordIndex === currentIndex ? typedKey : "";
              return (
                <div key={wordIndex} className="flex">
                  <Letter letters={word} current={current} cursorPos={wordIndex === currentIndex ? typedKey.length : undefined} />

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
