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

export function RepeatButton(){
    return(
        <>
            <button className="">
                Repeat
            </button>
        </>
    )
}

export function LeaderboardButton() {
    return (
        <div>
            <button className="">
                <img src="./trophy-dark.bmp" width={40}></img>
            </button>
        </div>
    );
}
