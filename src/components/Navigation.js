import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Navigation.css';
import '../App.css';
import Screen from './Screen'

import './NavigationLinks.css';
import '../css/typography.css';

import Info from './Info.js';
import {NAVIGATION_MOBILE} from '../actions/types'
import {setTopBigImageNavigation, setHightBigImageNavigation, setTopLinkNavigation, setScrollDownElemSize,
    setNavigationHeight} from '../actions/positions'


class Navigation extends Screen   {

    constructor(props) {
        super(props);
        this.state= {
            scrolling:false,
            info: true,
            height:100,
            scrollDownArrowBoxClass: "scrollDownArrowBox borderTestBlue bounce",
        }
        this.renderLogIn = this.renderLogIn.bind(this);
    }  
       
    updateDimensionsInit() {
        if(this.divElementBigImage)  {
            const obj = this.divElementBigImage.getBoundingClientRect();
            const {top, height} = obj;
            //console.log('bigimage',obj);
            this.props.setTopBigImageNavigation(top);
            this.props.setHightBigImageNavigation(height);
        }
        if(this.divElementLinks) {
            const obj = this.divElementLinks.getBoundingClientRect();
            const { top } = obj;
            //this.setState({height, top:46 });
            this.props.setTopLinkNavigation(top)
        }
        if(this.divElementScrollDown) {
            const obj = this.divElementScrollDown.getBoundingClientRect();
            const { height, width } = obj;
            //this.setState({heightScroll: height, widthScroll: width });
            this.props.setScrollDownElemSize({height, width})
        }
    }
    updateDimensionsScrollDown() {
       
        if(this.divElementScrollDown) {
            const obj = this.divElementScrollDown.getBoundingClientRect();
            const { height, width } = obj;
            this.props.setScrollDownElemSize({height, width})
        }
    }

