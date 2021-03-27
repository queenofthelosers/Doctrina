import React from 'react'
import axios from 'axios';

class FileUploadComponent extends React.Component {

    UPLOAD_ENDPOINT = 'http://127.0.0.1:8080/api/upload';
    
    constructor(props) {
        super(props);
        this.state ={
          files:[]
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }
    async onSubmit(e){
        e.preventDefault() 
        let res = await this.uploadFile(this.state.files);
        console.log(res.data);
    }
    onChange(e) {
        this.setState({ files: [...this.state.files, ...e.target.files] })
    }
    async uploadFile(files){
        
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(`multiplefiles`, files[i])
        }
        JSON.stringify(formData);
        console.log(formData); 

        return  await axios.post(this.UPLOAD_ENDPOINT, formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
      }
    
      render() {
        return (
          <form onSubmit={ this.onSubmit }>
            <h1> Upload Files</h1>
            <input type="file" id="file-upload" onChange={ this.onChange } multiple />
            <div>Number of files chosen: {this.state.files.length} </div>
            <div>{this.state.files.map((file)=>(<p>{file.name}</p>))}</div>
            <button type="submit" >Upload File</button>
            
          </form>

       )
       
      }
        
}

export default FileUploadComponent;