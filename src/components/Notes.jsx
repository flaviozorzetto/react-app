export default function Notes(props) {
   let notesDiv = [];
   let regex = new RegExp(props.filter, 'gi');

   let filtered = props.notes.filter(note => {
      return regex.test(note.content);
   });

   filtered.forEach(note => {
      notesDiv.push(
         <div className="note__card" key={note.id}>
            <div className="note__card__content note__card__scroll">
               <p>{note.content}</p>
            </div>
            <footer className="note__card__footer">
               <div className="note__card__date">{note.date}</div>
               <div
                  className="note__card__trash"
                  onClick={() => {
                     props.removeNoteFunc(note.id);
                  }}
               ></div>
            </footer>
         </div>
      );
   });
   return notesDiv;
}
