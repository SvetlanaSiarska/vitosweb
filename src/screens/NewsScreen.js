import React, { Component} from 'react'
import _ from 'lodash';

import './NewsScreen.css';
import {fetchMessagesFirebase, fetchNewsLinks}  from '../actions/message.js'

import { connect } from 'react-redux'
import Registration from '../components/Registration'
import ImageGallery from '../components/ImageGallery'
import Sponsors from '../components/Sponsors'
import { formatDateForNews, isDesktop} from '../helpers/helpers'
import {NAVIGATION_MOBILE} from '../actions/types'

class NewsScreen extends Component  {
   
    constructor() {
        super();
    
        this.state = {
          images:{},        
        };     
        this.onShowNewsDetail = this.onShowNewsDetail.bind(this)
        this.onChange = this.onChange.bind(this);    
    }

    componentDidMount() {   
    
        if (this.props.messages.length===0){        
            this.props.fetchMessagesFirebase();        
        } else {
            const {messages} =   this.props;
            
            messages.forEach((message) => {
                //console.log('this.state.images[message.uid]', this.state.images[message.uid])
                const state = this.state;
                if (!state.images[message.uid]) {
                    //console.log('AAAA', message.uid);
                    const dir = `images/${message.uid}`;        
                    this.props.fetchNewsLinks(dir, message.uid);  
                }             
            }) 
        }
      }

    componentDidUpdate(prevProps, prevState) {      

        if(prevProps.messages.length!==this.props.messages.length && this.props.messages.length>0)  {    
            const {messages} =   this.props;
            
            messages.forEach((message) => {
                //console.log('this.state.images[message.uid]', this.state.images[message.uid])
                const state = this.state;
                if (!state.images[message.uid]) {
                    //console.log('AAAA', message.uid);
                    const dir = `images/${message.uid}`;        
                    this.props.fetchNewsLinks(dir, message.uid);  
                }             
            }) 
        }
        if(this.props.images && this.props.images.length>0 ) {
            const image = this.props.images[0];
            const {galleryUid} = image;
            const state = this.state;        

            if(!state.images[galleryUid] && galleryUid!=="") {
                state.images[galleryUid] = image.url;           
                this.setState(state);
            }           
       }        
    }
      
    
    onChange = (name, value) => {
        const state = this.state; 
        state[name] = value;
        this.setState(state);
    }

    onShowNewsDetail = (uid)  => {

        const { history, messages} = this.props;
        const desktop = isDesktop();
       
        if(uid!=='' && (
            (this.state[uid]===1 && !desktop) 
            || ((!this.state[uid] || this.state[uid]===0) && desktop)
            )
        ){
            history.push(`/news/${uid}` );          
        }

        if(uid!=='' && (!this.state[uid] || this.state[uid]===0) && !desktop){           
           this.onChange(uid, 1);
           messages.forEach(news => {
                if(uid!==news.uid)
                    this.onChange(news.uid, 0);            
            });
        }                  
    }
  
/*
 { linkImage!=="" && 
                             <div className="borderTest news_column"> <img src= {linkImage}  
                                  style={{ marginTop:'10px'}} 
                                 width="100%" alt={message.title}/>
                                 </div>
                             }
 */
    renderNews() {        
        const {messages, navigationType} = this.props; 
        const l =   messages.length;     
       
      
        if(l===0) 
            return "";
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const style_news_media = mobile? { width:'98%', padding: '3%', margin: '1%',}: 
                                        { width:'32%', padding: '2%', margin: '.5%', }

        return (       
               
            <div className="news_table">              
             
                {   messages.map((message,index)=>{       
                        
                        var linkImage= "";    
                        //console.log('images[messages.galleryUid]', images[message.uid]);
                        //console.log('messages.galleryUid', messages);
                        /*
                        if(images[message.uid]) {                            
                            linkImage = images[message.uid];
                        }
                        */
                       if(message.titleImageUrl && message.titleImageUrl!=="") {                            
                            linkImage = message.titleImageUrl;
                        }
                       
                        return ( 
                            <React.Fragment key={index}>
                            
                             <div onClick={()=>this.onShowNewsDetail(message.uid)} 
                                    className="news_column news_column_hover"
                                    style={{...style_news_media, cursor:'pointer'}}>
                                <div className=" news_column_text_1 "  >News</div>
                                <div className=" news_column_text_2 " > 
                                    {formatDateForNews(message.dateOrder)}
                                </div>
                                                
                                <div className=" news_column_text_4 limit2Lines ">{message.title}</div>
                                <div className=" news_column_text_5 ">{message.shortDescription}</div>
                                { linkImage!=="" && 
                                <img src= {linkImage}  
                                    style={{ marginTop:'10px'}} 
                                    width="100%" alt={message.title}/>
                             }
                            </div>
                            
                             </React.Fragment>
                        );
                    })
                }                 
                                 
            </div>           
        );
    }

    render() {

        return ( 
            <div className="borderTest" style={{marginTop:`${0}px`}}>
                {this.renderNews()}
                <div className="borderTest" style={{height:'50px'}}></div>
                <ImageGallery history={this.props.history}/>

                <Sponsors/>
                <div className="borderTest" style={{height:'20px'}}></div>

                <Registration history={this.props.history}/>
            </div>
        );

    }
    
}
const mapStateToProps = (state) => {  
    const messages = _.map(state.messages.all, (val, uid) => {       
        return {...val, uid };
    });
    messages.reverse() ;
    const countImages = (state.messages.imageRefs)? state.messages.imageRefs.length: 0;   

    return {       
        messages,
        images: state.messages.imageRefs,
        countImages,
        navigationType: state.setup.navigationType,

    }
  }
export default connect(mapStateToProps,
    {  fetchMessagesFirebase, fetchNewsLinks
        })(NewsScreen);



