import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card my-3" style={{ width: "15rem", height: "10rem" }}>
        <div className="card-body">
          {" "}
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash fa-flip mx-3"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i className="fa-solid fa-pen-to-square fa-beat mx-2" onClick={() => {updateNote(note) }}></i>
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Noteitem;
