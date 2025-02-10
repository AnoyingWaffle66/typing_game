"use client"

import React, {useState, useEffect} from 'react';

// TO-DO (Make it run on an event instead of right away)

function Countdown() {
    const [count, setCount] = useState(60);
    const [isActive, setIsActive] = useState(false);

    // For Handling Keyboard Input
    useEffect(() => {
        const handleKeyPress = (event : KeyboardEvent) => {
            if (event.key != null) {
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

        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isActive]);

    return (
        <div>
            <progress value={(count - 60) / 60}/>
        </div>
    );
}

export default Countdown;