import React from 'react';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
// import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PopUpDel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }

    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { onClickDelete } = this.props
        console.log('pop up del')
        return (
            <div>
                <IconButton style={{ color: '#d9534f', backgroundColor: 'white' }} onClick={this.handleOpen} >
                    <img src={require('../photo/cancelButton.png')}
                        style={{ height: '3vw', width: '3vw' }}

                    />
                </IconButton >
                {/* <svg viewBox="0 0 24 24" style={{ height: 50, width: 50 }} onClick={this.handleOpen} >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
                </svg> */}
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-dialog-title" >
                    <div className={'popUpContainerDel'} >
                        <div className={'popUpHeader'}  >
                            <p id={'popUpHeader'} >ยืนยันการลบข้อมูล</p>
                        </div>
                        <div className={'popUpCenterDel'} >
                            <p>คุณต้องการลบข้อมูล หรือไม่</p>
                        </div>
                        <div className={'popUpBot'} >
                            <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: '#d9534f', color: 'white', fontFamily: 'bangna-new', fontWeight: 600 }} onClick={() => setTimeout(() => { onClickDelete(); this.handleClose() }, 300)} > ใช่ </Button>
                            <Button variant="raised" className={'popUpButton'} style={{ backgroundColor: 'white', fontFamily: 'bangna-new', fontWeight: 600, marginLeft: '20px' }} onClick={() => setTimeout(() => { this.handleClose() }, 300)} > ไม่ใช่ </Button>
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
