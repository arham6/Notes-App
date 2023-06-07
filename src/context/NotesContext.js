import { createContext, useState} from "react";

export const NotesContext=createContext();

const NotesState=({children})=>{
    const host='http://localhost:5000'
    const initialNotes=[]
    const [notes,setNotes]=useState(initialNotes);

    //Get notes
    const getNotes=async()=>{
        //API CALL
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        })
        const json=await response.json()
        console.log(json)
        setNotes(json)
    }

    //Add a note
    const addNote=async(title,description,tag)=>{
        //TODO:API CALL
        const response=await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })
        console.log("adding a new note")
        const note=await response.json()
        setNotes(notes.concat(note)) //concat returns an array whereas push updates an array
    }

    //Delete a note
    const deleteNote=async(id)=>{

        //API CALL
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        })
        const json=await response.json()
        console.log(json)

        console.log("deleting the note with id"+id)
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }

    //Edit a note
    const editNote=async(id,title,description,tag)=>{
        //API CALL
        
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })
        const json=await response.json()
        console.log(json)

        let newNotes=JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for(let index=0;index<newNotes.length;index++){
            const element=newNotes[index]
            if(element._id===id){
                newNotes[index].title=title
                newNotes[index].description=description
                newNotes[index].tag=tag
                break
            }
        }
        setNotes(newNotes)
    }

    return(
        <NotesContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesState;