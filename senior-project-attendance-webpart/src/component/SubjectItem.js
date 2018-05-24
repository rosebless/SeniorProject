
import React from 'react'
import PropType from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Checkbox, ListItem, ListItemText } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import Grid from '@material-ui/core/Grid';
import PopUpDel from './PopUpDel'
// import '../css/SubjectItem.css'

const styles = {
    root: {
        color: blue[600],
        '&$checked': {
            color: blue[500],
        },
    },
    checked: {},
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
};

class SubjectItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    onChangeCheck = () => {
        this.setState((prevState) => ({ checked: !prevState.checked }))
    }

    render() {
        const { mode, subject: { id, name }, height, width } = this.props
        const heightAndWidth = 0.08 * 16.25 / 19 * height
        const { classes } = this.props
        console.log('id', id)
        return (
            // this.props.history.push('/page-2')
            <div >
                {
                    (mode === 'import')
                        ? (
                            <ListItem
                                style={{
                                    // borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.01 * 16.25 / 19 * height,
                                    borderRadius: '1vw', border: this.props.validation ?  'thick solid rgb(15, 111, 198)' : 'thick solid rgb(217, 83, 79)' ,
                                    fontSize: '1vw', margin: '1vw 0 1vw 0',
                                    color: this.props.validation ? 'rgb(15, 111, 198)' : 'rgb(217, 83, 79)' , backgroundColor: 'white'
                                }} >
                                <Grid container spacing={8} >
                                    <Grid item xs={4} >
                                        <p className="name" style={{color: this.props.validation ? 'rgb(15, 111, 198)' : 'rgb(217, 83, 79)'}} >
                                            {this.props.subject.addedTime}
                                        </p>
                                    </Grid>
                                    <Grid item xs={7} >
                                        <p className="name" style={{color: this.props.validation ? 'rgb(15, 111, 198)' : 'rgb(217, 83, 79)'}} >
                                            {name}
                                        </p>
                                    </Grid>
                                    <Grid container xs={1} direction='column' >
                                        <Grid item xs />
                                        <Grid item xs >
                                            <PopUpDel onClickDelete={() => { this.props.cancelSelection(id) }} />
                                        </Grid>
                                        <Grid item xs />
                                    </Grid>
                                </Grid>
                            </ListItem >
                            // <div className="containerItem"
                            //     style={{
                            //         height: 0.1 * 16.25 / 19 * height, width: 0.8 * 0.95 * 0.9 * 0.6 * width,
                            //         borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.01 * 16.25 / 19 * height,
                            //         fontSize: 0.03 * 16.25 / 19 * height, color: 'black',
                            //         paddingLeft: 0.1 * 0.95 * 0.9 * 0.6 * width, paddingRight: 0.1 * 0.95 * 0.9 * 0.6 * width
                            //     }} >
                            //     <ListItem button >
                            //         <p className="time" >
                            //             {this.props.subject.addedTime}
                            //         </p>
                            //         <p className="name" >
                            //             {name}
                            //         </p>
                            //         <img src={require('../photo/cancelButton.png')} // onClick={ (index) => {cancelSelect(index)} } 
                            //             style={{
                            //                 height: heightAndWidth, width: heightAndWidth
                            //             }} onClick={() => { this.props.cancelSelection(id) }}
                            //         />
                            //     </ListItem >
                            // </div>
                        )
                        : (
                            <ListItem button onClick={() => { this.props.onChecked() }}
                                style={{
                                    // borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.01 * 16.25 / 19 * height,
                                    borderRadius: '1vw', padding: '1vw', border: 'thick solid rgb(15, 111, 198)',
                                    fontSize: '1vw', margin: '1vw 0 1vw 0',
                                    color: 'rgb(15, 111, 198)', backgroundColor: 'white'
                                }} >
                                <Grid container spacing={8}>
                                    <Grid item xs={1} >
                                        <Checkbox className='checkbox'
                                            checked={this.props.subject.checked}
                                            onChange={() => this.props.onChecked()}
                                            // value="checkedB"
                                            // color="primary"  
                                            classes={{
                                                root: classes.root,
                                                checked: classes.checked,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={7} >
                                        <p className="name" >
                                            {name}
                                        </p>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <p className="name" style={{ textAlign: 'center' }} >
                                            {id}
                                        </p>
                                    </Grid>
                                </Grid>
                            </ListItem >
                            // <ListItem button onClick={() => {this.props.onChecked()}} >
                            //     <div className="containerItem"
                            //         style={{
                            //             height: 0.1 * 16.25 / 19 * height, width: 0.8 * 0.95 * 0.5 * width,
                            //             borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.01 * 16.25 / 19 * height,
                            //             fontSize: 0.03 * 16.25 / 19 * height, color: 'black', marginLeft: 8,
                            //             paddingLeft: 0.1 * 0.95 * 0.5 * width, paddingRight: 0.1 * 0.95 * 0.5 * width
                            //         }}  >

                            //             <Checkbox className='checkbox' 
                            //                 checked={this.props.subject.checked}
                            //                 onChange={() => this.props.onChecked()}
                            //                 // value="checkedB"
                            //                 // color="primary"  
                            //                 classes={{
                            //                     root: classes.root,
                            //                     checked: classes.checked,
                            //                 }}
                            //             />
                            //             <div style={{ width: 0.3 * width }} >
                            //                 <ListItemText className="name" >
                            //                     {name}
                            //                 </ListItemText>
                            //             </div>
                            //             <ListItemText className="name" >
                            //                     {id}
                            //                 </ListItemText>
                            //             <div />

                            //     </div> 
                            //     </ListItem >
                        )
                }
            </div>
        );
    }
}

SubjectItem.propTypes = {
    subject: PropType.object.isRequired,
    mode: PropType.string.isRequired,
    id: PropType.string.isRequired,
    cancelSelection: PropType.func
}

SubjectItem.defualtType = {
    cancelSelection: () => { }
}

export default withStyles(styles)(SubjectItem)