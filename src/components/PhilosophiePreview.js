import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

import {NAVIGATION_MOBILE} from '../actions/types'
import './Preview.scss';
import '../App.css';
import '../css/typography.css';


class PhilosophiePreview extends Component  {
   
    constructor() {
        super();
    
        this.state = {
          init:false,
          };
          this.onReadMore = this.onReadMore.bind(this);

    }

    onReadMore( ) {
        const { history} = this.props;
        history.push(`/aboutus` );
    }
    
     render() {  
        const {infoLeft, infoHeight, navigationType, marginGrid, 
            heightInfoHeader, marginMobileGrid, 
            ContainerTitle4, ContainerTitle1, ContainerText} = this.props;
        
        const screenWidth = Math.min(window.screen.width, window.innerWidth) ;
        const mobile =  (navigationType===NAVIGATION_MOBILE );
        const margin= mobile?marginMobileGrid: marginGrid;
        const styleMargin= mobile?'5%':`${margin}px`;
        var marginTop = mobile? 50:50-(infoHeight-heightInfoHeader);
        const width = !mobile? infoLeft - 1.5*marginGrid: screenWidth- 2*marginGrid;
        const styleWidth = !mobile?`${width}px`:'90%'
        const st = mobile?{  alignItems: 'center'}:{}; 
        const textStyle = mobile? {textAlign: 'center'}:{textAlign: 'left'}
        const containerTitle4Style= {fontSize: `${ContainerTitle4}px`}
        const containerTitle1Style= {fontSize: `${ContainerTitle1}px`}
        const containerTextStyle= {fontSize: `${ContainerText}px`}
        return (     
               
            <div className="borderTest container_preview" style={{               
                marginLeft:`${styleMargin}`, 
                marginRight:`${styleMargin}`,
                marginTop:`${marginTop}px`,
                width:`${styleWidth}`,
                minHeight: `${infoHeight-40-50}px`,
                ...st}}> 

             
                <div className="container_title_1 " style={containerTitle1Style}>Perfektes Techniktraining als Basis</div>
                <div className="container_title_4 " style={containerTitle4Style}>Unsere Philosophie</div>
                <div className="borderTest" style={{height:'20px'}}></div>
                <div className="container_text " style={{...textStyle, ...containerTextStyle}}>
                Der Tennissport, welcher wie kaum eine andere Sportart Technik, Taktik, Schnelligkeit und Eleganz vereint, 
                 fordert von den Trainern viel Know-How für erfolgreichen und spannenden Unterricht!
                    Unsere Tenniskundschaft  soll entsprechend ihrer Motivation und Möglichkeit 
                    gefördert und gefordert werden, damit sie ihr Leistungspotenzial ausschöpfen kann 
                    und die Freude am Tennissport erleben kann. 

                </div>
               

               
            </div>
        );
    }
    
}


const mapStateToProps = (state) => {    
    
     const courses = _.map(state.courses.courses, (val, uid) => {      
        return {...val, uid };
      });

    return {
       navigationType: state.setup.navigationType,
       infoLeft: state.setup.leftInfoPosition,
       infoHeight: state.setup.heightInfo,
       heightInfoHeader: state.setup.heightInfoHeader,
       courses,
       marginGrid: state.setup.marginGrid,      
       marginGridTop: state.setup.marginGridTop,
       marginMobileGrid: state.setup.marginMobileGrid,
       ContainerTitle4: state.fonts.ContainerTitle4.fontSize,
       ContainerTitle1: state.fonts.ContainerTitle1.fontSize,
       ContainerText: state.fonts.ContainerText.fontSize,
       
   }
 }
 export default connect(mapStateToProps, {})(PhilosophiePreview);



