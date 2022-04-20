import React from 'react';

export default class Edit extends React.Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      document.onclick = event => {
         if (/note__card__editor/gi.test(event.target.className)) {
            this.props.closeEdit();
         }
      };
   }

   componentWillUnmount() {
      document.onclick = () => {};
   }

   render() {
      return (
         <div className="note__card__editor">
            <div className="note__card note__card__editor__mode">
               <textarea
                  className="note__card__textarea note__card__textarea__editor__mode note__card__scroll"
                  value={this.props.val}
                  onChange={this.props.onChangeFunc}
               ></textarea>
               <footer className="note__card__footer">
                  <p>Edit you text above</p>
               </footer>
            </div>
         </div>
      );
   }
}
