import React, {useEffect, useState} from "react"

function FormForCard({submitFormHandler, cancelButtonHandler, card}) {
    const [front, setFront] = useState('')
    const [back, setBack] = useState('')

    useEffect(() => {
        if (card) {
            setFront(card.front)
            setBack(card.back)
        }
    }, [card])

    const internalSubmit = event => {
        event.preventDefault()
        submitFormHandler({front, back})
    }

    return (
        <form onSubmit={internalSubmit}>
            <div>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                        <textarea
                            className="form-control"
                            id="front"
                            type="text"
                            name="front"
                            value={front}
                            onChange={(evt) => setFront(evt.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                        <textarea
                            className="form-control"
                            id="back"
                            type="text"
                            name="back"
                            value={back}
                            onChange={(evt) => setBack(evt.target.value)}
                        />
                </div>
            </div>
            <div className="mt-2">
                {!!card ? (
                    <>
                        <button className="btn btn-secondary text-white" type="button" onClick={cancelButtonHandler}>Cancel</button>
                        <button className="btn btn-primary ml-2 text-white" type="submit">Save</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-secondary text-white" type="button" onClick={cancelButtonHandler}>Done</button>
                        <button className="btn btn-primary ml-2 text-white" type="submit">Submit</button>
                    </>
                )}
            </div>
        </form>
    ) 
}
export default FormForCard

