import React , {Component} from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import {fetchMessagesFirebase, deleteMessageFirebase}  from '../actions/message.js'
import '../components/News.css';
import CloseModal from '../components/CloseModal'
import '../App.css';

class Messages extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      //startDate: "2020-02-10", 
      showCloseModal:false,
      init:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);  
    this.onDelete = this.onDelete.bind(this); 
    this.onEdit = this.onEdit.bind(this); 
    this.closeModalNo = this.closeModalNo.bind(this);
    this.closeModalYes = this.closeModalYes.bind(this)    
  }
  
 
  componentDidMount() {      

    const {init} = this.state;
    if(init ===false){
      this.setState({init:true},
      this.props.fetchMessagesFirebase());
    }
  }

  componentDidUpdate(prevProps, prevState) {      

    if(prevProps.changed!==this.props.changed) {    
      this.props.fetchMessagesFirebase();
    } 
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      //console.log('name=', value)
      this.setState({[name]: value });
    }
  }

  onClickButton = () => {  
    const { history} = this.props;
    history.push('/newNews');
  }
  
  
  onEdit = (uid)  => {
    const { history} = this.props;
    history.push(`/editNews/${uid}` );
  }

  onDelete =  (uid)  => {
    //this.props.deleteMessageFirebase(uid);
    this.setState({showCloseModal:true, uid});
  }
  closeModalYes = () => {
    this.setState({showCloseModal:false});    
    //console.log('closeModal') 
    const {uid} = this.state;
    this.props.deleteMessageFirebase(uid);
  }

  closeModalNo = () => {
    this.setState({showCloseModal:false});    
    //console.log('closeModal') 
  }

  render() {
    const {messages} = this.props;
    const {showCloseModal} = this.state;
    //console.log('render_messages', messages)
    return (
      <React.Fragment>

    <div className="borderTest">  
    {showCloseModal && <CloseModal title="test" 
                          callbackYes={this.closeModalYes}
                          callbackNo={this.closeModalNo}
                          message="Are you sure you want to remove this message?">
                            
                    </CloseModal>
    } 
    
   
      <button className="buttonBlue" onClick={this.onClickButton}>  
          <Icon name='plus' size='big' />  
          Add new Message
      </button>

      <br/>        
  

      <div className="container_news">
      {       
          messages && messages.map((message, index)=> { 
            var s = "borderTest news_column_3_1";
            if(index%2===1)
             s = "borderTest news_column_3_2";      
          
          const linkToGallery = `/newsgallery/${message.uid}`; 
          return (
            <div key={index} className={s} style={{width:'100%'}}> 
                <button 
                onClick={() => this.onEdit(message.uid)}>
                  <Icon name='edit' size='big' /> 
                  </button> 
               
               <button  
                onClick={() => this.onDelete(message.uid)}>
                   <Icon name='delete' size='big' /> 
                </button>
                <Link  to={linkToGallery}> 
                      <Icon name='images' size='big' /> 
                </Link>
              <div className="news_column_3_1_date" >
              {message.date}
              </div>
              <div className="news_column_3_1_title"> 
              {message.title}
              </div>
              <div className="news_column_3_1_box news_column_3_1_description"> 
              {message.shortDescription}
              </div>
              
            </div>     
          )})                              
      } 
       </div>     
    
    </div>
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {  
  //console.log('state.messages.all', state.messages.all)
  const messages = _.map(state.messages.all, (val, uid) => {  
    
    return {...val, uid };
  });
  return {
    changed: state.messages.changed,
    messages
  }
}

export default connect(mapStateToProps,
  {  fetchMessagesFirebase, 
     deleteMessageFirebase })( Messages);
