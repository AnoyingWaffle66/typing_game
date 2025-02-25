"use client"
import Button from "@/components/Button"
import React, { useState, useEffect } from "react";

import { SettingsButton, LeaderboardButton, RepeatButton, NextButton } from "@/components/Button";
import SettingsPopup from "@/components/settingsPopup";
import Words from "@/components/Words"
import Countdown from "@/components/Countdown"
import { json } from "stream/consumers";
import LeaderboardPopup from "@/components/leaderboardPopup";
import ResultsPopup from "@/components/resultsPopup"

const WORDLIST_API = 'http://127.0.0.1:3000/api/wordlist'
const LEADERBOARD_API = 'http://127.0.0.1:3000/api/leaderboard'

export default function Home() {
  sessionStorage.setItem('testActive', 'false')
  sessionStorage.setItem('accuracy', '100')

  const [openSettings, openSettingsClicked] = useState(false)
  const [openLeaderboard, openLeaderboardClicked] = useState(false)
  const [openResults, setOpenResults] = useState(false)
  const [inputText, setInputText] = useState('')
  const [wordList, setWordList] = useState<string[]>([])
  const [wpm, setWPM] = useState(0)
  const [accuracy, setAccurcy] = useState(0)
  const [combo, setCombo] = useState(0)
  const [score, setScore] = useState(0)

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");

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
      setOpenResults(false)
    }
  }

  function setOpenResultsScored(wpm: number, accuracy: number, combo: number) {
    setOpenResults(true)
    setWPM(wpm)
    setAccurcy(accuracy)
    setCombo(combo)

    let safeWpm = wpm || 1
    let safeCombo = combo || 2
    let safeAcc = accuracy || 1
    let final = 0
    let s = safeAcc * safeWpm * Math.log10(safeCombo)

    if (s <= 0){
        final = Math.floor(Math.pow(safeAcc, Math.log10(1)))
    } else {
        final = Math.floor(Math.pow(safeAcc, Math.log10(safeAcc)) * safeWpm * Math.log10(safeCombo))
    }

    setScore(final)

    const _ = (async () => {
      const json = {
        "name": localStorage.getItem('inputText') || 'LATITDCTNITS',
        "score": final,
        "wpm": wpm,
        "accuracy": accuracy,
        "combo": combo
      }

      const response = await fetch(LEADERBOARD_API, {
          method: 'POST',
          body: JSON.stringify(json)
      })
  })()
  }

  useEffect(() => {
    // Invert and Sepia at 1, and Very High Saturation help get the color-shifting to work
    // Hue-Rotate shifts it toward a color
    // Yellow -> Green -> Blue -> Cyan -> Purple (Kind of the order I'm noticing from trial and error)
    switch(theme) {
      case "default":
        document.documentElement.style.setProperty("--background", "#323437");
        document.documentElement.style.setProperty("--foreground", "#ededed");
        document.documentElement.style.setProperty("--correct", "gray");
        document.documentElement.style.setProperty("--incorrect", "#ff4754");
        document.documentElement.style.setProperty("--accent", "#4b42ff");
        document.documentElement.style.setProperty("--imgfilter", "invert(1)");
        break;
      case "light":
        document.documentElement.style.setProperty("--background", "#ededed");
        document.documentElement.style.setProperty("--foreground", "#323437");
        document.documentElement.style.setProperty("--correct", "gray");
        document.documentElement.style.setProperty("--incorrect", "#ff4754");
        document.documentElement.style.setProperty("--accent", "#4b42ff");
        document.documentElement.style.setProperty("--imgfilter", "invert(0)");
        break;
      case "cyber":
        document.documentElement.style.setProperty("--background", "#000000");
        document.documentElement.style.setProperty("--foreground", "#2a821a");
        document.documentElement.style.setProperty("--correct", "lime");
        document.documentElement.style.setProperty("--incorrect", "#ff4754");
        document.documentElement.style.setProperty("--accent", "#169100");
        document.documentElement.style.setProperty("--imgfilter", "invert(1) sepia(1) saturate(5000%) hue-rotate(40deg)");
        break;
      case "sky":
          document.documentElement.style.setProperty("--background", "#3fb0e8");
          document.documentElement.style.setProperty("--foreground", "#e0e0e0");
          document.documentElement.style.setProperty("--correct", "#ffffff");
          document.documentElement.style.setProperty("--incorrect", "#ff4754");
          document.documentElement.style.setProperty("--accent", "#0063bf");
          document.documentElement.style.setProperty("--imgfilter", "invert(1) sepia(1) saturate(5000%) brightness(0.3) hue-rotate(160deg)");
          break;
      case "midnight":
            document.documentElement.style.setProperty("--background", "#172233");
            document.documentElement.style.setProperty("--foreground", "#a2b0db");
            document.documentElement.style.setProperty("--correct", "#9dbbfc");
            document.documentElement.style.setProperty("--incorrect", "#ff4754");
            document.documentElement.style.setProperty("--accent", "#1fbfff");
            document.documentElement.style.setProperty("--imgfilter", "invert(1) sepia(1) saturate(5000%) hue-rotate(180deg)")
            break;
      case "synth":
            document.documentElement.style.setProperty("--background", "#300342");
            document.documentElement.style.setProperty("--foreground", "#e665e6");
            document.documentElement.style.setProperty("--correct", "#f5c814");
            document.documentElement.style.setProperty("--incorrect", "#ed1842");
            document.documentElement.style.setProperty("--accent", "#16d6f0");
            document.documentElement.style.setProperty("--imgfilter", "invert(1) sepia(1) saturate(5000%) brightness(0.8) hue-rotate(240deg)")
            break;
      case "worst":
              document.documentElement.style.setProperty("--background", "#ff30ff");
              document.documentElement.style.setProperty("--foreground", "#2dfc2d");
              document.documentElement.style.setProperty("--correct", "#fafa28");
              document.documentElement.style.setProperty("--incorrect", "#3c3cfa");
              document.documentElement.style.setProperty("--hue", "60deg");
              document.documentElement.style.setProperty("--imgfilter", "invert(1) sepia(1) saturate(5000%)")
              break;
    }

    localStorage.setItem("theme", theme);
  }, [theme])

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
        openResults && (
          <div className='modal' onClick={handleModalClick}>
            <div className='modal-box'>
              <ResultsPopup wpm={wpm} accuracy={accuracy} combo={combo} score={score}/>
            </div>
          </div>
        )
      }
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
              <br></br>
              <button style={{margin: "1%", padding: "1%", border: "1px solid #696969", color: "#696969"}} onClick={() => setTheme("default")}>Default</button>
              <button style={{margin: "1%", padding: "1%", border: "1px solid #A8A8A8", color: "#A8A8A8"}} onClick={() => setTheme("light")}>Light</button>
              <button style={{margin: "1%", padding: "1%", border: "1px solid lime", color: "lime"}} onClick={() => setTheme("cyber")}>Cyber</button>
              <button style={{margin: "1%", padding: "1%", border: "1px solid skyblue", color: "skyblue"}} onClick={() => setTheme("sky")}>Sky</button>
              <button style={{margin: "1%", padding: "1%", border: "1px solid blue", color: "blue"}} onClick={() => setTheme("midnight")}>Midnight</button>
              <button style={{margin: "1%", padding: "1%", border: "1px solid #71318f", color: "#71318f"}} onClick={() => setTheme("synth")}>Synth</button>
              <button style={{margin: "1%", padding: "1%", border: "1px solid yellow", color: "yellow"}} onClick={() => setTheme("worst")}>Worst Color Scheme (NOT RECOMMENDED) 😈</button>
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
          <Countdown time={60} openResults={setOpenResultsScored}/>
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