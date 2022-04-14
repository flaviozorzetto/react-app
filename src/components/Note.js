export default function Note (props) {
    return (
        <div className="note__card">
            <div className="note__card__content note__card__scroll">
                <p>{props.content}</p>
            </div>
            <footer className="note__card__footer">
                <div className="note__card__date">{props.date}</div>
                <div className="note__card__trash"></div>
            </footer>
        </div>
    )
}