import React, {Component} from 'react'
import { connect } from 'react-redux'

import './Info.css';
import '../css/typography.css';

import {fetchWeather} from '../actions/weather'
import {fetchInfoFirebase, updateInfoFirebase} from '../actions/updateInfo'
import {setInfoPosition, setOpenCloseInfo} from '../actions/positions'

import { INDOOR, OUTDOOR, NAVIGATION_MOBILE} from '../actions/types.js'

class Info extends Component  {

    constructor(props) {
        
        super(props);
        this.state = {init:false };
        this.updateInfo = this.updateInfo.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.openCloseInfo = this.openCloseInfo.bind(this);
    }
    
    
    updateDimensions() {         
                
        if(this.divElement && this.divInfoHeaderElement) {                                                       
           
            const obj = this.divElement.getBoundingClientRect();
            const {left, bottom, height } = obj;
            const objHeader = this.divInfoHeaderElement.getBoundingClientRect();
            const headerHeight = objHeader.height;
            const data = { left,  height, bottom, headerHeight};
            this.props.setInfoPosition(data);
        }        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.weather !== this.props.weather){
           this.updateDimensions();
        }    
        if(prevProps.opened!==this.props.opened) {
            this.updateDimensions();
        }
      }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentDidMount() {
        const {init} = this.state;

        window.addEventListener("resize", this.updateDimensions);

        if(init===false) {            
            this.setState({init:true}, ()=> {
                //console.log('fetchWeatherfetchWeatherfetchWeather', authenticated)
                this.props.fetchWeather();                              
                this.props.fetchInfoFirebase(); 
            });
        }
        if(this.divElement && this.divInfoHeaderElement) {  
            this.updateDimensions();
        }                     
    }
       
    updateInfo() {        
        const {info} = this.props;
        const {type} = info;
        var newType = INDOOR;
        if(type=== INDOOR)
            newType = OUTDOOR;
        this.props.updateInfoFirebase(newType);
    }

    openCloseInfo() {   
        this.props.setOpenCloseInfo();
        //this.updateDimensions();
    }

    renderHeader() {
        const { navigationType, info, authenticated, opened, screenWidth, InfoHeaderTitleSize,
        InfoHeaderTimeSize, CollapseSize, InfoSize, CollapseIconSize} = this.props;
        const {type, time} = info;
        const textCollapse = opened?"Collapse":"Expand";
        const iconBox =  `${CollapseIconSize}px`
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const iconBoxPadding =  mobile?`${Math.round( 4*screenWidth/375)}px`:4;
        const infoHeaderTitleStyle= {fontSize: `${InfoHeaderTitleSize}px` } ;
        const infoHeaderTimeStyle= {fontSize: `${InfoHeaderTimeSize}px` } ;
        const collapseStyle= {fontSize: `${CollapseSize}px` } ;
        const infoHeaderStyle= {height: `${InfoSize}px` } ;
        return (
        <div className="infoHeader borderTest"  style={infoHeaderStyle}
                ref={ (divElement) => this.divInfoHeaderElement = divElement}        
        >
            {!authenticated && <span className="borderTest infoHeaderTitleBox infoHeaderTitle" 
                style={infoHeaderTitleStyle} >
                                WE PLAY {type}  </span>
            }
            {authenticated && <button className="infoButton"
                            
                            onClick={this.updateInfo}>
                                <span className="infoHeaderTitle"  
                                 style={infoHeaderTitleStyle}>
                                    WE PLAY {type}
                                </span> 
                        </button>
            }
            <div className="borderTest infoHeaderTime infoHeaderTimeBox" style={infoHeaderTimeStyle} >{time} ago</div>
            <div className="borderTestBlue collapse collapseBox" onClick={this.openCloseInfo} style={collapseStyle}>{textCollapse}</div>
            <div className={!opened?"borderTest iconBoxCollapse iconDown": "borderTest iconBoxCollapse iconUp"} 
                style={{ padding:iconBoxPadding}}  onClick={this.openCloseInfo}>                
                 {  !authenticated  &&  <img src="../images/collapse.svg"  
                    style={{border:'none', outline: 'none'}} width={iconBox} alt={textCollapse}/>
                 }                  
            </div>
        </div>
        );
    }

    formatDateForInfo() {
        var d = new Date();       
        const monthStr = d.toLocaleString('de-DE', { month: 'long' });
        const  n = `${monthStr} ${d.getDate()}, ${d.getFullYear()}`;
        
        return n;
    }
