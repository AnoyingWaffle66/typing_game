import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import * as path from 'path'

const WORDLIST_DIRECTORY = 'wordlist'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    var fileName: string = req.body

    if (fileName.length == 0)
        fileName = "english"

    fileName += ".json"

    const relative = path.join(WORDLIST_DIRECTORY, fileName)

    if (fs.existsSync(relative)) {
        res.status(200).json(JSON.parse(fs.readFileSync(relative, 'utf-8')))
        return
    }

    res.status(404).json({status: "file not found"})
}