    updateDimensions() {      
        if(this.divElementScreenWidth) {
            const obj = this.divElementScreenWidth.getBoundingClientRect();
            const {width} = obj;
            this.setState({screenWidth: width});
            //console.log('NAVIGYTION_screenWidth', width)
        }
        if(this.divElementScreenHeight) {
            const obj = this.divElementScreenHeight.getBoundingClientRect();
            const {height} = obj;
            this.setState({screenHeight: height});
            //console.log('NAVIGYTION_screenHeight', height)
        }                
    }   
    updateDimensionsSticky() {      
        if(this.divElementNavStickyBox) {         
            const obj = this.divElementNavStickyBox.getBoundingClientRect();
            const { height } = obj;
            this.props.setNavigationHeight(height);
        }               
    }      
    
   
    componentDidMount() {       
        window.addEventListener("resize", this.updateDimensions.bind(this));                    
        this.updateDimensionsInit();   
        this.updateDimensions(); 
        this.updateDimensionsScrollDown();

        const {infoVisible} = this.props;
        this.setState({info: infoVisible});

        setTimeout(() => {
            this.setState({
                scrollDownArrowBoxClass: "scrollDownArrowBox borderTestBlue"
            });
        }, 4000);

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.infoVisible !== this.props.infoVisible){
            const {infoVisible} = this.props;
            this.setState({info: infoVisible});
        }    
        if(prevProps.navigationProps.showNavigationBigPicture!== 
            this.props.navigationProps.showNavigationBigPicture) {
                this.updateDimensions();
        }
       if(prevProps.mobileNavHeight!==this.props.mobileNavHeight) {
       }   
       if(prevProps.offsetY !== this.props.offsetY){       
            this.updateDimensionsSticky();
            this.updateDimensionsScrollDown();
            
        }      
    }
    
    renderLogIn() {
        const login = false;
        if(login)
            return  ( <Link className="item" to="/login">Log in</Link>   ) ;
        else 
            return "";
    }
   
    renderLinks(styleItem) {
        const {navigationProps} = this.props;

        return (       
        <div className="borderTest flex-container" style={{marginRight:'150px', justifyContent: 'center'}}>          
        {this.renderLogIn()}   
                                       
        <Link className={navigationProps.items["contact"]} style={styleItem} to="/contact">Kontakt</Link>
        <Link className={navigationProps.items["news"]} style={styleItem} to="/news">News</Link>
        <Link className={navigationProps.items["courses"]} style={styleItem} to="/courses">Kursprogram</Link>
        <Link className={navigationProps.items["philosophie"]} style={styleItem} to="/philosophie">Philosophie</Link>
        <Link className={navigationProps.items["aboutus"]} style={styleItem} to="/aboutus">Tennisschule</Link>
        <Link className={navigationProps.items["home"]} style={styleItem} to="/">Home</Link>      
    </div> )
    }

    render() {   

        const {navigationType, 
            offsetY, 
            mobileNavHeight,
            mobileNavIconHeight,
            SubTitleGrandeHEROSize,
            TitleGrandeHEROSize,
            ScrollDownTextSize, 
            ScrollDownArrowSize,
            BackgroundImageHeight } = this.props; 
        const {info, screenWidth, scrollDownArrowBoxClass} = this.state; 


        const {navigationProps} = this.props;
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const imagename = navigationProps.imagename?navigationProps.imagename:'Home.jpg';
           
        var styleBackgrounImageBox = {            
           height: `${BackgroundImageHeight}px` ,   
        };    
        const img_boxStyle=mobile?{}:{ justifyContent: 'flex-end ',  alignItems: 'flex-start'};

        var styleBackgrounImage = {
            backgroundImage: `url(../images/${imagename})`,
            minHeight: `${BackgroundImageHeight}px`,         
        };        

        const styleInfoBox= { display: 'flex', flexDirection: 'row', justifyContent: mobile?'center':'flex-end',};
        const {showNavigationBigPicture} = navigationProps;
        const styleItem = showNavigationBigPicture ?{}:{color:'#17137c'};
        const styleItemSticky = {color:'#17137c'};
       
        const showStickyHeader =  !mobile && offsetY>10; 
        const bottomMobileNavigation = ( mobileNavHeight/mobileNavIconHeight>1.5)?mobileNavHeight: mobileNavHeight+mobileNavIconHeight;
        const titleStyle =  mobile?{top:`${BackgroundImageHeight*.45+bottomMobileNavigation}px`, left:'14px', width: '85%', }: 
                                    { top:'331px', left:'150px',  width: '80%', maxWidth:`${navigationProps.maxWidthText}px`};
       
        const boxShadowStyle= {boxShadow:navigationProps.showNavBorder?'0 0 20px 10px rgba(115, 101, 237, 0.11)':''}
                                ;
        const scrollDownStyle = mobile? { bottom:`${0}px`, right: `${30}px`}:
                                { bottom:`${0}px`, left: `${-85}px`};

        const scrollDownArrow = mobile?{  xheight:'6px', xwidth:'47px', cursor:'pointer'}:
                        { xheight:'10px', xwidth:'79px', cursor:'pointer'};
        const arrowW =`${ScrollDownArrowSize}px`;
        
        return (
          <React.Fragment>        
              
                {   showNavigationBigPicture &&
                    <div className="borderTestGreen img-container img_box"  
                        ref={ (divElement) => this.divElementBigImage = divElement} 
                        style={{...styleBackgrounImage, ...styleBackgrounImageBox, ...img_boxStyle}}>

                    {
                    showNavigationBigPicture &&                 
                    <div className=" scrollDownBox rotateScrollDown" style={scrollDownStyle}    
                                ref={ (divElement) => this.divElementScrollDown = divElement}   
                                onClick={()=> window.scrollTo(0,document.body.scrollHeight)}            
                                >                             
                                <ScrollDownText  fontSize={ScrollDownTextSize} />

                                <div style={scrollDownArrow} className={scrollDownArrowBoxClass} >                              
                                    <img src="../images/arrow-horizontal.svg"  
                                        style={{border:'none', outline: 'none'}} width={arrowW} alt="Scroll down"/>
                                </div>
                        </div>
                        
                    }
                    { false &&
                    showNavigationBigPicture &&                 
                    <div className=" scrollDownBox " style={scrollDownStyle}    
                                ref={ (divElement) => this.divElementScrollDown = divElement}   
                                onClick={()=> window.scrollTo(0,document.body.scrollHeight)}            
                                >                             
                                <ScrollDownText  fontSize={ScrollDownTextSize} />

                                <div style={scrollDownArrow} className={scrollDownArrowBoxClass} >                              
                                    <img src="../images/arrow-horizontal.svg"  
                                        style={{border:'none', outline: 'none'}} width={arrowW} alt="Scroll down"/>
                                </div>
                        </div>
                        
                    }
                    </div>                                                       
                }            
                { info===true &&                          
                    <div className="" style={styleInfoBox}>          
                        <Info screenWidth={screenWidth}/>    
                    </div>                        
                }                
               <div className="screenWidth" ref={ (divElement) => this.divElementScreenWidth = divElement}  />
               <div className="screenHeight " ref={ (divElement) => this.divElementScreenHeight = divElement} />
                
                <div className= {showNavigationBigPicture?"borderTestGreen navHeaderAbsolute":
                                    "borderTestGreen navHeader"}
                            ref={ (divElement) => this.divElementLinks = divElement}
                    >   

                    { showNavigationBigPicture &&
                      !mobile && 
                        <LogoImg positive/>
                    }   
                    { !showNavigationBigPicture &&
                      !mobile && 
                        <LogoImg />
                    }                                                        
                    { !mobile &&
                         this.renderLinks(styleItem)
                    }
                </div>
                {   showNavigationBigPicture  && 
                    <div className="borderTestGreen titleNavigation" style={titleStyle}>    
                        <div className=" borderTest subtitleNavigation" >
                            <NavSubTitle 
                             title={navigationProps.subtitle}                 
                             fontSize={SubTitleGrandeHEROSize} />
                        </div>
                         <div className="borderTestBlue" style={{height:mobile?'16px':'26px'}}></div>
                        <NavTitle  
                            title={navigationProps.title} 
                            fontSize={TitleGrandeHEROSize}/>                            
                    </div>                    
                }                
                {   showStickyHeader && !mobile &&
                    <div className="stickyHeader" style={{...boxShadowStyle}}
                    ref={ (divElement) => this.divElementNavStickyBox = divElement}>
                         <LogoImg />
                        {this.renderLinks(styleItemSticky)}
                    </div>
                }
               
          </React.Fragment>
           
        );
    } 
    
    
}

