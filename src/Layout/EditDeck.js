/* Edit Deck - path:	/decks/:deckId/edit	
Allows the user to modify information on an existing deck
*/
/*
The Edit Deck screen has the following features:
x	The path to this screen should include the deckId (i.e., /decks/:deckId/edit).
x	You must use the readDeck() function from src/utils/api/index.js to load 
the existing deck.
x	There is a breadcrumb navigation bar with a link to home /, followed by 
the name of the deck being edited, and finally the text Edit Deck 
(e.g., Home/Rendering in React/Edit Deck).
x	It displays the same form as the Create Deck screen, except it is 
prefilled with information for the existing deck.
x	The user can edit and update the form.
x	If the user clicks Cancel, the user is taken to the Deck screen.
*/

import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { updateDeck, readDeck } from "../utils/api"

function EditDeck() {
    const history = useHistory()
    const [deck, setDeck] = useState({id:"", name:"", description:"", cards:""})
    const {deckId} = useParams()

// use readDeck() to load current deck
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            console.log(response) 
        }
            loadDeck()   
    }, [deckId])

// add event handler for submitting the form
// deal with stopping default behavior
const submitHandler = async (event) =>{ 
    event.preventDefault()
    await updateDeck(deck)
    history.go(`/decks/${deck.id}`)
};

// set up the cancel button handler
// deal with stopping default behavior

const cancelButtonHandler = (event) => {
    event.preventDefault()
    history.push(`/decks/${deck.id}`);
}

// set the event handler for name change
const nameChangeHandler = (event) => {
    setDeck({...deck, name: event.target.value})
}

// set the event handler for description change
const descriptionChangeHandler = (event) => {
    setDeck({...deck, description: event.target.value})
}

// set the breadcrumb navigation, then set up the submit handler for the form 
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
                        Edit Decks
                    </li>
                </ol>
            </nav>
            <form onSubmit={submitHandler}>
                <div>
                    <h2>Edit Deck</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            value={deck.name}
                            onChange={nameChangeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea
                            className="form-control"
                            id="description"
                            type="text"
                            name="description"
                            value={deck.description}
                            onChange={descriptionChangeHandler}
                        />  
                    </div>
                </div>
                <div className="mt-2">
                    <button className="btn btn-secondary text-white" type="button" onClick={cancelButtonHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck