"use client"

import React, { useState, useEffect } from 'react';

// TO-DO (Make it run on an event instead of right away)

function Countdown() {
    // const [wordCount, setWordCount] = useState(0);
    const [count, setCount] = useState(0);
    const [smoothCount, setSmoothCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const resetTimer = () => {
        setCount(0)
        setIsActive(false)
        setSmoothCount(0)
    }
    window.addEventListener('reset', resetTimer)
    window.addEventListener('next', resetTimer)

    // For Handling Keyboard Input
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {

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

        if (count >= 60 && isActive) {
            setIsActive(false);
        }

        if (count < 60) {
            const intervalId = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;

        if (count < 60) {
            const intervalId = setInterval(() => {
                setSmoothCount(prevSmoothCount => prevSmoothCount + 1);
            }, 5);
            return () => clearInterval(intervalId);
        }
    }, [isActive]);

    return (
        <div>
            <div className='flex justify-center space-x-5'>
                <h1>WPM: {count <= 0 ? "Start typing" : Math.ceil(Number(localStorage.getItem('correctSpaces')) / (count / 60))}</h1>
                <h1>Accuracy: {sessionStorage.getItem('accuracy')}%</h1>
            </div>

            <progress style={{ width: '95vw', margin: '2%' }} value={smoothCount / 12000} />
        </div>
    );
}

export default Countdown;