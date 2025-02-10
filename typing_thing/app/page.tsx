"use client"
import Button from "@/components/Button"
import "@/styles/global.css"
import React, { useState, useEffect } from "react";
import { SettingsButton } from "@/components/Button";
import SettingsBar from "@/components/settingsBar";
import Words from "@/components/Words"

export default function Home() {
  const [openSettings, openSettingsClicked] = useState(false)
  const [inputText, setInputText] = useState('')

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
        </div>
    </div>
    </>
  )
}