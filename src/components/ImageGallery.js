import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Image } from 'semantic-ui-react'
import styled from '@emotion/styled';
import _ from 'lodash';


import { Loader } from '../components/Loaders.jsx';
import CarouselGallery from '../components/carousel/CarouselGallery.jsx';
import {fetchImagesLinks, fetchGalleriesNames } from '../actions/gallery'
import '../App.css';
import { formatDateForNews} from '../helpers/helpers'
import {isDesktop} from '../helpers/helpers'



const CarouselWrapper = styled(Loader)` 
  min-height: 110px;
`;

export const GalleryDate = styled('div')`
font-family: Lato;
font-size: 14px;
font-weight: 900;
font-stretch: normal;
font-style: normal;
line-height: 2.13;
letter-spacing: 2.29px;
width: 100%;
text-transform: uppercase;

`;
export const GalleryTitle = styled('div')`
font-family: Lato;
font-size: 20px;
font-weight: 300;
font-stretch: normal;
font-style: normal;
line-height: 1.43;
letter-spacing: normal;
width: 100%;
text-align: left;
`;



class ImageGallery extends Component  {
   
    constructor(props) {
        super(props);
        this.state = {
            uid: 'yWRLMpkaBVbVxQhdArgC',
            init : false
        }
        this.onShowGalleryDetail = this.onShowGalleryDetail.bind(this)
        this.onChange = this.onChange.bind(this);
    } 

    componentDidMount(){
        const { uid, init } = this.state;       
        
        if(uid && init===false) {          
          const dir = `images/${uid}`;
          this.setState({dir, init:true}, () => {
            this.props.fetchImagesLinks(dir, uid);
            this.props.fetchGalleriesNames();            
          });
        } 
    }


    onChange = (name, value) => {
        const state = this.state; 
        state[name] = value;
        this.setState(state);
    }

    onShowGalleryDetail = (uid)  => {

        const { history, galleries} = this.props;
        const desktop = isDesktop();
             
        if(uid!=='' && (
            (this.state[uid]===1 && !desktop) 
            || ((!this.state[uid] || this.state[uid]===0) && desktop)
            )
        ){
            history.push(`/gallery/${uid}` );          
        }

        if(uid!=='' && (!this.state[uid] || this.state[uid]===0) && !desktop){           
           this.onChange(uid, 1);
           galleries.forEach(gallery => {
                if(uid!==gallery.uid)
                    this.onChange(gallery.uid, 0);            
            });
        }                  
    }

  
    render() {
        const {galleries} = this.props;       

        if(galleries && galleries.length>0)
        return (     
            <React.Fragment>                   
            <CarouselWrapper  showLoader={false}>        
                <CarouselGallery>
                    {   galleries.map((val,index)=>{       
                       
                        return (   
                            <div key={index} className="bordershadow " style={{
                                position: 'relative',
                                textAlign:'center', 
                                color: 'white' }} 
                                onClick={()=>this.onShowGalleryDetail(val.uid)}

                            >                  
                                <Image  src={val.titleImageUrl} alt="" style={{width:'100%' }} /> 
                                <div  style={{ position: 'absolute', bottom: '5px', left:'10px'}}>
                                    <GalleryDate>{formatDateForNews(val.timestamp)}</GalleryDate>
                                    <GalleryTitle>{val.title}</GalleryTitle>
                                </div> 
                            </div>    
                            ) ;      
                        })
                    } 
                </CarouselGallery>                
            </CarouselWrapper>
            <div className="borderTest" style={{height:'50px'}}></div>
            </React.Fragment> 

        );
        else return (<div></div>);
    }

}

const mapStateToProps = (state) => {  

   
    const galleries1 = _.map(state.galleries.all, (gallery, uid) => {  
        return {...gallery, uid };
    });
    const galleries = [...galleries1, ...galleries1, ...galleries1];
     
    return {
        galleries,
        images: state.galleries.imageRefs,
    }
}

export default connect(mapStateToProps,
    {  fetchImagesLinks, 
        fetchGalleriesNames})(ImageGallery);



