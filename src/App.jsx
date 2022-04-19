import React from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import FilterBar from './components/FilterBar';

export default class App extends React.Component {
   constructor(props) {
      super(props);
      if (!localStorage.getItem('dark-mode')) {
         localStorage.setItem('dark-mode', false);
      }
      if (!localStorage.getItem('react-notes')) {
         localStorage.setItem(
            'react-notes',
            JSON.stringify([{ id: 0, content: 'teste', date: '14/04/2022' }])
         );
      }

      const notes = JSON.parse(localStorage.getItem('react-notes'));

      this.state = {
         'dark-mode':
            localStorage.getItem('dark-mode') == 'true' ? true : false,
         notes: notes,
         'filter-value': '',
      };

      this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.removeNote = this.removeNote.bind(this);
      this.addNote = this.addNote.bind(this);
   }

   handleFilterChange(event) {
      this.setState({ 'filter-value': event.target.value });
   }

   removeNote(key) {
      this.state.notes.forEach((e, i) => {
         if (key == e.id) {
            this.state.notes.splice(i, 1);
         }
      });
      this.setState({
         notes: this.state.notes,
      });
      localStorage.setItem('react-notes', JSON.stringify(this.state.notes));
   }

   addNote(obj) {
      this.state.notes.push(obj);
      this.setState({ notes: this.state.notes });
      localStorage.setItem('react-notes', JSON.stringify(this.state.notes));
   }

   handleDarkModeClick() {
      this.setState(function (prevState) {
         localStorage.setItem('dark-mode', !prevState['dark-mode']);
         return { 'dark-mode': !prevState['dark-mode'] };
      });
   }

   render() {
      return (
         <main className={this.state['dark-mode'] ? 'dark-mode' : null}>
            <div className="container">
               <Header
                  darkModeState={this.state['dark-mode']}
                  onDarkModeChange={this.handleDarkModeClick}
               />
               <FilterBar
                  value={this.state['filter-value']}
                  onChangeFunc={this.handleFilterChange}
               />
               <div className="note__list">
                  <Notes
                     notes={this.state.notes}
                     removeNoteFunc={this.removeNote}
                     filter={this.state['filter-value']}
                  />
                  <AddNote addNoteFunc={this.addNote} />
               </div>
            </div>
         </main>
      );
   }
}
