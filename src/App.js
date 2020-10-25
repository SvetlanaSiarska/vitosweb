import React, { Component }  from 'react';
import { Router, Route, Redirect} from 'react-router-dom'
import history from './helpers/history'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
//import withFirebaseAuth from 'react-auth-firebase';

import NavigationAdmin from './components/NavigationAdmin';
import Navigation from './components/Navigation';
import NavigationMobile from './components/HamburgerMenu';
import Footer from './components/Footer'

import Home from './screens/Home';
import AboutUs from './screens/AboutUs'
import Philosophie from './screens/Philosophie'
import Programs from './screens/Programs'
import ProgramDetail from './screens/ProgramDetail'
import LoginScreen from './screens/LoginScreen'
import Messages from './screens/Messages'
import GalleryModal from './screens/GalleryModal'
import NewsScreen from './screens/NewsScreen'
import NewsDetail from './screens/NewsDetail'
import RegistrationForm from './screens/RegistrationForm'
import {auth} from './actions/auth'
import {setNavigationType, setInfoVisible, setNavigationProps, setYOffset, changeFontsSize} from './actions/positions'
import firebase from './firebase/firebase';
import CreateGalleries from './screens/CreateGalleries';
import CreateGallery from './screens/CreateGallery'
import NewMessageModal from './screens/NewMessageModal'
import NewGalleryModal from './screens/NewGalleryModal'
import ScrollToTop from './components/ScrollToTop'
import ScreenInfo from './components/ScreenInfo'
import {NAVIGATION_DESKTOP, NAVIGATION_MOBILE, NAVIGATION_TABLET} from './actions/types'
import './App.css';
import HowTo from './screens/HowTo';


const PrivateUserRoute = ({ component: Component, ...rest }) => {

  const store = useSelector(store => store);
  const {authenticated} = store.auth;
  
  return (
    <Route {...rest} render={(props) => (
      authenticated === true
        ? 
         <Redirect to={{
            pathname: '/adminnews'
          }} />
          :<Component {...props} />
      )} 
    />);
}

const PrivateAdminRoute = ({ component: Component, ...rest }) => {

  const store = useSelector(store => store);
  const {authenticated} = store.auth;

  return (
    <Route {...rest} render={(props) => (
      authenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login'
          }} />
      )} 
    />);
}


class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {...this.state, 
                  firebaseInit: false
                  }
  } 

  listenToScroll  ()  {       
    const  pageYOffset =  window.pageYOffset;
    this.props.setYOffset(pageYOffset);
  }

  updateDimensions() {    
    
    const { tabletBreakpoint} = this.props;
    

     if(this.divElementHeight && this.divElementWidth ) {
        const objHeight = this.divElementHeight.getBoundingClientRect();
        const {height } = objHeight;
        const objWidth = this.divElementWidth.getBoundingClientRect();
        const {width } = objWidth;
        const mobile = (width< tabletBreakpoint);
        this.setState({ screenHeight: height,  screenWidth: width,});
        this.props.changeFontsSize({ screenHeight: height,  screenWidth: width, mobile});
     }

  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll.bind(this))

    const  unsubscribe = firebase.auth().onAuthStateChanged((user) => {      
      this.props.auth(user);
      this.setState({unsubscribe, firebaseInit: true });       
    }); 

    if(this.divElementHeight && this.divElementWidth )
      this.updateDimensions();

    window.addEventListener("resize", this.updateDimensions.bind(this));

    if(history && history.location && history.location.pathname) {
      this.props.setNavigationProps(history.location.pathname);
      this.props.setInfoVisible(history.location.pathname);
    }
   
    this.unlisten = history.listen(location => {
      this.props.setInfoVisible(location.pathname);
      this.props.setNavigationProps(location.pathname);
    })
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.listenToScroll.bind(this))
  window.removeEventListener("resize", this.updateDimensions.bind(this));
    
    //firebase unsubscribe 
    const {unsubscribe} = this.state;
    unsubscribe();
    this.unlisten();
}

