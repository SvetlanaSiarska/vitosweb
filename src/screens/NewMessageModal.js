import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { Icon } from 'semantic-ui-react'

import firebase from '../firebase/firebase';

import  Modal from '../components/Modal'
import {addMessageFirebase, fetchMessageFirebase, updateMessageFirebase} from '../actions/message.js'
import {fetchPdfLinks, deletePdf} from '../actions/docs.js'
import { 
 } from '../actions/types.js'

class NewMessageModal extends Component  {
          
  constructor() {
    super();
 


    this.state = {
      title: '',
      shortDescription:'',
      descriptionTitle:'',
      description: '',
      date:'', 
      uid:'' ,
      dir: 'docs/',     
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
      const { uid } = this.props.match.params;  
      if(uid) {
        const dir = `docs/${uid}/`
        this.setState({uid, dir});
        this.props.fetchMessageFirebase(uid);   
        this.props.fetchPdfLinks(dir, uid) ;          
      } 
  }

  componentDidUpdate(prevProps, prevState) {     
    if(prevProps.editedMessage!==this.props.editedMessage) {  
        const {title, shortDescription, descriptionTitle, description, uid, date} = this.props.editedMessage;
        this.setState({title,shortDescription, descriptionTitle, description, uid, date});        
    } 
  }
  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      // console.log('name=', value)
      this.setState({[name]: value });
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, shortDescription, descriptionTitle, description, date, uid} = this.state;
    const data = { title,  shortDescription, descriptionTitle, description, date};
    if(uid==='') 
      this.props.addMessageFirebase(data);
    else 
      this.props.updateMessageFirebase(uid, data);
       
    console.log('onSubmit')
    this.props.history.goBack();
    
  }
  handleUploadStart = () => {
    console.log('handleUploadStart')
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });
  }      

handleProgress = progress =>
  this.setState({
    uploadProgress: progress
  });

handleUploadError = error => {
  this.setState({
    isUploading: false
    // Todo: handle error
  });
  console.error(error);
};

handleUploadSuccess = async filename => {
  console.log('handleUploadSuccess')
  this.setState({
    //filename,
    //downloadURL,
    uploadProgress: 100,
    isUploading: false
    }, this.reloadImages);
};
handleUploadSuccessTitleImage = async filename => {
      
  const index = filename.indexOf('.');
  const coverImageUid = filename.slice(0, index);

  console.log('handleUploadSuccessTitleImage', filename)
  this.setState({
    //filename,
    //downloadURL,
    coverImageUid,
    uploadProgress: 100,
    isUploading: false
    }, this.reloadImages);
};
reloadImages=()=> {
  setTimeout(function(){ 
    this.props.fetchPdfLinks(this.state.dir, this.state.uid) 
  }.bind(this), 100)
}

onDelete = (pdfuid, pdfname) => {
  const{ dir} = this.state;
  this.props.deletePdf(pdfuid, dir+pdfname);     
}

renderPDfs() {
  const {pdfs} = this.props;
  console.log('pdfs', pdfs)
  
  const styleTextLink = { fonWeight: 'bold'  }
  const stylePdfTable = { padding:'0px 20px', display: 'flex', flexDirection: 'row', 
    justifyContent: 'space-between'}
  if(pdfs)
  return (
    <div className="borderTest" style={{width:'100%' , }}>
    {pdfs.map((val,index)=>{  
      const s = {margin:'10px 0px',  backgroundColor: (index%2)?'#e9e9e9':'white', 
      }
      return <div style={{...s, ...stylePdfTable}} key={index}> 
                  <button  onClick={() => this.onDelete(val.uid, val.name)}>
                        <Icon name='delete' size='big' /> 
                  </button>
                  <a href={val.url}  download  target="_blank" rel="noopener noreferrer"                                                > 
                    {val.name} 
                  </a> 
                <div style={styleTextLink}>$LINK{val.name}$PDF_LINK$</div>
      </div> })}  
    </div>);       
  }
   renderUploadButton() {
    const {pdfs} = this.props;
    const {dir} = this.state;
    const styleButton={margin:'30px 0px',  fonWeight: 'bold'}
   
    if(pdfs===undefined||  pdfs.length===0)
     return ( 
     <div  style={styleButton}      >
        <CustomUploadButton      
            name="image-uploader"
            randomizeFilename
            storageRef={firebase.storage().ref(dir)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccessTitleImage}
            onProgress={this.handleProgress}   
               
            >           
           <div  style={{fontWeight: 'bold'}}> Upload pdf   </div>   
        </CustomUploadButton> 
        </div>  );
   }
 
    renderModalContent(image) {
        const { title, shortDescription, descriptionTitle, description, date } = this.state;
       
        const stylePDFBox = {margin: '30px 0px', backgroundColor:'#e9e9e9'}
        return (   
      <div> 
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
            <textarea placeholder='Short Description' type="text" name="shortDescription" value={shortDescription} onChange={this.onChange}/>
            </Form.Field>
           

            <Form.Field >           
            <input placeholder='Description Title' type="text" name="descriptionTitle" value={descriptionTitle} onChange={this.onChange} />
            </Form.Field>

            <Form.Field>           
            <textarea placeholder='Description' type="text" name="description" value={description} onChange={this.onChange}/>
            </Form.Field>

            <Form.Field>           
          
            <Button type='submit' >Save</Button>
            </Form.Field>
        </Form>

        <div style={stylePDFBox}>
          {this.renderUploadButton()} 
          {this.renderPDfs()}
        </div>   

      </div>
        );
    }
    render() {
    
        const {           
            history  
        } = this.props;
        const { uid } = this.state;
       
       let pageTitle = "New Message";
       if(uid!=='')
          pageTitle =  "Edit Message";;

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
      editedMessage: state.messages.editedMessage,
      pdfs: state.messages.pdfs,

    }
}

export default connect(mapStateToProps, {
  addMessageFirebase,
  fetchMessageFirebase,
  updateMessageFirebase,
  fetchPdfLinks,
  deletePdf
         })(NewMessageModal);



  
  
  