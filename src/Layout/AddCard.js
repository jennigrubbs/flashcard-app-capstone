/* Add Card - path:	/decks/:deckId/cards/new	
Allows the user to add a new card to an existing deck
*/
/*
The Add Card screen has the following features:
x	The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
x	You must use the readDeck() function from src/utils/api/index.js to load 
the deck that you're adding the card to.
x	There is a breadcrumb navigation bar with a link to home /, 
followed by the name of the deck to which the cards are being added, 
and finally the text Add Card (e.g., Home/React Router/Add Card).
•	The screen displays the React Router: Add Card deck title.
•	A form is shown with the "front" and "back" fields for a new card. 
Both fields use a <textarea> tag that can accommodate multiple lines of text.
•	If the user clicks Save, a new card is created and associated 
with the relevant deck. Then the form is cleared and the process 
for adding a card is restarted.
•	If the user clicks Done, the user is taken to the Deck screen.
*/

import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, createCard } from "../utils/api"
import FormForCard from "./FormForCard"

function AddCard() {
    const [deck, setDeck] = useState({})
    const history = useHistory()
    const {deckId} = useParams()

    const cancelButtonHandler = () => {
        history.push(`/decks/${deck.id}`)
    }

// use readDeck() to load the deck being added to
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            // console.log(response)
        }
        loadDeck()
    }, [deckId])

// set the submit handler
// make sure to stop the default activity
// use the createCard() helper function from utils>api>index.js
// use the readDeck() helper function from utils>api>index.js
    const submitFormHandler = async ({front, back}) => {
        const response = await createCard(deckId, {front, back})
        // console.log(response)
        await readDeck(response.deckId)
        history.go(0)
    }

// add breadcrumbs nav, formForCard component
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
                    <li className="breadcrumb-item active" area-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <FormForCard
                submitFormHandler={submitFormHandler}
                cancelButtonHandler={cancelButtonHandler}
            />
        </div>
    )

}

export default AddCard