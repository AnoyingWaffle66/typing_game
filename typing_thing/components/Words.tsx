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
  
export default function Words({words}: {words: string[]}) {
  const [typedWords, setTypedWords] = useState<string[]>([])
  const [currentIndex, setIndex] = useState<number>(0)
  const [typedKey, setTypedKey] = useState<string>('');
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [spacebarCount, setSpacebarCount] = useState<number>(0);
  
  const handleKeyPress = (keyPress: string | null) => {
    const currentWord = words[currentIndex]
    
    if (currentIndex === words.length - 1 && typedKey.length === currentWord.length) {
      console.log("Test complete")
      setTestStarted(false)
      return
    }

    if (!testStarted) {
      setTestStarted(true)
    }
    
    if (keyPress === "Backspace") {
      setTypedKey((prev) => prev.substring(0, prev.length-1))
    } else if (keyPress === " ") {
      if (currentIndex < words.length - 1) {
        setTypedWords(prev => [...prev, typedKey])
        setIndex((prev) => prev + 1)
      }

      setSpacebarCount((prev) => prev + 1)
      setTypedKey("")
    } else {
      setTypedKey((prev) => prev + keyPress)
    }

    console.log(spacebarCount)
    console.log(typedKey)
  }

  if (!testStarted) {
    setTestStarted(true)
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
