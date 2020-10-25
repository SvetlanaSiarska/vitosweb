import React, { Component} from 'react'
import './Footer.css';
import '../App.css';


class ScreenInfo extends Component  {

    constructor() {
        super();
       
        this.state = {
          init:false,            
          };        
    }

    updateDimensions() {    
        
        const screen_availHeight = window.screen.availHeight;
        const screen_availWidth = window.screen.availWidth;
        const screen_colorDepth =  window.screen.colorDepth;
        const screen_height = window.screen.height ;
        const screen_pixelDepth =  window.screen.pixelDepth;
        const screen_width =  window.screen.width;
        const window_innerWidth = window.innerWidth;
        
        const screenWidth = Math.min(window.screen.width, window.innerWidth) ;
        const document_documentElement_clientWidth = document.documentElement.clientWidth;
        this.setState({ screen_availHeight, screen_availWidth, screen_colorDepth, 
            screen_height, screen_pixelDepth, screen_width, window_innerWidth,
            screenWidth, document_documentElement_clientWidth   });   
   
     }
   
    componentDidMount() {          
       this.updateDimensions();
       window.addEventListener("resize", this.updateDimensions.bind(this));
   }
   
   componentWillUnmount() {
     window.removeEventListener("resize", this.updateDimensions.bind(this));      
   }



    render() {  
        const {height, width} = this.props;
       const {screen_availHeight, screen_availWidth, screen_colorDepth, 
        screen_height, screen_pixelDepth, screen_width,
        window_innerWidth,
        screenWidth, document_documentElement_clientWidth } = this.state;
        return (  
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>

            <span>screen_availHeight: {screen_availHeight}</span> <br/>
            <span>screen_availWidth: {screen_availWidth}</span> <br/>
            <span>screen_colorDepth: {screen_colorDepth}</span> <br/>
            <span>screen_height: {screen_height}</span> <br/>
            <span>screen_pixelDepth: {screen_pixelDepth}</span> <br/>
            <span>screen_width: {screen_width}</span> <br/>
            <span>window_innerWidth: {window_innerWidth}</span> <br/>
            <span>screenWidth: {screenWidth}</span> <br/>
            <span>document_documentElement_clientWidth: {document_documentElement_clientWidth}</span> <br/>
            <span>width: {width}</span> <br/>
            <span>height: {height}</span> <br/>
        </div>
        );
    }    
}

export default ScreenInfo;



