import React from 'react'
import './Style.css';

function ImageUpload(props) {

    return (
        
        <div className='upload_form'>
            <form
                
                onChange={props.change} 
                onSubmit={props.submission}
            >
                <div className='input_wrapper'>
                    
                    <input className="browse" type="file" ref={props.fileInput}/>
                    <img className='preview' src={props.content}/>
                </div>
                <button className='button_image' type="submit">Upload
                
                </button>
                <p>
                    Filename: {props.filename}
                </p>
                
                
            </form>
        </div>
        
    )
}

export default ImageUpload
