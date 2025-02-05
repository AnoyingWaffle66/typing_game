"use client"

function Letter({letters}: {letters: string}){
    return(
        <div className="flex">
            {
                letters.split("").map((char, index) =>(
                    <span key={index} className="px-0.5">
                        {char}
                    </span>
                ))
            }
        </div>
    )
}

export default function Words({words}: {words: string[]}){
    return(
        <div className="flex flex-wrap">
            {
                words.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex">
                        <Letter letters={word}/>
                        {
                            wordIndex < words.length - 1 && (
                                <span className="px-0.5 whitespace-pre"> </span>
                            )
                        }
                    </div>
                ))
                
            }
        </div>
    )
}
