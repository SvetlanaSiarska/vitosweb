import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './NewsScreen.css';
import '../css/typography.css';
import './ProgramDetail.css';
import './NewsDetail.css';

import {fetchMessageFirebase, fetchNewsLinks}  from '../actions/message.js'
import Registration from '../components/Registration'
import ImageGallery from '../components/ImageGallery'
import Download from '../components/Download'
import {fetchPdfLinks} from '../actions/docs.js'
import {NAVIGATION_MOBILE} from '../actions/types'

class NewsDetail extends Component  {
   
    constructor() {
        super();
    
        this.state = {
            init:false,
            images:{},        
        };         
    }
   
    componentDidMount() {   
    
        const { init } = this.state;  
        const { id } = this.props.match.params;  ;
       
        if(id && init===false) {              
            this.setState({ init:true}, () => {
                this.props.fetchMessageFirebase( id);
                const dirPdf = `docs/${id}/`;
                this.props.fetchPdfLinks(dirPdf, id) ;  
          });
        }       
      }


     

    componentDidUpdate(prevProps, prevState) {       

        if(prevProps.message!==this.props.message )  {              
            
            const {message} = this.props;
            const dir = `images/${message.uid}`;        
            this.props.fetchNewsLinks(dir, message.uid);     
        }        
    }
      
    renderNewsText() {
       
        const {message, pdfs, NewsDetailText3Size} = this.props;
        if(!message) return "";
        if(!message.description) return "";


        // $LINK $ 
        var nStart = message.description? message.description.indexOf("$LINK"):0;
        var nEnd = message.description? message.description.lastIndexOf("$"):0;
      
        //var n = message.description? message.description.indexOf("$LINK"):0;
        var linkPdf = nStart>0 ?message.description.substring(nStart+5, message.description.length):'';
        var n = linkPdf.lastIndexOf('$');
        linkPdf = linkPdf.substring(0, n)
        n = linkPdf.lastIndexOf('$');
        const textPdfLink = linkPdf.substring( n+1, linkPdf.length);
        linkPdf = linkPdf.substring(0, n)

       
        var pdfObjs = undefined; 
        var pdfObj = undefined;
        var pdfLink = "";
        if(pdfs) {
            pdfObjs = pdfs.filter(pdf=> pdf.name===linkPdf);
            if(pdfObjs.length>0)
                pdfObj = pdfObjs[0];

            
            if(pdfObj)
            pdfLink =  <a href={pdfObj.url} download target="_blank" rel="noopener noreferrer"                                > 
                  {textPdfLink} </a> ; 
                 
        }
           
        var nStart = message.description? message.description.indexOf("$LINK"):0;
        var nEnd = message.description? message.description.lastIndexOf("$"):0;
        const NewsDetailText3Style= {fontSize: `${NewsDetailText3Size}` } ;    
        return <div className="news-detail-text3 " style={NewsDetailText3Style}>
            { message.description.substring(0,nStart )} 
             {pdfLink}
             { message.description.substring(nEnd+1, message.description.length )}
        
        </div>
    }
   
