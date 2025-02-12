"use client"
import Button from "@/components/Button"
import "@/styles/global.css"
import React, { useState, useEffect } from "react";

import { SettingsButton, RepeatButton } from "@/components/Button";
import SettingsBar from "@/components/settingsBar";
import Words from "@/components/Words"

import Countdown from "@/components/Countdown"
import LeaderboardButton from "@/components/Leaderboard-Button";
import { json } from "stream/consumers";

export default function Home() {
  sessionStorage.setItem('testActive', 'false')
  const [openSettings, openSettingsClicked] = useState(false)
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
  const handleClick = () => {
    openSettingsClicked(prev => !prev)
  }

  useEffect(() => {
    const savedText = localStorage.getItem('inputText')
    if (savedText){
      setInputText(savedText)
    }
  }, [])

  const handleSetText = (text) => {
    setInputText(text)
    localStorage.setItem('inputText', text)
  }

  const words = [
    "the","be","of","and","a","to",
    "in","he","have","it","that","for","they","I",
    "with","as","not","on","she","at","by","this",
    "we","you","do","but","from","or","which","one",
    "would","all","will","there","say","who","make","when",
    "can","more","if","no","man","out","other"
  ]
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

        <Words words={words}/>

        <Countdown/>

        <LeaderboardButton/>
        </div>

    </div>
    <div className="button button:hover button:active" onClick={onRepeat}>
          <RepeatButton/>
    </div>

    </>
  )
}