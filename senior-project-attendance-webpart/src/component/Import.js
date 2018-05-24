
// import React from 'react'
// import { firebase } from './Menu'
// import SubjectList from './SubjectList'
// import File from 'react-files'
// import XLSX from 'xlsx'
// import '../css/Import.css'
// import Header from './Header'
// import { resolve } from 'url';


// export default class Import extends React.Component {

//     state = {
//         files: [],
//         subjects: [],
//         width: 0,
//         height: 0
//     }

//     componentDidMount = () => {
//         this.updateWindowDimensions();
//         window.addEventListener('resize', this.updateWindowDimensions);
//     }

//     componentWillUnmount = () => {
//         window.removeEventListener('resize', this.updateWindowDimensions);
//     }

//     updateWindowDimensions = () => {
//         this.setState({ width: window.innerWidth, height: window.innerHeight });
//     }

//     onInputChange = (files) => {
//         this.setState({
//             files
//         }, () => {
//             console.log(this.state.files)
//             this.getSubjectsFromFiles(files)
//         })
//     } 

//     // test = () => new Promise( (resolve,reject) => {
//     //     this.setState({
//     //         files
//     //     }, () => {
//     //         console.log(this.state.files)
//     //         this.getSubjectsFromFiles(files)
//     //     })
//     // }) 

//     getSubjectsFromFiles = files => {
//         // console.log(e)
//         // let fileList = e.target.files;
//         // let files = Array.from(fileList)
//         // console.log(files) 

//         let { subjects } = this.state

//         files.forEach(file => {
//             const reader = new FileReader();
//             const name = file.name;
//             const addedTime = this.getTime()
//             // subjects.push({ name, addedTime })
//             reader.onload = (e) => {
//                 var dataTemp = e.target.result;
//                 var workbook = XLSX.read(dataTemp, { type: 'binary' });
//                 var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
//                 subjects.push({ name, addedTime, data })
//                 // data_json.push(data_json_new)
//             }
//             // console.log(file)
//             // let name = file.name;
//             // console.log(name)
//             reader.readAsBinaryString(file);
//         })
//         this.setState({ subjects })
//         console.log(this.state.subjects)
//         // this.convertToDatabase()
//     }

//     // transferObjToArrSubject = (subjects) => (
//     //     Object.keys(subjects).map(key => ({
//     //         name: key,
//     //         addedTime: subjects[key]
//     //     })))

//     // transferObjToArrData = (data) => (
//     //     Object.keys(data).map(key => ({
//     //         // name: key,
//     //         ...data[key]
//     //     })))


//     cancelSelection = (name) => {
//         // let { subjects, data, files } = this.state
//         // console.log('files', files)
//         // // console.log(index, data)
//         // // subjects.splice(index, 1) 
//         // console.log(name, subjects)
//         // delete subjects[name]
//         // // subjects[index] = undefined 
//         // delete data[name]
//         // const filesNew = files.filter(file => file.name != name)
//         // this.setState({ subjects, data, files: filesNew })
//         const fileTarget = files.filter(file => file.name == name)
//         // console.log('files', files)
//         // console.log(fileTarget)
//         this.refs.fileComponent.removeFile(fileTarget)
//         // // console.log(index, data) 
//     }

