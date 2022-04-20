import React from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import FilterBar from './components/FilterBar';
import Edit from './components/Edit';

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
         'is-editing': false,
         'editor-content': '',
      };

      this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
      this.handleFilterChange = this.handleFilterChange.bind(this);
      this.changeNoteContent = this.changeNoteContent.bind(this);
      this.removeNote = this.removeNote.bind(this);
      this.saveLocal = this.saveLocal.bind(this);
      this.addNote = this.addNote.bind(this);
      this.openEditMode = this.openEditMode.bind(this);
      this.closeNote = this.closeNote.bind(this);
   }

   handleFilterChange(event) {
      this.setState({ 'filter-value': event.target.value });
   }

   closeNote() {
      this.setState({
         'is-editing': false,
      });
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
   }

   addNote(obj) {
      this.state.notes.push(obj);
      this.setState({ notes: this.state.notes });
   }

   handleDarkModeClick() {
      this.setState(function (prevState) {
         return { 'dark-mode': !prevState['dark-mode'] };
      });
   }

   openEditMode(event) {
      console.log(event.currentTarget);
      const key = event.currentTarget.dataset.key;
      let content;
      this.state.notes.forEach(note => {
         if (note.id == key) {
            content = note.content;
         }
      });

      this.setState({
         'is-editing': true,
         'editor-content': [key, content],
      });
   }

   changeNoteContent() {
      let newState = this.state.notes.map(note => {
         if (note.id == this.state['editor-content'][0]) {
            note.content = this.state['editor-content'][1];
         }
         return note;
      });

      this.setState({ notes: newState });
   }

   saveLocal() {
      localStorage.setItem('react-notes', JSON.stringify(this.state.notes));
      localStorage.setItem(
         'filter-value',
         JSON.stringify(this.state['filter-value'])
      );
      localStorage.setItem(
         'dark-mode',
         JSON.stringify(this.state['dark-mode'])
      );
   }

   componentDidMount() {
      window.addEventListener('beforeunload', this.saveLocal);
   }

   componentWillUnmount() {
      window.removeEventListener('beforeunload', this.saveLocal);
   }

   render() {
      return (
         <main className={this.state['dark-mode'] ? 'dark-mode' : null}>
            {this.state['is-editing'] ? (
               <Edit
                  closeEdit={this.closeNote}
                  val={this.state['editor-content'][1]}
                  onChangeFunc={event => (
                     this.setState(function (state) {
                        return {
                           'editor-content': [
                              state['editor-content'][0],
                              event.target.value,
                           ],
                        };
                     }),
                     setTimeout(() => this.changeNoteContent(), 10)
                  )}
               />
            ) : null}
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
                     openEditMode={this.openEditMode}
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
