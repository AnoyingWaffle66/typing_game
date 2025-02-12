"use client"
import Button from "@/components/Button"
import "@/styles/global.css"
import React, { useState, useEffect } from "react";
<<<<<<< HEAD

import { SettingsButton, RepeatButton } from "@/components/Button";
=======
import { SettingsButton, LeaderboardButton } from "@/components/Button";
>>>>>>> f4cb808 (Timer functionality + Hardcoded Leaderboard (IN JSON) For Now)
import SettingsBar from "@/components/settingsBar";
import LeaderboardBar from "@/components/LeaderboardBar";
import Words from "@/components/Words"
import Countdown from "@/components/Countdown"
<<<<<<< HEAD
import LeaderboardButton from "@/components/Leaderboard-Button";
import { json } from "stream/consumers";

const WORDLIST_API = 'http://127.0.0.1:3000/api/wordlist'
=======
>>>>>>> f4cb808 (Timer functionality + Hardcoded Leaderboard (IN JSON) For Now)

export default function Home() {
  sessionStorage.setItem('testActive', 'false')
  const [openSettings, openSettingsClicked] = useState(false)
  const [openLB, openLBClicked] = useState(false)
  const [inputText, setInputText] = useState('')
  
  // reset time
  // clear typed words
  // render same words again
  const onRepeat = () => {
    console.log(sessionStorage.getItem('testActive'))
    if (sessionStorage.getItem('testActive') === 'true'){
      sessionStorage.setItem('testActive', 'false')
      window.dispatchEvent(new Event('storage'))
    }
    console.log(sessionStorage.getItem('testActive'))
    console.log('button clicked')
  }
  const [wordList, setWordList] = useState<string[]>([])

  const handleClick = () => {
    openSettingsClicked(prev => !prev)
  }

  const handleLBClick = () => {
    openLBClicked(prev => !prev)
  }

  useEffect(() => {
    const savedText = localStorage.getItem('inputText')
    if (savedText) {
      setInputText(savedText)
    }
  }, [])

  useEffect(() => {
    (async () => {
      const response = await fetch(WORDLIST_API, {
        method: 'POST',
        body: 'english'
      })
      const json = await response.json()
  
      setWordList(json.words)
    })()
  }, [])

  const handleSetText = (text: any) => {
    setInputText(text)
    localStorage.setItem('inputText', text)
  }

  return (
    <>
      {
        openSettings && (
          <div className="absolute pt-7 pl-3 w-screen bg-gray-600">
            <SettingsBar setText={handleSetText} initialText={inputText}/>
          </div>
        )
      }
    <div className="absolute right-8 top-8" onClick={handleClick}>
      <SettingsButton/>
    </div>
    <div>
      <div className="h-screen flex items-center justify-center mr-10 ml-10">
        { wordList.length > 0 ? (
          <Words words={wordList}/>
        ) : (
          <p>Loading...</p>
        )}
        <Countdown/>
<<<<<<< HEAD
        <LeaderboardButton/>
=======
>>>>>>> f4cb808 (Timer functionality + Hardcoded Leaderboard (IN JSON) For Now)
        </div>

    </div>
<<<<<<< HEAD
    <div className="button button:hover button:active" onClick={onRepeat}>
          <RepeatButton/>
    </div>

=======
    {
      openLB && (
        <div className="absolute pt-7 pl-3 w-scren bg-gray-600">
          <LeaderboardBar/>
        </div>
      )
    }
    <div className="absolute center-8 top-8" onClick={handleLBClick}>
      <LeaderboardButton/>
    </div>
>>>>>>> f4cb808 (Timer functionality + Hardcoded Leaderboard (IN JSON) For Now)
    </>
  )
}