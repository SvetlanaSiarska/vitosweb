import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react'

import withFirebaseAuth from 'react-auth-firebase';
import firebase from '../firebase/firebase';
//import 'firebase/auth';
import authConfig from '../firebase/authConfig'
import '../App.css';
class LoginScreen extends Component  {
    
   
constructor(props) {
  super(props);
  this.state = {
    //email: '',
    //password: '',
    email: `test@gmail.com`,
    password: `vitovito`,     
    user: null
  };
}

  componentDidMount() {
      //console.log('LOGINSCREEN')
      const { email, password } = this.state;
      const {signInWithEmail} = this.props;
      //signInWithEmail(email, password);
  }

  componentDidUpdate(prevProps, prevState) {
      if ( prevProps.user!== this.props.user && this.props.user) {    
        const {history} = this.props;   
        history.push('/news');    
        //console.log('user:', this.props.user);             
      }          
  }    
  
  onSubmit = (e) => {
    e.preventDefault();
    
    const {
      signInWithEmail,
   } = this.props;
   const { email, password } = this.state;
    signInWithEmail(email, password);
}

    render() {
     
       
        const { email, password } = this.state;
        
        return (
        
        <div className="component_container" style={{margin:'50px 0px 100px 0px'}}>       
      
          <Form   onSubmit={this.onSubmit}>
            
      
            <Form.Field            
              id='form-input-control-first-name'
              control={Input}
              label='User Name'
              placeholder='Username'
              name='username'
              value={email} onChange={this.onChange}
              required
            />
            <Form.Field            
              id='form-input-control-last-name'
              type='password'
              control={Input}
              label='Password'
              placeholder='password'
              name='password'
              value={password} onChange={this.onChange}
              required
            />

            <Form.Field            
              id='form-button-control-public'
            control={Button}
            content='Login'
            style={{backgroundColor:'#7866ff'}}
          />

        </Form>
                 
        </div>
        
      );
    }
}

const mapStateToProps = (state) => {    
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.currentUser,
    }
  }

export default withFirebaseAuth(connect(mapStateToProps, {})(LoginScreen),firebase, authConfig);

