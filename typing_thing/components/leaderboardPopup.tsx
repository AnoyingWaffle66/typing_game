"use client"

import {useState, useEffect} from 'react';

interface Score {
    name: string,
    score: number,
    wpm: number,
    accuracy: number,
    combo: number
}

function LeaderboardPopup({api}: { api: string }) {
    const [leaderboard, setLeaderboard] = useState<Score[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch(api, {
                method: 'GET',
            })

            const scores: Score[] = await response.json()
            scores.sort((first, second) => second.score - first.score)

            setLeaderboard(scores)
        })()
    }, [])
    
    return (
        <>
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>wpm</th>
                        <th>accuracy</th>
                        <th>combo</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((score, index) => {
                        return (
                            <tr key={"score" + index} className={`${index % 2 == 0 ? "grayify" : ""}`}>
                                <td>{index + 1}</td>
                                <td>{score.name}</td>
                                <td>{score.wpm}</td>
                                <td>{`${score.accuracy.toFixed(2)}%`}</td>
                                <td>{score.combo}</td>
                                <td>{score.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default LeaderboardPopup