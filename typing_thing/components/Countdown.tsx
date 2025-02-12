"use client"

import React, {useState, useEffect} from 'react';

// TO-DO (Make it run on an event instead of right away)

function Countdown() {
    const [wordCount, setWordCount] = useState(0);
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const resetTimer = () => {
        setCount(0)
        setWordCount(0)
        setIsActive(false)
    }
    window.addEventListener('storage', resetTimer)

    // 'Borrowed' from the keyInput component
    const [currentKey, setCurrentKey] = useState<string | null>(null);

    // For Handling Keyboard Input
    useEffect(() => {
        if (count >= 60) return;

        const handleKeyPress = (event : KeyboardEvent) => {
            setCurrentKey(event.key)

            // Sets Active
            if (!isActive) {
                setIsActive(true);
            }

            if (event.key == ' ' && count < 60 && currentKey == null) {
                setWordCount(prevWordCount => prevWordCount + 1);
            }
        };

        const handleKeyRelease = (event : KeyboardEvent) => {
            setCurrentKey(null);
        };

        window.addEventListener("keydown", handleKeyPress);
        window.addEventListener("keyup", handleKeyRelease);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("keyup", handleKeyRelease);
        }
    }, [count, currentKey]);

    // For Handling The Countdown
    useEffect(() => {
        if (count >= 60) return;
        // Keeps returning until a key has been pressed.
        if (!isActive) return;

        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [isActive, count]);

    return (
        <div>
            <h1>WPM: {Math.ceil(wordCount / (count / 60))}</h1>
            <progress value={count / 60}/>
        </div>
    );
}

export default Countdown;