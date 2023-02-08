import React, { useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

// need lots of constants declared
function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const history = useHistory();
    const {deckId} = useParams();
    const [cardIndexNumber, setCardIndexNumber] = useState(0);
    const [cardFrontSide, setCardFrontSide] = useState(true);
    const [cardsLength, setCardsLength] = useState(0);

// use readDeck() function to load deck being studied
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
             setDeck(response)
             setCards(response.cards)
             setCardsLength(response.cards.length)
        }
        loadDeck();
    }, [deckId])

// need to create a flip button handler for flipping the card being studied
    const flipButtonHandler = (event) => {
        if (cardFrontSide === true) {
            setCardFrontSide(false)
        } else {
            setCardFrontSide(true)
        }
    }
      
// deal with Next button
    const nextButtonHandler = (event) => {
        setCardIndexNumber(cardIndexNumber + 1)
        console.log(cardsLength, cardIndexNumber)

      // set it for restarting the deck on clicking OK or returning to the home page on clicking Cancel
        if (cardIndexNumber === cardsLength - 1) {
            if (
                window.confirm("Restart cards? Click 'cancel' to return to the home page.")
            ) {
                setCardIndexNumber(0)
                setCardFrontSide(true)    
            } else {
                history.push("/")
            }
        }
        else {
        setCardIndexNumber(cardIndexNumber + 1);
        setCardFrontSide(true)
    }
}

// get the breadcrumbs navigation set for not enough cards in deck and Add Card button
    if (cardsLength <= 2) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>    
                </nav>
                <h1>Study: {deck.name}</h1>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cardsLength} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
                    {" "}Add Cards
                </Link>
            </div>
        )
    }

// get the breadcrumbs navigation set for flipping through cards
    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">  
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>    
                </nav>
            </div>
            <div>
                <h1>Study: {deck.name}</h1>
            </div>
            <div className="card float-center d-grid gap-2 d-md-block mt-2 mb-4" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h2>Card {cardIndexNumber+1} of {cardsLength}</h2>
                    <div>
                        {cardFrontSide ? <p>{cards[cardIndexNumber]?.front}</p> : <p>{cards[cardIndexNumber]?.back}</p>}
                    </div>
                    <button className="btn btn-secondary" type="button" onClick={flipButtonHandler}>Flip</button>
                    {cardFrontSide ? <p></p> : <button className="btn btn-primary" type="button" onClick={nextButtonHandler}>Next</button>}
                </div>
            </div>
        </div>
    )
}
export default Study

/* Study - path: /decks/:deckId/study	
Allows the user to study the cards from a specified deck
*/
/* Clicking the Study button on the home page brings the user to the Study screen. */
/* 
The Study screen has the following features:
x x	The path to this screen should include the deckId (i.e., /decks/:deckId/study).
x	You must use the readDeck() function from src/utils/api/index.js to load the deck 
that is being studied.
x	There is a breadcrumb navigation bar with links to home /, 
followed by the name of the deck being studied, and finally the text Study 
(e.g., Home/Rendering In React/Study).
x	The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
x	Cards are shown one at a time, front-side first.
x	A button at the bottom of each card "flips" it to the other side.
x	After flipping the card, the screen shows a Next button 
(see the Next button section below) to continue to the next card.
x	After the final card in the deck has been shown, a message 
(see the Restart prompt section below) is shown offering the user 
the opportunity to restart the deck.
x	If the user does not restart the deck, they should return to the home screen.
x	Studying a deck with two or fewer cards should display a 
"Not enough cards" message (see the "Not enough cards" section below) 
and a button to add cards to the deck.
Next button
x The Next button appears after the card is flipped.
*/