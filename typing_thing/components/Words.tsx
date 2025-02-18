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
          <span className='whitespace-pre cursor'></span>
        )}
        <span key={index} className={`px-0.5 text-4xl ${index < current.length ? char === current[index] ? "correct" : "incorrect" : ""} ${cursorPos !== undefined && cursorPos === index ? "cursor" : ""}`}>
        {char}
      </span>
        </React.Fragment>
      ))}
      <span className={`px-0.5 whitespace-pre ${cursorPos !== undefined && cursorPos === letters.length ? "cursor" : ""}`}></span>
    </div>
  );
}
  
export default function Words({words}: {words: string[]}) {
  const [typedWords, setTypedWords] = useState<string[]>([])
  const [currentIndex, setIndex] = useState<number>(0)
  const [typedKey, setTypedKey] = useState<string>('');
  const [spacebarCount, setSpacebarCount] = useState<number>(0);
  const [subWordList, setSubWordList] = useState<string[]>([])

    
  if (subWordList.length == 0) {
    for (let i = 0; i < 50; i++) {
      const random = Math.floor(Math.random() * words.length)
      subWordList.push(words[random])
    }
  }

  console.log(subWordList.length)
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

    const handleKeyPress = (keyPress: string | null) => {

        if (sessionStorage.getItem('testActive') === 'false') {
          resetTest()
          sessionStorage.setItem('testActive', 'true')
        }
    
        if (keyPress === "Backspace") {
           setTypedKey((prev) => prev.substring(0, prev.length-1))
        }
        else if (keyPress === " ") {
          if (currentIndex < subWordList.length - 1) {
            setTypedWords(prev => [...prev, typedKey])
            setIndex((prev) => prev + 1)
          }
           setSpacebarCount((prev) => prev + 1)
           setTypedKey("")
        } else {
           setTypedKey((prev) => prev + keyPress)
        }

        // for debug purposes
        // console.log(spacebarCount)
        // console.log(typedKey)
        // const thing = sessionStorage.getItem('testActive')
        // console.log(thing)
    }
    
  return (
    <div style={{height: 200}} className="flex flex-wrap items-center justify-center overflow-clip">
      <KeyInput onPress={handleKeyPress}/>
      {
        subWordList.map((word, wordIndex) => {
          const current = wordIndex < currentIndex ? typedWords[wordIndex]
            : wordIndex === currentIndex ? typedKey : "";
          
          return (
            <div key={wordIndex} className="flex">
              <Letter letters={word} current={current} cursorPos={wordIndex === currentIndex ? typedKey.length : undefined} />
              </div>
          )
        })
      }
    </div>
  )
    
}
