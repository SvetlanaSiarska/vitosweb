import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NAVIGATION_MOBILE} from '../actions/types'
import './Preview.scss';
import '../App.css';
import '../css/typography.css';


class AboutUsPreview extends Component  {
   
    constructor() {
        super();
    
        this.state = {
          init:false,
          hover:[false],

        };
        this.onReadMore = this.onReadMore.bind(this);
        this.handleHover = this.handleHover.bind(this);

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.positionHeight !== this.props.positionHeight){
        }    
      
    }
    

    onReadMore( ) {
        const { history} = this.props;
        history.push(`/aboutus` );
    }

    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }
    
     render() {  
        const {infoLeft, infoHeight, navigationType, preview, heightInfoHeader, 
            marginMobileGrid, marginGrid,
            ContainerTitle1, ContainerTitle2, ContainerText, BoxButtonTextSize} = this.props;
        let {hover} = this.state;
        const s = hover[0]?{cursor:'pointer',color:'white'}:{cursor:'pointer'};
               
        const screenWidth = Math.min(window.screen.width, window.innerWidth) ;
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const margin= mobile?marginMobileGrid: marginGrid;
        const styleMargin= mobile?'5%':`${margin}px`;
        var marginTop = mobile? 50:50-(infoHeight-heightInfoHeader);
        const width = !mobile? infoLeft - 1.5*marginGrid: screenWidth- 2*marginGrid;
        const styleWidth = !mobile?`${width}px`:'90%'
        const st = mobile?{  alignItems: 'center'}:{};
        const textStyle = mobile? {textAlign: 'center'}:{textAlign: 'left'}
        const containerTitle1Style= {fontSize: `${ContainerTitle1}px`}
        const containerTitle2Style= {fontSize: `${ContainerTitle2}px`}
        const containerTextStyle= {fontSize: `${ContainerText}px`}
        const boxButtonTextStyle = {fontSize: `${BoxButtonTextSize}` } ;

        return (     
               
            <div className="container_preview borderTest" style={{
                marginLeft:`${styleMargin}`, 
                marginRight:`${styleMargin}`, 
                marginTop:`${marginTop}px`,             
                width:`${styleWidth}`,
                minHeight: `${infoHeight-40-50}px`,
                ...st
                }}> 

             
                <div className="container_title_1 " style={containerTitle1Style}>ÜBER UNS</div>
                <div className="container_title_2 "style={containerTitle2Style}>Tennisschule TVG</div>
                <div className="borderTest" style={{height:'20px'}}></div>
                <div className="container_text " style={{...textStyle, ...containerTextStyle}}>Tennis vereint Spaß und Technik, 
                    Strategie und Kampf, Schnelligkeit und Ausdauer, Kraft und Eleganz 
                    wie kaum eine andere Sportart. Es lohnt sich daher den Tennissport 
                    methodisch und technisch korrekt zu erlernen, sowie gezielt zu vertiefen 
                    und zu optimieren.
                </div>
                { preview&& preview===true && 
                    <div className="borderTest" style={{height:'47px'}}></div>
                }
                { preview&& preview===true &&                     
                    <div className="roundedButton " style={{cursor:'pointer'}} onClick={this.onReadMore}
                    onMouseEnter={()=>{this.handleHover(0);}} 
                    onMouseLeave={()=>{this.handleHover(0);}}
                    >
                       <div className="roundedButton_text" style={{...s, ...boxButtonTextStyle}}>Mehr lesen</div> 
                    </div>
                }
            </div>
        );
    }
    
}


const mapStateToProps = (state) => {    
    return {
       infoLeft: state.setup.leftInfoPosition,
       infoHeight: state.setup.heightInfo,
       navigationType: state.setup.navigationType,
       heightInfoHeader: state.setup.heightInfoHeader,
       marginGrid: state.setup.marginGrid,      
       marginGridTop: state.setup.marginGridTop,
       marginMobileGrid:  state.setup.marginMobileGrid,  
       ContainerTitle1: state.fonts.ContainerTitle1.fontSize,
       ContainerTitle2: state.fonts.ContainerTitle2.fontSize,
       ContainerText: state.fonts.ContainerText.fontSize,
       BoxButtonTextSize: state.fonts.BoxButtonText.fontSize,

   }
 }
 export default connect(mapStateToProps, {})(AboutUsPreview);



