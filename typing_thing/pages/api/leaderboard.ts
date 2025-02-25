import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import * as path from 'path'

const STORAGE_DIRECTORY = 'storage/'
const LEADERBOARD_FILE = 'leaderboard.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    var scores: Score[] = readScores();

    if (req.method == 'POST') {
        var score: Score = JSON.parse(req.body);

        if (!scores.includes(score)) {
            for (let i = 0; i < scores.length; i++) {
                if (scores[i].name === score.name &&
                    scores[i].score === score.score &&
                    scores[i].wpm === score.wpm &&
                    scores[i].accuracy === score.accuracy &&
                    scores[i].combo == score.combo) {
                        res.status(200).json({status:"ok"})
                        return;
                    }
            }

            scores.push(score)
            writeScores(scores)
        }

        res.status(200).json({status:"ok"})
        return
    }

    res.status(200).json(readScores());
}

interface Score {
    name: string,
    score: number,
    wpm: number,
    accuracy: number,
    combo: number
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