import React from 'react'
import './Style.css';
import GreenButton from '../Buttons/GButton.js';

function ImageUpload(props) {

    let invalid_upload;
    let cont;
    if (props.validUpload === false){
        invalid_upload = 
        <p>
            Doesn't seem like that is a goose nor a pet. try again
        </p>
    }
    if (props.validUpload === true){
        cont = 
        <GreenButton className='button_image' colour='../../images/button.png' text='Continue'/>
    }

    return (
        
        <div className='upload_form'>
            <button className='cancel' onClick={props.close}/>
            <form
                className="formPart"
                onChange={props.change} 
                onSubmit={props.submission}>
                    {invalid_upload}
                    {cont}
                   <GreenButton className='button_image' colour='../../images/button.png' text='Upload' type="submit"/>
                
                <p>{props.prediction}</p>
                
                <div className='input_wrapper'>
                    
                  
                        <input className="browse" type="file"/>
                        <img className='preview' alt="" src={props.content}/>
                        
                </div>
                
            </form>
            <input onChange={props.animal_name} className='nameForm' type="text" placeholder="Whats their name?" name="name" required/>
            {/* <div className="error">{this.state.errors.login}</div> */}
        </div>
        
    )
}

export default ImageUpload
