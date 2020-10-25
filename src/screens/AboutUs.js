import React, { Component} from 'react'
import { connect } from 'react-redux';

import {getNumber} from '../helpers/helpers'
import AboutUsPreview from '../components/AboutUsPreview'
import Registration from '../components/Registration'
import ImageGallery from '../components/ImageGallery'
import Trainers from '../components/Trainers'
import Skills from '../components/Skills'
import Download from '../components/Download'
import Courses from '../components/Courses'
import Sponsors from '../components/Sponsors'
import {NAVIGATION_MOBILE} from '../actions/types'

import './AboutUs.css';
import '../App.css';


class AboutUs extends Component  {
     
    constructor() {
        super();
    
        this.state = {
          init:false,
          height: 200,        
        };
        this.renderAboutUs = this.renderAboutUs.bind(this);
        this.renderAboutUsMobile = this.renderAboutUsMobile.bind(this);
        this.renderAboutUs2 = this.renderAboutUs2.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));

        if(this.divElement) {           
            this.updateDimensions();
        }                    
    }
    updateDimensions() {               
        
        if(this.divElement) {     
            const obj = this.divElement.getBoundingClientRect();
            const { height, width } = obj;  

            this.setState({height, width})           
        }    
        if(this.divElementImg) {
            const obj = this.divElementImg.getBoundingClientRect();
            const { width} = obj;  
            const heightImg = width/2*1.5;
           

            this.setState({heightImg})           
        }  
        if(this.divElementHeight) {
            const obj = this.divElementHeight.getBoundingClientRect();
            const { height} = obj;  
         
            this.setState({screenHeight:height})    

        }
    }
   
    renderAboutUs() {
       
        const {height, heightImg} = this.state;
        const {screenHeight, ContainerText} = this.props;

        const diff = (height>heightImg)?50:0;
        const main_box_height = Math.round(
            Math.max(height, heightImg) + diff + 0.0*screenHeight)      ;
        
        //console.log('screenHeight', screenHeight)


        //console.log('main_box_height', main_box_height)
        //console.log('height', height)
        //console.log('heightImg', heightImg)
        const style_main = {height: `${main_box_height}px`};  
        const styleImgBox = {height: `${height}px`};  
        const containerTextStyle= {fontSize: `${ContainerText}px`}
        return (       
          
        <div className=" borderTestGreen au_primary" style={style_main}>           
           
            <div className="borderTestBlue au_2 container_text" style={containerTextStyle}
                ref={ (divElement) => this.divElement = divElement} >
            
                Als Leiter der Tennischule TVG ist Vito Gugolz nicht nur im Besitze 
                der höchsten Tennis-Trainerausbildungen (Swiss Olympic Trainer, 
                Wettkampftrainer A, J&S-Instruktor & Kids Tenns Leiter) 
                sondern hat auch den Universitätsabschluss der Sportwissenschaften
                 I&II absolviert. Diese umfassende Grundausbildung ist die Substanz, 
                 aus welcher sich die TVG-Philosophie entwickelt hat:
                 <div className="au_2_1">
                     <div className="au_2_1_1">
                     <div className="container_text  au_2_text_1" style={containerTextStyle}>→</div>
                        <div className="container_text  au_2_text_2" style={containerTextStyle}>Perfekte Technik als Basis für langfristigen Erfolg und Freude</div>
                    </div>
                    <div className="au_2_1_1">
                        <div className="container_text  au_2_text_1" style={containerTextStyle}>→</div>
                        <div className="container_text  au_2_text_2" style={containerTextStyle}>Pädagogischer und methodisch sinnvoller Unterricht</div>
                    </div>
                    <div className="au_2_1_1">
                        <div className="container_text  au_2_text_1" style={containerTextStyle}>→</div>
                        <div className="container_text  au_2_text_2" style={containerTextStyle}>Spiel und Spass auf jeder Alters- und Leistungsstufe</div>
                    </div>
                </div>
            </div>

            <div className="borderTestBlue au_1" 
                ref={ (divElement) => this.divElementImg = divElement} >
                    <img className="" width="100%" src="../images/aboutUs.jpg" alt=""/> 
            </div>
        </div>
       
        );
    }
    renderAboutUsMobile() {
       
        const {height, heightImg} = this.state;
        const {screenHeight, ContainerText} = this.props;

        const diff = (height>heightImg)?50:0;
        const main_box_height = Math.round(
            Math.max(height, heightImg) + diff + 0.0*screenHeight)      ;
        
        //console.log('screenHeight', screenHeight)


        //console.log('main_box_height', main_box_height)
        //console.log('height', height)
        //console.log('heightImg', heightImg)
        const style_main = {height: `${main_box_height}px`};  
        const styleImgBox = {height: `${height}px`};  
        const containerTextStyle= {fontSize: `${ContainerText}px`}
        return (       
          
        <div className=" borderTestGreen  aboutUs_box_mobile"  > 

            <div className="borderTest" style={{height:'50px'}}></div>  
           <div className="borderTestBlue " >
                <img className="" width="100%" src="../images/aboutUs.jpg" alt=""/> 
            </div>
            <div className="borderTest" style={{height:'20px'}}></div>  
            <div className="borderTestBlue  container_text" style={containerTextStyle} >
            
                Als Leiter der Tennischule TVG ist Vito Gugolz nicht nur im Besitze 
                der höchsten Tennis-Trainerausbildungen (Swiss Olympic Trainer, 
                Wettkampftrainer A, J&S-Instruktor & Kids Tenns Leiter) 
                sondern hat auch den Universitätsabschluss der Sportwissenschaften
                 I&II absolviert. Diese umfassende Grundausbildung ist die Substanz, 
                 aus welcher sich die TVG-Philosophie entwickelt hat:
                 <div className="au_2_1">
                     <div className="au_2_1_1">
                     <div className="container_text  au_2_text_1" style={containerTextStyle}>→</div>
                        <div className="container_text  au_2_text_2" style={containerTextStyle}>Perfekte Technik als Basis für langfristigen Erfolg und Freude</div>
                    </div>
                    <div className="au_2_1_1">
                        <div className="container_text  au_2_text_1" style={containerTextStyle}>→</div>
                        <div className="container_text  au_2_text_2" style={containerTextStyle}>Pädagogischer und methodisch sinnvoller Unterricht</div>
                    </div>
                    <div className="au_2_1_1">
                        <div className="container_text  au_2_text_1" style={containerTextStyle}>→</div>
                        <div className="container_text  au_2_text_2" style={containerTextStyle}>Spiel und Spass auf jeder Alters- und Leistungsstufe</div>
                    </div>
                </div>
            </div>

            
        </div>
       
        );
    }

    renderAboutUs2() {
        const {ContainerText, QuoteText} = this.props;
        const containerTextStyle= {fontSize: `${ContainerText}px`};
        const quoteTextStyle= {fontSize: `${QuoteText}px`}
        return (
            <div className="borderTest au_secondary" >
                <div className="quoteText" style={quoteTextStyle}>
                    Von 1999-2001 betreute Vito Gugolz zudem Patty Schnyder 
                    (ex. Weltrangliste Nr. 7)
                    auf der WTA-Tour.
                 </div> 
                 <div className="borderTest" style={{height:'20px'}}></div>         
                <div className="container_text" style={containerTextStyle}>
                    Die Erfolge als Tennis- und Fitnesscoach auf Weltklasse-Niveau 
                    sind wichtige 
                    Bausteine welche für die TVG-Qualität sprechen.
                </div> 
                <div className="borderTest" style={{height:'20px'}}></div>  
            </div>);

    }
    render() {
        const {navigationType} = this.props;
        const mobile =  (navigationType===NAVIGATION_MOBILE);      
        return ( 
            <React.Fragment>
                  <div className="borderTestGreen " style={ { position:'absolute', top:'0px', left:'0px', height:'100%', width:'100px'}}
            ref={ (divElement) => this.divElementHeight = divElement} ></div>

                <AboutUsPreview />
                <div className="borderTest" style={{height:'50px'}}></div>                    
                {mobile && this.renderAboutUsMobile()}
                {!mobile && this.renderAboutUs()}
                <div className="borderTest" style={{height:'20px'}}></div>   
                {this.renderAboutUs2()}
                <div className="borderTest" style={{height:'50px'}}></div>                   
                <Skills/>
                <div className="borderTest" style={{height:'50px'}}></div>
                <ImageGallery history={this.props.history}/>

                <Sponsors/>
                <div className="borderTest" style={{height:'50px'}}></div>
                <Trainers/>
                <div className="borderTest" style={{height:'50px'}}></div>
                <Courses history={this.props.history}/>
                <div className="borderTest" style={{height:'50px'}}></div>
                <Download/>
                <div className="borderTest" style={{height:'50px'}}></div>
                <Registration history={this.props.history}/>
            </React.Fragment>);
        
    }    
  }

  const mapStateToProps = (state) => {    
    return {
        screenHeight: state.fonts.screenHeight,
        navigationType: state.setup.navigationType,
        ContainerText: state.fonts.ContainerText.fontSize,
        QuoteText: state.fonts.QuoteText.fontSize
    }
  }
  export default connect(mapStateToProps, {
     
  })(AboutUs);
  