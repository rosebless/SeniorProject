import React, { Component } from 'react';
import XLSX from 'xlsx' 
import File from 'react-files' 
import { GoogleLogin } from 'react-google-login'

export default class Test extends Component { 

    constructor(props){
        super(props) 

        this.state = {
            files: [],
            data_json: {}
        }
    }

    testTran = (e) => {
        var files = e.target.files;
        var i, f;

        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;

                var workbook = XLSX.read(data, { type: 'binary' });

                console.log(workbook)

                console.log(workbook.Sheets)
                console.log(workbook.SheetNames[0])
                console.log(workbook.Sheets[workbook.SheetNames[1]])
                var s = [...workbook.Sheets]
                console.log(s)
                console.log(s[0])

                var first_worksheet = workbook.Sheets[workbook.SheetNames[1]];
                var data_json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
                console.log(data_json)

                var a = { b:'c' }
                console.log(a['b'])
            };
            reader.readAsBinaryString(f);
        }
    }
    testTranFilesSW = (files) => {
        // console.log(files)

        files.forEach(file => {
            let reader = new FileReader();
            let name = file.name;
            reader.onload = (e) => {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var data_json_new = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
                // console.log(data_json_new)
                var data_json = this.state.data_json
                data_json[name] = data_json_new
                // data_json.push(data_json_new)
                this.setState({
                    data_json
                })
            }
            // console.log(file)
            // let name = file.name;
            // console.log(name)
            reader.readAsBinaryString(file);
        })
        console.log(this.state.data_json)
        this.convertToDatabase()
    } 

    convertToDatabase = () => {
        var data_json = this.state.data_json
        console.log(data_json)
        console.log(Object.entries(data_json))
        // const subjects = Object.entries(data_json).map( ([key,value]) => {
        //     console.log(key) 
        //     console.log(value) 
        // } )
        // console.log(subjects)

        console.log('//////////////////////////////////')

        var obj = { a:{ a1: 'a2', b1: 'b2' } , b:['a3','b3','c3'] , c:'c2' } 
        console.log(obj)
        var arr = Object.entries(obj).map(([o,b]) => {
            console.log(o)
            return b
        })
        console.log(Object.entries(obj))
        console.log(arr)
        console.log('abc')
    }

    responseGoogle = (response) => {
        console.log(response);
      }

    render() {
        
        return (
            <div className="App">
                <File 
                 onChange={this.testTranFilesSW}
                 >
                    Drop The file to here
                </File>
                <br />
                <button onClick={() => this.convertToDatabase()} >
                    Tran
            </button>
                <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={() => { this.responseGoogle() }}
                    onFailure={() => { this.responseGoogle() }}
                />,
            </div>
        );
    }
}
