
import React from 'react'
import PropType from 'prop-types'
import SubjectItem from './SubjectItem'
import { List } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SubjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    formatFileToSubject = (file) => ({
        id: file.id,
        name: file.name,
        addedTime: file.addedTime
    })

    formatForEx = (file) => ({
        id: [file.id, 'xlsx'].join('.'),
        name: file.name,
        checked: file.checked
    })

    render() {
        const { files, mode, cancelSelection, onChecked, height } = this.props
        // console.log(files)
        return (
            // this.props.history.push('/page-2')
            // <div style={{ overflow: 'hidden' }} >
            <List
                style={{
                    // display: 'flex',
                    // flexDirection: 'column',
                    height,
                    // backgroundColor:'red',
                    // alignItems: 'center',
                    position: 'relative',
                    overflow: 'auto',
                    border: 'thick solid rgb(15, 111, 198)',
                    padding: '0 1vw 0 1vw',
                    // overflow: 'hidden'
                }} >
                {
                    this.props.loading
                        ? (
                            <div className='loading' >
                                <CircularProgress size={'10vh'} style={{ color: 'rgb(15, 111, 198)' }} />
                            </div>
                        )
                        : files.map((file, index) => {
                            const subject = mode == 'import' ? this.formatFileToSubject(file) : this.formatForEx(file)
                            // console.log('file.id', file.id)
                            const propForEdit = mode == 'import' && {
                                name: file.name,
                                year: file.subject.subjectYear,
                                term: file.subject.subjectTerm,
                                code: file.subject.subjectID,
                                count: file.subject.count,
                                subjectName: file.subject.name
                            }
                            return (<SubjectItem mode={mode} subject={subject} key={index} validation={file.validation} setValidation={validate => this.props.setValidation(file.id, validate)} propForEdit={propForEdit}
                                cancelSelection={cancelSelection} onClickEdit={(year, term, code, sec, subjectName) => this.props.onClickEdit(file.id, year, term, code, sec, subjectName)}
                                onChecked={() => onChecked(index)}
                            />)
                        } // ใช้วงเล็บ แล้วจะมองเป็น return ถ้าใช้ ปีกกาต้องใส่เอง
                        )
                }
            </List>
            // </div>
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