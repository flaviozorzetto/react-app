import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='header__wrapper'>
                <h1 className='header__text'><span className='header__text__green'>React</span> Notes</h1>
                <button
                    className='header__button__dark__mode'
                    onClick={this.props.onDarkModeChange}>
                    Dark Mode Toggle: {this.props.darkModeState ? "On" : "Off"}
                </button>
            </div>
        )
    }
}   