    renderNewsDetail() {
        const {message, images, ProgramDetailTitle1Size,
            ProgramDetailLink1Size, NewsDetailText1Size,
            NewsDetailText2Size} = this.props;
        if(!message) return "";

        const programDetailTitle1 = {fontSize: `${ProgramDetailTitle1Size}` } ;
        const ProgramDetailLink1Style = {fontSize: `${ProgramDetailLink1Size}` } ;
        const NewsDetailText1Style= {fontSize: `${NewsDetailText1Size}` } ;
        const NewsDetailText2Style= {fontSize: `${NewsDetailText2Size}` } ;

    return (     
    <div className="borderTestBlue programDetailBox"> 
        <div className="borderTest" style={{height:'20px'}}></div>
        <div className=" programDetailRow" style={{alignItems: 'center'}}> 
            <Link className="programDetail_link1" to="/" style={ProgramDetailLink1Style}>Home</Link>
            <i  className="material-icons footerIcon" >arrow_right_alt</i> 
            <Link className="programDetail_link1 programDetail_link2" style={ProgramDetailLink1Style} to="/news">News</Link> 
            <i  className="material-icons footerIcon" >arrow_right_alt</i> 
            <div className="programDetail_link1 programDetail_link3" style={ProgramDetailLink1Style}>{message.title}</div> 
        </div>
        <div className="borderTest" style={{height:'20px'}}></div>
        <div className="borderTest programDetailRow">
            <div style={{flex:1, paddingRight:'30px'}}>
                <div className="programDetail_title_1 " style={programDetailTitle1}>{message.title}</div>
                <div className="callunaLine ">—</div>
                <div className="borderTest" style={{height:'20px'}}></div>
                <div className="news-detail-text1 " style={NewsDetailText1Style}>{message.shortDescription}</div>
                <div className="borderTest" style={{height:'40px'}}></div>
                <div className="newsDetailLine"></div>
                <div className="borderTest" style={{height:'40px'}}></div>
                <div className="borderTest news-detail-text2 " style={NewsDetailText2Style}>{message.descriptionTitle}</div>
                <div className="borderTest" style={{height:'20px'}}></div>
                
                {this.renderNewsText()}
            </div>  
            {images && images.length>0 && 
                <div style={{flex:1}}> 
                <img  width="100%" src={images[0].url}  alt={message.title}/> 
            </div> 
        }  
        </div>
    </div>
);
    
    }


    render() {
        const {message, offsetY, mobileNavHeight, 
            desktopNavIconHeight, navigationType, ProgramDetailLink1Size} = this.props;
        const mobile = (navigationType ===NAVIGATION_MOBILE);  
        const showStickyNav = offsetY>10;
        const stickyNavTop = mobile?mobileNavHeight:desktopNavIconHeight;
        const ProgramDetailLink1Style = {fontSize: `${ProgramDetailLink1Size}` } ;
        return ( 
            <React.Fragment>    
                 {showStickyNav  && <div className="borderTestBlue programDetailBox" 
                            style={{ position: 'fixed', top: `${stickyNavTop}px`, 
                            backgroundColor: 'white',
                            width:'100%',
                            boxShadow:' 0 0 20px 10px rgba(115, 101, 237, 0.11)'}}> 
                    <div className=" programDetailRow" style={{alignItems: 'center'}}> 
                        <Link className="programDetail_link1" to="/" style={ProgramDetailLink1Style}>Home</Link>
                        <i  className="material-icons footerIcon" >arrow_right_alt</i> 
                        <Link className="programDetail_link1 programDetail_link2" style={ProgramDetailLink1Style} to="/news">News</Link> 
                        <i  className="material-icons footerIcon" >arrow_right_alt</i> 
                        <div className="programDetail_link1 programDetail_link3"style={ProgramDetailLink1Style} >{message.title}</div> 
                    </div>
                 </div>
                 }
                {this.renderNewsDetail()}               
                
                <div className="borderTest" style={{height:'70px'}}></div>
                <ImageGallery history={this.props.history}/>

                <Download/>
                <div className="borderTest" style={{height:'20px'}}></div>

                <Registration history={this.props.history}/>
                <div className="borderTest" style={{height:'50px'}}></div>
            </React.Fragment>
        );

    }
    
}
const mapStateToProps = (state) => {  
   
    const countImages = (state.messages.imageRefs)? state.messages.imageRefs.length: 0;   

    return {       
        message: state.messages.editedMessage,
        images: state.messages.imageRefs,
        countImages,
        pdfs:state.messages.pdfs,
        offsetY: state.setup.offsetY,
        mobileNavHeight: state.setup.mobileNavHeight,
        desktopNavIconHeight: state.setup.desktopNavIconHeight,
        hightBigImageNavigation: state.setup.hightBigImageNavigation,
        navigationType: state.setup.navigationType,
        ProgramDetailTitle1Size: state.fonts.ProgramDetailTitle1.fontSize, 
        ProgramDetailLink1Size: state.fonts.ProgramDetailLink1.fontSize,
        NewsDetailText1Size: state.fonts.NewsDetailText1.fontSize,
        NewsDetailText2Size: state.fonts.NewsDetailText2.fontSize,
        NewsDetailText3Size: state.fonts.NewsDetailText3.fontSize,



    }
  }
export default connect(mapStateToProps,
    {  fetchMessageFirebase, 
        fetchNewsLinks,
        fetchPdfLinks
        })(NewsDetail);