//     // submit = () => {
//     //     const { data, subjects } = this.state
//     //     let result = {}
//     //     result.idForSubject = []
//     //     const dataArr = this.transferObjToArrData(data)
//     //     dataArr.map((subject, index) => {
//     //         const term = subject[2]['E'].split(' ')[1]
//     //         const year = subject[2]['E'].split(' ')[3]
//     //         const e3split = subject[3]['E'].split('  ')
//     //         const code = e3split[0]
//     //         const name = e3split[1]
//     //         const sec = e3split[2]
//     //         let count = ''
//     //         let major = ''
//     //         if (e3split.length == 4) {
//     //             count = e3split[3].split(' ')[1]
//     //         }
//     //         else {
//     //             major = e3split[3]
//     //             count = e3split[4].split(' ')[1]
//     //         }
//     //         let students = {}
//     //         let countToCheck = 0
//     //         subject.forEach((item, indexx) => {
//     //             if (5 < indexx % 41) {
//     //                 students[item['B']] = item['C']
//     //                 countToCheck++
//     //             }
//     //         })
//     //         let secForId = sec.split(' ')[1]
//     //         let id = ''
//     //         if (secForId === undefined) id = [year, term, code].join('-')
//     //         else id = [year, term, code, secForId].join('-')
//     //         result[id] = {
//     //             year,
//     //             term,
//     //             code,
//     //             name,
//     //             count,
//     //             students,
//     //             countToCheck
//     //         }
//     //         result.idForSubject.push(id)
//     //     })
//     //     // console.log(data)
//     //     // console.log(result)
//     //     this.upLoad(result)  
//     //     this.clearData() 
//     // }

//     // upLoad = async (perfectForUpload) => {
//     //     // console.log(perfectForUpload) 
//     //     // const dbCon = firebase.database().ref('/Subject')
//     //     const subjectsOld = await this.getOldSubject()
//     //     const preUpload = { ...subjectsOld, ...perfectForUpload }
//     //     firebase.database().ref('/Subject').set(preUpload)
//     //     // console.log(preUpload) 
//     //     // firebase.database().ref('/User').child(user)
//     // }

//     // getOldSubject = () => new Promise((resolve, reject) => {
//     //     firebase.database().ref('/Subject').on('value', snapshot => {
//     //         console.log(snapshot.val())
//     //         resolve(snapshot.val());
//     //     })
//     // })

//     // clearData = () => {
//     //     this.setState({
//     //         files: [],
//     //         subjects: [],
//     //         perfectForUpload: {}
//     //     })
//     // }

//     getTime = () => {
//         var dateAll, date, month, year, TimeType, hour, minutes, seconds, fullTime;
//         dateAll = new Date();
//         date = dateAll.getDate();
//         month = dateAll.getMonth();
//         year = dateAll.getFullYear();
//         hour = dateAll.getHours();
//         if (hour <= 11) {
//             TimeType = 'AM';
//         } else {
//             TimeType = 'PM';
//         }

//         if (hour > 12) {
//             hour = hour - 12;
//         }
//         if (hour == 0) {
//             hour = 12;
//         }

//         minutes = dateAll.getMinutes();
//         if (minutes < 10) {
//             minutes = '0' + minutes.toString();
//         }

//         seconds = dateAll.getSeconds();
//         if (seconds < 10) {
//             seconds = '0' + seconds.toString();
//         }

//         fullTime = date.toString() + '/' + month.toString() + '/' + year.toString()
//             + hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();

//         return fullTime
//     }

//     render() {
//         const { mode } = this.props.history.location.state
//         const { subjects, data } = this.state
//         // console.log(subjects, data)
//         // console.log('from render', subjects)
//         const height = this.state.height - 20
//         const width = this.state.width - 20
//         let heightAndWidth = 0
//         if (16.25 / 19 * height < 0.4 * width) {
//             heightAndWidth = 16 / 19 * 0.5 * height
//         } else {
//             heightAndWidth = 0.4 * 0.5 * width
//         }
//         // console.log(height, width)
//         return (
//             <div className='container' style={{
//                 height,
//                 width,
//                 backgroundSize: width
//             }} >
//                 <Header pageName={'เพิ่มรายวิชา'} height={height} width={width} />
//                 <div className='body' style={{ height: 16.25 / 19 * height, width }} >
//                     <div className='left' style={{ height: 16.25 / 19 * height, width: 0.4 * width }} >
//                         {/* <input type='file' onChange={this.addFiles} multiple hidden
//                             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                         /> */}
//                         <File
//                             className='fileInput' style={{ height: heightAndWidth, width: heightAndWidth }}
//                             onChange={this.onInputChange} ref='fileComponent'
//                         >
//                             <div
//                                 className='innerFileInput' style={{ height: 0.9 * heightAndWidth, width: 0.9 * heightAndWidth }}
//                                 ref={input => this.input = input} >
//                                 <img style={{ height: 0.2 * heightAndWidth, width: 0.2 * heightAndWidth }}
//                                     src={require('../photo/addButton.png')} />
//                             </div>
//                         </File>

