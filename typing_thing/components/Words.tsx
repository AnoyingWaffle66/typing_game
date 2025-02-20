'use client'
import { useState } from 'react'
import KeyInput from './keyInput'
import React from 'react'

function Cursor({ cursorPos, letterWidths }: { cursorPos: number; letterWidths: React.RefObject<number[]>; }) {
  return (
    <div
    className='cursor'
    style={{
      position: 'absolute',
      left: `${(letterWidths.current.slice(0, cursorPos).reduce((a, b) => a + b + 4, 0)) + 10}px`,
      top: '5',
    }}
    ></div>
  )
}

function Letter({ letters, current, cursorPos}: { letters: string; current: string; cursorPos?: number }) {
  const letterWidths = React.useRef<number[]>([]);

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = '36px Arial';
      letterWidths.current = letters.split("").map(char => context.measureText(char).width);
    }
  }, [letters]);

  return (
    <div className="flex p-3 relative">
      {letters.split("").map((char, index) => (
        <React.Fragment key={index}>
          {cursorPos !== undefined && cursorPos === index && (
            <Cursor cursorPos={cursorPos} letterWidths={letterWidths}/>
          )}
          <span key={index} className={`px-0.5 text-4xl ${index < current.length ? char === current[index] ? "correct" : "incorrect" : ""}`}>
            {char}
          </span>
        </React.Fragment>
      ))}
      {cursorPos !== undefined && cursorPos === letters.length && (
        <Cursor cursorPos={cursorPos} letterWidths={letterWidths}/>
      )}
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
              {wordIndex < subWordList.length - 1 && (
                <span className='px-0.5 whitespace-pre'></span>
              )}
            </div>
          )
        })
      }
    </div>
  )
    
}
