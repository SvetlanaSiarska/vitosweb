import  React, { Component} from 'react'
import { Icon, Image, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
    
import '../App.css';
import '../components/News.css';

import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import firebase from '../firebase/firebase';
import {fetchImagesLinks, fetchGallery, deleteImage, updateGallery} from '../actions/gallery'
import {fetchMessageFirebase, updateMessageFirebase}  from '../actions/message.js'

import  Modal from '../components/Modal'
import useClicks from '../helpers/useClicks';

import CloseModal from '../components/CloseModal'
import useTouches from '../helpers/useTouches';

function GalleryImage(props) {
    const backspaceClicks = useClicks(props.callbackOpen, props.callbackDelete, props.callbackMove, 400)
    const backspaceTouches = useTouches( props.callbackDelete,props.callbackOpen,props.callbackMove, 400)
   
    const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  
    if(isDesktop) {
      return (
        <div  
            {...backspaceClicks}   
            style={{width:'33%'}} 
            className="noWebkitUserSelect">  
            
            <Image  src={props.url} size={props.size}/> 
          </div> );
    } else 
    return (
        <div  

            {  ...backspaceTouches}
            style={{width:'33%'}} 
            className="noWebkitUserSelect">  
            
            <Image  src={props.url} size={props.size}/> 
          </div> );
  
  ;
}
class CreateGallery extends Component  {

    constructor() {
        super();
    
        this.state = {
            title: '',
            description: '',
            tags: [],
            uid: '',
            //filename: '',
            //downloadURL: '',
            isUploading: false,
            uploadProgress: 0,
            dir: 'images',
            showImageDetail: false,
            showImageDetailUid :'',
            init:false,
            showCloseModal:false,
            coverImageUid:'',
            messageMode: false,
          };
          this.closeImageDetail = this.closeImageDetail.bind(this);
          this.reloadImages = this.reloadImages.bind(this);
          this.closeModalNo = this.closeModalNo.bind(this);
          this.closeModalYes = this.closeModalYes.bind(this) ;
          this.renderCloseModal = this.renderCloseModal.bind(this);   
    }

   
    componentDidMount(){
      //console.log('this.props.match', this.props.match)
      const {path} = this.props.match;


      //console.log('path', path) 
      const messageMode = path.includes('newsgallery')  ;

      const { uid } = this.props.match.params;  ;
      const {init} = this.state
      if(uid && init===false) {
        const dir = `images/${uid}/`;
        
        this.setState({dir, uid, init:true, messageMode}, () => {
          this.props.fetchImagesLinks(dir, uid);
          if(!messageMode) 
            this.props.fetchGallery(uid);  
          else 
          this.props.fetchMessageFirebase(uid);
        });
      } 
    }
    
    componentDidUpdate(prevProps, prevState) {      
      if(prevProps.changedGallery!==this.props.changedGallery) {   
        this.setState({isUploading: false });
        const {uid, dir} = this.state   
        this.props.fetchGallery(uid); 
        this.props.fetchImagesLinks(dir, uid) 
      } 
      if(prevProps.changedMessage!==this.props.changedMessage) {   
        this.setState({isUploading: false });
        const {uid, dir} = this.state   
        this.props.fetchMessageFirebase(uid); 
        this.props.fetchImagesLinks(dir, uid) 
      } 

      if(this.state.coverImageUid!=='') {
        //console.log('XXXXXX', this.state.coverImageUid)
        const titleImage = this.getCoverImage(this.state.coverImageUid) ;
        if(titleImage) {
          this.setState({
            coverImageUid:'',
          }, this.onMove(titleImage.uid, titleImage.url));          
        }
      }
    }

    getCoverImage(titleImageUid) {
      const {images} = this.props;

      var titleImage = undefined;
      if(images && images.length>0 && titleImageUid!=='') {
          const imgs  = images.filter((image)=> image.uid===titleImageUid);
        if (imgs.length>0) 
            titleImage = imgs[0];
      }
      return titleImage;

    }
   
    handleUploadStart = () => {
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

      //console.log('WWWWcoverImageUid', coverImageUid)
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
        this.props.fetchImagesLinks(this.state.dir, this.state.uid) 
      }.bind(this), 100)
    }

    renderLoader() {
        const {isUploading} = this.state;
        if(isUploading) 
            return ( 
            <Dimmer active>
                <Loader indeterminate>Uploading Files</Loader>
            </Dimmer>);
    }

    openImageDetail = (imageUid) => {
      //console.log('showImageDetail --> TRUE')
      this.setState({showImageDetail:true, showImageDetailUid:imageUid});    
    } 

    closeImageDetail = () => {
      //console.log('showImageDetail --> FALSE')
      this.setState({showImageDetail:false, showImageDetailUid:null});    
    }

    renderModalContent() {
      const {showImageDetail, showImageDetailUid} = this.state;
     
      if(showImageDetail && showImageDetailUid)
        return <Image src={showImageDetailUid} size='massive'/>;
    }

    renderImageDetail() {
      const {showImageDetail, showImageDetailUid} = this.state;
     
      if(showImageDetail && showImageDetailUid) 
      return (
            <Modal 
            content={this.renderModalContent()}
            onDismiss={this.closeImageDetail}
            />
      );
    }

    onDelete =  (imageName, imageUid)  => {
      this.setState({showCloseModal:true, imageName, imageUid});
    }

    getEdited() {
      let {editedGallery, editedMessage} = this.props;
      const {messageMode} = this.state;
      if(messageMode)
        return  editedMessage;
      else 
        return editedGallery;      
    }

    onMove =  (imageUid, imageUrl)  => {

      const {messageMode} = this.state;
      const edited = this.getEdited();
      //console.log('onMove', messageMode, edited)
      if(edited && imageUid && imageUid!=='' &&  edited.titleImage!==imageUid) {
        this.setState({isUploading: true });
        const titleImage=imageUid;
        const titleImageUrl = imageUrl;
       
        if(!messageMode) {
          const {editedGallery} = this.props;
          const { title, description,  uid, checked, date} = editedGallery;
          const data = { title,  description, checked, date, titleImage, titleImageUrl} ;    
          this.props.updateGallery(uid, data);
        } else {
       
          const {editedMessage} = this.props;
          //console.log('editedMessage', editedMessage)
          const { title, shortDescription, descriptionTitle, description, date, uid} = editedMessage;
          const data = { title,  shortDescription, descriptionTitle, description, date, titleImage, titleImageUrl};
    
          this.props.updateMessageFirebase(uid, data);
          //console.log('editedMessage', editedMessage)

        }       
      }    
    }
  
    closeModalYes = () => {
      this.setState({showCloseModal:false});    
      //console.log('closeModal') 
      const {dir, imageName, imageUid} = this.state;
      this.props.deleteImage(imageUid, dir+imageName);     
    }
  
    closeModalNo = () => {
      this.setState({showCloseModal:false});    
    }
  
    renderCloseModal() {
      const {showCloseModal } = this.state;
  
      if(showCloseModal)
        return ( <CloseModal title="test" 
            callbackYes={this.closeModalYes}
            callbackNo={this.closeModalNo}
            message="Are you sure you want to remove this image?">
          </CloseModal>);
    }
    

    renderImages() {
      const {images} = this.props;
      //let {editedGallery} = this.props;
      const edited = this.getEdited();
      if(!edited) 
        return "";

      return (  
        <div style={{marginTop:'30px', marginBottom:'30px', display:'flex', flexWrap: 'wrap'}}>  
       
       { images && images.map((val,index)=>{     
          const show = val.uid!==edited.titleImage;
          if(show) {
            return ( 
              <GalleryImage 
                  key={index} 
                  index={index}
                  url={val.url} 
                  name={val.name} 
                  uid={ val.uid }
                  size="large"
                  callbackOpen={()=>this.openImageDetail(val.url)}
                  callbackDelete={()=>this.onDelete(val.name, val.uid)}
                  />
              ) 
            } 
            else return "";      
            })
          }  
          
        </div>
      );
    }

    /*
    <GalleryImage 
                  key={index} 
                  index={index}
                  url={val.url} 
                  name={val.name} 
                  uid={ val.uid }
                  size="large"
                  callbackOpen={()=>this.openImageDetail(val.url)}
                  callbackDelete={()=>this.onDelete(val.name, val.uid)}
                  callbackMove={()=>this.onMove( val.uid, val.url)}
                  />
    */
   renderTitleImageNew() {
   
    const {dir} = this.state;
    //const {editedGallery} = this.props;
    const edited = this.getEdited();
    if(edited) {
      const titleImageUid = edited.titleImage;
      var titleImage = this.getCoverImage(titleImageUid) ;      

      return (
        <CustomUploadButton
            accept="image/*"
            name="image-uploader"
            randomizeFilename
            storageRef={firebase.storage().ref(dir)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccessTitleImage}
            onProgress={this.handleProgress}              
            >                                 
                  <div> Cover image</div>          
                 {!titleImage && 
                  <Icon name="plus" size="big"/>
                  }
                 {titleImage &&           
                  <Image  src={titleImage.url} size="small"/>  
                 }  
      </CustomUploadButton>  

     );
    }
   }

  /*
    renderTitleImage() {
      const {images} = this.props;
      const {editedGallery} = this.props;
      if(editedGallery) {
        const titleImage = editedGallery.titleImage;

        if(images && images.length>0 && titleImage!=='') {

          const titleImages = images.filter((image)=> image.uid===titleImage);
          if( titleImages.length>0) {
            const image = titleImages[0];
            return (<GalleryImage         
              url={image.url} 
              size="small"      
              callbackOpen={()=>this.openImageDetail(image.url)}
            />);
            }   else return ( <Icon name='question' size='big' /> );   
        }  else return ( <Icon name='question' size='big' /> ); 
      }
         
    }

    */
    render() {
        const {dir} = this.state;
        //const {editedGallery} = this.props;    
        const edited = this.getEdited();
        const s = "container_row  news_column_3_2";     
        return (
           <React.Fragment>

            <div className="container_news" >
                <div className={s} style={{display: 'flex', 
                                      flexDirection: 'row'}}> 
                                      
                            <div style={{display: 'flex', flexDirection: 'column', marginRight:'20%'}} >
                                      
                                     
                                <div style={{fontSize:'25px'}}> {edited && edited.title}</div>      
                                <CustomUploadButton
                                  accept="image/*"
                                  name="image-uploader"
                                  randomizeFilename
                                  storageRef={firebase.storage().ref(dir)}
                                  onUploadStart={this.handleUploadStart}
                                  onUploadError={this.handleUploadError}
                                  onUploadSuccess={this.handleUploadSuccess}
                                  onProgress={this.handleProgress}              
                                  >                                 
                                    <div  className="" style={{ marginTop: '20px', 
                                              display: 'flex', 
                                              flexDirection: 'row'}} >                           
                                        <Icon name="plus" size="big"/>
                                        <div> Add Image </div>  
                                      
                                  </div>
                                  
                                </CustomUploadButton>   
                        </div>
                        {this.renderTitleImageNew()}
                               
                    </div>                                         
                    <br/>      
                  
                   {this.renderImages()}  
                   {this.renderLoader()}
                   {this.renderImageDetail()}  
                   {this.renderCloseModal()}             
                 
                <br/>                    
            </div>
          </React.Fragment>
        );    
  }
}

const mapStateToProps = (state) => {  

  return {
    changedGallery: state.galleries.changed,
    images: state.galleries.imageRefs,
    editedGallery: state.galleries.editedGallery,
    editedMessage: state.messages.editedMessage,
    changedMessage: state.messages.changed,

  }
}
export default connect(mapStateToProps, {
  fetchImagesLinks,
    fetchGallery,
    deleteImage, 
    updateGallery,
    fetchMessageFirebase, 
    updateMessageFirebase,
})(CreateGallery);

