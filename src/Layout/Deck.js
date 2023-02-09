import React, { useState, useEffect} from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteCard, deleteDeck, readDeck } from "../utils/api/index"

function Deck() {
    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    const history = useHistory()

// use the readDeck() function to load the current deck
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
        }
        loadDeck()
    }, [deckId])

// add deleteDeckHandler with window.confirm() dialog
    function deleteDeckHandler(deckId) {
        if (
          window.confirm(
            "Delete this deck? You will not be able to recover it."
          )
        ) {
          deleteDeck(deckId)
          .then(history.go(0));
        }
      }

// add deleteCardHandler with window.confirm() dialog
      function deleteCardHandler(cardId){
          if (
              window.confirm(
                  "Delete this card? You will not be able to recover it."
              )
          ) {
              deleteCard(cardId)
              .then(history.go(0))
          }
      }

// add breadcrumbs nav
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
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
        </div>

        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{deck.name}</h3>
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary ml-2 float-left">
                    {" "}Edit
                </Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-2 float-left">
                    {" "}Study
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
                    {" "}Add Cards
                </Link>
                <button className="btn btn-danger ml-2 float-right" type="button" onClick={() => deleteDeckHandler(deck.id)}>Delete</button> 
            </div>
        </div>
            <h2>Cards</h2>
            {deck.cards?.map((card) => (
                <div className="card float-center d-grid gap-2 d-md-block mt-2 mb-4" key={card.id}>
                    <div className="container">
                        <div className="row pb-2 pt-2">
                            <div className="col">
                                {card.front}
                            </div>
                            <div className="col">
                                {card.back}
                                <div className="d-grid gap-2 float-right">
                                    <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary text-white">
                                        {" "}Edit
                                    </Link>
                                    <button className="btn btn-danger ml-2" type="button" onClick={() => deleteCardHandler(card.id)}>Delete</button> 
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            )
            )
            }
        </div>
    )    
}

export default Deck

/* Deck - path:	/decks/:deckId	
Shows all of the information about a specified deck with options 
to edit or add cards to the deck, navigate to the study screen, 
or delete the deck
*/
/*	Clicking the View button on the home page brings the user to the Deck screen. */
/*
The Deck screen has the following features:
x	The path to this screen should include the deckId (i.e., /decks/:deckId).
x	You must use the readDeck() function from src/utils/api/index.js to load 
the existing deck.
x	There is a breadcrumb navigation bar with a link to home / followed by 
the name of the deck (e.g., Home/React Router).
x	The screen includes the deck name (e.g., "React Router") and deck description 
(e.g., "React Router is a collection of navigational components that compose 
declaratively in your application").
x	The screen includes Edit, Study, Add Cards, and Delete buttons. 
x Each button takes the user to a different destination
x	Each card in the deck:
x	Is listed on the page under the "Cards" heading.
x	Shows a question and the answer to the question.
x	Has an Edit button that takes the user to the Edit Card screen when clicked.
x	Has a Delete button that allows that card to be deleted.
x Delete Card Prompt
x When the user clicks the Delete button associated with a card, a warning message is shown and the user can click OK or Cancel. If the user clicks OK, the card is deleted.
x You can use window.confirm() to create the modal dialog 
*/