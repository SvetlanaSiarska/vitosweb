import React, { Component} from 'react'
import { connect } from 'react-redux';


import  News  from '../components/News'
import AboutUsPreview from '../components/AboutUsPreview'
import Registration from '../components/Registration'
import ImageGallery from '../components/ImageGallery'
import Trainers from '../components/Trainers'
import Sponsors from '../components/Sponsors'



class Home extends Component  {
     
   

    render() {
        //const style = (marginTop && marginTop>0)?{marginTop} :{marginTop:'10px'};

        //if(images)
        
        //console.log('render_editedGallery', editedGallery)
        if(true) { 
        //if(!authenticated) { 
            return ( 
                    
             
                <React.Fragment>
                    <AboutUsPreview preview={true} history={this.props.history}/>
                    <div className="borderTest" style={{height:'50px', width:'100%'}}></div>
                    <ImageGallery history={this.props.history}/>
                    
                    <News history={this.props.history}/> 

                    <div className="borderTest" style={{height:'20px'}}></div>
                    <Sponsors/>
                    <div className="borderTest" style={{height:'20px'}}></div>

                    <Trainers/>
                    <div className="borderTest" style={{height:'50px'}}></div>
                    <Registration history={this.props.history}/>
            </React.Fragment>
           )
           
        } else return (<div></div>);
    }    
  }

  const mapStateToProps = (state) => {    
     // console.log('state.galleries.imageRefs', state.galleries.imageRefs)
    return {
        authenticated: state.auth.authenticated,
        editedGallery: state.galleries.editedGallery,

    }
  }
  export default connect(mapStateToProps, {
     
  })(Home);
  