class NavTitle extends Component{   

    render() {
        const {title, fontSize} = this.props;
        
        const titleTextStyle = {fontSize: `${fontSize}px` }  
        return (
            <p className="TitleGrandeHERO borderTest"  style={titleTextStyle}>
                {title}
            </p>)
    }
}


class LogoImg extends Component{   

    render() {
        const {positive} = this.props;
     
        if(positive) {
            return (
                <div className="" style={{ cursor:'pointer', marginLeft:'150px', }}>
                        <Link to="/">
                            <img  className="" height="55px" src="../images/Logo-Positive.svg" 
                            alt="Tennisschule Vito Gugolz"/>
                        </Link>
                                    
                </div>
            )
        }
         else {
            return (
                <div className="" style={{ cursor:'pointer', marginLeft:'150px', }}>
                        <Link to="/">
                            <img  className="" height="55px" src="../images/Logo-Negative.svg" 
                            alt="Tennisschule Vito Gugolz"/>
                    </Link>
                                    
                </div>
            )
         }        
    }
}

class NavSubTitle extends Component{   

    render() {
        const {title,fontSize} = this.props;
        const subtitleTextStyle = {fontSize: `${fontSize}px` };
     
        return (
            <div className="SubTitleGrandeHERO"  style={{subtitleTextStyle}}>
                {title}
            </div>)
    }
}

class ScrollDownText extends Component{   

    render() {
        const { fontSize} = this.props;              
        const scrollDownTextStyle= {marginRight:'15px', cursor:'pointer', fontSize:`${fontSize}px`, };

        return (
            <div className="ScrollDownText" style={scrollDownTextStyle} >
                Scroll down
        </div>)
    }
}


const mapStateToProps = (state) => {  
    return {
        infoVisible: state.setup.infoVisible,
        navigationProps : state.setup.navigationProps,
        navigationType: state.setup.navigationType,
        offsetY: state.setup.offsetY,
        mobileNavHeight: state.setup.mobileNavHeight,
        mobileNavIconHeight: state.setup.mobileNavIconHeight,
        topLinkNavigation: state.setup.topLinkNavigation,
        //topBigImageNavigation: state.setup.topBigImageNavigation,
        scrollDownSize: state.setup.scrollDownSize,
        SubTitleGrandeHEROSize: state.fonts.SubTitleGrandeHERO.fontSize,
        TitleGrandeHEROSize: state.fonts.TitleGrandeHERO.fontSize,
        ScrollDownTextSize: state.fonts.ScrollDownText.fontSize, 
        ScrollDownArrowSize:  state.fonts.ScrollDownArrow.size, 
        BackgroundImageHeight: state.fonts.BackgroundImage.height,
    }
  }

  export default connect(mapStateToProps,
     { setTopBigImageNavigation, setHightBigImageNavigation, setTopLinkNavigation, setScrollDownElemSize,
        setNavigationHeight  })(Navigation);

