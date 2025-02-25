"use client"

import React, { useState, useEffect } from 'react';

// TO-DO (Make it run on an event instead of right away)

function Countdown() {
    // const [wordCount, setWordCount] = useState(0);
    const [count, setCount] = useState(0);
    const [smoothCount, setSmoothCount] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(0)

    useEffect(() => {
        setWpm(Math.ceil(Number(localStorage.getItem('correctSpaces')) / (count / 60)))
        localStorage.setItem('wpm', String(wpm))
        console.log("Timer elapsed: " + count)
    }, [count])


    const resetTimer = () => {
        setCount(0)
        setIsActive(false)
        setSmoothCount(0)
        setWpm(0)
        sessionStorage.setItem('testAcive', 'false')
        localStorage.setItem('wpm', '0')
    }
    window.addEventListener('reset', resetTimer)
    window.addEventListener('next', resetTimer)

    const isInputFocused = () => {
        const activeElement = document.activeElement;
        return activeElement && (activeElement.tagName === 'INPUT');
      };

    // For Handling Keyboard Input
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (isInputFocused()) return
            // Sets Active
            if (!isActive) {
                setIsActive(true);
            }
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

    // to let other components know if countdown is over
    useEffect(() => {
        if (count >= 60) {
            window.dispatchEvent(new Event('testOver'))
            localStorage.setItem('testActive', 'False')
            console.log("test ended")
        }
    }, [count])

    return (
        <div>
            <div className='flex justify-center space-x-5'>
                <h2>WPM: {count <= 0 ? "Start typing" : wpm}</h2>
                <h2>Accuracy: {sessionStorage.getItem('accuracy')}%</h2>
            </div>
            <progress style={{ width: '95vw', margin: '2%' }} value={smoothCount / 12000} />
        </div>
    );
}

export default Countdown;