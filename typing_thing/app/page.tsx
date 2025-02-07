"use client"
import Button from "@/components/Button"
import "@/styles/global.css"
import { useState } from "react";
import { SettingsButton } from "@/components/Button";
import SettingsBar from "@/components/settingsBar";
import Words from "@/components/Words"

export default function Home() {
  const [openSettings, openSettingsClicked] = useState(false)
  const handleClick = () => {
    openSettingsClicked(prev => !prev)
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
            <SettingsBar/>
          </div>
        )
      }
    <div className="absolute right-8 top-8" onClick={handleClick}>
      <SettingsButton/>
    </div>
    <div>
      <div className="h-screen flex items-center justify-center mr-10 ml-10">
        <Words words={words}>
          
        </Words>
        </div>
    </div>
    </>
  )
}