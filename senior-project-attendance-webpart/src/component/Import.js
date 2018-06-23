
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
        validation: true,
        listObjReaded: [],
        loading: false,
        buttonDisabled: false
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
            : this.setState({ transaction: 'pending' }, async () => {
                // animetion 
                setTimeout(() => {
                    this.setState({ transaction: 'finish' }, () => {
                        // setTimeout(() => {
                        //     this.handleClose()
                        // }, 1000)
                    })
                }, 1000)
                // upload  
                // await this.submit()
                this.upload()
                console.log(' ------------------------------ upload success ------------------------------ ')
                // delete old file          
                this.deleteOldSubject()
            })
    }

    upload = () => {
        const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
        this.state.listObjReaded.forEach(async (ObjReaded) => {
            const { name, id, subjectKey, subject, validation } = ObjReaded
            console.log('ObjReaded', ObjReaded)
            if (validation) {
                console.log(`upload to Subject/${subjectKey} `)
                const oldProfessor = await this.getOldProfessorInSubject(subjectKey)
                const professors = oldProfessor
                const indexP = professors.findIndex(professor => professor.professorID === professorID)
                console.log('indexP', indexP)
                if (indexP !== -1) {
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
                const subjectAddPro = {
                    ...subject,
                    professors
                }
                const ref = firebase.database().ref('/Subject').child(subjectKey)
                if (ref) {
                    ref.once('value').then(snapshot => {
                        const result = snapshot.val()
                        const newSubject = {
                            ...result,
                            ...subjectAddPro
                        }
                        console.log(`upload to Subject/${subjectKey}`, newSubject)
                        ref.set(newSubject)
                        if (result) this.insertLog(professorID, subjectKey, result, subjectAddPro)
                    })
                } else {
                    ref.set(subjectAddPro)
                }
                console.log(`upload to Professor/${professorKey}/subjects/${subjectKey}/${subject.name} `)
                firebase.database().ref(`/Professor/${professorKey}/subjects/${subjectKey}`).set({ name: subject.name }).then(() => {
                    // delete display
                    // this.refs.fileComponent.removeFile(file)
                    this.cancelSelection(id)
                    // delete old file          
                    this.deleteOldSubject(subjectKey.substr(0, 6))
                })
            } else {
                this.setState({ validation: false })
            }
        })
    }

    insertLog = (professorID, subjectKey, oldSubject, newSubject) => {
        // initial 
        let addStudents = {}, deleteStudent = {}, log = {}

        // read data 
        const { students: oldStudents, name: oldName, count: oldCount } = oldSubject
        const { students: newStudents, name: newName, count: newCount } = newSubject

        // check students 
        Object.keys(oldStudents).forEach(studentID => {
            const same = Object.keys(newStudents).find(s => s === studentID)
            if (!same) deleteStudent[studentID] = oldStudents[studentID]
        })
        Object.keys(newStudents).forEach(studentID => {
            const same = Object.keys(oldStudents).find(s => s === studentID)
            if (!same) addStudents[studentID] = newStudents[studentID]
        })
        if (Object.keys(addStudents).length !== 0) log['addStudents'] = addStudents
        if (Object.keys(deleteStudent).length !== 0) log['deleteStudent'] = deleteStudent

        // check name 
        if (oldName !== newName) log['changeName'] = `${oldName} to ${newName}`

        // check count 
        if (oldCount !== newCount) log['changeCount'] = `${oldCount} to ${newCount}`

        // upload
        if (Object.keys(log).length !== 0) {
            log['professorID'] = professorID
            const dateAll = new Date()
            const date = [dateAll.getDate(), dateAll.getMonth() + 1, dateAll.getFullYear()].join('/')
            log['date'] = [date, '(', 'dd-mm-yyyy', ')'].join(' ')
            console.log(`upload to Subject/${subjectKey}/log/import`, log)
            firebase.database().ref(`/Subject/${subjectKey}/log/import`).push(log)
        }
    }

    onInputChange = (files) => {
        // document.getElementById('summitButton').disabled = true
        this.setState({ loading: true, buttonDisabled: true }, () => {
            this.submit(files)
            console.log('import', files)
        })
        // document.getElementById('summitButton').disabled = false
    }

    cancelSelection = (id) => {
        const { listObjReaded } = this.state
        // delete in fileComponent state
        const file = listObjReaded.find(ObjReaded => ObjReaded.id !== id)
        this.refs.fileComponent.removeFile(file)
        // delete in this state 
        const newList = listObjReaded.filter(ObjReaded => ObjReaded.id !== id)
        this.setState({ listObjReaded: newList })
    }

    setValidation = (id, validate) => {
        const { listObjReaded } = this.state
        const indexForSet = listObjReaded.findIndex(ObjReaded => id === ObjReaded.id)
        if (indexForSet !== -1) {
            listObjReaded[indexForSet].validation = validate
        }
        this.setState({ listObjReaded }, () => console.log('listObjReaded validation', this.state.listObjReaded))
    }

    onClickEdit = (id, year, term, code, sec, subjectName) => {
        const { listObjReaded } = this.state
        const indexForSet = listObjReaded.findIndex(ObjReaded => id === ObjReaded.id)
        console.log('sec', sec)
        const subjectKey = sec === ''
            ? [year, term, code].join('-')
            : [year, term, code, sec].join('-')
        if (indexForSet !== -1) {
            const subject = {
                ...listObjReaded[indexForSet].subject,
                subjectYear: year,
                subjectTerm: term,
                subjectID: code,
                name: subjectName.trim()
            }
            listObjReaded[indexForSet] = {
                ...listObjReaded[indexForSet],
                subjectKey,
                // validation: this.checkForValidation(subject),
                subject
            }
        }
        this.setState({ listObjReaded }, () => console.log('listObjReaded', this.state.listObjReaded))
    }

    submit = async (files) => {
        let subjects = {}
        files.forEach(async (file, index) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataTemp = e.target.result;
                const workbook = XLSX.read(dataTemp, { type: 'binary' });
                console.log('workbook', workbook)
                console.log(workbook.Sheets[workbook.SheetNames[0]])
                const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
                console.log(data)
                const [id, subject, validation] = await this.getDataForFirebase(data)
                console.log('abc', id, subject)
                console.log(file.name, 'validation', validation)

                console.log(' ------------------------------ reading ------------------------------ ')

                this.setState(({ listObjReaded }) => {
                    const indexForSet = listObjReaded.findIndex(ObjReaded => file.name === ObjReaded.name)
                    if (indexForSet !== -1) {
                        listObjReaded[indexForSet] = {
                            id: file.id,
                            subjectKey: id,
                            subject,
                            validation,
                            name: file.name,
                            addedTime: file.addedTime
                        }
                    } else {
                        listObjReaded.push({
                            id: file.id,
                            subjectKey: id,
                            subject,
                            validation,
                            name: file.name,
                            addedTime: file.addedTime
                        })
                    }
                    return index === files.length - 1 ? { listObjReaded, loading: false, buttonDisabled: false } : { listObjReaded }
                })
            }
            await reader.readAsBinaryString(file);
        })
    }

    deleteOldSubject = (termInput = '') => {
        const startTerm1 = { month: 7, day: 1 }
        const startTerm2 = { month: 1, day: 1 }
        let year, term
        const currentDate = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'numeric', day: 'numeric' })
        const currentYear = parseInt(currentDate.split('/')[2])
        const currentMonth = parseInt(currentDate.split('/')[1])
        const currentDay = parseInt(currentDate.split('/')[0])
        if (startTerm2.month <= currentMonth && currentMonth < startTerm1.month) {
            year = currentYear - 1
            term = 2
        } else {
            year = currentYear
            term = 1
        }
        const currentTerm = [year, term].join('-')
        if (termInput !== currentTerm) {
            const twoStepBackTerm = [year - 1, term].join('-')
            const oneStepForTerm = term === 1 ? [year, term + 1].join('-') : [year + 1, 1].join('-')
            const ref = firebase.database().ref('Subject')
            if (ref) {
                // ref.orderByKey().startAt("2559-").endAt("2560~").once('value', snapshot => {
                ref.orderByKey().endAt([twoStepBackTerm, '~'].join('')).once('value', snapshot => {
                    Object.keys(snapshot.val() || {}).forEach(subjectKey => {
                        console.log('delete the data : ', ref.child(subjectKey).toJSON())
                        ref.child(subjectKey).remove()
                    })
                })
                ref.orderByKey().startAt([oneStepForTerm, '-'].join('')).once('value', snapshot => {
                    Object.keys(snapshot.val() || {}).forEach(subjectKey => {
                        console.log('delete the data : ', ref.child(subjectKey).toJSON())
                        ref.child(subjectKey).remove()
                    })
                })
            }
            const { professorKey } = this.props.history.location.state
            const ref2 = firebase.database().ref(`Professor/${professorKey}/subjects`)
            if (ref2) {
                ref2.orderByKey().endAt([twoStepBackTerm, '~'].join('')).once('value', snapshot => {
                    Object.keys(snapshot.val() || {}).forEach(subjectKey => {
                        console.log('delete the data : ', ref2.child(subjectKey).toJSON())
                        ref2.child(subjectKey).remove()
                    })
                })
                ref2.orderByKey().startAt([oneStepForTerm, '-'].join('')).once('value', snapshot => {
                    Object.keys(snapshot.val() || {}).forEach(subjectKey => {
                        console.log('delete the data : ', ref2.child(subjectKey).toJSON())
                        ref2.child(subjectKey).remove()
                    })
                })
            }
        }
    }



    getOldSubject = () => new Promise((resolve, reject) => {
        firebase.database().ref('/Subject').once('value').then(snapshot => {
            resolve(snapshot.val());
        })
    })

    getOldProfessorSubject = () => new Promise((resolve, reject) => {
        const { professorKey } = this.props.history.location.state
        firebase.database().ref('/Professor').child(professorKey).child('subjects').once('value').then(snapshot => {
            const result = snapshot.val()
            resolve(result);
        })
    })

    getOldProfessorInSubject = (key) => new Promise((resolve, reject) => {
        firebase.database().ref('/Subject').child(key).child('professors').once('value').then(snapshot => {
            resolve(snapshot.val() || []);
        })
    })

    getOldAttendaceInSubject = (key) => new Promise((resolve, reject) => {
        firebase.database().ref('/Subject').child(key).child('attendance').once('value').then(snapshot => {
            resolve(snapshot.val() || []);
        })
    })

    getProfessorName = () => new Promise((resolve, reject) => {
        const { professorKey } = this.props.history.location.state
        firebase.database().ref('/Professor').child(professorKey).once('value').then(snapshot => {
            const result = snapshot.val()
            resolve([result.professorID, result.name]);
        })
    })

    checkForValidation = (subject) => {
        let validation = true
        if (subject.subjectYear && subject.subjectYear.length !== 4) {
            validation = false
        }
        if (subject.subjectTerm && subject.subjectTerm.length !== 1) {
            validation = false
        }
        if (subject.subjectID && subject.subjectID.length !== 8) {
            validation = false
        }
        return validation
    }

    readStudent = (data, studentIDColumn = 'B', studentNameColumn = 'C') => {
        let students = {}
        let countToCheck = 0
        data.forEach((item, indexx) => {
            // if (5 < indexx % 41) {
            //     students[item['B'].trim()] = item['C'].trim()
            //     countToCheck++
            //     if (item['B'].trim().length !== 8) {
            //         validation = false
            //     }
            // } 
            if (item[studentIDColumn] && item[studentIDColumn].trim().length === 8 && !isNaN(parseInt(item[studentIDColumn].trim(), 10))) {
                students[item['B'].trim()] = item[studentNameColumn] ? item[studentNameColumn].trim() : ''
                countToCheck++
            }
        })
        return [students, countToCheck]
    }

    getDataForFirebase = async (data) => {
        const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
        let validation = data[2]['E'] && data[3]['E']
        const term = data[2]['E'] ? data[2]['E'].trim().split(' ')[1] : ''
        const year = data[2]['E'] ? data[2]['E'].trim().split(' ')[3] : ''
        const e3split = data[3]['E'] ? data[3]['E'].trim().split('  ') : ['', '', '', '', '']
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
            count = e3split[4].split(' ')[1] || ''
        }
        const [students, countToCheck] = this.readStudent(data)
        let secForId = sec.split(' ')[1]
        const id = secForId === undefined
            ? [year, term, code].join('-')
            : [year, term, code, secForId].join('-')
        const subject = {
            subjectYear: year,
            subjectTerm: term,
            subjectID: code,
            name,
            count: countToCheck.toString(),
            students,
            // countToCheck,
            // professors,
            // attendance: attendanceOld
        }
        validation = validation && this.checkForValidation(subject)
        return [id, subject, validation]
    }

    render() {
        const { mode } = this.props.history.location.state
        const { listObjReaded, buttonDisabled } = this.state
        console.log('listObjReaded', listObjReaded)
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
                                    style={{ width: '100%', color: buttonDisabled ? 'rgb(210, 210, 210)' : 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '1.5vw', fontWeight: 'bold', borderRadius: '1vw', border: buttonDisabled ? 'thick solid rgb(210, 210, 210)' : 'thick solid rgb(15, 111, 198)' }}
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
                    <Grid container xs={7} direction='column' spacing={24} >
                        <Grid item xl />
                        <Grid item xl />
                        <Grid item xl />
                        <Grid item xl >
                            <SubjectList className='list' mode={mode} files={listObjReaded} height={'65vh'} loading={this.state.loading}
                                cancelSelection={this.cancelSelection} onClickEdit={this.onClickEdit} setValidation={this.setValidation} />
                        </Grid>
                        <Grid item xl />
                    </Grid>
                    <Grid item xs />
                </Grid>
            </div>
        );
    }
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

    // upload = async (subjects) => {
    //     // const { subjects } = this.state
    //     console.log('subjects', subjects)
    //     console.log('subjects', Object.keys(subjects))
    //     // debugger
    //     // upload to Subject 

    //     // let subjectR = {
    //     //     name: subjects.key.name
    //     // }
    //     // console.log('subjectR', subjectR)
    //     const subjectsOld = await this.getOldSubject()
    //     console.log('subjectsOld', subjectsOld)
    //     const preUpload = { ...subjectsOld, ...subjects }
    //     console.log('subject upload', preUpload)
    //     await firebase.database().ref('/Subject2').set(preUpload || 'abc').then(() => { console.log('upload subject success', preUpload || 'abc') }).catch(() => { console.log('upload subject  false') })
    //     console.log('subjects', subjects)

    //     // upload to User  
    //     const { professorKey } = this.props.history.location.state
    //     const userSubjectsOld = await this.getOldProfessorSubject()
    //     let userSubjects = {}
    //     console.log('userSubjects', userSubjects)
    //     await Object.keys(subjects).forEach(key => {
    //         console.log('key', key)
    //         userSubjects[key] = { name: subjects[key].name }
    //     })
    //     console.log('subjects', subjects)
    //     console.log('userSubjects', userSubjects)
    //     const preUploadUser = await { ...userSubjectsOld, ...userSubjects }
    //     console.log('user subject upload', preUploadUser)
    //     await firebase.database().ref('/Professor').child(professorKey).child('subjects').set(preUploadUser)
    //     console.log('successFull')
    // }