/*
<React.Fragment>
    <span> {description}</span>
    <span> {temperature}°C</span> 
    <img src={src}  alt={description} height="50" width="50"/>
</React.Fragment>
*/
    render() {    
        const {authenticated, navigationType, opened, InfoSize,
            InfoWeather1, InfoWeather2, InfoWeather3,
             InfoLocation1, InfoLocation2} = this.props;    
       
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const w = 90;
        const styleInfoBox = mobile?{ marginTop:'0px', width:`${w}%`, paddingBottom: opened?'20px': '0px'}: 
                            { marginTop:`${-InfoSize}px`, marginRight:'86px', paddingBottom: opened?'20px': '0px'};
       
        const weatherIconSize= mobile?'30%':'70px';    
        const infoWeather1Style= {fontSize: `${InfoWeather1}px` } ;
        const infoWeather2Style= {fontSize: `${InfoWeather2}px` } ;
        const infoWeather3Style= {fontSize: `${InfoWeather3}px` } ;
        const infoLocation1Style= {fontSize: `${InfoLocation1}px` } ;
        const infoLocation2Style= {fontSize: `${InfoLocation2}px` } ;

        var classNameInfo = "info borderTest";
        if(authenticated) 
            classNameInfo = "infoAdmin";
    
        const {nodata, icon, description} = this.props.weather;
        const src = `https://openweathermap.org/img/w/${icon}.png`;
        return (
            <div className={classNameInfo} style={styleInfoBox}
                    ref={ (divElement) => this.divElement = divElement}
            >
                {this.renderHeader()}
                {!authenticated && opened &&
                    <div className="infoContent">              
                        { nodata===0 && 
                        
                        <div  style={{ display: 'flex', flexDirection: 'row', 
                            justifyContent:'space-between', marginBottom:'20px' }}> 
                            <div className="" 
                                style={{ display: 'flex', flexDirection: 'column',
                                   }}>
                                <span className="infoWeather1 borderTest" style={infoWeather1Style}>Heute</span>
                                <span className="infoWeather2 borderTest" style={infoWeather2Style}> {description}</span>
                                <span className="infoWeather3 borderTest" style={infoWeather3Style}> {this.formatDateForInfo()}</span>                            
                            </div>
                           
                            <img src={src}  className=" borderTest" 
                                alt={description} height={weatherIconSize} width={weatherIconSize}/>
                        </div>     

                        }
                        { nodata===1&&           
                            <span>no data available</span>                
                        }
                        <div   className="infoline"></div>
                        <div style={{height:'15px'}}></div>
                        <div className="infoLocation1" style={infoLocation1Style}> Where to find us?</div>
                        <div style={{marginTop:'5px'}}>
                            <div className="infoLocation2" style={infoLocation2Style}> Outdoor: Basler Lawn Tennis Club</div>
                            <div className="infoLocation2 infoLocation3" style={infoLocation2Style}>Gundeldingerstrasse 1a<br/>
                                4053 Basel
                            </div>
                        </div>
                        <div style={{marginTop:'5px'}}>
                            <div className="infoLocation2" style={infoLocation2Style}> Indoor: Vitis Sportcenter Allschwil</div>
                            <div className="infoLocation2 infoLocation3" style={infoLocation2Style}>Hegenheimermattweg 121<br/>
                            4123 Allschwil
                            </div>
                        </div>          
                    </div> 
                }
         </div>             
        );
    }
    
}
const mapStateToProps = (state) => {  
    return {
        weather: state.weather,
        info: state.info,
        authenticated: state.auth.authenticated,
        navigationType: state.setup.navigationType,
        opened : state.setup.infoOpened,
        InfoHeaderTitleSize: state.fonts.InfoHeaderTitle.fontSize, 
        InfoHeaderTimeSize: state.fonts.InfoHeaderTime.fontSize,
        CollapseSize: state.fonts.Collapse.fontSize,
        InfoSize: state.fonts.Info.size,
        CollapseIconSize: state.fonts.CollapseIcon.size,
        InfoWeather1: state.fonts.InfoWeather1.fontSize,
        InfoWeather2: state.fonts.InfoWeather2.fontSize,
        InfoWeather3: state.fonts.InfoWeather3.fontSize,
        InfoLocation1: state.fonts.InfoLocation1.fontSize,
        InfoLocation2: state.fonts.InfoLocation2.fontSize,
    
    }
  }

  export default connect(mapStateToProps,
     {  fetchWeather, 
        fetchInfoFirebase,
         updateInfoFirebase,
         setInfoPosition,
         setOpenCloseInfo })(Info);





