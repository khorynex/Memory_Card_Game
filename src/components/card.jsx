export const Card = ({card, clicked}) => {
    return (
        <div className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""} ${card.isRed ? "isred" : ""}`}
        onClick={() => clicked(card)}>
            <p className="frontside">?</p>
            <p className="backside">{card.value}</p>
        </div>
    )
}