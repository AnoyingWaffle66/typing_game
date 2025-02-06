"use client"
export default function Button(){
    function onClick(){
        console.log("This is to show functions being used in buttons")
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