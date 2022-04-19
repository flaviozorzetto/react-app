import React from 'react';

export default class AddNote extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         value: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.addNote = this.addNote.bind(this);
   }

   handleChange(event) {
      this.setState({ value: event.target.value });
   }

   generateRandomKey(l) {
      let result = '';
      let characters =
         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < l; i++) {
         let randomCharNum = Math.floor(Math.random() * characters.length);
         result += characters.charAt(randomCharNum);
      }
      return result;
   }

   addNote() {
      if (!this.state.value == '') {
         const key = this.generateRandomKey(40);
         const date = new Date().toLocaleDateString();
         const obj = { id: key, content: this.state.value, date: date };
         this.setState({ value: '' });
         this.props.addNoteFunc(obj);
      }
   }

   render() {
      return (
         <div className="note__card">
            <textarea
               className="note__card__textarea note__card__scroll"
               placeholder="Add text here"
               value={this.state.value}
               onChange={this.handleChange}
            ></textarea>
            <footer className="note__card__footer">
               <p>Escreva acima</p>
               <button className="save__button" onClick={this.addNote}>
                  Save
               </button>
            </footer>
         </div>
      );
   }
}
