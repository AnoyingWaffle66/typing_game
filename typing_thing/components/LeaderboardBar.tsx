"use client";

import { useEffect, useState } from 'react';

// From Leaderboard.TS until I can figure out how to 
interface Score {
    name: string,
    score: number,
    wpm: number,
    accuracy: number,
    combo: number
}

const LeaderboardBar = () => {
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
            //fetch('@/pages/api/leaderboard')
            
            // Hard coded for now
            fetch('/test.json')
                .then((res) => res.json())
                .then((data) => {
                    // Sorts By Scores Descending
                    let formattedData = data.sort((a: Score, b: Score) => b.score - a.score);
                    setScores(formattedData);
                })
                .catch(console.error)
        }, [setScores]); 

    // .map() loops through the array for each person's score. Index + 1 is used for the rank number.
    return (
        <div className="h-20 flex items-center">
             <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Max Combo</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.name}</td>
                            <td>{score.score}</td>
                            <td>{score.wpm}</td>
                            <td>{score.accuracy}</td>
                            <td>{score.combo}</td>
                        </tr>
                    ))
                    
                    }
                </tbody>
             </table>
        </div>
    )
}

export default LeaderboardBar;