"use client"

import { useState } from "react"


const SettingsBar = ({setText, initialText}: {setText:Function, initialText:string}) => {
    const [username, setUsername] = useState(initialText || '')
    
    const onChange = (event) => {
        setUsername(event.target.value)
        setText(event.target.value)
    }
    return (
        <div className="h-20 flex items-center">
            <input onChange={onChange} value={username} placeholder={"username"} className="ml-5 text-white text-center bg-gray-600 border"/>
        </div>
    )
}

export default SettingsBar