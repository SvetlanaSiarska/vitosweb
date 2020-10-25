import  React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash';
import { Icon } from 'semantic-ui-react'

import '../App.css';
import '../components/News.css';
import {fetchGalleriesNames, deleteGallery} from '../actions/gallery'
import CloseModal from '../components/CloseModal'
class CreateGalleries extends Component  {

  constructor() {
      super();
      this.state = {init:false,
        showCloseModal:false}
  
      this.onCreateNewGallery = this.onCreateNewGallery.bind(this);
      //this.onDelete = this.onDelete.bind(this); 
      //this.onEdit = this.onEdit.bind(this); 
      this.closeModalNo = this.closeModalNo.bind(this);
      this.closeModalYes = this.closeModalYes.bind(this)    

  }

  componentDidMount() {   
    const {init} = this.state;
    
  
    if(init===false) {
      this.setState({init:true}, 
        this.props.fetchGalleriesNames());
    }      
  }

  componentDidUpdate(prevProps, prevState) {      
    if(prevProps.changed!==this.props.changed) {      
        this.props.fetchGalleriesNames();
    } 
  }
    
  onCreateNewGallery () {
    const { history} = this.props;
    history.push('/newGallery');
  }

  onEditGallery (uid) {
    const { history} = this.props;
    history.push(`/editGallery/${uid}`);
  }
  onDelete =  (uid)  => {
    //this.props.deleteMessageFirebase(uid);
    this.setState({showCloseModal:true, uid});
  }

  closeModalYes = () => {
    this.setState({showCloseModal:false});    
    //console.log('closeModal') 
    const {uid} = this.state;
    const ref = `images/${uid}`;
    this.props.deleteGallery(uid, ref );
  }

  closeModalNo = () => {
    this.setState({showCloseModal:false});    
    //console.log('closeModal') 
  }

  renderCloseModal() {
    const {showCloseModal } = this.state;

    if(showCloseModal)
      return ( <CloseModal title="test" 
          callbackYes={this.closeModalYes}
          callbackNo={this.closeModalNo}
          message="Are you sure you what to permanently remove this gallery?">
        </CloseModal>);
  }

  render() {
    const {galleries} = this.props;
    const stylePadding = {paddingTop:'10px', paddingBottom:'10px'}
    return (        
      <div className="borderTest" >
         
         {this.renderCloseModal()} 
                  <button className="buttonBlue" onClick={this.onCreateNewGallery}>  
                      <Icon name='plus' size='big' />  
                      Add new Gallery
                  </button>
                  <br/>
                  <br/>


                  <div className="borderTest container_news">
                  {       
                    galleries && galleries.map((gallery, index)=> { 
                     
                      var s = " borderTest container_row news_column_3_1";
                      if(index%2===1)
                        s = "borderTest container_row news_column_3_2";     

                      const linkToGallery = `/galleryadmin/${gallery.uid}`;    

                        return (           
                          <div key={index}  style={stylePadding} className={s} >                         
                            <button onClick={()=>this.onEditGallery(gallery.uid)}>  
                              <Icon name='edit' size='big' /> 
                            </button>
                            <button  onClick={() => this.onDelete(gallery.uid)}>
                              <Icon name='delete' size='big' /> 
                            </button>
                            <Link  to={linkToGallery}> 
                              <Icon name='images' size='big' /> 
                            </Link>
                            <span style={{marginLeft:'40px', fontSize:'25px'}}>{gallery.title}</span>                      
                            
                          </div>     
                        )
                  })                              
                } 
                </div>
             
          <br/>  
      </div>
    );    
  }
}

const mapStateToProps = (state) => {  
  const galleries = _.map(state.galleries.all, (val, uid) => {         
    return {...val, uid };
  });
  return {      
      galleries,
      changed: state.galleries.changed,
    }
}
  export default connect(mapStateToProps, {
       fetchGalleriesNames,
       deleteGallery
           })(CreateGalleries);

