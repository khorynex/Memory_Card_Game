import { useState, useEffect } from "react"

export const useGameLogic = ( cardValues ) => {
    const [cards, setCards] = useState( [] );
    const [flippedCards, setFlippedCards] = useState( [] );
    const [score, setScore] = useState( 0 );
    const [moves, setMoves] = useState( 0 );
    const [block, setBlock] = useState( false );

    useEffect( () => {
        initializeGame();
    }, [] )

    function shuffle( array ) {
        const arr = [...array];
        for( let i=arr.length-1; i>0; i-- ){
            const j = Math.floor( Math.random() * ( i + 1 ) );
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const initializeGame = () => {
        const shuffled = shuffle( cardValues );
        const finalCards = shuffled.map( (x,i) => ({
            id: i,
            value: x,
            isFlipped: false,
            isMatched: false,
            isRed: false
        }));

        setCards( finalCards );
        setFlippedCards( [] )
        setScore( 0 )
        setMoves( 0 )
    }

    const handleClick = ( card ) => {
        if( card.isFlipped || flippedCards.length === 2 || block )
            return;

        const newCards = cards.map( (c) => {
            if( c.id === card.id )
                return { ...c, isFlipped: true };
            else
                return c;
        });
        
        setCards( newCards );
        
        const newFlippedCards = [...flippedCards, card.id ];
        setFlippedCards( newFlippedCards );
        
        if( flippedCards.length === 1 ) {
            setBlock( true );
            setMoves( prev => prev + 1 );
            const firstCard = cards[flippedCards[0]]
            if( firstCard.value === card.value ){
                setScore( (i) => i + 1 );
                // setTimeout( () => {
                setCards( (prev) => prev.map( (c) => {
                    if( c.id === firstCard.id || c.id === card.id )
                        return { ...c, isMatched: true };
                    else
                        return c;
                }));
                setBlock( false );
                // }, 500);
            } else {
                setCards( (prev) => prev.map ( c => {
                    if( c.id === firstCard.id || c.id === card.id )
                        return { ...c, isRed: true };
                    else
                        return c;
                }));
                setTimeout( () => {
                    setCards( (prev) => prev.map( c => {
                        if( c.id === firstCard.id || c.id === card.id )
                            return { ...c, isFlipped: false, isRed: false };
                        else
                            return c;
                    }));
                    setBlock( false );
                }, 500);
            }
            
            setFlippedCards( [] );
        }
    };

    const isGameComplete = score === cardValues.length/2

    return {cards, initializeGame, handleClick, score, moves, isGameComplete};
}