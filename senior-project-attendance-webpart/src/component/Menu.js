
import React from 'react'
import Header from './Header'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class Menu extends React.Component {

    toNextPage = (page) => {
        const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
        setTimeout(() => {
            this.props.history.push('/menu/' + page, { professorKey, professorID, professorsName, photoUrl, mode: page })
        }, 300)
    }

    render() {
        console.log(this.props)
        console.log(this.props.history.location.state.professorID)
        return (
            // this.props.history.push('/page-2')
            <div>
                <Header pageName={'เมนู'} />
                <Grid container spacing={24} direction='column' style={{ height: '80vh' }} >
                    <Grid item xs />
                    <Grid container >
                        <Grid item xs />
                        <Grid item xs >
                            <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }}
                                style={{ width: '100%', color: 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '3vw', borderRadius: '2vw', padding: '2vw', border: 'thick solid rgb(15, 111, 198)' }}
                                onClick={() => { this.toNextPage('import') }}
                            >
                                เพิ่มรายวิชา
                            </Button>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <Grid item xs />
                    <Grid container >
                        <Grid item xs />
                        <Grid item xs >
                            <Button variant="outlined" component="span" TouchRippleProps={{ style: { color: 'rgb(15, 111, 198)' } }}
                                style={{ width: '100%', color: 'rgb(15, 111, 198)', backgroundColor: 'white', fontFamily: 'bangna-new', fontSize: '3vw', borderRadius: '2vw', padding: '2vw', border: 'thick solid rgb(15, 111, 198)' }}
                                onClick={() => { this.toNextPage('export') }}
                            >
                                นำข้อมูลออก
                            </Button>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <Grid item xs />
                </Grid>

                {/* <div id='div' style={{ height: 16.25 / 19 * height, width, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                    <button onClick={() => { this.toNextPage('import') }}
                        className='button'
                        style={{
                            height: 1 / 5 * height, width: 1 / 3 * width,
                            borderRadius: 0.2 * 1 / 5 * height, marginTop: 0.2 * 1 / 5 * height,
                            fontSize: 0.5 * 1 / 5 * height
                        }} >
                        เพิ่มรายวิชา
                    </button> 
                    <div style={{height: 1 / 10 * height}} />
                    <button onClick={() => { this.toNextPage('export') }}
                        className='button'
                        style={{
                            height: 1 / 5 * height, width: 1 / 3 * width,
                            borderRadius: 0.2 * 1 / 5 * height, marginTop: 0.2 * 1 / 5 * height,
                            fontSize: 0.5 * 1 / 5 * height
                        }}>
                        นำข้อมูลออก
                    </button>
                </div> */}
            </div>

        );
    }
}
