import React from "react";
import ReactDOM from "react-dom";


const ModalBig = props => {
    const JSX_MODAL = (
        <div className="ui dimmer modals visible active"
        onClick={props.onDismiss} >  
          <div className="ui standard modal visible active"
          style={{width:'100%', height:'90%'}}
           onClick={(e)=> e.stopPropagation()}>
             
             
           
                {props.content}
              
         
          </div>
        </div>
      );

    return ReactDOM.createPortal(JSX_MODAL, document.querySelector("#modal"));
}

export default ModalBig;