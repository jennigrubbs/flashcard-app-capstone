import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readCard, readDeck, updateCard } from "../utils/api/index"
import FormForCard from "./FormForCard"

function EditCard() {
    const history = useHistory()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
    const {deckId, cardId} = useParams()

// use readDeck() to load the deck with the card being changed
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            // console.log(response)
        }
        loadDeck()
    }, [deckId])

// need to load the card and read the card being changed
    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId)
            setCard(response)
            // console.log('set card', response)
        }
        loadCard()
    }, [cardId, setCard])

// need to set up cancel button
// make sure to stop default activity
// send user back to deck screen on click
    const cancelButtonHandler = () => {
        history.push(`/decks/${deckId}`)
    }

// set up submit button handler
// use updateCard() from utils>api>index.js
    const submitButtonHandler = async (event) => {
        event.preventDefault()
        await updateCard({...card})
        history.push(`/decks/${deckId}`)
    }

    const inputChangeHandler = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value
        })
    } 

// set up breadcrumb nav, display form prefilled with data that can be edited and updated
    return (
        <div>
            <nav className="aria-lable breadcrumb">
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
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <FormForCard
                inputChangeHandler={inputChangeHandler}
                submitFormHandler={submitButtonHandler}
                cancelButtonHandler={cancelButtonHandler}
                card={card}
            />
        </div>
    )
}

export default EditCard

/* Edit Card - path:	/decks/:deckId/cards/:cardId/edit	
Allows the user to modify information on an existing card
*/
/*
The Edit Card screen has the following features:
x	The path to this screen should include the deckId and the cardId 
(i.e., /decks/:deckId/cards/:cardId/edit). -- set this as exact path
x	You must use the readDeck() function from src/utils/api/index.js 
to load the deck that contains the card to be edited. Additionally, 
you must use the readCard() function from src/utils/api/index.js 
to load the card that you want to edit.
x	There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
x	It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.
x	If the user clicks on either Save or Cancel, the user is taken to the Deck screen.
*/