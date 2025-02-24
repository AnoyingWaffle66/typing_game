"use client"

import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime"
import { ButtonHTMLAttributes, useRef, useState } from "react"


export default function Button() {
    function onClick() {
        console.log("This is to show functions being used in buttons")
    }
    return (
        <>
            <button className="" onClick={onClick}>
                I'm button
            </button>
        </>
    )
}

export function SettingsButton() {
    return (
        <>
            <button className="">
                <img src="./settingsCog.png" width={40}></img>
            </button>
        </>
    )
}

export function LeaderboardButton(){
    return(
        <>
            <button>
                <img src="./trophyIcon.png" width={40}></img>
            </button>
        </>
    )
}

export function RepeatButton() {
    const focus = document.getElementById("repeat")
    const onRepeat = () => {
        if (sessionStorage.getItem('testActive') === 'true') {
            sessionStorage.setItem('testActive', 'false')
            window.dispatchEvent(new Event('reset'))
        }
        focus?.blur()
    }

    return (
        <>
            <button className="spacer rounded-3xl p-2 hover:bg-gray-300 active:bg-gray-400 transition" onClick={onRepeat} id="repeat">
                <img src="./repeatIcon.png" width={45} />
            </button>
        </>
    )
}

export function NextButton() {
    const thing = document.getElementById("next")

    const onNext = () => {
        if (sessionStorage.getItem('testActive') === 'true') {
            sessionStorage.setItem('testActive', 'false')
        }
        window.dispatchEvent(new Event('next'))
        thing?.blur()
    }
    return (
        <>
            <button className="spacer rounded-3xl p-2 hover:bg-gray-300 active:bg-gray-400 transition" onClick={onNext} id="next">
                {/* Next */}
                <img src="./arrow.png" width={40} />

            </button>
        </>
    )


}
