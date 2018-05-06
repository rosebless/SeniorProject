
import React from 'react'

export default class Menu extends React.Component {

    constructor(props) {
        super(props)
    }

    toNextPage = (page) => {
        const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
        this.props.history.replace('/' + page, { professorKey, professorID, professorsName, photoUrl, mode: page })
    }

    render() {
        console.log(this.props)
        console.log(this.props.history.location.state.professorID)
        return (
            // this.props.history.push('/page-2')
            <div className='container' >
                <button onClick={() => { this.toNextPage('import') }} >
                    เพิ่มรายวิชา
                </button>
                <button onClick={() => { this.toNextPage('export') }} >
                    ส่งออกข้อมูล
                </button>
            </div>
        );
    }
}
