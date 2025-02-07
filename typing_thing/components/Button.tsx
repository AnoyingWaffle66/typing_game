"use client"

import { useState } from "react"


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
    // const [openSettings, openSettingsClicked] = useState(false)
    // const handleClick = () => {
    //     openSettingsClicked((prev) => !prev)
    // }
    return(
        <>
            <button className="">
                <img src="./settingsCog.png" width={40}></img>
            </button>
        </>
    )
}