componentDidUpdate(prevProps, prevState) { 


  if(prevState.screenWidth!== this.state.screenWidth  || 
    prevState.screenHeight!== this.state.screenHeight 
    )  {
    const { tabletBreakpoint} = this.props;
    //const mobile = (this.state.widthInit<tabletBreakpoint);
    const mobile = (this.state.screenWidth< tabletBreakpoint);
    this.props.setNavigationType(mobile?NAVIGATION_MOBILE: NAVIGATION_DESKTOP);
    this.updateDimensions();
  }
}

render() {    
  const {height, width} = this.state;
  const {authenticated, navigationType} = this.props;
  const mobile = (navigationType ===NAVIGATION_MOBILE);
  

  const showScreenInfo = false;
   return  (
    <Router history={history}> 
     <ScrollToTop /> 
        <div className="borderTest mainContainer">

        <div className="" style={{height:'10px'}} 
            ref={ (divElement) => this.divElementWidth = divElement}   ></div>
          <div className=" " style={ { position:'absolute', top:'0px', left:'0px', height:'100%', width:'100px'}}
            ref={ (divElement) => this.divElementHeight = divElement} ></div>


          {!mobile&& !authenticated && 
              <Navigation data-test="navigation" history={history} />  }
          {authenticated && 
              <NavigationAdmin data-test="navigation"/>  }
          { mobile && !authenticated && 
              <NavigationMobile history={history}/>
          }  
          { mobile && !authenticated && 
              <Navigation   history={history}/>
          }       

    
          <Route path="/" exact  component={Home} />    
          <PrivateUserRoute path="/home" exact component={Home} /> 
          <PrivateUserRoute path="/aboutus" exact component={AboutUs} />  
          <PrivateUserRoute path="/philosophie" exact component={Philosophie} />  
          <PrivateUserRoute path="/courses" exact component={Programs} /> 
          <PrivateUserRoute path="/course/:id" exact  component={ProgramDetail} /> 
 
          <PrivateUserRoute path="/news" exact  component={NewsScreen} />
          <PrivateUserRoute path="/news/:id" exact  component={NewsDetail} />
          
          <PrivateUserRoute path="/contact" exact   component={RegistrationForm} />  
          <PrivateUserRoute path="/gallery/:id" exact  component={GalleryModal} /> 
          <PrivateUserRoute path="/registration" exact  component={RegistrationForm} /> 
           

          <Route path="/login"  component={LoginScreen} />

          <PrivateAdminRoute path='/adminnews' component={Messages} />
          <PrivateAdminRoute path='/newsgallery/:uid' component={CreateGallery} />
          
          <PrivateAdminRoute path='/galleriesadmin' component={CreateGalleries} />
          <PrivateAdminRoute path='/galleryadmin/:uid' component={CreateGallery} />
          <PrivateAdminRoute path="/newNews"  component={NewMessageModal} />
          <PrivateAdminRoute path="/editNews/:uid"  component={NewMessageModal} />
          <PrivateAdminRoute path="/newGallery"  component={NewGalleryModal} />
          <PrivateAdminRoute path="/editGallery/:uid"  component={NewGalleryModal} />
          <PrivateAdminRoute path="/howto"  component={HowTo} />
            
         
          
          
          {showScreenInfo && <ScreenInfo height={height}  width={width} />}
          { !authenticated &&        
              <Footer history={history} data-test="footer"/>  
          }  
         <div id="full"></div>
     </div>
    </Router>  
    );
  }
}

const mapStateToProps = (state) => {    
  return {
      authenticated: state.auth.authenticated,
      currentUser: state.auth.user,
      mobileBreakpoint: state.setup.mobileBreakpoint,
      tabletBreakpoint: state.setup.tabletBreakpoint,
      navigationType: state.setup.navigationType
  }
}
export default connect(mapStateToProps, 
  { auth, 
    setNavigationType,
    setInfoVisible,
    setNavigationProps,
    setYOffset,
    changeFontsSize
})(App);
