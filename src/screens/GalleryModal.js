import React, { Component } from 'react'
import { connect } from 'react-redux'

import  ModalBig from '../components/ModalBig'
import '../App.css';
import './GalleryModal.css';
import  {formatNumberTo2dDigits, getNumber} from '../helpers/helpers'
import {fetchImagesLinks,} from '../actions/gallery'


class GalleryModal extends Component  {
    
    constructor(props) {
        
        super(props);
        this.state = {
            init:false,
            currentImage: 0,
            nextImage:1,
            backImage:-1,
            widthImage: 100,
        };       
        this.updateDimensions = this.updateDimensions.bind(this);
    }



    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    
    updateDimensions() {               
        
        if(this.divElement && this.divElementImage) {           
            var style = window.getComputedStyle(this.divElement, null);
            var height = getNumber(style.getPropertyValue("height"))

            var styleImage = window.getComputedStyle(this.divElementImage, null);
            var heightImage = getNumber(styleImage.getPropertyValue("height"))

            var  widthImage = 100;
            if(heightImage>height) {                
            widthImage= Math.round(100*height/heightImage);
            }                 
            this.setState({widthImage})           
        }              
    }

    componentDidMount(){
        const { init } = this.state;  
        const { id } = this.props.match.params;  ;
       
        if(id && init===false) {              
            const dir = `images/${id}`;
            this.setState({dir, init:true}, () => {
            this.props.fetchImagesLinks(dir, id);
          });
        } 
        window.addEventListener("resize", this.updateDimensions.bind(this));
        if(this.divElement && this.divElementImage) {           
            this.updateDimensions();
        } 
    }

    /*componentDidUpdate(prevProps, prevState) {      
        if(prevProps.id!==this.props.id &&this.props.id)   {  
            console.log('XXXXXX', this.props.id)    
            const dir = `images/${this.props.id}`;
            this.props.fetchGalleryLinks(dir, this.props.id);
        } 
      }*/
        
    setCurrentImage(i) {
        const {currentImage, nextImage, backImage} = this.state;
        const {countImages} = this.props;

        const newCurrentImage = (currentImage+i+countImages)%countImages;
        const newNextImage = (nextImage+i+countImages)%countImages;
        const newBackImage = (backImage+i+countImages)%countImages;


        this.setState({
             currentImage:newCurrentImage,
             nextImage: newNextImage, 
             backImage:newBackImage })

    }
    
    renderModalContent(image) {
        const {images, countImages} = this.props;

        if(!images|| countImages===0) return (
            <div className="gallery_main_column" >NO IMAGES</div>
        );
       
        const {currentImage, widthImage, nextImage, backImage} = this.state;
        
        var i1 = backImage<0? countImages-1: (backImage);
        var i2 = (currentImage);
        var i3 = (nextImage);

        
        const styleWidth = {width: `${widthImage}%`};   
       //const styleImage = {width:'100%' }
        return (          
            <div className="borderTest gallery_main_column"  >     
              <div className=" borderTest gallery_row_1" 
                onClick={()=>this.props.history.goBack()}
              >  
              <div>
                <img src="../images/Logo-Negative.svg"  
                       style={{border:'none', outline: 'none'}} width="100%" alt="Tennischule Vito Gugolz"/>
              </div>
              <div className="gallery_row">
                    <div className="closeText" style={{color:'#2d299c', margin:'0px 15px'}}> Schliessen</div>
                    <div className=" close-icon"> </div>
             </div>
              </div>
            
              <div className="borderTest gallery_row_2" >
              
                    <div className="gallery_image_small gallery_image_small_back">
                    { countImages>1 &&  
                        <img  src={images[i1].url} alt="" style={{width:'90%' }}  />  }
                  </div>
                   
                  <div className="gallery_image_big" ref={ (divElement) => this.divElement = divElement}>
                    <img  className="borderTest" 
                        ref={ (divElement) => this.divElementImage = divElement}
                        src={images[i2].url} alt=""  style={styleWidth}  /> 
                  </div>
                  <div className="gallery_image_small gallery_image_small_next">
                    { countImages>1 &&  
                    <img  src={images[i3].url} alt="" style={{width:'90%' }} /> }
                  </div>
              </div>
                
              <div className="borderTest gallery_row_3" >
                  <div className="borderTest gallery_links"> 
                    <div className="borderTest gallery_links_next"
                        onClick={()=>this.setCurrentImage(-1)} >
                             <div className="long-arrow-leftB"></div> 
                    </div>
                    <div className="borderTest gallery_links_static">
                        {formatNumberTo2dDigits(currentImage+1)}/
                        {formatNumberTo2dDigits(countImages)} </div>
                    <div className="borderTest gallery_links_next"  
                        onClick={()=>this.setCurrentImage(1)}>
                        <div className="long-arrow-rightB"></div>  
                    </div>
                  </div>
              </div>
            </div>
        );
    }
    render() {
       
        
            return (
                <div>
                    <ModalBig 
                        content={this.renderModalContent()}
                        onDismiss={()=>this.props.history.goBack()}
                    />
                </div>
            );           
        
    }
   
}

const mapStateToProps = (state) => {  

    const countImages = (state.galleries.imageRefs)? state.galleries.imageRefs.length: 0;   
  
    return {
        images: state.galleries.imageRefs,
        countImages,
    }
}


export default connect(mapStateToProps,
    {  fetchImagesLinks})(GalleryModal);
