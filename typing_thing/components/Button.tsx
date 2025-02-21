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
            <button className="rounded-3xl p-2 hover:bg-gray-300 active:bg-gray-400 transition" onClick={onRepeat}>
                <img src="./repeatIcon.png" width={45}/>
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
            <button className="rounded-3xl p-2 hover:bg-gray-300 active:bg-gray-400 transition" onClick={onNext}>
                {/* Next */}
                <img src="./arrow.png" width={40} />
            </button>
        </>
    )


}
