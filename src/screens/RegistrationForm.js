import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react'

import {sendRegistrationEmail, initRegistration} from '../actions/sendRegistration'
import '../components/Registration.scss';
import '../css/typography.css';
import {NAVIGATION_MOBILE} from '../actions/types'

class RegistrationForm extends Component  {
    constructor(props){
        super(props);

        this.state = {           
            firstname:'', 
            lastname:'',
            phone:'',
            email:'',
            comment:'',          
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange = (e, data) => {
        const state = this.state; 
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { firstname, lastname, email, phone, comment } = this.state;
        
        const data = {
           //dest:'vito@tennisbasel.ch',  
           //dest:'tennisschuletvg@gmail.com', 
           // vitovito12
           dest:'vitogugolz@gmx.ch',         
           
            firstname, lastname, phone, email, comment};       
        this.props.sendRegistrationEmail(data);     
    }


    renderError() {
        const { loading, error } = this.props;
        if(error && !loading)
        return ( <div  style={{ marginTop:'25px',width:'90%'}}>                    
                <Message
                    error
                    header='Scheint so, als wäre etwas schiefgelaufen.'
                    content=' Bitte versuchen Sie es noch mal.'
                />
                <div style={{cursor:'pointer'}} 
                  onClick={this.onClick}> Noch mals versuchen</div>
           </div>)
    }

    onClick() {
      this.props.initRegistration()
    }

    renderMessage() {
        const { result, loading, error } = this.props;
        if(!result) return;
       
       
        if(result && !loading && !error)
        return (
            <div  style={{ marginTop:'25px', width:'90%'}}>
              <Message
                success
                header='Ihre Nachricht wurde an uns gesendet!'
                content='Wir melden uns bald.'
              />
              <div style={{cursor:'pointer'}} 
                  onClick={this.onClick}> Neue Nachricht verschicken</div>
          </div>)
    }
    render() {
      const {infoLeft, infoHeight, navigationType, marginGrid, heightInfoHeader, marginMobileGrid} = this.props;
        
      const screenWidth = Math.min(window.screen.width, window.innerWidth) ;
      const mobile =  (navigationType===NAVIGATION_MOBILE );
      const margin= mobile?marginMobileGrid: marginGrid;
      const styleMargin= mobile?'5%':`${margin}px`;
      var marginTop = mobile? 50:50-(infoHeight-heightInfoHeader);
      const width = !mobile? infoLeft - 1.5*marginGrid: screenWidth- 2*marginGrid;
      const styleWidth = !mobile?`${width}px`:'90%'
      const st = mobile?{  alignItems: 'center'}:{};


      return (          
          <div className="container_preview borderTest" style={{               
                marginLeft:`${styleMargin}`, 
                marginRight:`${styleMargin}`,
                marginTop:`${marginTop}px`,
                width:`${styleWidth}`,              
                minHeight: `${infoHeight-40-50}px`,
                ...st}}> 
                                               
               {this.renderForm()} 
               {this.renderMessage()} 
               {this.renderError()}                 
               <div className="borderTest" style={{height:'100px'}}></div>       
          </div>);
  }    
  
  formCompleted () {
    const { firstname, lastname, phone, email, comment } = this.state;
    const completed = (firstname!=='' && lastname!=='' && phone!=='' && email!=='' && comment!=='' ); 
        return completed;
  }


  renderForm() {
    const { result, loading } = this.props;
    const { firstname, lastname, phone, email, comment } = this.state;
   
    const loadingIcon = loading?true:false;
    if(result ==='') 
    return (  
       <div >
           <div style={{color:'#1d1a66', paddingBottom:'10px', textAlign: 'left' }} 
            className="boxText">
            Über unser Kontaktformular können Sie einfach und unkompliziert mit uns in Verbindung treten. 
           </div>
           <div style={{fontSize:'0.9em', paddingBottom:'20px'}}>
            *Pflichtfelder
           </div>
           
        <Form  loading={loadingIcon} onSubmit={this.onSubmit}>
            
      
          <Form.Field            
            id='form-input-control-first-name'
            control={Input}
            label='Vorname'
            placeholder='Vorname'
            name='firstname'
            value={firstname} onChange={this.onChange}
            required
          />
          <Form.Field            
            id='form-input-control-last-name'
            control={Input}
            label='Nachname'
            placeholder='Nachname'
            name='lastname'
            value={lastname} onChange={this.onChange}
            required
          />
          <Form.Field            
            id='form-input-control-street'
            control={Input}
            label='Telefon'
            placeholder='Telefon'
            name='phone'
            value={phone} onChange={this.onChange}
            required
          />                   
       
        <Form.Field          
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Nachricht'
          placeholder='Nachricht'
          name='comment'
            value={comment} onChange={this.onChange}
            required
        />
        <Form.Field          
          id='form-input-control-error-email'
          control={Input}
          label='E-Mail'
          placeholder='vorname.nachname@gmail.com'
          name='email'
          value={email} onChange={this.onChange}
          required            
        />

        {this.formCompleted()  && 
        <Form.Field            
            id='form-button-control-public'
          control={Button}
          content='Senden'
          style={{backgroundColor:'#7866ff'}}
        />}      
       </Form>
       </div>
     )

    }
}
  const mapStateToProps = (state) => {
  
    return {
        result: state.registration.result,
        error: state.registration.error,
        loading: state.registration.loading,
        navigationType: state.setup.navigationType,
        infoLeft: state.setup.leftInfoPosition,
        infoHeight: state.setup.heightInfo,
        heightInfoHeader: state.setup.heightInfoHeader,
        marginGrid: state.setup.marginGrid,      
        marginGridTop: state.setup.marginGridTop,
        marginMobileGrid:  state.setup.marginMobileGrid,

    }
  }
  export default connect(mapStateToProps, 
        {  sendRegistrationEmail, 
          initRegistration })(RegistrationForm);



