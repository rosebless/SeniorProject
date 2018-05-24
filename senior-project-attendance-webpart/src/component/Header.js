
import React from 'react'
import Grid from '@material-ui/core/Grid';
// import '../css/Header.css'

export default class Import extends React.Component {
    render() {
        return (
            <Grid id='header' container spacing={24}>
                <Grid item xs={12} sm={3} >
                    <p className='headerTxt' > ATTENDANCE </p>
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={3} > 
                    <p className='headerTxt' > {this.props.pageName} </p>
                </Grid>
            </Grid>
            // <div id='header' >
            //     <p className='headerTxt' > ATTENDANCE </p>
            //     <p className='headerTxt' > {this.props.pageName} </p>
            // </div>
        );
    }
}

