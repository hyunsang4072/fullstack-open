const Note = ({ note, handleDelete }) => {
    return (
        <li>
            {note.name} {note.number}
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default Note;

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const Note = ({ note, toggleImportance }) => {
//     const label = note.important ? "make not important" : "make important";

//     return (
//         <li>
//             {note.content}
//             <button onClick={toggleImportance}>{label}</button>
//         </li>
//     );
// };

// export default Note;
