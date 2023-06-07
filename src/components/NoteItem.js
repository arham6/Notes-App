import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

function NoteItem(props) {
  const { note, updateNote} = props;
  const {deleteNote}=useContext(NotesContext)  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description} 
          </p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert('deleted successfully','success')}}></i>
          
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
