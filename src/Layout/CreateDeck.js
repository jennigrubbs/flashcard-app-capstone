import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck, readDeck } from "../utils/api/index";

function CreateDeck() {
    const history = useHistory()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

// add event handler for name change
    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }

// add event handler for description change
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value)
    }

// add event handler for submitting the form
// deal with stopping default behavior
// use createDeck and readDeck callback functions from API => index.js 
    const submitFormHandler = async (event) => {
        event.preventDefault()
        const response = await createDeck({name, description})
        await readDeck(response.id)
        history.go(`/decks/${response.id}`)
    }

// set up breadcrumbs nav, then set up the submit handler for the form
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
                        Create Deck
                    </li>
                </ol>
            </nav>
            <form onSubmit={submitFormHandler}>
                <div >
                    <h2>Create Deck</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name"
                        onChange={nameChangeHandler}
                        value={name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            className="form-control"
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Brief description of the deck"
                            onChange={descriptionChangeHandler}
                            value={description}
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <Link to="/" className="btn btn-secondary text-white">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary ml-2">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateDeck

/* Create Deck - path: /decks/new	Allows the user to create a new deck*/
/* Users come here after clicking Create Deck button on home screen. */
/*
The Create Deck screen has the following features:
x	The path to this screen should be /decks/new.
x	There is a breadcrumb navigation bar with a link to home / followed by 
the text Create Deck (i.e., Home/Create Deck).
x	A form is shown with the appropriate fields for creating a new deck.
x	The name field is an <input> field of type text.
x	The description field is a <textarea> field that can be multiple lines of text.
x	If the user clicks Submit, the user is taken to the Deck screen.
x	If the user clicks Cancel, the user is taken to the Home screen.
*/