//                         <button className='button' onClick={() => this.input.click()} style={{
//                             height: 0.1 * 16.25 / 19 * height, width: 0.5 * 0.4 * width,
//                             borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.02 * 16.25 / 19 * height,
//                             fontSize: 0.05 * 16.25 / 19 * height
//                         }} >
//                             เพิ่มรายวิชา
//                         </button>
//                         <button className='button' onClick={() => { /*this.submit()*/ this.refs.fileComponent.removeFiles() }} style={{
//                             height: 0.1 * 16.25 / 19 * height, width: 0.5 * 0.4 * width,
//                             borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.02 * 16.25 / 19 * height,
//                             fontSize: 0.05 * 16.25 / 19 * height
//                         }} >
//                             ยืนยัน
//                         </button>
//                     </div >
//                     <div className='right' style={{ height: 16.25 / 19 * height, width: 0.6 * width }} >
//                         <div className='borderList' style={{ height: 0.8 * 16.25 / 19 * height, width: 0.9 * 0.6 * width }} >
//                             {/* <SubjectList className='list' mode={mode} subjects={this.transferObjToArrSubject(subjects)} height={height} width={width}
//                                 cancelSelection={this.cancelSelection} /> */}
//                         </div >
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// // // import axios from 'axios'
// // // import Blob from 'blob'
// // import FormData from 'form-data'
// // import React from 'react'
// // import ReactDOM from 'react-dom'
// // import Files from 'react-files'
// // // import firebase from 'firebase'

// // export default class FilesDemo1 extends React.Component {
// //   constructor (props) {
// //     super(props)
// //     this.state = {
// //       files: []
// //     }
// // //     var config = {
// // //       apiKey: "AIzaSyBJsLV775ojfv25BvJ1pHgsCjhfx6f8Qbw",
// // //       authDomain: "seniorproject-7c5bd.firebaseapp.com",
// // //       databaseURL: "https://seniorproject-7c5bd.firebaseio.com",
// // //       projectId: "seniorproject-7c5bd",
// // //       storageBucket: "seniorproject-7c5bd.appspot.com",
// // //       messagingSenderId: "36169682779"
// // //     };
// // //   firebase.initializeApp(config);
// //   }

// //   onFilesChange = (files) => {
// //     this.setState({
// //       files
// //     }, () => {
// //       console.log(this.state.files)
// //     })
// //   }

// //   onFilesError = (error, file) => {
// //     console.log('error code ' + error.code + ': ' + error.message)
// //   }

// //   filesRemoveOne = (file) => {
// //     this.refs.files.removeFile(file)
// //   }

// //   filesRemoveAll = () => {
// //     this.refs.files.removeFiles()
// //   }

// // //   filesUpload = () => {
// // //     const formData = new FormData()
// // //     Object.keys(this.state.files).forEach((key) => {
// // //       const file = this.state.files[key]
// // //       formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')

// // //     })

// // //     axios.post(firebase.storage().ref().fullPath, formData)
// // //     //firebase.storage().ref().put(formData)
// // //     .then(response => window.alert(`${this.state.files.length} files uploaded succesfully!`))
// // //     .catch(err => window.alert('Error uploading files :('))
// // //   }

