import React from "react";
import InstructorNavbar from "./InstructorNavbar"
import "../stylesheets/Editor.css"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import bits from "../images/bits-logo.png"
import FileUploadComponent from "../components/FileUploadComponent"
import PDFPreviewer from "./PDFPreviewer"
import axios from "axios";

class Editor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            xml : "",
            cursorPos : {
                row : 0,
                column : 0
            },
            files:[]
        }
        
    }
    updateFileState = (f) =>{
        this.setState({ files: [ ...f] }, () => {console.log("\nUpdateFileState:\n",f,"\n",this.state.files)});
    }

    
    onChange = (newValue) =>
    {
        console.log("change", newValue);    
        this.setState({
            xml:newValue,
        })
    }

    storeCursorVal = (selection) =>
    {
        const cursorPosition = selection.getCursor();
        console.log(cursorPosition);
        const cursorState = {
            row : cursorPosition.row,
            column : cursorPosition.column
        }
        this.setState({cursorPos:cursorState});
    }
    
    getAceValue = () =>
    {
        console.log(this.state.xml)
        console.log("The state is :", this.state.cursorPos);
        axios.post("http://127.0.0.1:8080/api/send_xml",this.state.xml,{headers: {
            'Content-Type': 'text/html;charset=UTF-8'
        }}).then((res)=>{
              console.log("Successfully Written File")
          }).catch((err)=>{
              console.log(err)
          })
        let file_array=[]
        for(let i=0;i<this.state.files.length;i++){
            file_array.push(this.state.files[i].name)
        }

        let file_json = {'file_array': file_array}
        axios.post("http://127.0.0.1:8080/api/render",JSON.stringify(file_json),{headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }}).then((res)=>{
              console.log("Successfully Called Render API")
          }).catch((err)=>{
              console.log(err)
          })

    }

    addXML = (event) =>
    {
        let src = event.target.name;
        if(src == "slide")
        {
            let textToInsert = "<slide page = \"\"/>"       
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
        }
        else if(src == "video")
        {
            let textToInsert = "<video src = \"\"/>"
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
        }
        else if(src == "img")
        {
            let textToInsert = "<image src = \"\"\>"
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
        }
        else if(src == "doc")
        {
            let textToInsert = "<doc src = \"\"\>"
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
        }
        else if(src == "pause")
        {
            let textToInsert = "<break time = \"\"/>" 
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert); 
        }
        else if(src == "emphasis")
        {
            let textToInsert = "<emphasis"
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert); 

        }
        else if(src == "say-as")
        {
            let textToInsert = "<say-as interpret-as = \"\"" 
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
        }
        else if(src == "highlight")
        {
            let textToInsert = "<highlight points = \"\"/>"
            this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
        }
    }

    render()
    {
        return(
            <div>
            <InstructorNavbar signedInUser={window.localStorage.getItem("instructor")}></InstructorNavbar>
            <div className = "parentContainer">
            
            
             <div className = "editorContainer">
                <h1> Editor</h1>
                <div>
                <div className = "controlButtons">
                    <button onClick = {this.addXML} name = "slide" className = "btn btn-secondary btn-sm">Slide</button>
                    <button onClick = {this.addXML} name = "video" className = "btn btn-secondary btn-sm">Video</button>
                    <button onClick = {this.addXML} name = "img" className = "btn btn-secondary btn-sm">Image</button>
                    <button onClick = {this.addXML} name = "doc" className = "btn btn-secondary btn-sm">Document</button>
                    <button onClick = {this.addXML} name = "pause" className = "btn btn-secondary btn-sm">Pause</button>
                    <button onClick = {this.addXML} name = "emphasis" className = "btn btn-secondary btn-sm">Emphasis</button>
                    <button onClick = {this.addXML} name = "say-as" className = "btn btn-secondary btn-sm">Say-As</button>
                    <button onClick = {this.addXML} name = "highlight" className = "btn btn-secondary btn-sm">Highlight</button>
                </div>

                <div>
                <AceEditor
                ref = "mainEditor"
                placeholder="Placeholder Text"
                mode="xml"
                theme="monokai"
                name="blah2"
                onChange={this.onChange}
                onCursorChange={this.storeCursorVal}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.xml}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}/>
                </div>
                <button onClick = {this.getAceValue} className = "btn btn-secondary btn-sm"> Save File and Render </button>
                </div>
                </div>
                <div className = "slideContainer">   
                <h1>
                    Slide Images
                </h1> 
                <div>
                    {/* <div> Slide 1</div>
                    <img src = {bits} className = "imgContainer"/>
                    <div>Slide 2</div>
                    <img src = {bits} className = "imgContainer"/>
                    <div>Slide 3</div>
                    <img src = {bits} className = "imgContainer"/> */}
                    <PDFPreviewer filePath={this.state.files[this.state.files.length-1]}></PDFPreviewer>
                </div>
                
                </div>
                <div className = "fileUploader">
                    <FileUploadComponent handleFileChange={this.updateFileState}></FileUploadComponent>
                </div>
            </div>
            </div>
        )
    }
}

export default Editor;