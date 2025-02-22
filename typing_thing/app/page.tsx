"use client"
import Button from "@/components/Button"
import "@/styles/global.css"
import React, { useState, useEffect } from "react";

import { SettingsButton, RepeatButton, NextButton } from "@/components/Button";
import SettingsBar from "@/components/settingsBar";
import Words from "@/components/Words"
import Countdown from "@/components/Countdown"
import LeaderboardButton from "@/components/Leaderboard-Button";
import { json } from "stream/consumers";

const WORDLIST_API = 'http://127.0.0.1:3000/api/wordlist'

export default function Home() {
  sessionStorage.setItem('testActive', 'false')
  const [openSettings, openSettingsClicked] = useState(false)
  const [inputText, setInputText] = useState('')

  const [wordList, setWordList] = useState<string[]>([])

  const handleClick = () => {
    openSettingsClicked(prev => !prev)
  }
  
  useEffect(() => {
    localStorage.setItem('correctSpaces', "0")
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
            <SettingsBar setText={handleSetText} initialText={inputText} />
          </div>
        )
      }
      <div className="absolute right-8 top-8" onClick={handleClick}>
        <SettingsButton />
      </div>
      <div>
      <div className="h-page flex text-center justify-center pt-20 mt-20 mr-20 ml-10">
          <Countdown/>
        </div>
        <div className="h-screen inline items-center justify-center pt-20 mt-10 mr-10 ml-10">
          { wordList.length > 0 ? (
            <Words words={wordList}/>
          ) : (
            <p>Loading...</p>
          )}
          <LeaderboardButton/>
        </div>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 flex gap-10 justify-center">
          <RepeatButton />
          <NextButton/>
        </div>
      </div>
    </>
  )
}