
import React from 'react'
import PropType from 'prop-types'
import SubjectItem from './SubjectItem'

export default class SubjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { subjects, mode, height, width, cancelSelection } = this.props
        return (
            // this.props.history.push('/page-2')
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 0.95 * 0.9 * 0.6 * width
            }} >
                {
                    subjects.map((subject, index) => ( // ใช้วงเล็บ แล้วจะมองเป็น return ถ้าใช้ ปีกกาต้องใส่เอง
                        <SubjectItem mode={mode} subject={subject} index={index} height={height} width={width}
                            cancelSelection={(index) => cancelSelection(index)} />
                    ))
                }
            </div>
        );
    }
}

SubjectList.propTypes = {
    subjects: PropType.array,
    mode: PropType.string.isRequired
}

SubjectList.defualtType = {
    subjects: []
} 