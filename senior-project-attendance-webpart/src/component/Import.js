
import React from 'react'
import { fb } from './Menu'
import SubjectList from './SubjectList'
import File from 'react-files'
import XLSX from 'xlsx'
import '../css/Import.css'
import Header from './Header'
import { resolve } from 'url';


export default class Import extends React.Component {

    state = {
        files: [],
        data: [],
        subjects: [],
        width: 0,
        height: 0
    }

    componentDidMount = () => {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    addFiles = e => {
        // console.log(e)
        let fileList = e.target.files;
        let files = Array.from(fileList)
        // console.log(files) 
        files.forEach(file => {
            const reader = new FileReader();
            const subjects = this.state.subjects
            const name = file.name.split('.')[0];
            const addedTime = this.getTime()
            subjects.push({ name, addedTime })
            this.setState({ subjects })
            reader.onload = (e) => {
                var dataTemp = e.target.result;
                var workbook = XLSX.read(dataTemp, { type: 'binary' });
                var data_new = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
                var data = this.state.data
                data.push(data_new)
                // data_json.push(data_json_new)
                this.setState({
                    data
                })
            }
            // console.log(file)
            // let name = file.name;
            // console.log(name)
            reader.readAsBinaryString(file);
        })
        // this.convertToDatabase()
    }

    cancelSelection = (index) => {
        let { subjects, data } = this.state
        // console.log(index, data)
        subjects.splice(index, 1)
        data.splice(index, 1)
        this.setState({ subjects, data })
        // console.log(index, data)
    }

    submit = () => {
        const { data, subjects } = this.state
        let result = {}
        data.map((subject, index) => {
            const term = subject[2]['E'].split(' ')[1]
            const year = subject[2]['E'].split(' ')[3]
            const e3split = subject[3]['E'].split('  ')
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
            subject.forEach((item, indexx) => {
                if (5 < indexx % 41) {
                    students[item['B']] = item['C']
                    countToCheck++ 
                }
            })
            let secForId = sec.split(' ')[1]
            let id = ''
            if (secForId === undefined) id = [year, term, code].join('-')
            else id = [year, term, code, secForId].join('-')
            result[id] = {
                year,
                term,
                code,
                name,
                count,
                students,
                countToCheck
            }
        })
        // console.log(data)
        // console.log(result)
        this.upLoad(result)
        this.clearData()
    }

    upLoad = async (perfectForUpload) => {
        // console.log(perfectForUpload) 
        // const dbCon = fb.database().ref('/Subject')
        const subjectsOld = await this.getOldSubject()
        const preUpload = { ...subjectsOld, ...perfectForUpload }
        fb.database().ref('/Subject').set(preUpload)
        // console.log(preUpload)
    }

    getOldSubject = () => new Promise((resolve, reject) => {
        fb.database().ref('/Subject').on('value', snapshot => {
            console.log(snapshot.val())
            resolve(snapshot.val());
        })
    })

    clearData = () => {
        this.setState({
            files: [],
            data: [],
            subjects: [],
            perfectForUpload: {}
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

    render() {
        const { mode } = this.props.history.location.state
        const { subjects, data } = this.state
        // console.log(subjects, data)
        const height = this.state.height - 20
        const width = this.state.width - 20
        let heightAndWidth = 0
        if (16.25 / 19 * height < 0.4 * width) {
            heightAndWidth = 16 / 19 * 0.5 * height
        } else {
            heightAndWidth = 0.4 * 0.5 * width
        }
        // console.log(height, width)
        return (
            <div className='container' style={{
                height,
                width,
                backgroundSize: width
            }} >
                <Header pageName={'เพิ่มรายวิชา'} height={height} width={width} />
                <div className='body' style={{ height: 16.25 / 19 * height, width }} >
                    <div className='left' style={{ height: 16.25 / 19 * height, width: 0.4 * width }} >
                        <input type='file' onChange={this.addFiles} multiple hidden
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            ref={input => this.input = input} />
                        <div
                            className='fileInput' style={{ height: heightAndWidth, width: heightAndWidth }}
                            onClick={() => this.input.click()}
                        >
                            <div
                                className='innerFileInput' style={{ height: 0.9 * heightAndWidth, width: 0.9 * heightAndWidth }} >
                                <img style={{ height: 0.2 * heightAndWidth, width: 0.2 * heightAndWidth }}
                                    src={require('../photo/addButton.png')} />
                            </div>
                        </div>

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
                        }} >
                            ยืนยัน
                        </button>
                    </div >
                    <div className='right' style={{ height: 16.25 / 19 * height, width: 0.6 * width }} >
                        <div className='borderList' style={{ height: 0.8 * 16.25 / 19 * height, width: 0.9 * 0.6 * width }} >
                            <SubjectList className='list' mode={mode} subjects={subjects} height={height} width={width}
                                cancelSelection={(index) => this.cancelSelection(index)} />
                        </div >
                    </div>
                </div>
            </div>
        );
    }
}

