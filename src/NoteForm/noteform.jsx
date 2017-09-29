import React, {Component} from 'react';
import './noteform.css';

class NoteForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            newNoteContent:'',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
        
    }

    //When the user input changes, set the newNoteContent
    //to the value of what's in the inputbox
    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value, // the value of the text input
        })
    }

    writeNote(){
        //cal a method that sets the noteContent for a note to
        //the value of the Input
        this.props.addNote(this.state.newNoteContent);
        //Set newNote Content back to an empty string
        this.setState({
            newNoteContent:'',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="noteInput"
                placeholder="Write a new note..."
                value={this.state.newNoteContent}
                onChange={this.handleUserInput}/>
                <button className="noteButton"
                onClick={this.writeNote}>Add Note</button>
            </div>

        )
    }
}

export default NoteForm;