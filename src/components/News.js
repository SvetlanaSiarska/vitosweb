import React, { Component} from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'


import './News.css';
import '../css/typography.css';
import {fetchMessagesFirebase }  from '../actions/message.js'
import {NAVIGATION_MOBILE} from '../actions/types'

import {isDesktop, formatDateForNews} from '../helpers/helpers'

class News extends Component  {
   
    constructor() {
        super();
        
        this.state = {
          init:false,
          C1:0,
          C2:0,
          C3:0,
          hover:[false],
        };
        this.onShowNewsDetail = this.onShowNewsDetail.bind(this);
        this.onNewsDetail = this.onNewsDetail.bind(this);
        this.handleHover = this.handleHover.bind(this);            
    }

    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }

    componentDidMount() {   
    
        //console.log('news_fetchMessagesFirebase', this.props.messages)
        //console.log('news_fetchImages', this.props.images)
        
        if (this.props.messages.length===0){          
            this.props.fetchMessagesFirebase()
        } 
        /*else {
            const {length} =   this.props.messages;
            const messageBig = this.props.messages[length-1];   
            const dir = `images/${messageBig.uid}`;        
            this.props.fetchNewsLinks(dir, messageBig.uid);    
        }*/
      }

    componentDidUpdate(prevProps, prevState) {      

        
        /*if(prevProps.messages.length!==this.props.messages.length && this.props.messages.length>0)  {    
         const {length} =   this.props.messages;
         const messageBig = this.props.messages[length-1];

         const dir = `images/${messageBig.uid}`;        
         this.props.fetchNewsLinks(dir, messageBig.uid);      
        }*/
        
    }


    onChange = (name, value) => {
        const state = this.state; 
        state[name] = value;
        this.setState(state);
    }
    onNewsDetail(uid) {
        const { history} = this.props;
        history.push(`/news/${uid}` );
    }

    onShowNewsDetail = (name, uid)  => {
        
        const { history} = this.props;
        const desktop = isDesktop();
        //console.log('isDesktop', desktop)       

        const all = ['C1', 'C2', 'C3'];
        if(name!=='' && (
            (this.state[name]===1 && !desktop) 
            || (this.state[name]===0 && desktop)
            )
        ){
            history.push(`/news/${uid}` );
        }
        if(name!=='' && this.state[name]===0 && !desktop){
           this.onChange(name, 1);
           all.forEach(n => {
                if(name!==n)
                    this.onChange(n, 0);            
            });
        }  
        if(name===''){
            history.push(`/news` );
        }         
    }

    renderNewsContent() {        
        const {messages, NewsColumnText1Size, NewsColumnText2Size, 
            NewsColumnText4Size, NewsColumnText5Size, NewsColumnDateSize,
            NewsColumn3TitleSize}  = this.props; 
        const l =   messages.length;

        if(l===0) 
            return "";
        
        const NewsColumnText1Style= {fontSize: `${NewsColumnText1Size}px`}
        const NewsColumnText2Style= {fontSize: `${NewsColumnText2Size}px`}
        const NewsColumnText4Style= {fontSize: `${NewsColumnText4Size}px`}
        const NewsColumnText5Style= {fontSize: `${NewsColumnText5Size}px`}
        const NewsColumnDateStyle= {fontSize: `${NewsColumnDateSize}px`}
        const NewsColumn3TitleStyle = {fontSize: `${NewsColumn3TitleSize}px`}


        const messageBig = messages[l-1];
        let indexMessage1 = -1;
        let indexMessage2 = -1;
        let indexMessage3 = -1;
        if(l-2>-1)
            indexMessage1 = l-2;
        if(l-3>-1)
            indexMessage2 = l-3;
        if(l-4>-1)
            indexMessage3 = l-4;
       
        var linkImage= "";
        if(messageBig.titleImageUrl && messageBig.titleImageUrl!=="") {
            linkImage= messageBig.titleImageUrl;
        } 

        return ( <div className="news_content">
        <div className="borderTest news_column_1" 
            style={{cursor:'pointer'}} 
            onClick={() => this.onNewsDetail( messageBig.uid)}
         >
             <div className="borderTest news_column_1_1_text"  style={NewsColumnText1Style}>
                 News
             </div>
             <div className="borderTest news_column_1_2_text"  style={NewsColumnText2Style}> 
                 {formatDateForNews(messageBig.dateOrder)}
             </div>
                             
             <div className="news_column_1_4_text limit2Lines" style={NewsColumnText4Style}>{messageBig.title}</div>
             <div className="news_column_1_5_text" style={NewsColumnText5Style}>{messageBig.shortDescription}</div>
        </div>
        <div className="news_column_2">
            <img src= {linkImage}  
            style={{border:'none', outline: 'none'}} width="100%" alt={messageBig.title}/>
         </div>

        <div className="news_column_3 ">

            {indexMessage1!==-1 && 
             <div onClick={() => this.onShowNewsDetail('C1', messages[indexMessage1].uid)} 
                 style={{cursor:'pointer'}} className="borderTest translatedBox news_column_3_ news_column_3_1">
                 <div className="news_column_date news_column_3_1_date" style={NewsColumnDateStyle}>
                     {formatDateForNews(messages[indexMessage1].dateOrder)}
                 </div>
                 <div className="news_column_3_title limit2Lines" style={NewsColumn3TitleStyle}> 
                         {messages[indexMessage1].title}
                 </div>
             </div>
            }
            {indexMessage2!==-1 && 
             <div onClick={() => this.onShowNewsDetail('C2', messages[indexMessage2].uid)} 
             style={{cursor:'pointer'}} className="translatedBox news_column_3_ news_column_3_2">
                  <div className="news_column_date news_column_3_2_date " style={NewsColumnDateStyle}>
                     {formatDateForNews(messages[indexMessage2].dateOrder)}
                 </div>
                 <div className="news_column_3_title limit2Lines" style={NewsColumn3TitleStyle}> 
                     {messages[indexMessage2].title}
                 </div>
             </div>
             }
             { indexMessage3!==-1 &&
             <div onClick={() => this.onShowNewsDetail('C3', messages[indexMessage3].uid)} 
             style={{cursor:'pointer'}} className="translatedBox news_column_3_ news_column_3_1">
                 <div className="news_column_date news_column_3_1_date" style={NewsColumnDateStyle}>
                     {formatDateForNews(messages[indexMessage3].dateOrder)}
                 </div>
                 <div className="news_column_3_title limit2Lines" style={NewsColumn3TitleStyle}>                                 
                     {messages[indexMessage3].title}
                 </div>
             </div>
             }
        </div>
    </div>);
    }

    renderNewsContentMobile() {        
        const {messages,  NewsColumnText1Size, NewsColumnText2Size, 
            NewsColumnText4Size, NewsColumnText5Size,
            NewsColumnDateSize, NewsColumn3TitleSize}  = this.props; 
        const l =   messages.length;

        if(l===0) return "";

        const messageBig = messages[l-1];
        let indexMessage1 = -1;
        let indexMessage2 = -1;
        let indexMessage3 = -1;
        if(l-2>-1)
            indexMessage1 = l-2;
        if(l-3>-1)
            indexMessage2 = l-3;
        if(l-4>-1)
            indexMessage3 = l-4;
       
        var linkImage= "";
        if(messageBig.titleImageUrl && messageBig.titleImageUrl!=="") {
            linkImage= messageBig.titleImageUrl;
        } 
        const NewsColumnText1Style= {fontSize: `${NewsColumnText1Size}px`}
        const NewsColumnText2Style= {fontSize: `${NewsColumnText2Size}px`}
        const NewsColumnText4Style= {fontSize: `${NewsColumnText4Size}px`}
        const NewsColumnText5Style= {fontSize: `${NewsColumnText5Size}px`}
        const NewsColumnDateStyle= {fontSize: `${NewsColumnDateSize}px`}
        const NewsColumn3TitleStyle = {fontSize: `${NewsColumn3TitleSize}px`}


        return ( <div className="news_content">
        <div className="borderTest news_column_1" style={{cursor:'pointer', width:'50%', paddingTop: '0%'}}
            onClick={() => this.onNewsDetail( messageBig.uid)}
         >
           
           
            <img src= {linkImage}  
               style={{border:'none', outline: 'none'}} width="100%" alt={messageBig.title}/>

           
            <div className="borderTest" style={{height:'20px'}}></div>
             <div className="borderTest news_column_1_1_text" style ={{NewsColumnText1Style}} >
                 News
             </div>
             <div className="borderTest news_column_1_2_text" style ={{NewsColumnText2Style}} > 
                 {formatDateForNews(messageBig.dateOrder)}
             </div>
                             
             <div className="news_column_1_4_text limit2Lines" style ={{NewsColumnText4Style}}>{messageBig.title}</div>
             <div className="news_column_1_5_text" style ={{NewsColumnText5Style}}>{messageBig.shortDescription}</div>
             <div className="borderTest" style={{height:'20px'}}></div>
        </div>
      
        <div className="borderTest news_column_3 " style={{width:'50%', xjustifyContent: 'flex-start'}}>

            {indexMessage1!==-1 && 
             <div onClick={() => this.onShowNewsDetail('C1', messages[indexMessage1].uid)} 
                 style={{cursor:'pointer', }} 
                 className="borderTest translatedBox news_column_3_ news_column_3_1">
                 <div className="news_column_date news_column_3_1_date" style={NewsColumnDateStyle}>
                     {formatDateForNews(messages[indexMessage1].dateOrder)}
                 </div>
                 <div className="news_column_3_title limit2Lines" style={NewsColumn3TitleStyle}> 
                         {messages[indexMessage1].title}
                 </div>
             </div>
            }
            {indexMessage2!==-1 && 
             <div onClick={() => this.onShowNewsDetail('C2', messages[indexMessage2].uid)} 
             style={{cursor:'pointer'}} className="translatedBox news_column_3_ news_column_3_2">
                  <div className="news_column_date news_column_3_2_date " style={NewsColumnDateStyle}>
                     {formatDateForNews(messages[indexMessage2].dateOrder)}
                 </div>
                 <div className="news_column_3_title limit2Lines" style={NewsColumn3TitleStyle}> 
                     {messages[indexMessage2].title}
                 </div>
             </div>
             }
             { indexMessage3!==-1 &&
             <div onClick={() => this.onShowNewsDetail('C3', messages[indexMessage3].uid)} 
             style={{cursor:'pointer'}} className="translatedBox news_column_3_ news_column_3_1">
                 <div className="news_column_date news_column_3_1_date" style={NewsColumnDateStyle}>
                     {formatDateForNews(messages[indexMessage3].dateOrder)}
                 </div>
                 <div className="news_column_3_title limit2Lines" style={NewsColumn3TitleStyle}>                                 
                     {messages[indexMessage3].title}
                 </div>
             </div>
             }
        </div>
    </div>);
    }

    render() {        
        const {messages, navigationType, ContainerTitle1, 
            ContainerTitle4, NewsButtonTextSize}  = this.props; 
        const l =   messages.length;       
        if(l===0) 
            return "";
        const mobile =  (navigationType===NAVIGATION_MOBILE);
    
        const {hover} = this.state;
        const s = hover[0]?{cursor:'pointer', color:'#3f379d'}:{cursor:'pointer', color: 'white'};
        const containerTitle1Style= {fontSize: `${ContainerTitle1}px`};
        const containerTitle4Style= {fontSize: `${ContainerTitle4}px`};
        const NewsButtonTextStyle= {fontSize: `${NewsButtonTextSize}px`}

        return (       
               
            <div className="component_container">                
                <div className="container_title_1" style={containerTitle1Style}>UNSERE NEWS</div>              
                <div className="container_title_4" style={containerTitle4Style} >Bleib informiert</div>
                <div className="borderTest" style={{height:'70px'}}></div>
                {mobile? this.renderNewsContentMobile(): this.renderNewsContent()}
                <div className="borderTest" style={{height:'70px'}}></div>
               <div onClick={() => this.onShowNewsDetail('')} 
                className="all_news_button "
                onMouseEnter={()=>{this.handleHover(0);}} 
                onMouseLeave={()=>{this.handleHover(0);}}
                > 
                <div className="news_button_text"  style={{...s, ...NewsButtonTextStyle}} >Alles lesen</div> </div> 
            </div>
        );
    }
    
}
const mapStateToProps = (state) => {  

    const messages = _.map(state.messages.all, (val, uid) => {         
        return {...val, uid };
      });

      //console.log('messages', messages)
      return {       
        //images: state.messages.imageRefs,
        //countImages,
        messages,
        navigationType: state.setup.navigationType,
        ContainerTitle1: state.fonts.ContainerTitle1.fontSize,
        ContainerTitle4: state.fonts.ContainerTitle4.fontSize,
        NewsButtonTextSize: state.fonts.NewsButtonText.fontSize,
        NewsColumnText1Size: state.fonts.NewsColumnText1.fontSize,
        NewsColumnText2Size: state.fonts.NewsColumnText2.fontSize,
        NewsColumnText4Size: state.fonts.NewsColumnText4.fontSize,
        NewsColumnText5Size: state.fonts.NewsColumnText5.fontSize,
        NewsColumnDateSize: state.fonts.NewsColumnDate.fontSize,
        NewsColumn3TitleSize: state.fonts.NewsColumn3Title.fontSize,

      }
  }
export default connect(mapStateToProps,
    {  fetchMessagesFirebase})(News);



