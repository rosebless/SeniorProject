import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
// import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PopUpEdit extends React.Component {
    constructor(props) {
        super(props)
        const { year, term, code, sec, subjectName } = this.props
        this.state = {
            open: false,
            year,
            term,
            code,
            sec: sec || '',
            subjectName,
            oldData: {
                year,
                term,
                code,
                sec,
                subjectName
            },
            validation: {
                yearLen: true,
                codeLen: true,
                year: true,
                code: true,
                sec: true,
                subjectName: true,
            },
            buttonDisabled: false
        }

    }

    componentDidMount = () => {
        this.checkValidation()
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        const { year, term, code, sec, subjectName } = this.state.oldData
        this.setState({
            open: false,
            year,
            term,
            code,
            sec: sec || '',
            subjectName,
            validation: {
                yearLen: true,
                codeLen: true,
                year: true,
                code: true,
                sec: true,
                subjectName: true,
            },
            buttonDisabled: false
        })
    };

    isNum = (text = '') => !(
        text.split('').map(t => isNaN(parseInt(t, 10))).find(b => b === true) // !isNaN(parseInt(text, 10))
    )

    checkValidation = () => {
        const { validation, subjectName, year, code, sec } = this.state
        let byPass = false
        if (subjectName !== '') {
            validation['subjectName'] = true
        } else {
            validation['subjectName'] = false
        }
        if (this.isNum(year)) {
            validation['year'] = true
        } else {
            validation['year'] = false
            byPass = true
        }
        if (this.isNum(code)) {
            validation['code'] = true
        } else {
            validation['code'] = false
            byPass = true
        }
        if (this.isNum(sec) || sec === '') {
            validation['sec'] = true
        } else {
            validation['sec'] = false
            byPass = true
        }

        if (year.length === 4) {
            validation['yearLen'] = true
        } else {
            validation['yearLen'] = false
            byPass = true
        }
        if (code.length === 8) {
            validation['codeLen'] = true
        } else {
            validation['codeLen'] = false
            byPass = true
        }

        this.setState({
            validation,
        }, () => this.setState({ buttonDisabled: byPass ? true : this.isButtonDisabled() || this.isSame() }))
    }
    isButtonDisabled = () => (
        this.state.year === '' &&
        this.state.term === '' &&
        this.state.code === ''
    )
    isSame = () => (
        this.state.subjectName === this.state.oldData.subjectName &&
        this.state.year === this.state.oldData.year &&
        this.state.term === this.state.oldData.term &&
        this.state.code === this.state.oldData.code &&
        this.state.sec === this.state.oldData.sec
    )
    onChangeSubjectName = (event) => {
        this.setState({
            subjectName: event.target.value,
        }, () => this.checkValidation());
    }
    onChangeYear = (event) => {
        this.setState({
            year: event.target.value,
        }, () => this.checkValidation());
    }
    onChangeTerm = (event) => {
        this.setState({
            term: event.target.value,
        }, () => this.checkValidation());
    }
    onChangeCode = (event) => {
        this.setState({
            code: event.target.value,
        }, () => this.checkValidation());
    }
    onChangeSec = (event) => {
        this.setState({
            sec: event.target.value,
        }, () => this.checkValidation());
    }
    render() {
        const { onClickEdit, name, count } = this.props
        const { year, term, code, sec, subjectName, buttonDisabled } = this.state
        console.log('pop up del')
        return (
            <div>
                <IconButton style={{ color: 'yellow', backgroundColor: 'white' }} onClick={this.handleOpen} >
                    <img src={require('../photo/editButton.png')}
                        style={{ height: '3vw', width: '3vw' }}

                    />
                </IconButton >
                {/* <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={this.handleOpen} >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
                </svg> */}
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
                    <div className={'popUpContainerDel'} style={{ height: '60vh', width: '37vw' }} >
                        <div className={'popUpHeader'}  >
                            <p id={'popUpHeader'} >รายละเอียดรายวิชา</p>
                        </div>
                        <div className={'popUpCenterDel'} style={{ height: '45vh' }} >
                            <Grid container spacing={8} direction='column' style={{ height: '45vh' }} >
                                <Grid container item xs direction='row' >
                                    <Grid item xs />
                                    <Grid item xs={10} style={{ display: 'flex', flexDirection: 'row' }} >
                                        <p > {'ชื่อไฟล์ : '} </p>
                                        <p>{name}</p>
                                    </Grid>
                                    <Grid item xs />
                                </Grid>
                                <Grid container item xs direction='row' >
                                    <Grid item xs />
                                    <Grid item xs={4} >
                                        <TextField
                                            // className='textFieldPopUp'
                                            // hintText="Employee No."
                                            // errorText="This field is required"
                                            error={!this.state.validation.subjectName}
                                            helperText={this.state.validation.subjectName ? '' : 'กรุณากรอกชื่อวิชา'}
                                            label={'ชื่อวิชา'}
                                            value={subjectName}
                                            onChange={this.onChangeSubjectName}
                                        />
                                    </Grid>
                                    <Grid item xs />
                                    <Grid item xs={4} >
                                        <p> {` จำนวนนักศึกษา : ${count} `} </p>
                                    </Grid>
                                    <Grid item xs />
                                </Grid>
                                <Grid container item xs direction='row' >
                                    <Grid item xs />
                                    <Grid item xs={4} >
                                        <TextField
                                            // className='textFieldPopUp'
                                            // hintText="Employee No."
                                            // errorText="This field is required"
                                            // type="number"
                                            error={!this.state.validation.year || !this.state.validation.yearLen}
                                            helperText={this.state.validation.year ? this.state.validation.yearLen ? '' : 'กรุณากรอกให้ครบ 4 ตำแหน่ง' : 'กรุณากรอกปีการศึกษาเป็นตัวเลขเท่านั้น'}
                                            inputProps={{
                                                maxLength: 4
                                            }}
                                            label={'ปีการศึกษา'}
                                            value={year}
                                            onChange={this.onChangeYear}
                                        />
                                    </Grid>
                                    <Grid item xs />
                                    <Grid item xs={4} >
                                        <TextField
                                            // className='textFieldPopUp'
                                            select
                                            // hintText="Hint Text"
                                            // errorText=""
                                            label={'เทอม'}
                                            onChange={this.onChangeTerm}
                                            value={term || '1'}
                                            SelectProps={{
                                                native: true,
                                                MenuProps: {
                                                    // className: classes.menu,
                                                },
                                            }}
                                        >
                                            <option value="1">{' 1 '}</option>
                                            <option value="2">{' 2 '}</option>
                                            <option value="3">{' 3 '}</option>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs />
                                </Grid>
                                <Grid container item xs direction='row' >
                                    <Grid item xs />
                                    <Grid item xs={4} >
                                        <TextField
                                            // className='textFieldPopUp'
                                            // hintText="Employee No."
                                            // errorText="This field is required"
                                            error={!this.state.validation.code || !this.state.validation.codeLen}
                                            helperText={this.state.validation.code ? this.state.validation.codeLen ? '' : 'กรุณากรอกให้ครบ 8 ตำแหน่ง' : 'กรุณากรอกรหัสวิชาเป็นตัวเลขเท่านั้น'}
                                            inputProps={{
                                                maxLength: 8
                                            }}
                                            label={'รหัสวิชา'}
                                            value={code}
                                            onChange={this.onChangeCode}
                                        />
                                    </Grid>
                                    <Grid item xs />
                                    <Grid item xs={4} >
                                        <TextField
                                            // className='textFieldPopUp'
                                            // hintText="Employee No."
                                            // errorText="This field is required"
                                            error={!this.state.validation.sec}
                                            helperText={this.state.validation.sec ? '' : 'กรุณากรอกรหัสกลุ่มเป็นตัวเลขเท่านั้น'}
                                            inputProps={{
                                                maxLength: 3
                                            }}
                                            label={'กลุ่ม'}
                                            value={sec}
                                            onChange={this.onChangeSec}
                                        />
                                    </Grid>
                                    <Grid item xs />
                                </Grid>
                            </Grid>
                        </div>
                        <div className={'popUpBot'} >
                            <Button variant="raised" className={'popUpButton'} disabled={buttonDisabled} style={{ backgroundColor: buttonDisabled ? 'rgb(210, 210, 210)' : 'rgb(15, 111, 198)', color: 'white', fontFamily: 'bangna-new', fontWeight: 600 }} onClick={() => setTimeout(() => { this.props.setValidation(!buttonDisabled); onClickEdit(year, term, code, sec, subjectName); this.handleClose() }, 300)} > แก้ไข </Button>
                            <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: 'white', fontFamily: 'bangna-new', fontWeight: 600, marginLeft: '20px' }} onClick={() => setTimeout(() => { this.handleClose() }, 300)} > ยกเลิก </Button>
                        </div>
                    </div>
                </Dialog>
                {/* <Dialog  // disabled={buttonDisabled} buttonDisabled ? 'rgb(210, 210, 210)' : 'rgb(15, 111, 198)',
                    // title="Edit"
                    // actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {/* <div className={'popUpContainerDel'}  >
                        <div className={'popUpHeader'} >
                            <p id={'popUpHeader'} >ยืนยันการลบข้อมูล</p>
                            <p id={'popUpHeader'} onClick={() => { this.handleClose() }} >X</p>
                        </div>
                        <div className={'popUpCenterDel'} >
                            <p>คุณต้องการลบข้อมูล หรือไม่</p>
                        </div>
                        <div className={'popUpBot'} >
                            <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: '#d9534f', color: 'white', fontWeight: 600 }} onClick={() => { onClickDelete(); this.handleClose() }} > ใช่ </Button>
                            <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: 'white', fontWeight: 600, marginLeft: 20 }} onClick={() => { this.handleClose() }} > ไม่ใช่ </Button>
                        </div>
                    </div>
 

                </Dialog> */}
            </div>
        );
    }
}
