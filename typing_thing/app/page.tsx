"use client"
import Button from "@/components/Button"
import "@/styles/global.css"
import React, { useState, useEffect } from "react";
import { SettingsButton } from "@/components/Button";
import SettingsBar from "@/components/settingsBar";
import Words from "@/components/Words"
import Countdown from "@/components/Countdown"
import LeaderboardButton from "@/components/Leaderboard-Button";

const WORDLIST_API = 'http://127.0.0.1:3000/api/wordlist'

export default function Home() {
  const [openSettings, openSettingsClicked] = useState(false)
  const [inputText, setInputText] = useState('')
  const [wordList, setWordList] = useState<string[]>([])

  const handleClick = () => {
    openSettingsClicked(prev => !prev)
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
        <LeaderboardButton/>
        </div>
    </div>
    </>
  )
}