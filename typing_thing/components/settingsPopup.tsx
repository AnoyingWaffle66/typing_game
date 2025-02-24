"use client"

import { useState } from "react"


const SettingsPopup = ({setText, initialText}: {setText:Function, initialText:string}) => {
    const [username, setUsername] = useState(initialText || 'LATITDCTNITS')
    
    const onChange = (event: any) => {
        setUsername(event.target.value)
        setText(event.target.value)
    }

    return (
        <>
            <h1>Settings</h1>
            <div className="h-20 items-center">
                <h2 className="spacer">Username</h2>
                <input onChange={onChange} value={username} placeholder={"username"} className="ml-5 text-white text-center bg-gray-600 border"/>
            </div>
        </>
    )
}

export default SettingsPopup