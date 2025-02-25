"use client"

import {useState} from 'react';

function ResultsPopup({wpm, accuracy, combo, score}: {wpm: string, accuracy: number, combo: string, score: string}) {
    return (
        <>
            <h1 className="text-5xl">Results</h1>
            <table className="text-3xl">
                <thead>
                    <tr>
                        <th>wpm</th>
                        <th>accuracy</th>
                        <th>combo</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{wpm}</td>
                        <td>{`${accuracy.toFixed(2)}%`}</td>
                        <td>{combo}</td>
                        <td>{score}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ResultsPopup