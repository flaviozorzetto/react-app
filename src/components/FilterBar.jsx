export default function FilterBar(props) {
   return (
      <div className="note__filter__bar">
         <h1 className="note__filter__bar__title">Filtro de texto:</h1>
         <textarea
            className="note__filter__bar__textarea"
            value={props.value}
            onChange={props.onChangeFunc}
         ></textarea>
      </div>
   );
}
