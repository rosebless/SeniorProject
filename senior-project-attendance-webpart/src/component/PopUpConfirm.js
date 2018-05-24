import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
// import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress'
import blue from '@material-ui/core/colors/blue';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PopUpConfirm extends React.Component {

    handleOpen = () => {
        this.props.handleOpen()       
    };

    handleClose = () => {
        this.props.handleClose()
    };

    render() {
        const { transaction, onClickConfirm } = this.props
        console.log('pop up del')
        const buttonDisabled = transaction === 'pending'
        const [textStart, textPending, textFinish] = this.props.mode === 'import'
            ? ['คุณต้องการเพิ่มราวิชา หรือไม่', 'กำลังลังเพิ่มราวิชา...', 'การเพิ่มราวิชา สำเร็จ']
            : ['คุณต้องการนำข้อมูลออก หรือไม่', 'กำลังลังนำข้อมูลออก...', 'การนำข้อมูลออก สำเร็จ']
        return (
            <div>
                {/* <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={this.handleOpen} >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
                </svg> */}
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
                    <div className={'popUpContainerDel'} >
                        <div className={'popUpHeader'}  >
                            <p id={'popUpHeader'} >ยืนยันการนำเข้าข้อมูล</p>
                        </div>
                        <div className={'popUpCenterDel'} >
                            {
                                transaction === 'pending' &&
                                <CircularProgress style={{ color: 'rgb(15, 111, 198)', position: 'absolute' }} />
                            }
                            <p>
                                {
                                    transaction === 'wait confirm'
                                        ? textStart
                                        : transaction === 'pending'
                                            ? textPending
                                            : textFinish
                                }
                            </p>
                        </div>
                        {
                            // this.state.transaction === 'pending' &&
                            // <LinearProgress style={{ color: blue[600], backgroundColor: 'rgb(15, 111, 198)' }} />
                        }
                        <div className={'popUpBot'} >
                            <Button disabled={buttonDisabled} variant="raised" className={'popUpButton'} style={{ backgroundColor: buttonDisabled ? 'rgb(210, 210, 210)' : 'rgb(15, 111, 198)', color: 'white', fontFamily: 'bangna-new', fontWeight: 600 }} onClick={() => setTimeout(() => { onClickConfirm() }, 300)} >
                                {
                                    transaction === 'wait confirm'
                                        ? 'ใช่'
                                        : transaction === 'pending'
                                            ? 'ใช่'
                                            : 'ตกลง'
                                }
                            </Button>
                            <Button disabled={buttonDisabled} variant="raised" className={'popUpButton'} style={{ backgroundColor: buttonDisabled ? 'rgb(210, 210, 210)' : 'white', fontFamily: 'bangna-new', fontWeight: 600, marginLeft: '20px' }} onClick={() => setTimeout(() => { this.handleClose() }, 300)} >
                                {
                                    transaction === 'wait confirm'
                                        ? 'ไม่ใช่'
                                        : transaction === 'pending'
                                            ? 'ไม่ใช่'
                                            : 'ปิด'
                                }
                            </Button>
                        </div>
                    </div>
                </Dialog>
                {/* <Dialog
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
