import { useContext,useEffect } from "react";
import React from "react";
import Notes from "./Notes";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
function Home({showAlert}) {
  const navigate=useNavigate()
  const {getNotes} = useContext(NotesContext);
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      
      
      <Notes showAlert={showAlert}/>
        
    </div>
  );
}

export default Home;
