"use client";

export default function LeaderboardButton() {
    const showAlert = () => {
        alert("Placeholder")
    }

    return (
        <div>
            <button onClick={showAlert} className="border-2 border-white" style={{padding: '5px'}}>Leaderboard</button>
        </div>
    );
}
