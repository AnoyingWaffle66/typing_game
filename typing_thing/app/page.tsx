"use client"
import Button from "@/components/Button"
import React, { useState, useEffect, MouseEventHandler } from "react";

import { SettingsButton, LeaderboardButton, RepeatButton, NextButton } from "@/components/Button";
import SettingsPopup from "@/components/settingsPopup";
import Words from "@/components/Words"
import Countdown from "@/components/Countdown"
import { json } from "stream/consumers";
import LeaderboardPopup from "@/components/leaderboardPopup";

const WORDLIST_API = 'http://127.0.0.1:3000/api/wordlist'
const LEADERBOARD_API = 'http://127.0.0.1:3000/api/leaderboard'

export default function Home() {
  sessionStorage.setItem('testActive', 'false')
  sessionStorage.setItem('accuracy', '100')
  const [openSettings, openSettingsClicked] = useState(false)
  const [openLeaderboard, openLeaderboardClicked] = useState(false)
  const [inputText, setInputText] = useState('')

  const [wordList, setWordList] = useState<string[]>([])

  const handleSettingsClick = () => {
    openSettingsClicked(prev => !prev)
  }

  const handleLeaderboardClick = (event: any) => {
    openLeaderboardClicked(prev => !prev)
  }

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      openLeaderboardClicked(false);
      openSettingsClicked(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('correctSpaces', "0")
    localStorage.setItem('newLines', "0")
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
        openLeaderboard && (
          <div className='modal' onClick={handleModalClick}>
            <div className='modal-box'>
              <LeaderboardPopup api={LEADERBOARD_API}/>
            </div>
          </div>
        )
      }
      {
        openSettings && (
          <div className='modal' onClick={handleModalClick}>
            <div className='modal-box'>
              <SettingsPopup setText={handleSetText} initialText={inputText}/>
            </div>
          </div>
        )
      }
      <div className="absolute right-24 top-8" onClick={handleLeaderboardClick}>
        <LeaderboardButton/>
      </div>
      <div className="absolute right-8 top-8" onClick={handleSettingsClick}>
        <SettingsButton/>
      </div>
      <div>
      <div className="h-page flex text-center justify-center pt-20 mt-20 mr-20 ml-10">
          <Countdown/>
        </div>
        <div className="h-screen inline items-center justify-center pt-20 mt-10 mr-10 ml-10">
          {wordList.length > 0 ? (
            <Words words={wordList}/>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="h-page flex text-center justify-center">
          <RepeatButton/>
          <NextButton/>
        </div>
      </div>
    </>
  )
}