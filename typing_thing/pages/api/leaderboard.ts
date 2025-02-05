import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import * as path from 'path'

const STORAGE_DIRECTORY = 'storage/'
const LEADERBOARD_FILE = 'leaderboard.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    var scores: Score[] = []

    scores.push({
        name: "Test1",
        score: 1
    })

    scores.push({
        name: "Test2",
        score: 4
    })

    writeScores(scores)

    res.status(200).json(
        {test: readScores()[0]}
    )
}

interface Score {
    name: string,
    score: number
}

function readScores(): Score[] {
    const relative = path.join(STORAGE_DIRECTORY, LEADERBOARD_FILE)
    const json = fs.readFileSync(relative, 'utf-8')

    return JSON.parse(json)
}

function writeScores(scores: Score[]) {
    if (!fs.existsSync(STORAGE_DIRECTORY))
        fs.mkdirSync(STORAGE_DIRECTORY, { recursive: true })

    const relative = path.join(STORAGE_DIRECTORY, LEADERBOARD_FILE)
    const json = JSON.stringify(scores, null, 2)

    fs.writeFileSync(relative, json, 'utf-8')
}