import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './HamburgerMenu.css';
import '../App.css';
import {setMobileNavigationHeight, setMobileNavigationIcon} from '../actions/positions'


class NavigationMobile extends Component {
    
    constructor(props){
      super(props);
      this.state={
        menuOpen:false,
        info: true
      }
      this.handleLinkClick= this.handleLinkClick.bind(this);
      this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.infoVisible !== this.props.infoVisible){
          const {infoVisible} = this.props;
          this.setState({info: infoVisible});
      } 
      if(prevProps.offsetY !== this.props.offsetY){
        const {offsetY} = this.props;
        this.setState({offsetY});
        this.updateNavigationDimensions();
      }    
      if(prevState.screenWidth!==this.state.screenWidth) {
        this.updateNavigationDimensions();
      }        
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
      window.removeEventListener('scroll', this.listenToScroll.bind(this))

    }
    listenToScroll  ()  {       
      if(this.state.menuOpen) 
        window.scrollTo(0, 0);
    }

    updateDimensions() {   
        
      this.updateNavigationDimensions();
      
      if(this.divElementScreenWidth) {
        const obj = this.divElementScreenWidth.getBoundingClientRect();
        const {width} = obj;
        this.setState({screenWidth: width});
        //console.log('NAVIGYTION_screenWidth', width)
      }        
    }

    updateNavigationDimensions () {
      if(this.divElementNavBox) {         
        const obj = this.divElementNavBox.getBoundingClientRect();
        const { height } = obj;
        this.props.setMobileNavigationHeight(height);
      } 
      if(this.divElementNavStickyBox) {         
        const obj = this.divElementNavStickyBox.getBoundingClientRect();
        const { height } = obj;
        this.props.setMobileNavigationHeight(height);
      }  
    }

    handleMenuClick = () => {
      if(!this.state.menuOpen) 
        window.scrollTo(0, 0);
      this.setState({menuOpen:!this.state.menuOpen});     
    }
    
    handleLinkClick = (linkTo) => {
      const { history} = this.props;
      history.push(linkTo);
    }
    componentDidMount() {
      window.addEventListener('scroll', this.listenToScroll.bind(this))
      window.addEventListener("resize", this.updateDimensions.bind(this));
      this.updateDimensions();      
    }

    
    render(){
      const {navigationProps, HamburgerMenuSize } = this.props;
      const {offsetY,screenWidth} = this.state;

      const styles= 
        {
          container:{
            zIndex: '99',
            opacity: 1,
            display:'flex',
            flexDirection:'row',
            //alignItems:'flex-start', ////*** */
            justifyContent:'space-between',          
            width: '100%',
            padding: '10px 0px',
          },
          containerSticky:{
            position: 'fixed',
            top: '0',
            left:'0',
            zIndex: '99',
            opacity: 1,
            display:'flex',
            flexDirection:'row',
            alignItems:'flex-start', ////****/
            justifyContent:'space-between',          
            width: '100%',
            color:'red',
            boxShadow: '0 0 20px 10px rgba(115, 101, 237, 0.11)',
            padding: '10px 0px',
            //color: '#373091',           
          },
          rowRight:{            
             zIndex: '99',
             opacity: 1,
             display:'flex',
             flexDirection:'row',
             alignItems:'center',
             justifyContent:'center',          
           },
           rowLeft:{            
            zIndex: '99',
            opacity: 1,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',          
            marginLeft: '12px',               
          },
          logo: {
            margin: '0px 30px',
            cursor: 'pointer',
          },
          body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            filter: this.state.menuOpen ? 'blur(2px)':null,
            transition: 'filter 0.5s ease',
          },
        }
      const logo = true;
       
      const menu = ['Home','Tennisschule','Philosophie','Kursprogram', 'News', 'Kontakt']
      const menuLink = ['/', '/aboutus','/philosophie','/courses','/news', '/contact']
      const menuItemStyle= [navigationProps.items["home"],
                          navigationProps.items["aboutus"],
                          navigationProps.items["philosophie"],
                          navigationProps.items["courses"], 
                          navigationProps.items["news"],
                          navigationProps.items["contact"] ]
 
      const menuItems = menu.map((val,index)=>{
     
        return (
          <MenuItem 
            key={index} 
            linkTo={menuLink[index]} 
            name={menuLink[index]} 
            itemStyle ={menuItemStyle[index]}
            fontSize={HamburgerMenuSize}
            delay={`${index * 0.1}s`}
            onClick={()=> {this.handleLinkClick(menuLink[index]); 
                  this.setState({menuOpen: false});}}>{val}
            </MenuItem>)
      });

     
      const { menuOpen} = this.state;   
      const background = menuOpen?  '#7866ff': 'white';
      //const background = menuOpen?  'red': 'black';
      const showStickyHeader =   offsetY>10; // height/2;
      const logoWidth =  `${Math.round( 82*screenWidth/375)}px`;
   
      const boxShadowStyle= {boxShadow:navigationProps.showNavBorder?'0 0 20px 10px rgba(115, 101, 237, 0.11)':''}
      return(        
       <div>
         
              
          {!menuOpen&&
            <div className="borderTestGreen" style={{...styles.container, background}}   
                    ref={ (divElement) => this.divElementNavBox = divElement}   >
                          
              <div className="borderTest" style={{...styles.rowLeft,}} >
                 { logo &&                    
                    <div className="borderTest" style={styles.logo}>
                      <Link to="/"> 
                          <img src="../images/Logo-Negative.svg"  
                            style={{border:'none', outline: 'none'}} width={logoWidth} 
                            alt="Tennischule Vito Gugolz"/>
                        </Link>
                    </div>
                 
                  }
              </div>
              <div className="borderTest" 
                  style={{...styles.rowRight}}>
                   <ConnectedMenuButton screenWidth={screenWidth} open={menuOpen} 
                            onClick={this.handleMenuClick} />
               </div>
             
            </div>
          }
           {!menuOpen&&showStickyHeader&&
            <div className="" style={{...styles.containerSticky, background,  ...boxShadowStyle}}   
                    ref={ (divElement) => this.divElementNavStickyBox = divElement}   >
                          
              <div className="borderTest" style={{...styles.rowLeft, background}} >
                 { logo && 
                 <div style={styles.logo}>
                       <img src="../images/Logo-Negative.svg"  
                       style={{border:'none', outline: 'none'}} width={logoWidth} 
                       alt="Tennischule Vito Gugolz"/>
                  </div>}
                  
              </div>
              <div className="borderTest" style={{...styles.rowRight, background}}>
                <ConnectedMenuButton screenWidth={screenWidth} open={menuOpen} onClick={this.handleMenuClick} />
               </div>             
            </div>
          }
          <Menu screenWidth={screenWidth} handleMenuClick={this.handleMenuClick} open={menuOpen}>
            {menuItems}
          </Menu>
          <div className="screenWidth" ref={ (divElement) => this.divElementScreenWidth = divElement}  />
          <div className="screenHeight " ref={ (divElement) => this.divElementScreenHeight = divElement} />
        </div>
      )
    }
  }
  
  /* MenuItem.jsx*/
  class MenuItem extends Component{
    constructor(props){
      super(props);
      this.state = {
        hover:false,
      }      
    }
    

    handleHover(){
      this.setState({hover:!this.state.hover});
    }
    
    
    render(){
      const withLine = false; 
      const styles={
        container: {
          opacity: 0,
          animation: '1s appear forwards',
          animationDelay:this.props.delay,          
        },
        
        item:{
          fontFamily:'Lato',
          fontSize: '30px',
          padding: '30px 0',
          margin: '0 5%',
          cursor: 'pointer',
          fontWeight: '500',
          fontStretch: 'normal',
          fontStyle: 'normal',
          lineHeight: 'normal',
          letterSpacing: 'normal',
          color: this.state.hover? 'gray':'#ffffff',
          transition: 'color 0.2s ease-in-out',
          animation: '0.5s slideIn forwards',
          animationDelay:this.props.delay,           
        },
        itemselected: {            
          textDecoration: 'underline',  
        }
      }
     
      const {fontSize} = this.props;
      const menuItemStyle = ( this.props.itemStyle==='item'?
              {...styles.item} :{...styles.item, ...styles.itemselected});
      const menuItemFontSize = {fontSize: `${fontSize}px` }  

      return(
        <div style={styles.container}>
          <div 
            style={{...menuItemStyle, ...menuItemFontSize}} 
            onMouseEnter={()=>{this.handleHover();}} 
            onMouseLeave={()=>{this.handleHover();}}
            onClick={this.props.onClick}
            name={this.props.linkTo}
          >
            {this.props.children}  
          </div>       
      </div>  
      )
    }
  }
  
  /* Menu.jsx */
  class Menu extends Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open? this.props.open:false,
        info: false
      }
    }
      
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.infoVisible !== this.props.infoVisible){
          const {infoVisible} = this.props;
          this.setState({info: infoVisible});
      }
      
  
  }
    componentWillReceiveProps(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
    }


    render(){

      const styles={
        container: {
          position: 'absolute',
          top: 0,
          right: 0,
          height: this.state.open? '100%': 0,
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
          xbackgroundImage: 'linear-gradient(to bottom, #7866ff, #17137c 100%)',
          backgroundColor: '#17137c',
          backgroundImage: ' url("../images/court.svg") ',
          backgroundSize: '  100% auto',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          color: '#fafafa',
          transition: 'height 0.3s ease',
          zIndex: 20,
        },
        menuList: {
          paddingTop: '0rem',
          paddingRight: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
        }
      }
      return(
        <div className="" style={styles.container}
          ref={ (divElement) => this.divElement = divElement} 
        >
          {  this.state.open? 
            <div className="borderTest" style={{
              margin:'20px 0px', width: '100%', 
            display: 'flex',flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-end'}}>

              <ConnectedMenuButton screenWidth={this.props.screenWidth} className="" open={this.state.open} 
                  onClick={this.props.handleMenuClick} 
                  /></div>:null
          }
          {
            this.state.open?
              <div style={styles.menuList}>
                {this.props.children}
              </div>:null
          }
        </div>
      )
    }
  }
  
  /* MenuButton.jsx */
  class MenuButton extends Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open? this.props.open:false,
      }
    }  

    updateDimensions () {
      if(this.divElementNavIcon) {         
        const obj = this.divElementNavIcon.getBoundingClientRect();
        const { height } = obj;     
        this.props.setMobileNavigationIcon(height);
      }  
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    componentDidMount() {
      window.addEventListener("resize", this.updateDimensions.bind(this));
      this.updateDimensions();      
    }


    componentWillReceiveProps(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
      if(nextProps.screenWidth) {
        const iconBox =  Math.round( 23*nextProps.screenWidth/375);
        this.props.setMobileNavigationIcon(iconBox);
      }
    }    
    handleClick(){
      this.setState({open:!this.state.open});
    }
    
    render(){
      const {open} = this.state;
      const {mobileNavIconHeight} = this.props;

      const iconBox =  `${mobileNavIconHeight}px`;
      const iconMargin =  `${mobileNavIconHeight}px`;

      const styles = {
        container: {
          marginRight:'20px',
          height: '53px',
          width: '53px',
          display:'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '0px',
        },
        iconBox:{
          width:'100%',
          height: '100%',
          transition: 'all 0.2s ease',
        },           
      }
     
      return(
        <div  className="" 
          ref={ (divElement) => this.divElementNavIcon = divElement} 
          style={{...styles.container,
          height: iconBox,
          width: iconBox, 
          marginRight: iconMargin } } 
          onClick={this.props.onClick ? this.props.onClick: 
            ()=> {this.handleClick();}}>             
                { !open && <img className="borderTestBlue" src="../images/hamburger.svg" 
                    width={iconBox}  height={iconBox} alt=""/> 
                }
                { open && <img className="borderTestBlue" src="../images/close-icon.svg" 
                    width={iconBox}  height={iconBox} alt=""/> 
                }
        
        </div>
      )
    }
  }

  
  const mapStateToProps = (state) => {  
    return {
      infoVisible: false,
      navigationProps : state.setup.navigationProps,
      navigationType: state.setup.navigationType,
      offsetY: state.setup.offsetY,
      mobileNavIconHeight: state.setup.mobileNavIconHeight,
      HamburgerMenuSize: state.fonts.HamburgerMenu.fontSize,

    }
  }

  const ConnectedMenuButton = connect(mapStateToProps, 
    { setMobileNavigationIcon  })(MenuButton);

  export default connect(mapStateToProps,
     { setMobileNavigationHeight  })(NavigationMobile);
  
  
  
  