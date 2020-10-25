
import React, { Component} from 'react'
import { connect } from 'react-redux'

import './Registration.scss';
import '../App.css';
import '../css/typography.css';

import {NAVIGATION_MOBILE} from '../actions/types'

class Registration extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            init:false,
            hover:[false],
            };
        this.onClickForm = this.onClickForm.bind(this)    
        this.handleHover = this.handleHover.bind(this);
      }

    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }
    onClickForm() {
        const { history} = this.props;
        history.push('/registration');
    }

    render() {                
       const {hover} = this.state;
       const {BoxTextSize, BoxTitleSize, BoxFooterSize, BoxButtonTextSize} = this.props;
       const {navigationType} = this.props;
       const mobile = (navigationType ===NAVIGATION_MOBILE);
       
       const buttonWidth = mobile? '30%': '200px';
       const s = hover[0]?{cursor:'pointer', color: '#1c1a66'}:
            {cursor:'pointer',};
       
       const boxButtonTextStyle = {fontSize: `${BoxButtonTextSize}` } ;
       const boxTextStyle= {fontSize: `${BoxTextSize}px` } ;
       const boxTitleStyle= {fontSize: `${BoxTitleSize}px` } ;
       const boxFooterStyle= {fontSize: `${BoxFooterSize}px` } ;
       const containerStyle= mobile?{width: '90%', marginLeft: '5%'}:{ width: '80%', marginLeft: '10%'};
       const boxTextBoxStyle=mobile?{paddingLeft: '10%', paddingRight: '10%'}:
                {paddingLeft: '25%', paddingRight: '25%' }
        return (   
            <div className="containerRegistration"  style={containerStyle}>      
                <div className="topHalfCircle">
                    <i className="material-icons" style={{ paddingTop: '40px'}}>edit</i>
                </div>
                <div className="box"> 
                    <div className="boxTitleBox boxTitle" style={boxTitleStyle}>Anmeldungen</div>
                    <div className="borderTest boxTextBox boxText" style={{...boxTextStyle, ...boxTextBoxStyle}}>
                        Bitte die Anmeldekarte vollständig ausfüllen und möglichst alle 
                        Spielzeiten angeben, damit wir eine optimale Gruppeneinteilung vornehmen können.
                    </div>
                    <div className="borderTest" style={{height:'60px'}}></div>

                    <button className="roundedButton boxButton" style={{width:`${buttonWidth}px`, cursor:'pointer'}}
                     onMouseEnter={()=>{this.handleHover(0);}} 
                     onMouseLeave={()=>{this.handleHover(0);}}
                     >                          
                        <a className="boxButtonText" style={{...s, ...boxButtonTextStyle}} href="../download/Anmeldeformular_2020_def.pdf" 
                        target="_blank" rel="noopener noreferrer" download > 
                        Zum Formular
                        </a>
                    </button>


                    <div className="boxFooter" style={{...boxTextBoxStyle, ...boxFooterStyle}}>
                        Nicht besuchte Stunden verfallen und können nur in Ausnahmefällen 
                        nachgeholt werden. 
                        Die Tennislehrer können sich ausnahmsweise durch einen 
                        qualifizierten Tennislehrer vertreten lassen.
                    </div>
                </div>
            </div>      
        );
    }    
}

const mapStateToProps = (state) => {    
    
    
   return {
      navigationType: state.setup.navigationType,
      BoxTextSize: state.fonts.BoxText.fontSize,
      BoxTitleSize: state.fonts.BoxTitle.fontSize,
      BoxFooterSize: state.fonts.BoxFooter.fontSize,
      BoxButtonTextSize: state.fonts.BoxButtonText.fontSize,
     
      
  }
}
export default connect(mapStateToProps, {})(Registration);

