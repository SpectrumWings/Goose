import "./DialogueStyle.css"
import goose from '../../images/goose_head.png';

const Dial = (props) => {
    return (
        <div className="box"
        
        >
         
                <p className="content">
                    {props.text}
                </p>
                <button onClick={props.closeDia} className="closeButton">Close</button>
           
            <img src={goose} alt="Goose" className="dd"/>
        </div>
    )
}

export default Dial
