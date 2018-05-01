
import React from 'react'
import PropType from 'prop-types'
import SubjectItem from './SubjectItem'

export default class SubjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    formatFileToSubject = (file) => ({
        name: file.name,
        addedTime: file.addedTime 
    })

    render() {
        const { files, mode, height, width, cancelSelection } = this.props
        return (
            // this.props.history.push('/page-2')
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 0.95 * 0.9 * 0.6 * width
            }} >
                {
                    files.map((file) => {
                        const subject = this.formatFileToSubject(file) 
                        console.log('file.id' ,file.id)
                        return (<SubjectItem mode={mode} subject={subject} key={file.id} id={file.id} height={height} width={width}
                            cancelSelection={cancelSelection} />)
                    } // ใช้วงเล็บ แล้วจะมองเป็น return ถ้าใช้ ปีกกาต้องใส่เอง
                    )

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