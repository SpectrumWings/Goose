import React from 'react'
import './Style.css'

const ErrorMessage = (props) => {
    return (
        <div className='error_message'>
           <p>{props.message}</p> 
        </div>
    )
}

export default ErrorMessage
