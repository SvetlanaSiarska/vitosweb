import React, { Component} from 'react'


class Gallery extends Component  {

    
    render() {
        const {marginTop} = this.props;
        const style = (marginTop && marginTop>0)?{marginTop} :{};
        return ( <div style={style} >    GALLERY
              <br/>
                    <div style={{margin:'20px',width:"65%"}}>
                        <span >Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
                            ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore 
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </span>                        
                    </div>
                    <div style={{margin:'20px',width:"65%"}}>
                        <span >Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
                            ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore 
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </span>                        
                    </div>
                    <div style={{margin:'20px',width:"90%"}}>
                        <span >Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
                            ipsum dolor sit amet,
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                            invidunt ut labore et dolore 
                            magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                            et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </span>                        
                    </div>
                </div>);
    }
    
  }


export default (Gallery);

