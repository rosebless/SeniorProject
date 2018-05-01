
import React from 'react'
import PropType from 'prop-types'
import '../css/SubjectItem.css'

export default class SubjectItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { mode, subject: { name, addedTime }, height, width, cancelSelection, id } = this.props
        const heightAndWidth = 0.08 * 16.25 / 19 * height
        console.log('id', id)
        return (
            // this.props.history.push('/page-2')
            <div >
                {
                    (mode === 'import')
                        ? (
                            <div className="containerItem"
                                style={{
                                    height: 0.1 * 16.25 / 19 * height, width: 0.8 * 0.95 * 0.9 * 0.6 * width,
                                    borderRadius: 0.02 * 16.25 / 19 * height, marginTop: 0.01 * 16.25 / 19 * height,
                                    fontSize: 0.03 * 16.25 / 19 * height, color: 'black',
                                    paddingLeft: 0.1 * 0.95 * 0.9 * 0.6 * width, paddingRight: 0.1 * 0.95 * 0.9 * 0.6 * width
                                }} >
                                <p className="time" >
                                    {addedTime}
                                </p>
                                <p className="name" >
                                    {name}
                                </p>
                                <img src={require('../photo/cancelButton.png')} // onClick={ (index) => {cancelSelect(index)} } 
                                    style={{
                                        height: heightAndWidth, width: heightAndWidth
                                    }} onClick={() => { cancelSelection(id) }}
                                />
                            </div>
                        )
                        : (
                            <div className="containerItem" >
                                <input />
                                <text className="time" >
                                    {addedTime}
                                </text>
                                <text className="name" >
                                    {name}
                                </text>
                            </div>
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
