'use client'
import { useState, useRef, useEffect } from 'react'
import KeyInput from './keyInput'
import React from 'react'
import { stringify } from 'querystring';

function Cursor({ cursorPos, letterWidths }: { cursorPos: number; letterWidths: React.RefObject<number[]>; }) {
    const [position, setPosition] = useState(0)

    const removePreviousWords = (pos: number) => {
        let divsToRemove = []
        document.querySelectorAll('div.word').forEach((div, idx) => {
            if (div.getBoundingClientRect().y + 12.5 < pos) {
                divsToRemove[idx] = div
            }
        })
        divsToRemove.forEach((div) => {
            div.remove()
        })
    }

    return (
        <div
            className='cursor'
            style={{
                position: 'absolute',
                left: `${(letterWidths.current.slice(0, cursorPos).reduce((a, b) => a + b + 4, 0)) + 10}px`,
                top: '5',
            }}
            ref={el => {
                if (!el) return

                const currentY = el.getBoundingClientRect().y
                console.log(currentY)
                if(position === 0){
                    setPosition(currentY)
                } 

                if (currentY > position) {
                    setPosition(currentY)
                    removePreviousWords(currentY)
                }
                // } else if (currentY > position) {
                //     setPosition(currentY)
                // }
                // console.log(thing)
                // let thing2 = localStorage.getItem('previousCursorPosition')
                // console.log(thing2)
                // localStorage.setItem('previousCursorPosition', thing)
                // console.log(localStorage.getItem('previousCursorPosition'))
                // if (thing != thing2) {
                //     console.log("something")
                //     localStorage.setItem('newLines', "1")
                // } else if (localStorage.getItem('newLines') != '0') {
                //     console.log("hello there")
                // }
            }}>
        </div>
    )
}

function Letter({ letters, current, cursorPos }: { letters: string; current: string; cursorPos?: number }) {
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
                        <Cursor cursorPos={cursorPos} letterWidths={letterWidths} />
                    )}
                    <span key={index} className={`px-0.5 text-4xl ${index < current.length ? char === current[index] ? "correct" : "incorrect" : ""}`}>
                        {char}
                    </span>
                </React.Fragment>
            ))}
            {cursorPos !== undefined && cursorPos === letters.length && (
                <Cursor cursorPos={cursorPos} letterWidths={letterWidths} />
            )}
        </div>
    );
}

export default function Words({ words }: { words: string[] }) {
    const [key, setKeyPress] = useState<string>()
    const [typedWords, setTypedWords] = useState<string[]>([])
    const [currentIndex, setIndex] = useState<number>(0)
    const [typedKey, setTypedKey] = useState<string>('');
    const [spacebarCount, setSpacebarCount] = useState<number>(0);
    const [subWordList, setSubWordList] = useState<string[]>([])
    const [correctCount, setCorrect] = useState<number>(0)
    const [incorrectCount, setIncorrect] = useState<number>(0)
    const [cursorHeights, setHeights] = useState<number[]>([])

    if (subWordList.length == 0) {
        for (let i = 0; i < 50; i++) {
            const random = Math.floor(Math.random() * words.length)
            subWordList.push(words[random])
        }
    }

    const resetTest = () => {
        setTypedKey('')
        setTypedWords([])
        setSpacebarCount(0)
        setIndex(0)
        setCorrect(0)
        setIncorrect(0)
        sessionStorage.setItem('accuracy', '100')
    }

    const newTest = () => {
        setSubWordList([])
        resetTest()
    }

    window.addEventListener('reset', () => {
        resetTest();
    })

    window.addEventListener('next', () => {
        newTest()
    })


    const handleKeyPress = (keyPress: string) => {
        setKeyPress(keyPress)
        if (sessionStorage.getItem('testActive') === 'false') {
            resetTest()
            sessionStorage.setItem('testActive', 'true')
        }

        if (keyPress === "Backspace") {
            setTypedKey((prev) => prev.substring(0, prev.length - 1))
        } else if (keyPress === " ") {
            if (currentIndex < subWordList.length - 1) {
                setTypedWords(prev => [...prev, typedKey])
                setIndex((prev) => prev + 1)
            }

            if (typedKey == subWordList[currentIndex]) {
                setSpacebarCount((prev) => prev + 1)
                localStorage.setItem('correctSpaces', String(spacebarCount))
            } else {
                let currentWord = subWordList[currentIndex]
                let missedLetters = 0
                missedLetters = currentWord.length - (typedKey?.length ?? 0);
                setIncorrect(prev => prev + missedLetters)
            }
            // removePreviousWords()
            setTypedKey("")
        } else {
            setTypedKey((prev) => prev + keyPress)

        }
    }

    //detects key stroke accuracy
    React.useEffect(() => {
        const current = subWordList[currentIndex]
        console.log("Key Press: " + key)
        console.log("typed key length-1: " + current[typedKey.length - 1])

        if (key != undefined && current[typedKey.length - 1] != undefined && key != "Backspace") {
            if (key === current[typedKey.length - 1]) {
                setCorrect(prev => prev + 1)
                console.log("correct Input!")
            } else {
                setIncorrect(prev => prev + 1)
                console.log("incorrect!")
            }
        }
    }, [typedKey])

    //accuracy update
    React.useEffect(() => {
        if (correctCount != 0 || incorrectCount != 0) {
            let acc = Math.floor((correctCount / (correctCount + incorrectCount)) * 100)
            sessionStorage.setItem('accuracy', String(acc))
        }
    }, [correctCount, incorrectCount])

    return (
        <div style={{ height: 200 }} className="flex flex-wrap items-center justify-center overflow-clip">
            <KeyInput onPress={handleKeyPress} />
            {
                subWordList.map((word, wordIndex) => {
                    const current = wordIndex < currentIndex ? typedWords[wordIndex]
                        : wordIndex === currentIndex ? typedKey : "";

                    return (
                        <div key={wordIndex} className="flex word">
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
