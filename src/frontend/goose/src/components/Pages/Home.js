import React from 'react'
import './HomeStyle.css';
import goose from '../../images/goose_head.png';
import ImageUpload from '../../components/ImageUpload/Index'
import Login from '../../components/Auth/Login'

const MainPage = (props) => {
    let loginSet;
    let uploadSet;
    let uploadDisplay;
    let messageBlock;
    let loginPage;
    let reback;

    if (props.convo_prog === 1){
        loginPage = <Login continueLogin={props.continueLogin} name={props.name} authenticated={props.authenticated} setTokenLogin={props.setTokenLogin} login={props.login} guestLogin={props.guestLogin}/>
    }

    if (props.convo_prog === 2){
        loginSet = 
        <div className='upload_option'>
  
            <div className='got' onClick={props.go_upload}>I've got a Picture of a Goose</div>

            <div className='g' onClick={props.go_upload}>No, but I've got a Pet</div>

            <div className='no' onClick={props.no_upload}>Nope</div>
            
        </div>
    }

    if (props.convo_prog === 3 && props.action === false){
        uploadSet = 
        <div className='upload_option'>
            <div className = 'book' onClick={props.upload_form}>
            </div>
            
        </div>
    }


    if (props.convo_prog === 4 || props.convo_prog === 5){
        reback = 
        <div className='upload_option'>
  
            <div className='got' onClick={props.return_convo}>Wait, let take me back</div>
            
        </div>
    }

    
    if (props.action === true){
        uploadDisplay = 
        <section>

        <ImageUpload 
            animal_name={props.animal_name}
            close={props.close_upload} 
            prediction={props.prediction}
            submission={props.submission} 
            change={props.change} 
            filename={props.filename} 
            content={props.content}
            validUpload={props.validUpload}
            animalName={props.animalName}
            />
        </section>
      }

    if (props.action === false){
        messageBlock = 
        <p>
            {props.message}
            
        </p>
    }



    return (
        <div className='background'>
            <div className='intro'>
                {uploadDisplay}
                {loginPage}
                <div className="message" onClick={props.convo}>
                    {messageBlock}
                    {reback}
                    {loginSet}
                    {uploadSet}
                </div>
                {/* <ErrorMessage message={this.error}/>*/}
            </div>
            <img src={goose} alt="Goose" className="goose"/>
        </div>
    )
}

export default MainPage
