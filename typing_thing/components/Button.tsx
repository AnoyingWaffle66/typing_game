"use client"

import { ButtonHTMLAttributes, useState } from "react"


export default function Button(){
    function onClick(){
        console.log("This is to show functions being used in buttons")
    }
    return(
        <>
            <button className= ""onClick={onClick}>
                I'm button
            </button>
        </>
    )
}

export function SettingsButton(){
    return(
        <>
            <button className="">
                <img src="./settingsCog.png" width={40}></img>
            </button>
        </>
    )
}
export function RepeatButton(  ) {

      const onRepeat = () => {
        if (sessionStorage.getItem('testActive') === 'true') {
          sessionStorage.setItem('testActive', 'false')
          window.dispatchEvent(new Event('reset'))
        }
      }

    return(
        <>
            <button className="button button:hover button:active" onClick={onRepeat}>
                Repeat
            </button>
        </>
    )
}

export function NextButton(){

    const onNext = () => {
        if (sessionStorage.getItem('testActive') === 'true') {
            sessionStorage.setItem('testActive', 'false')  
          }
          window.dispatchEvent(new Event('next'))
        }

    return(
        <>
            <button className="button button:hover button:active" onClick={onNext}>
                Next
            </button>
        </>
    )


}
