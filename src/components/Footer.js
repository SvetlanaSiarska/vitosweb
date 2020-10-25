import React, { Component} from 'react'
import { connect } from 'react-redux';

import './Footer.css';
import '../App.css';
import '../css/typography.css';
import {NAVIGATION_MOBILE} from '../actions/types'


class Footer extends Component  {

    constructor() {
        super();
       
        this.state = {
          init:false,       
          hover:[false],        
          };
          this.onClick = this.onClick.bind(this);
          this.handleHover = this.handleHover.bind(this);
    }

    onClick( ) {

        const { history} = this.props;
        history.push(`/contact` );
    }

    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }

    renderFooterInfoMobile () {
        const {hover} = this.state;         
        const {FooterInfoTitleSize, FooterInfoFont1Size, FooterInfoFont2Size, 
            FooterInfoFont3Size} = this.props;
        const fbImg=hover[0]?"../images/fb-hover.svg":"../images/fb.png";
        const FooterInfoTitleStyle = {fontSize: `${FooterInfoTitleSize}px`};
        const FooterInfoFont1Style = {fontSize: `${FooterInfoFont1Size}px`};
        const FooterInfoFont2Style = {fontSize: `${FooterInfoFont2Size}px`};
        const FooterInfoFont3Style = {fontSize: `${FooterInfoFont3Size}px`};
        const width = `${2.29*FooterInfoFont2Size}px`;
        const width2 = `${1.9*FooterInfoFont2Size}px`;

        return (  
<div className="borderTest footer_info_mobile">

    <div className="borderTest footer_info_row" style={{padding:'20px 50px'}}> 

        <div className="footer_info_column"  style={{flex:1}}>
             <div className="footer_info_title" style={FooterInfoTitleStyle}>Kontakt</div>  
                <div className="footer_info_font1" style={FooterInfoFont1Style}>E-mail:</div>
                <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems:'center' }}>
                <div className="footer_info_font2" style={FooterInfoFont2Style}>zum Formular </div>
                <div onClick={this.onClick.bind(this)} 
                    className=" footer_info_row" 
                    style={{justifyContent: 'flex-start', alignItems:'center', cursor:'pointer' }}>
                    <img  className="footerArrow" src="../images/arrow.svg" alt="zum Formular "/>
                </div>                         
            </div>

            <div className="borderTest" style={{height:'20px'}}></div>
            <div className="footer_info_font1" style={{margin:'5px 0px', ...FooterInfoFont1Style}}>Per Telefon:</div>
            <div className=" footer_info_row" style={{justifyContent: 'flex-start' }}>
                <div className="footer_info_font2" style={FooterInfoFont2Style}>078 629 59 11 </div>
            </div>
        </div>  
        <div className="borderTest footer_info_column"  style={{flex:1}}>
                <div className="footer_info_title" style={FooterInfoTitleStyle}>Downloads</div>
                <div className="borderTest" style={{height:'30px'}}></div>
                <div className="borderTest  footer_info_row" style={{justifyContent: 'flex-start',  alignItems: 'flex-start' }}>
                    <img className=" borderTest footerSvg" width={width} height={width} src="../images/download-icon.svg" alt="TVG Angebote und Geschäftsbedingungen"/>
                    <a className="footer_info_font2" style={FooterInfoFont2Style} href="../download/TVG_Sommer20_Trainer_Def.pdf" 
                    target="_blank" rel="noopener noreferrer" download> TVG Angebote und Geschäftsbedingungen</a>                               
                </div>
                <div className="borderTest footer_info_row" style={{justifyContent: 'flex-start',alignItems: 'flex-start' }}>
                    <img className="borderTest footerSvg" width={width} height={width} src="../images/download-icon.svg" alt="TVG Programm & Preisliste Sommer"/>
                    <a className="footer_info_font2" style={FooterInfoFont2Style} href="../download/TVG_Sommer_20_Preise_deff.pdf" 
                    target="_blank" rel="noopener noreferrer" download> TVG Programm & Preisliste Sommer </a>                                
                </div>
                <div className="borderTest footer_info_row" style={{justifyContent: 'flex-start',alignItems: 'flex-start' }}>
                    <img className="borderTest footerSvg" width={width} height={width} src="../images/download-icon.svg" alt="Anmeldeformular"/>
                    <a className="footer_info_font2" style={FooterInfoFont2Style} href="../download/Anmeldeformular_2020_def.pdf" 
                    target="_blank" rel="noopener noreferrer" download> Anmeldeformular 2019 </a>                                
                </div>    
        </div>  
    </div>


    <div className="borderTest footer_info_row" style={{padding:'20px 50px'}}> 

        <div className="footer_info_column"  style={{flex:1}}>
           <div className="footer_info_title" style={FooterInfoTitleStyle}>Links</div>
           <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'center' }}>
               <img className="footerSvg" width={width2} height={width2} src="../images/external-link-icon.svg" alt="Vitis Sportcenter"/>
               <a href="https://www.vitis-allschwil.ch/" target="_blank" rel="noopener noreferrer" 
               className="footer_info_font3" style={FooterInfoFont3Style}>
                   Vitis Sportcenter
               </a>                                                 
           </div>
           <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'center' }}>
               <img className="footerSvg" width={width2} height={width2} src="../images/external-link-icon.svg" alt="Basler Lawn Tennis Club"/>
               <a href="https://www.bltc.ch" target="_blank" rel="noopener noreferrer" className="footer_info_font3" style={FooterInfoFont3Style}>
                   Basler Lawn Tennis Club
               </a>                                                           
           </div>  
        </div>
        <div className="footer_info_column" style={{flex:1, justifyContent:'flex-end'}}>
            <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'center' }}>
               <img className="footerSvg" width={width2} height={width2} src="../images/external-link-icon.svg" alt="Hugi Pro Sport GmBH"/>
               <a href="https://www.hugiprosport.ch/" target="_blank" rel="noopener noreferrer" className="footer_info_font3" style={FooterInfoFont3Style}>
                   Hugi Pro Sport GmBH 
               </a> 
                                         
           </div>
           <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'center' }}>
               <img className="footerSvg" width={width2} height={width2} src="../images/external-link-icon.svg" alt="Wilson"/>                             
               <a href="https://www.wilson.com/de-de" target="_blank" rel="noopener noreferrer" className="footer_info_font3" style={FooterInfoFont3Style}>
                   Wilson
              </a>                                  
           </div> 
        </div>  
   </div>

   <div className="borderTest footer_info_row" style={{padding:'20px 50px'}}> 

        <div className="borderTest footer_info_column"  style={{flex:4}}>
            <div className="footer_info_title" style={FooterInfoTitleStyle}>Weiterempfehlen</div>
            <div className="borderTest footer_info_font1" style={FooterInfoFont1Style}>Follow us on our Social Media Channels:</div>
                    <div className="borderTest" style={{height:'13px'}}></div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start' }}>
                        <a href="https://www.facebook.com/gugolz.vito"  
                            className="footerSocialIcon" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onMouseEnter={()=>{this.handleHover(0);}} 
                            onMouseLeave={()=>{this.handleHover(0);}}
                            > 
                            <img className="footerSvg"  
                           src={fbImg} alt="facebook"/>
                        </a>                                                   
            </div>
         </div>
        <div className="footer_info_column" style={{flex:1, justifyContent:'flex-end'}}>
                
            </div>  
        </div>

   </div>

   );
    }

  

    renderFooterInfo() {
        const {hover} = this.state;         
        const {FooterInfoTitleSize, FooterInfoFont1Size, FooterInfoFont2Size, FooterInfoFont3Size} = this.props;
        const fbImg=hover[0]?"../images/fb-hover.svg":"../images/fb.png";
        const FooterInfoTitleStyle= {fontSize: `${FooterInfoTitleSize}px`};
        const FooterInfoFont1Style = {fontSize: `${FooterInfoFont1Size}px`};
        const FooterInfoFont2Style = {fontSize: `${FooterInfoFont2Size}px`};
        const FooterInfoFont3Style = {fontSize: `${FooterInfoFont3Size}px`};
        
        return (  <div className="borderTest footer_info">
        <div className="footer_info_column" style={{flex:1}}>
            <div className="footer_info_title" style={FooterInfoTitleStyle}>Kontakt</div>
            
           
            <div className="footer_info_font1" style={FooterInfoFont1Style}>E-mail:</div>
            <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems:'center' }}>
                <div className="footer_info_font2" style={FooterInfoFont2Style}>zum Formular </div>
                <div onClick={this.onClick.bind(this)} 
                    className=" footer_info_row" 
                    style={{justifyContent: 'flex-start', alignItems:'center', cursor:'pointer' }}>
                    <img  className="footerArrow" src="../images/arrow.svg" alt="zum Formular "/>
                </div>                         
            </div>

            <div className="borderTest" style={{height:'20px'}}></div>

            <div className="footer_info_font1" style={{margin:'5px 0px'}}>Per Telefon:</div>
            <div className=" footer_info_row" style={{justifyContent: 'flex-start' }}>
                <div className="footer_info_font2" style={FooterInfoFont2Style}>078 629 59 11 </div>
            </div>

        </div>
        <div className="footer_info_column" style={{flex:2, }}>
            <div className="borderTest footer_info_row"> 
                <div className="borderTest footer_info_column " style={{flex:1, paddingRight:'10px'}}>
                    <div className="footer_info_title" style={FooterInfoTitleStyle}>Downloads</div>
                    <div className="borderTest" style={{height:'30px'}}></div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start',  alignItems: 'flex-start' }}>
                        <img className="borderTest footerSvg" src="../images/download-icon.svg" alt="TVG Angebote und Geschäftsbedingungen"/>
                        <a className="footer_info_font2" style={FooterInfoFont2Style} href="../download/TVG_Sommer20_Trainer_Def.pdf" 
                        target="_blank" rel="noopener noreferrer" download> TVG Angebote und Geschäftsbedingungen</a>                               
                    </div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start',alignItems: 'flex-start' }}>
                        <img className="footerSvg" src="../images/download-icon.svg" alt="TVG Programm & Preisliste Sommer"/>
                        <a className="footer_info_font2" style={FooterInfoFont2Style} href="../download/TVG_Sommer_20_Preise_deff.pdf" 
                        target="_blank" rel="noopener noreferrer" download> TVG Programm & Preisliste Sommer </a>                                
                    </div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start',alignItems: 'flex-start' }}>
                        <img className="footerSvg" src="../images/download-icon.svg" alt="Anmeldeformular"/>
                        <a className="footer_info_font2" style={FooterInfoFont2Style} href="../download/Anmeldeformular_2020_def.pdf" 
                        target="_blank" rel="noopener noreferrer" download> Anmeldeformular 2019 </a>                                
                    </div>                           
                    

                </div>
                <div className="footer_info_column"  style={{flex:1, justifyContent:'flex-start'}}>
                    <div className="footer_info_title" style={FooterInfoTitleStyle}>Weiterempfehlen</div>
                    <div className="footer_info_font1" style={FooterInfoFont1Style}>Follow us on our Social Media Channels:</div>
                    <div className="borderTest" style={{height:'13px'}}></div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start' }}>
                        <a href="https://www.facebook.com/gugolz.vito"  
                            className="footerSocialIcon" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onMouseEnter={()=>{this.handleHover(0);}} 
                            onMouseLeave={()=>{this.handleHover(0);}}
                            > 
                            <img className="footerSvg"  
                           src={fbImg} alt="facebook"/>
                        </a>
                                                   
                    </div>

                </div>
            </div>

          
            <div className="borderTest footer_info_row" style={{padding:'20px 0px'}}> 

                 <div className="footer_info_column"  style={{flex:1}}>
                    <div className="footer_info_title" style={FooterInfoTitleStyle}>Links</div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <img className="footerSvg" src="../images/external-link-icon.svg" alt="Vitis Sportcenter"/>
                        <a href="https://www.vitis-allschwil.ch/" target="_blank" rel="noopener noreferrer" 
                        className="footer_info_font3" style={FooterInfoFont3Style}>
                            Vitis Sportcenter
                        </a> 
                                                
                    </div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <img className="footerSvg" src="../images/external-link-icon.svg" alt="Basler Lawn Tennis Club"/>
                        <a href="https://www.bltc.ch" target="_blank" rel="noopener noreferrer" className="footer_info_font3" style={FooterInfoFont3Style}>
                            Basler Lawn Tennis Club
                        </a>                                                           
                    </div>                          
                    
                 </div>
                 <div className="footer_info_column" style={{flex:1, justifyContent:'flex-end'}}>

                 <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <img className="footerSvg" src="../images/external-link-icon.svg" alt="Hugi Pro Sport GmBH"/>
                        <a href="https://www.hugiprosport.ch/" target="_blank" rel="noopener noreferrer" className="footer_info_font3" style={FooterInfoFont3Style}>
                            Hugi Pro Sport GmBH 
                        </a>                                                   
                    </div>
                    <div className=" footer_info_row" style={{justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <img className="footerSvg" src="../images/external-link-icon.svg" alt="Wilson"/>                             
                        <a href="https://www.wilson.com/de-de" target="_blank" rel="noopener noreferrer" className="footer_info_font3" style={FooterInfoFont3Style}>
                            Wilson
                       </a>                                  
                    </div> 
                 </div>
            </div>
        </div>
        </div> );
    }

    render() {  
        const { navigationType, FooterTextSize}  = this.props;         
        const mobile = (navigationType===NAVIGATION_MOBILE);
        const FooterTextStyle = {fontSize: `${FooterTextSize}px`};
       
        return (  
         <React.Fragment>
          
           {mobile && this.renderFooterInfoMobile()}
           {!mobile && this.renderFooterInfo()}

            <div className="borderTest footer">
                <span className="borderTest  footer_text" style={FooterTextStyle}>All rights reserved 2020</span>
            </div>

        </React.Fragment>
        );
    }    
}


const mapStateToProps = (state) => {    
    
   return {      
    navigationType: state.setup.navigationType,
    FooterInfoTitleSize: state.fonts.FooterInfoTitle.fontSize,
    FooterInfoFont1Size: state.fonts.FooterInfoFont1.fontSize,
    FooterInfoFont2Size: state.fonts.FooterInfoFont2.fontSize,
    FooterInfoFont3Size: state.fonts.FooterInfoFont3.fontSize,
    FooterTextSize: state.fonts.FooterText.fontSize,


   }
 }
 export default connect(mapStateToProps, {})(Footer);



