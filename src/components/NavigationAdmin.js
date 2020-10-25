import React, { Component} from 'react'
import { Link } from 'react-router-dom'

import withFirebaseAuth from 'react-auth-firebase';
import authConfig from '../firebase/authConfig'
import firebase from '../firebase/firebase';

import './NavigationLinks.css';
import Info from './Info.js';


class NavigationAdmin extends Component  {

    constructor(props) {
        super(props);
        this.state= {scrolling:false};
        this.logOut = this.logOut.bind(this);
    }
   
    
    componentDidMount() {
        if(this.divScrollDown) {
            const widthScrollDown = this.divScrollDown.clientWidth;
            //this.setState({ height });
            this.setState({widthScrollDown});
        }       
      }

    logOut() {
        const {
            user,
            signOut,                      
        } = this.props;
     
        if( user) signOut();  
    }
    render() {   
        const mobile = false; 
        const styleInfoBox= {
            display: 'flex',
            flexDirection: 'row',  
            justifyContent: mobile?'center':'flex-end',
            width:'95%',
            margin:'60px 0px'
           };
           const styleNavBox = {            
            margin:'20px 20px'
           };
        return (
          <React.Fragment>             
                
                <div  className="flex-container-box ">
                    <div className=" flex-container " style={{color:'red', ...styleNavBox}}>                         
                        <Link className=" itemAdmin"  style={{color:'#17137c'}} to="/" onClick={this.logOut}>Log out</Link>   
                        <Link className=" itemAdmin"  style={{color:'#17137c'}} to="/howto">How to</Link>       
                        <Link className=" itemAdmin"  style={{color:'#17137c'}} to="/galleriesadmin">Galleries</Link>               
                        <Link className=" itemAdmin" style={{color:'#17137c'}} to="/news">News</Link>      
                    </div> 
                    <div className="borderTest" style={styleInfoBox}>          
                        <Info />    
                    </div> 
                </div>   
          </React.Fragment>
        );
    }    
}

export default withFirebaseAuth(NavigationAdmin,firebase, authConfig);



