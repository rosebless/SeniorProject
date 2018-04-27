import React from 'react';
import XLSX from 'xlsx';
import Files from 'react-files'  
import AppVarible from '../Model/AppVarible' 

const input = res => res;
const output = str => str;
const make_cols = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, (x,i) => XLSX.utils.encode_col(i));
const make_width = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, () => 60);

export default class ImportSubject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      temp: '',
      test: '',
      data: [[1,2,3],[4,5,6]],
			widthArr: [60, 60, 60],
			cols: make_cols("A1:C2")
    }
  }

  onFilesChange = (files) => {
    this.setState({
      files
    })
    // var files = e.target.files;
    var i, f;

    for (i = 0, f = files[i]; i != files.length; ++i) {
      var reader = new FileReader();
      var name = f.name;
      reader.onload = function (e) {
        var data = e.target.result;

        var workbook = XLSX.read(data, { type: 'binary' });

        // console.log(workbook)

        // console.log(workbook.Sheets)
        // console.log(workbook.SheetNames[0])
        // console.log(workbook.Sheets[workbook.SheetNames[1]])
        var s = [...workbook.Sheets]
        // console.log(s)
        // console.log(s[0])

        var first_worksheet = workbook.Sheets[workbook.SheetNames[1]];
        var data_json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
        console.log(data_json)

        var a = { b: 'c' }
        // console.log(a['b'])
      };
      reader.readAsBinaryString(f);
    }
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  filesRemoveOne = (fileToRemove) => {
    this.setState({
      files: this.state.files.filter(file => file.id !== fileToRemove.id)
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  filesRemoveAll = () => {
    this.setState({
      files: [] 
    })
  }

  filesUpload = () => {
    // const formData = new FormData()
    // Object.keys(this.state.files).forEach((key) => {
    //   const file = this.state.files[key]
    //   formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
      var message = 'This is my message.'
      this.props.db.storage().ref('images').child('filename').put(message).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
    // })


    // axios.post(`/files`, formData)
    // .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
    // .catch(err => window.alert('Error uploading files :(')) 
    // console.log(formData) 
    // console.log('///////////////////////////////////////') 
    // console.log(this.state.files) 

  }



  // filesUpload = () => {
  //   Object.keys(this.state.files).forEach((key) => {
  //     const file = this.state.files[key]
  //     this.setState({ test: 
  //       `file: ${typeof file} value: ${file} \n 
  //       name: ${file.name}  \n
  //       originalname: ${file.originalname}  \n
  //       type: ${file.type}  \n
  //       destination: ${file.destination}  \n
  //       filename: ${file.filename}  \n
  //       path: ${file.path}  \n
  //       size: ${file.size}  \n
  //       ` })
  //     console.log(`file: ${typeof file} value: ${file}`)
      
  //       /* parse file */
  //       const wb = XLSX.readFile(input(file), {type:'binary'});

  //       /* convert first worksheet to AOA */
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       const data = XLSX.utils.sheet_to_json(ws, {header:1});

  //       /* update state */
  //       this.setState({ data: data, cols: make_cols(ws['!ref']), widthArr: make_width(ws['!ref'])})
  //       console.log(data)


    // Object.keys(this.state.files).forEach((key) => {
    //   const e = this.state.files[key]
    //   var rABS = true
    //   //var files = e.target.files, f = files[0];
    //   var reader = new FileReader();
    //   reader.onload = this.onloadFunction(e)
    //   if (rABS) reader.readAsBinaryString(e); else reader.readAsArrayBuffer(e);
    // })
  //   })
  // }
  // onloadFunction = (e) => {
  //   var rABS = true
  //   var data = e.target.result;
  //       if (!rABS) data = new Uint8Array(data);
  //       var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
  //       var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //      var temp = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
  //       /* DO SOMETHING WITH workbook HERE */
  //       this.setState({temp})
  // }
  

      //const formData = new FormData()
    // Object.keys(this.state.files).forEach((key) => {
    //   const file = this.state.files[key] 
    //   if(typeof require !== 'undefined') XLSX = require('xlsx');
    //   const workbook = XLSX.readFile
    //   const first_worksheet = workbook.Sheets[workbook.SheetNames[1]];
    //   const data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
    //   console.log(data)
      //formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
    //})

    // axios.post(`/files`, formData)
    //   .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
    //   .catch(err => window.alert('Error uploading files :('))
  render() {
    return (
      <div>
        <h1>Example 1 - List</h1>
        <Files
          className='files-dropzone-list'
          style={{ height: '100px' }}
          onChange={this.onFilesChange}
          onError={this.onFilesError}
          //multiple
          maxFiles={10}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
        <button onClick={this.filesRemoveAll}>Remove All Files</button>
        <button onClick={this.filesUpload}>Upload</button>
        {
          this.state.files.length > 0
            ? <div className='files-list'>
              <ul>{this.state.files.map((file) =>
                <li className='files-list-item' key={file.id}>
                  <div className='files-list-item-preview'>
                    {file.preview.type === 'image'
                      ? <img className='files-list-item-preview-image' src={file.preview.url} />
                      : <div className='files-list-item-preview-extension'>{file.extension}</div>}
                  </div>
                  <div className='files-list-item-content'>
                    <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
                    <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
                  </div>
                  <div
                    id={file.id}
                    className='files-list-item-remove'
                    onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
                  />
                </li>
              )}</ul>
            </div>
            : null
        }
        {this.state.test}
        {this.state.data}
        
      </div>
    );
  }
}
