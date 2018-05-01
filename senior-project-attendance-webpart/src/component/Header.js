
import React from 'react'
import '../css/Header.css'

export default class Import extends React.Component { 
    render() { 
        const { pageName, height, width } = this.props
        // console.log(height, width)
        return (
            <div className = 'containerHeader' style={{  
                height: 3.75 / 19 * height,
                width: 0.9*width
            }}>
              <p style={{
                   fontSize: 1.5/19* height,
                   fontWeight: 'bolder',
                   color: '#fff' 
                }}>
                    ATTENDANCE
                </p>
                <p style={{
                    fontSize: 1.5/19* height,
                    fontWeight: 'bold',
                    color: '#fff' 
                }}>
                    {pageName}
                </p>
            </div>
        );
    }
} 

