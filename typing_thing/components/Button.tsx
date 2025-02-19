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

export function RepeatButton( { toExecute }: { toExecute: () => void } ) {
    

    return(
        <>
            <button className="button button:hover button:active" onClick={toExecute}>
                Repeat
            </button>
        </>
    )
}

export function NextButton( ){
    return(
        <>
            <button className="button button:hover button:active">
                Next
            </button>
        </>
    )
}
