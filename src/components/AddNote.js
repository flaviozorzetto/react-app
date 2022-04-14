import React from "react";

export default class AddNote extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="note__card">
                <textarea className="note__card__textarea note__card__scroll" placeholder="Add text here">
                </textarea>
                <footer className="note__card__footer">
                    <p>Escreva acima</p>
                    <button className="save__button">Save</button>
                </footer>
            </div>
        )
    }

}