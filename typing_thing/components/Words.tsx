"use client"

function Letter({letters}: {letters: string}){
    return(
        <div className="flex p-3">
            {
                letters.split("").map((char, index) =>(
                    <div key={index} className="px-0.5 text-4xl">
                        {char}
                    </div>
                ))
            }
        </div>
    )
}

export default function Words({words}: {words: string[]}){
    return(
        <div style={{height: 200}} className="flex flex-wrap items-center justify-center overflow-clip">
            {
                words.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex">
                        <Letter letters={word}/>
                    </div>
                ))
            }
        </div>
    )
}