// //   render () {
// //     return (
// //       <div>
// //         <h1>Example 1 - List</h1>
// //         <Files
// //           ref='files'
// //           className='files-dropzone-list'
// //           style={{ height: '100px' }}
// //           onChange={this.onFilesChange}
// //           onError={this.onFilesError}
// //           multiple
// //           maxFiles={10}
// //           maxFileSize={10000000}
// //           minFileSize={0}
// //           clickable
// //         >
// //           Drop files here or click to upload
// //         </Files>
// //         <button onClick={this.filesRemoveAll}>Remove All Files</button>
// //         {/* <button onClick={this.filesUpload}>Upload</button> */}
// //         {
// //           this.state.files.length > 0
// //           ? <div className='files-list'>
// //             <ul>{this.state.files.map((file) =>
// //               <li className='files-list-item' key={file.id}>
// //                 <div className='files-list-item-preview'>
// //                   {file.preview.type === 'image'
// //                   ? <img className='files-list-item-preview-image' src={file.preview.url} />
// //                   : <div className='files-list-item-preview-extension'>{file.extension}</div>}
// //                 </div>
// //                 <div className='files-list-item-content'>
// //                   <div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
// //                   <div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
// //                 </div>
// //                 <div
// //                   id={file.id}
// //                   className='files-list-item-remove'
// //                   onClick={this.filesRemoveOne.bind(this, file)} // eslint-disable-line
// //                 />
// //               </li>
// //             )}</ul>
// //           </div>
// //           : null
// //         }
// //       </div>
// //     )
// //   }
// // }

// // class FilesDemo2 extends React.Component {
// //   constructor (props) {
// //     super(props)
// //     this.state = {
// //       files: []
// //     }
// //   }

// //   onFilesChange = (files) => {
// //     this.setState({
// //       files
// //     }, () => {
// //       console.log(this.state.files)
// //     })
// //   }

// //   onFilesError = (error, file) => {
// //     console.log('error code ' + error.code + ': ' + error.message)
// //   }

// //   filesRemoveAll = () => {
// //     this.refs.files.removeFiles()
// //   }

// //   render () {
// //     return (
// //       <div>
// //         <h1>Example 2 - Gallery</h1>
// //         <Files
// //           ref='files'
// //           className='files-dropzone-gallery'
// //           onChange={this.onFilesChange}
// //           onError={this.onFilesError}
// //           accepts={['image/*']}
// //           multiple
// //           clickable={false}
// //         >
// //           {
// //             this.state.files.length > 0
// //             ? <div className='files-gallery'>
// //               {this.state.files.map((file) =>
// //                 <img className='files-gallery-item' src={file.preview.url} key={file.id} />
// //               )}
// //             </div>
// //             : <div>Drop images here</div>
// //           }
// //         </Files>
// //         <button onClick={this.filesRemoveAll}>Remove All Files</button>
// //       </div>
// //     )
// //   }
// // }

// // // ReactDOM.render(<div><FilesDemo1 /><FilesDemo2 /></div>, document.getElementById('container'))

import React from 'react'
import SubjectList from './SubjectList'
import File from './FileInput'
import XLSX from 'xlsx'
// import '../css/Import.css'
import Header from './Header'
import firebase from '../config/firebase'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PopUpConfirm from './PopUpConfirm'

export default class Import extends React.Component {

    state = {
        files: [],
        subjects: {},
        openDialog: false,
        transaction: 'wait confirm',
        validation: true
    }

    handleOpen = () => {
        this.setState({
            transaction: 'wait confirm',
            openDialog: true
        });
    };

    handleClose = () => {
        this.setState({ validation: true, openDialog: false });
    };

    onClickConfirm = () => {
        this.state.transaction === 'finish'
            ? setTimeout(() => { this.handleClose() }, 300)
            : this.setState({ transaction: 'pending' }, () => {
                // upload  
                this.submit()
                // animetion 
                setTimeout(() => {
                    this.setState({ transaction: 'finish' }, () => {
                        // setTimeout(() => {
                        //     this.handleClose()
                        // }, 1000)
                    })
                }, 1000)

            })
    }

