import {Header} from "./components/header"
import {useGameLogic} from "./hooks/useGameLogic"
import {Card} from "./components/card"
import {WinMessage} from "./components/winMessage"

const cardValues = [
  "❤️",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "🤍",
  "❤️",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "🤍",
];

const App = () => {
  const {cards, handleClick, score, moves, isGameComplete, initializeGame } = useGameLogic( cardValues )

  return (
    <>
      <Header score={score} moves={moves} clicked={initializeGame}/>
      
      {isGameComplete && <WinMessage moves={moves}/>}

      <div className="card-grid">
        {cards.map((i) => (
          <Card key={i.id} card={i} clicked={handleClick}/>
        ))}
      </div>
    </>
  )
}

export default App