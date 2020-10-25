import React, { Component} from 'react'

import  Modal from './Modal'
import '../App.css';

class CloseModal extends Component  {

    renderModalContent(image) {
      
        const { callbackNo, callbackYes, message} = this.props; 
        var test = "Are you sure you want to remove this item  ?";   
        if(message) 
            test = message;
        return (  
            <div style={{display:'flex', flexDirection:'column', textAlign: 'center'}}>
            <span style={{fontSize:'30px'}}>{test}</span> <br></br>
                <div style={{display:'flex', flexDirection:'row', 
                             justifyContent:'space-around'}}>
                <button className="buttonBlue" onClick={callbackYes}> YES</button>
                <button className="buttonRed" onClick={callbackNo}>  NO</button>
                </div>  
            </div>  
        );
    }

    render() {     
        const {callbackNo} = this.props;           
        return (               
            <div>
            <Modal 
                content={this.renderModalContent()}
                onDismiss={callbackNo}
            />
        </div>
        );
    }    
}

export default CloseModal;



