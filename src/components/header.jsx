export const Header = ({score, moves, clicked}) => {
    return (
        <div className="header">
            <h1>🎮 Memory Card Game</h1>
            <p>Score: {score}</p>
            <p>Moves: {moves}</p>
            <button className="reset-btn" onClick={clicked}>New Game</button>
        </div>
    )
}