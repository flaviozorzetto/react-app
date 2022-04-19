export default function Notes(props) {
   let notesDiv = [];
   console.log(props);
   props.notes.forEach(note => {
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
