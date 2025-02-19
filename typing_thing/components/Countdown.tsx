"use client"

import React, {useState, useEffect} from 'react';

// TO-DO (Make it run on an event instead of right away)

function Countdown() {
    // const [wordCount, setWordCount] = useState(0);
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const resetTimer = () => {
        setCount(0)
        setWordCount(0)
        setIsActive(false)
    }
    window.addEventListener('storage', resetTimer)

    // For Handling Keyboard Input
    useEffect(() => {
        const handleKeyPress = (event : KeyboardEvent) => {

            // Sets Active
            if (!isActive) {
                setIsActive(true);
            }
            // if (event.key == ' ' && count < 60) {
            //     setWordCount(prevWordCount => prevWordCount + 1);
            // }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    // For Handling The Countdown
    useEffect(() => {
        // Keeps returning until a key has been pressed.
        if (!isActive) return;

        if (count < 60) {
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }
    }, [isActive]);

    return (
        <div>
            <h1>WPM: {count <= 0 ? "Start typing" : Math.ceil(Number(localStorage.getItem('correctSpaces')) / (count / 60))}</h1>
            <progress value={count / 60}/>
        </div>
    );
}

export default Countdown;