import React from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import AddNote from "./components/AddNote";

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {"dark-mode": false}
        this.handleDarkModeClick = this.handleDarkModeClick.bind(this); 
    }

    handleDarkModeClick() {
        this.setState(function (prevState) {
            return { "dark-mode" : !prevState["dark-mode"]}
        })
    }

    render() {
        return (
            <main className={this.state["dark-mode"] ? "dark-mode" : null}>
                <div className="container">
                    <Header darkModeState={this.state["dark-mode"]} onDarkModeChange={this.handleDarkModeClick}/>
                    <div className="note__list">
                        <Note content={"teste"} date={"14/04/2022"}/>
                        <Note/>
                        <Note/>
                        <AddNote/>
                    </div>
                </div>
            </main>
        )
    }
}