    getTime = () => {
        var dateAll, date, month, year, TimeType, hour, minutes, seconds, fullTime;
        dateAll = new Date();
        date = dateAll.getDate();
        month = dateAll.getMonth();
        year = dateAll.getFullYear();
        hour = dateAll.getHours();
        if (hour <= 11) {
            TimeType = 'AM';
        } else {
            TimeType = 'PM';
        }

        if (hour > 12) {
            hour = hour - 12;
        }
        if (hour == 0) {
            hour = 12;
        }

        minutes = dateAll.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes.toString();
        }

        seconds = dateAll.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds.toString();
        }

        fullTime = date.toString() + '/' + month.toString() + '/' + year.toString()
            + hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();

        return fullTime
    }

    onInputChange = (files) => {
        // document.getElementById('summitButton').disabled = true
        this.setState({
            files
        })
        console.log('import', files)
        // var subjects = {}
        // var xxx= {};
        //  files.forEach(file => {
        //     // const id = file.name.split(' ')
        //     const reader = new FileReader();
        //     reader.onload = async (e) => {
        //         const dataTemp = e.target.result;
        //         const workbook = XLSX.read(dataTemp, { type: 'binary' });
        //         const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
        //         const [id, subject] = await this.getDataForFirebase(data)
        //         // const id = subjectAndID[0] 
        //         // const subject = subjectAndID[1]  
        //         console.log('abc', id, subject)
        //         subjects[id] = subject
        //         // subjects.push()
        //         xxx = {
        //             id: subject
        //         }
        //         this.setState({ subjects })

        //         // subjects = xxx
        //         // debugger
        //         // console.log(subjects)
        //         // firebase.database().ref('/Subject2').push(subjects || 'abc')
        //         console.log('read',this.state.subjects)
        //     }
        //     reader.readAsBinaryString(file);
        // })
        // document.getElementById('summitButton').disabled = false
    }

    cancelSelection = (id) => {
        const { files } = this.state
        const file = files.filter(file => file.id == id)[0]
        this.refs.fileComponent.removeFile(file)
    }

    submit = async () => {
        const { files } = this.state
        var subjects = {}
        var xxx = {};
        files.forEach(async (file, index) => {
            // const id = file.name.split(' ')
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataTemp = e.target.result;
                const workbook = XLSX.read(dataTemp, { type: 'binary' });
                console.log('workbook', workbook)
                console.log(workbook.Sheets[workbook.SheetNames[0]])
                const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
                console.log(data)
                const [id, subject, validation] = await this.getDataForFirebase(data)
                // const id = subjectAndID[0] 
                // const subject = subjectAndID[1]  
                console.log('abc', id, subject)
                subjects[id] = subject
                files[index].validation = validation
                console.log(file.name, 'validation', validation)
                // subjects.push()
                // xxx = {
                //     id: subject
                // }
                // this.setState({ subjects })

                // subjects = xxx
                // debugger
                // console.log(subjects)
                // firebase.database().ref('/Subject2').push(subjects || 'abc')
                // console.log('read',this.state.subjects)
                if (validation) {
                    console.log(`upload to Subject/${id} `)
                    firebase.database().ref('/Subject').child(id).set(subject)
                    const { professorKey } = this.props.history.location.state
                    console.log(`upload to Professor/${professorKey}/subjects/${id}/${subject.name} `)
                    firebase.database().ref(`/Professor/${professorKey}/subjects/${id}`).set({ name: subject.name })
                    this.refs.fileComponent.removeFile(file)
                } else {
                    this.setState({ validation: false })
                }
            }
            await reader.readAsBinaryString(file);
        })
        // console.log('xxx', xxx)
        // console.log('subjects', subjects)
        // await this.upload(subjects).then(() => { console.log('successFully') }).catch((e) => { console.log(e) })
        // console.log('hello eiei')
        // this.refs.fileComponent.removeFiles()
    }

    //          storage 
    //     _handleImagePicked = async () => {
    //         let { pickerResult } = this.state;

    //         try {
    //             this.setState({ uploading: true });
    //             if (!pickerResult.cancelled) {
    //                 uploadUrl = await this.uploadImageAsync(pickerResult.uri);
    //                 this.setState({ image: uploadUrl });
    //                 const { db } = this.props.screenProps
    //                 let dbUploaddata = db.database().ref('/Product').child(this.state.id);
    //                 dbUploaddata.set({
    //                     id: this.state.id,
    //                     image: this.state.image,
    //                     name: this.state.name,
    //                     detail: this.state.detail,
    //                     count: this.state.count,
    //                     countType: this.state.countType,
    //                 });
    //             }
    //         } catch (e) {
    //             console.log(e);
    //             alert('คุณทำรายการผิดกรุณาทำรายการใหม่ 😞');
    //         } finally {
    //             this.setState({ uploading: false });
    //         }
    //     };

    //     async uploadImageAsync(uri) {
    //         const { db } = this.props.screenProps
    //         const response = await fetch(uri);
    //         const blob = await response.blob();
    //         const ref = db.storage().ref().child(this.state.id);
    //         const snapshot = await ref.put(blob);
    //         return snapshot.downloadURL;
    //     };
    // }

    upload = async (subjects) => {
        // const { subjects } = this.state
        console.log('subjects', subjects)
        console.log('subjects', Object.keys(subjects))
        // debugger
        // upload to Subject 

        // let subjectR = {
        //     name: subjects.key.name
        // }
        // console.log('subjectR', subjectR)
        const subjectsOld = await this.getOldSubject()
        console.log('subjectsOld', subjectsOld)
        const preUpload = { ...subjectsOld, ...subjects }
        console.log('subject upload', preUpload)
        await firebase.database().ref('/Subject2').set(preUpload || 'abc').then(() => { console.log('upload subject success', preUpload || 'abc') }).catch(() => { console.log('upload subject  false') })
        console.log('subjects', subjects)

        // upload to User  
        const { professorKey } = this.props.history.location.state
        const userSubjectsOld = await this.getOldProfessorSubject()
        let userSubjects = {}
        console.log('userSubjects', userSubjects)
        await Object.keys(subjects).forEach(key => {
            console.log('key', key)
            userSubjects[key] = { name: subjects[key].name }
        })
        console.log('subjects', subjects)
        console.log('userSubjects', userSubjects)
        const preUploadUser = await { ...userSubjectsOld, ...userSubjects }
        console.log('user subject upload', preUploadUser)
        await firebase.database().ref('/Professor').child(professorKey).child('subjects').set(preUploadUser)
        console.log('successFull')
    }

    getOldSubject = () => new Promise((resolve, reject) => {
        firebase.database().ref('/Subject').once('value').then(snapshot => {
            // console.log(snapshot.val())
            resolve(snapshot.val());
        })
    })

    getOldProfessorSubject = () => new Promise((resolve, reject) => {
        const { professorKey } = this.props.history.location.state
        firebase.database().ref('/Professor').child(professorKey).child('subjects').once('value').then(snapshot => {
            const result = snapshot.val()
            // console.log('professor', result)
            resolve(result);
        })
        // firebase.database().ref('/Professor').child(key).child('subjects').on('value', snapshot => {
        //     // console.log(snapshot.val())
        //     resolve(snapshot.val());
        // })
    })

    getOldProfessorInSubject = (key) => new Promise((resolve, reject) => {
        firebase.database().ref('/Subject').child(key).child('professors').once('value').then(snapshot => {
            // console.log(snapshot.val())
            resolve(snapshot.val() || []);
        })
    })

    getOldAttendaceInSubject = (key) => new Promise((resolve, reject) => {
        firebase.database().ref('/Subject').child(key).child('attendance').once('value').then(snapshot => {
            // console.log(snapshot.val())
            resolve(snapshot.val() || []);
        })
    })

    getProfessorName = () => new Promise((resolve, reject) => {
        const { professorKey } = this.props.history.location.state
        firebase.database().ref('/Professor').child(professorKey).once('value').then(snapshot => {
            const result = snapshot.val()
            resolve([result.professorID, result.name]);
        })
        // firebase.database().ref('/Professor').child(key).child('subjects').on('value', snapshot => {
        //     // console.log(snapshot.val())
        //     resolve(snapshot.val());
        // })
    })

    checkForValidation = (subject) => {
        let validation = true
        if (subject.year && subject.year.length !== 4) {
            validation = false
        }
        if (subject.term && subject.term.length !== 1) {
            validation = false
        }
        if (subject.code && subject.code.length !== 8) {
            validation = false
        }
        return validation
    }


    getDataForFirebase = async (data) => {
        const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
        let validation = true
        // console.log(professorID, photoUrl)
        const term = data[2]['E'].trim().split(' ')[1]
        const year = data[2]['E'].trim().split(' ')[3]
        const e3split = data[3]['E'].trim().split('  ')
        const code = e3split[0]
        const name = e3split[1]
        const sec = e3split[2]
        let count = ''
        let major = ''
        if (e3split.length == 4) {
            count = e3split[3].split(' ')[1]
        }
        else {
            major = e3split[3]
            count = e3split[4].split(' ')[1]
        }
        let students = {}
        let countToCheck = 0
        data.forEach((item, indexx) => {
            if (5 < indexx % 41) {
                students[item['B'].trim()] = item['C'].trim()
                countToCheck++
                if (item['B'].trim().length !== 8) {
                    validation = false
                }
            }
        })
        if (countToCheck.toString() !== count) {
            validation = false
        }
        let secForId = sec.split(' ')[1]
        const id = secForId === undefined
            ? [year, term, code].join('-')
            : [year, term, code, secForId].join('-')
        const professorsOld = await this.getOldProfessorInSubject(id)
        console.log('sadsdassda', professorKey)
        const attendanceOld = await this.getOldAttendaceInSubject(id)
        const professors = professorsOld
        const indexP = professors.findIndex(professor => professor.professorID === professorID)
        console.log('indexP',indexP)
        if (indexP!==-1) {
            professors[indexP] = {
                professorID,
                name: professorsName,
                photoUrl
            }
        } else {
            professors.push({
                professorID,
                name: professorsName || '',
                photoUrl
            })
        }
        const subject = {
            year,
            term,
            code,
            name,
            count,
            students,
            countToCheck,
            professors,
            attendance: attendanceOld
        }
        validation = validation && this.checkForValidation(subject)
        return [id, subject, validation]
    }

    render() {
        const { mode } = this.props.history.location.state
        const { files } = this.state
        // console.log(files)
        // console.log(subjects, data)
        // console.log('from render', subjects)
        // const height = this.state.height - 20
        // const width = this.state.width - 20
        // let heightAndWidth = 0
        // if (16.25 / 19 * height < 0.4 * width) {
        //     heightAndWidth = 16 / 19 * 0.5 * height
        // } else {
        //     heightAndWidth = 0.4 * 0.5 * width
        // }
        // console.log(height, width)
        return (
            <div className='container' >
                <Header pageName={'เพิ่มรายวิชา'} />
                <Grid container spacing={24} >
                    <Grid item xs />
                    <Grid container spacing={24} xs={4} direction='column' style={{ height: '85vh' }} >
                        <Grid item xl />
                        <Grid item xl />
                        <Grid item xl />
                        <Grid item xl />
                        <Grid container xl >
                            <Grid item xs />
                            <Grid item xs >
                                <File
                                    // className='fileInput'
                                    // style={{ height: '0', width: '0' }}
                                    onChange={this.onInputChange} ref='fileComponent'
                                    accepts={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']}
                                >
                                    {/* <div  /> */}
                                <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }}
                                    style={{ height: '40vh', width: '40vh', backgroundColor: 'white', borderRadius: '15%', border: 'thick solid rgb(15, 111, 198)' }}
                                    // onClick={() => this.input.click()}
                                >
                                    <div className='innerFileInput' style={{ height: '32vh', width: '35vh' }} ref={input => this.input = input} >
                                        <img style={{ height: '20%', width: '20%' }} src={require('../photo/addButton.png')} />
                                    </div>
                                </Button>
                                </File>
                            </Grid>
                            <Grid item xs />
                        </Grid>
                        <Grid item xl />
                        <Grid container xl >
                            <Grid item xs />
                            <Grid item xs={6} >
                                <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }}
                                    style={{ width: '100%', color: 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '1.5vw', fontWeight: 'bold', borderRadius: '1vw', border: 'thick solid rgb(15, 111, 198)' }}
                                    onClick={() => this.input.click()}
                                >
                                    เพิ่มรายวิชา
                                </Button>
                            </Grid>
                            <Grid item xs />
                        </Grid>
                        <Grid item xl />
                        <Grid container xl >
                            <Grid item xs />
                            <Grid item xs={6} >
                                <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }}
                                    style={{ width: '100%', color: 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '1.5vw', fontWeight: 'bold', borderRadius: '1vw', border: 'thick solid rgb(15, 111, 198)' }}
                                    onClick={() => this.handleOpen()}
                                >
                                    ยืนยัน
                                </Button>
                                <PopUpConfirm validation={this.state.validation} transaction={this.state.transaction} open={this.state.openDialog} handleOpen={this.handleOpen} handleClose={this.handleClose} mode={mode} onClickConfirm={this.onClickConfirm} />
                            </Grid>
                            <Grid item xs />
                        </Grid>
                        <Grid item xl />
                    </Grid>
                    <Grid item xs />
                    <Grid container xs={6} direction='column' spacing={24} >
                        <Grid item xl />
                        <Grid item xl />
                        <Grid item xl />
                        <Grid item xl >
                            <SubjectList className='list' mode={mode} files={files} height={'65vh'}
                                cancelSelection={this.cancelSelection} />
                        </Grid>
                        <Grid item xl />
                    </Grid>
                    <Grid item xs />
                </Grid>
                {/* <div className='body' style={{ height: 16.25 / 19 * height, width }} >
                    <div className='left' style={{ height: 16.25 / 19 * height, width: 0.4 * width }} > */}
                {/* <input type='file' onChange={this.addFiles} multiple hidden
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        /> */}
                {/* <File
                            className='fileInput' style={{ height: heightAndWidth, width: heightAndWidth }}
                            onChange={this.onInputChange} ref='fileComponent'
                            accepts={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']}
                        >
                            <div
                                className='innerFileInput' style={{ height: 0.9 * heightAndWidth, width: 0.9 * heightAndWidth }}
                                ref={input => this.input = input} >
                                <img style={{ height: 0.2 * heightAndWidth, width: 0.2 * heightAndWidth }}
                                    src={require('../photo/addButton.png')} />
                            </div>
                        </File>

                        <button className='button' onClick={() => this.input.click()} style={{
                            height: 0.1 * 16.25 / 19 * height, width: 0.5 * 0.4 * width,
                            borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.02 * 16.25 / 19 * height,
                            fontSize: 0.05 * 16.25 / 19 * height
                        }} >
                            เพิ่มรายวิชา
                        </button>
                        <button className='button' onClick={() => { this.submit() }} style={{
                            height: 0.1 * 16.25 / 19 * height, width: 0.5 * 0.4 * width,
                            borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.02 * 16.25 / 19 * height,
                            fontSize: 0.05 * 16.25 / 19 * height
                        }} id='summitButton' >
                            ยืนยัน
                        </button>
                    </div >
                    <div className='right' style={{ height: 16.25 / 19 * height, width: 0.6 * width }} >
                        <div className='borderList' style={{ height: 0.8 * 16.25 / 19 * height, width: 0.9 * 0.6 * width }} >
                            <SubjectList className='list' mode={mode} files={files} height={height} width={width}
                                cancelSelection={this.cancelSelection} />
                        </div >
                    </div>
                </div> */}
            </div>
        );
    }
}
