import {useEffect, useState} from 'react'

export default function Score({combo, wpm, testEnded} : {combo: number; wpm: number, testEnded: boolean}){
    //const [testEnded, setTestEnded] = useState(false)
    const [score, setScore] = useState(-1)

    useEffect(() => {
        if (testEnded){
            let safeWpm = wpm || 1
            let safeCombo = combo || 1
            let safeAcc = Number.parseInt(String(sessionStorage.getItem('accuracy'))) || 1
            console.log("wpm: " + safeWpm + " ; combo: " + safeCombo + " ; acc: " + safeAcc)
            let final = 0
            let s = safeAcc * safeWpm * Math.log10(safeCombo)
            if (s <= 0){

                final = Math.floor(Math.pow(safeAcc, Math.log10(1)))
            } else {
                final = Math.floor(Math.pow(safeAcc, Math.log10(safeAcc * safeWpm * Math.log(safeCombo))))
            }

            setScore(final)
        }
    }, [testEnded])

    useEffect(() => {
        sessionStorage.setItem('finalScore', String(score))
        console.log("Final score: " + score)
    }, [score])
    return null
}