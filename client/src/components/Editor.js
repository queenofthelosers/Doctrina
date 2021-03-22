import React from "react";
import "../stylesheets/Editor.css"
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
class Editor extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            xml : "",
            cursorPos : {
                row : "",
                column : ""
            }
        }
        
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
    }

    slideTag = () =>
    {
        let textToInsert = "<slide deck = \"\" no = \"\" "       
        this.refs.mainEditor.editor.session.insert(this.state.cursorPos, textToInsert);
    }

    render()
    {
        const editor = <AceEditor
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
        }}/>;

        return(
            <div className = "parentContainer">
             Editor
            <button onClick = {this.slideTag}>Slide</button>
            {editor}
            <button onClick = {this.getAceValue}> check log </button>
            </div>
        )
    }
}

export default Editor;