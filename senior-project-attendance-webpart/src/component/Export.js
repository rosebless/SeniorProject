import React from 'react'
import SubjectList from './SubjectList'
import File from './FileInput'
import XLSX from 'xlsx'
// import '../css/Export.css'
import Header from './Header'
import firebase from '../config/firebase'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PopUpConfirm from './PopUpConfirm'

export default class Import extends React.Component {

    state = {
        files: [],
        subjects: {},
        transaction: 'wait confirm',
        openDialog: false
    }

    handleOpen = () => {
        this.setState({
            transaction: 'wait confirm',
            openDialog: true
        });
    };

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    onClickConfirm = () => {
        this.state.transaction === 'finish'
            ? setTimeout(() => { this.handleClose() }, 300)
            : this.setState({ transaction: 'pending' }, () => {
                // upload  
                this.exportFile()
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

    componentDidMount = () => {
        this.generate()
    }

    generate = () => {
        const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
        firebase.database().ref('/Professor').child(professorKey).child('subjects').on('value', snapshot => {
            const objSubject = snapshot.val()
            const files = this.customQuery(objSubject).map((key) => ({ id: key, name: objSubject[key].name, checked: false }))
            this.setState({ files })
        })
    }

    customQuery = (objSubject) => {
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
        console.log('currentTerm', currentTerm)
        return Object.keys(objSubject).filter(subject => subject.substr(0, 6) === currentTerm)
    }

    onChecked = (index) => {
        const { files } = this.state
        const newFiles = files.map((file, indexx) => ({
            ...file,
            checked: index === indexx ? !file.checked : file.checked
        }))
        this.setState({ files: newFiles }, () => console.log(this.state.files))
    }

    exportFile = () => {
        const { files } = this.state
        const { utils: { book_new, aoa_to_sheet, book_append_sheet }, writeFile } = XLSX
        const workBook = book_new()
        firebase.database().ref('/Subject').once('value', snapshot => {
            const allSubject = snapshot.val()
            files.filter(file => file.checked).forEach(file => {
                const attendance = allSubject[file.id].attendance || {}
                const studentsInClass = allSubject[file.id].students
                const comment = []
                // re structure 
                let aoaForSheet = Object.keys(studentsInClass).map((student, i) => {
                    return [i + 1, student]
                })
                // Header 
                // const arr = []
                // arr.l
                const idArr = file.id.split('-')
                aoaForSheet.unshift([       // 2 
                    'ลำดับ',
                    'รหัส นศ.'
                ])
                aoaForSheet.unshift([])     // 1 
                aoaForSheet.unshift([       // 0  
                    '',
                    idArr[3]
                        ? [idArr[2], file.name, 'กลุ่ม', idArr[3], 'ปีการศึกษาที่', idArr[1], 'เทอม', idArr[0]].join(' ')
                        : [idArr[2], file.name, 'ปีการศึกษาที่', idArr[1], 'เทอม', idArr[0]].join(' ')
                ])
                // Body
                console.log('aoaForSheet', aoaForSheet)
                Object.keys(attendance).sort((a, b) => (a.split('-')[1] - b.split('-')[1])).forEach((week, weekIndex) => {
                    const weekText = attendance[week].date.split('-').filter((d, i) => i !== 0).reverse().join('/') // date
                    aoaForSheet[2].push(weekText)
                    const students = attendance[week].students
                    aoaForSheet = aoaForSheet.map((arr, i) => {
                        const studentKey = Object.keys(students || {}).find(key => key === arr[1])
                        if (weekIndex === 1) {
                            comment[i] = ''
                        }
                        if (studentKey) {
                            arr.push(this.readStatus(students[studentKey].status) || '')
                            comment[i] = students[studentKey].comment
                                ? comment[i] + [weekText, ':', students[studentKey].comment.split('\n').join(' , '), '\n'].join(' ')
                                : comment[i]
                        } else if (i > 2) {
                            arr.push('')
                        }
                        // console.log('comment', i, comment[i])
                        // console.log(aoaForSheet, student, index, students[student].status)
                        // aoaForSheet[index].push(this.readStatus(students[student].status)) 
                        return arr
                    })
                    // aoaForSheet = aoaForSheet.map((arr, i) => {
                    //     (i > 2 || arr.length !== aoaForSheet[2].length) && arr.push('✖')
                    //     return arr
                    // })
                    // console.log(aoaForSheet)
                })

                console.log('comment', comment)
                // add comment & conclusion 
                aoaForSheet[2].push('หมายเหตุ')
                aoaForSheet[2].forEach(arr => { aoaForSheet[1].push('') })
                aoaForSheet[1].push('สรุปผล')
                aoaForSheet[2].push('เข้าเรียน')
                aoaForSheet[2].push('เข้าสาย')
                aoaForSheet[2].push('ขาดเรียน')
                aoaForSheet = aoaForSheet.map((arr, i) => {
                    i > 2
                        && arr.push(comment[i])
                        && arr.push(arr.filter(a => a === '✔').length)
                        && arr.push(arr.filter(a => a === '✱').length)
                        && arr.push(arr.filter(a => a === '✖').length)
                    return arr
                })
                // aoaForSheet = aoaForSheet.map((arr, i) => i < 3 ? (arr) : (arr.push(arr.filter(a => a === '✔').length)))
                // console.log('aoaForSheet', aoaForSheet)
                // aoaForSheet = aoaForSheet.map((arr, i) => i < 3 ? arr : arr.push(arr.filter(a => a === '✪').length))
                // console.log('aoaForSheet', aoaForSheet)
                // aoaForSheet = aoaForSheet.map((arr, i) => i < 3 ? arr : arr.push(arr.filter(a => a === '✖').length))
                // add sheet 
                const workSheet = aoa_to_sheet(aoaForSheet, { cellStyles: true })
                workSheet['!cols'] = [{ hidden: true }]
                // const colsW = [{wpx: 15}]
                // Object.keys(attendance).forEach( week => {
                //     colsW.push({wpx: 5})
                // } )
                // colsW.push({wpx: 15})
                // colsW.push({wpx: 15})
                // colsW.push({wpx: 15})
                // workSheet['!cols'] = colsW
                // workSheet['B6'].s = {
                //     patternType: 'solid',
                //     fgColor: { theme: 8, tint: 0.3999755851924192, rgb: '9ED2E0' },
                //     bgColor: { indexed: 64 }
                // }
                console.log(workSheet)
                const fileIdArr = file.id.split('-')
                const sheetName = fileIdArr[3] ? [fileIdArr[2], '(', fileIdArr[3], ')'].join(' ') : fileIdArr[2]
                book_append_sheet(workBook, workSheet, sheetName)
                console.log(workBook)
            })
            const write = XLSX.writeFile(workBook, 'Attendance.xls', { type: 'binary', cellStyles: true })
            console.log('write', write)
            const filesC = files.map(file => ({ ...file, checked: false }))
            this.setState({ files: filesC })
        })

        // const json = [{ A: 'a1', B: 'b1' }, { A: 'a2', B: 'b2' }, { A: 'a3', B: 'b3' }, { C: 'c3', E: 'e3' }] 
        // const aoa = [['a1','b1' ],['a2','b2' ],['a3','b3'],['','','c4','d4']]
        // console.log(json)
        // // const sheet = XLSX.utils.json_to_sheet(json, { skipHeader: true }); 
        // const sheet = XLSX.utils.aoa_to_sheet(aoa)
        // console.log(sheet)
        // const workBook = XLSX.utils.book_new()
        // console.log(workBook)
        // XLSX.utils.book_append_sheet(workBook, sheet, 'aaaa')
        // console.log(workBook)
        // XLSX.writeFile(workBook,'sdf.xlsx')
        // // console.log(excel) 
    }

    readStatus = (status) => (
        status
            ? status === 'atten'
                ? '✔'
                : status === 'late'
                    ? '✱'
                    : '✖'
            : undefined
    )

    render() {
        const { mode } = this.props.history.location.state
        const { files } = this.state
        console.log(files)
        return (
            <div className='container' >
                <Header pageName={'นำข้อมูลออก'} />
                <Grid container spacing={24} direction='column' style={{ height: '85vh' }} >
                    <Grid item xs xl={2} />
                    <Grid container spacing={24} xl={5} >
                        <Grid item xs />
                        <Grid item xs={7} >
                            <SubjectList className='list' mode={mode} files={files} height={'60vh'}
                                onChecked={this.onChecked} />
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <Grid item xl={2} />
                    <Grid container spacing={24} xl={3} >
                        <Grid item xs />
                        <Grid item xs={2} >
                            <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }}
                                style={{ width: '100%', color: 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '1.5vw', fontWeight: 'bold', borderRadius: '1vw', border: 'thick solid rgb(15, 111, 198)' }}
                                onClick={() => { this.handleOpen() }}
                            >
                                ยืนยัน
                            </Button>
                            <PopUpConfirm validation={true} transaction={this.state.transaction} open={this.state.openDialog} handleOpen={this.handleOpen} handleClose={this.handleClose} mode={mode} onClickConfirm={this.onClickConfirm} />
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    {/* <Grid item xs /> */}
                </Grid>
                {/* <div className='bodyEx' style={{ height: 16.25 / 19 * height, width }} >
                    <div className='topEx' style={{ height: 12.75 / 19 * height, width }} >
                        <div className='borderList' style={{ height: 0.95 * 12.75 / 19 * height, width: 0.5 * width }} >
                            <SubjectList className='list' mode={mode} files={files} height={height} width={width}
                                cancelSelection={this.cancelSelection} onChecked={this.onChecked} />
                        </div >
                    </div>

                    <div className='botEx' style={{ height: 2 / 19 * height, width }} >
                        <button onClick={() => { this.exportFile() }}
                            className='button'
                            style={{
                                height: 0.8 * 2 / 19 * height, width: 1 / 10 * width,
                                borderRadius: 0.2 * 0.8 * 2 / 19 * height, marginTop: 0.2 * 0.8 * 2 / 19 * height,
                                fontSize: 0.5 * 0.8 * 2 / 19 * height
                            }}>
                            ยืนยัน
                        </button>
                    </div>
                </div> */}
            </div>
        );
    }
}
