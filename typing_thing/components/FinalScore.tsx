import {useEffect, useState} from 'react'

export default function Score({combo, wpm, testEnded} : {combo: number; wpm: number, testEnded: boolean}){
    //const [testEnded, setTestEnded] = useState(false)
    const [score, setScore] = useState(-1)

    useEffect(() => {
        if (testEnded){
            let safeWpm = wpm || 1
            let safeCombo = combo || 2
            let safeAcc = Number.parseInt(String(sessionStorage.getItem('accuracy'))) || 1
            let final = 0
            let s = safeAcc * safeWpm * Math.log10(safeCombo)
            if (s <= 0){

                final = Math.floor(Math.pow(safeAcc, Math.log10(1)))
            } else {
                final = Math.floor(Math.pow(safeAcc, Math.log10(safeAcc)) * safeWpm * Math.log10(safeCombo))
            }

            setScore(final)
        }
    }, [testEnded])

    useEffect(() => {
        if (score === -1) return
        sessionStorage.setItem('finalScore', String(score))
        console.log("Final score: " + score)
        console.log("Highest Combo: " + combo)
        window.alert("Final Score: " + score)
    }, [score])
    return null
}