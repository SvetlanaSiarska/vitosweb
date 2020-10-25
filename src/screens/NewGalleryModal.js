import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Checkbox } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';

import  Modal from '../components/Modal'
import {addGallery, fetchGallery, updateGallery} from '../actions/gallery.js'
import { 
 } from '../actions/types.js'

class NewGalleryModal extends Component  {
          
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      uid: null, 
      checked: true,   
      init: false,
      date:'',
      titleImage:''   
    };
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
      const { uid } = this.props.match.params;  
      const {init} = this.state;

      if(uid && init===false) {
        this.setState({init:true},
          this.props.fetchGallery(uid));          
      } else if (!uid && init===false)
        this.setState({init:true});

  }

  componentDidUpdate(prevProps, prevState) {     
    if(prevProps.editedGallery!==this.props.editedGallery && this.props.editedGallery) {  
        const {title, description, uid, checked, date, titleImage} = this.props.editedGallery;
        this.setState({title, description, uid, checked, date, titleImage});        
    } 
  }

  
  handleChangeCheckbox = (event, {name, checked}) => {
   const state = this.state;
   if (this.state.hasOwnProperty(name) ) {           
     state[name] = checked;
     this.setState(state);
    }
  }

  onChange = (e, data) => {
    const state = this.state; 
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      // console.log('name=', value)
      this.setState({[name]: value });
    }
  }
  
  onSubmit = (e) => {
    e.preventDefault();

    const { title, description,  uid, checked, date, titleImage} = this.state;
    const data = { title,  description, checked, date, titleImage};
    
    if(!uid) 
      this.props.addGallery(data);
    else {
      this.props.updateGallery(uid, data);
    }             
    this.props.history.goBack();    
  }
   
  renderModalContent(image) {
      const { date, title, description, checked, init } = this.state;
   
      if(init && init===true) {
       
        return (    
          <Form onSubmit={this.onSubmit}>     
          <Form.Field>
            <DateInput
                  animation='none'
                  closable={true}
                  closeOnMouseLeave={true}
                  hideMobileKeyboard={true}
                  name="date"
                  placeholder="Date"
                  value={date}
                  iconPosition="left"
                  onChange={this.handleChange}      
                  />
            </Form.Field>    
              <Form.Field >           
                <input placeholder='Title' type="text" name="title" value={title} onChange={this.onChange} />
              </Form.Field>
              <Form.Field>           
                <textarea placeholder='Description' type="text" name="description" value={description} onChange={this.onChange}/>
              </Form.Field>
              <Form.Field>
                <Checkbox toggle name="checked"  checked =  {checked}  onChange={this.handleChangeCheckbox}> Active</Checkbox>
              </Form.Field>
              <Form.Field> 
                <Button type='submit' >Save</Button>
              </Form.Field>         
          </Form>
      );
    }
  }
  render() {
      const { history } = this.props;
      const { uid } = this.state;
      
      let pageTitle = "New Gallery";
      if(uid!=='')
        pageTitle =  "Edit Gallery";;

      return (
          <div>
              <Modal 
                  title={pageTitle}
                  content={this.renderModalContent()}
                  onDismiss={()=>history.goBack()}
              />
          </div>
      );              
  }   
}

const mapStateToProps = (state) => {  
    return {      
      editedGallery: state.galleries.editedGallery
    }
}

export default connect(mapStateToProps, {
  addGallery,
  fetchGallery,
  updateGallery })(NewGalleryModal);



  
  
  