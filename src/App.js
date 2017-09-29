import React, { Component } from 'react';
import Note from './Note/note';
import NoteForm from './NoteForm/noteform';
import { DB_CONFIG } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    
    this.app = firebase.initializeApp(DB_CONFIG);
    
    //reference to Notes location for database storage
    this.database = this.app.database().ref().child('notes');

    //Each Component has a 'state'
    //we're going to setup the React state of our component
    this.state = {
      notes: [],
    }
  }

  componentWillMount() {
    const previousNotes = this.state.notes;

    //DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      //update the state of the componenet
      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      //listens for a removal and child.
      // Then loop through previous notes array,
      // once id = key returned in datasnapshot, then splice item from notes database array
      for (var i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      //update the state of the componenet
      this.setState({
        notes: previousNotes
      })

    })
  }

  addNote(note) {
    //push from inputbox to firebase
    this.database.push().set({ noteContent: note });
  }

  removeNote(noteId){
    this.database.child(noteId).remove();
  }


  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {
            //method used to map each note in the notes array into the note component.
            this.state.notes.map((note) => {
              //arrow function 
              return (
                <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote= {this.removeNote} />
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>

      </div>
    );
  }
}

export default App;
