"use client"
export default function Button(){
    function onClick(){
        console.log("Josh is so super sexy and so freaking hot!!!!!!!!!!!!")
    }
    return(
        <>
            <button className= ""onClick={onClick}>
                I'm button
            </button>
        </>
    )
}

export function OtherButton(){
    return(
        <>
            <button>
                I'm other button
            </button>
        </>
    )
}