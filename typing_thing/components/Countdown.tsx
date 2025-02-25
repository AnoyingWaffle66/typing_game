"use client"

import { useState, useEffect } from 'react';

const TICK_RATE = 20

function Countdown({time, openResults}: {time: number, openResults: (wpm: number, accuracy: number, combo: number) => void}) {
    const [smoothCount, setSmoothCount] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(0)

    useEffect(() => {
        setWpm(Math.ceil((Number(localStorage.getItem('correctSpaces')) * TICK_RATE) / (smoothCount / 60)))
        localStorage.setItem('wpm', String(wpm))
        console.log("Timer elapsed: " + smoothCount)
    }, [smoothCount])


    const resetTimer = () => {
        setIsActive(false)
        setSmoothCount(0)
        setWpm(0)
        sessionStorage.setItem('testAcive', 'false')
        localStorage.setItem('wpm', '0')
    }

    const isInputFocused = () => {
        const activeElement = document.activeElement;
        return activeElement && (activeElement.tagName === 'INPUT');
      };

    useEffect(() => {
        window.addEventListener('reset', resetTimer);
        window.addEventListener('next', resetTimer);

        return () => {
            window.removeEventListener('reset', resetTimer);
            window.removeEventListener('next', resetTimer);
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => setIsActive(true);

        window.addEventListener("keydown", handleKeyPress);

        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    useEffect(() => {
        if (!isActive)
            return;

        if (smoothCount < time * TICK_RATE) {
            const intervalId = setInterval(() => {
                setSmoothCount(prevSmoothCount => {
                    const newSmoothCount = prevSmoothCount + 1

                    if (newSmoothCount >= time * TICK_RATE && isActive) {
                        const wpm = Number(localStorage.getItem('wpm'))
                        const accuracy = Number(sessionStorage.getItem('accuracy'))
                        const combo = Number(sessionStorage.getItem('combo'))

                        setIsActive(false)
                        setTimeout(() => openResults(wpm, accuracy, combo));
                    }

                    return newSmoothCount
                });
            }, (1000 / TICK_RATE));

            return () => clearInterval(intervalId);
        }
    }, [isActive, time]);

    // to let other components know if countdown is over
    // useEffect(() => {
    //     if (count >= 60) {
    //         window.dispatchEvent(new Event('testOver'))
    //         localStorage.setItem('testActive', 'False')
    //         console.log("test ended")
    //     }
    // }, [count])

    return (
        <div>
            <div className='flex justify-center space-x-5'>
                <h2>WPM: {smoothCount <= 0 ? "Start typing" : Math.ceil((Number(localStorage.getItem('correctSpaces')) * TICK_RATE) / (smoothCount / 60))}</h2>
                <h2>Accuracy: {sessionStorage.getItem('accuracy')}%</h2>
            </div>
            <progress style={{ width: '95vw', margin: '2%' }} value={smoothCount / (TICK_RATE * time)} />
        </div>
    );
}

export default Countdown;