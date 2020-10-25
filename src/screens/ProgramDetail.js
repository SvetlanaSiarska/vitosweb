import React, { Component} from 'react'
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './NewsScreen.css';
import '../css/typography.css';
import '../components/Program.css';
import '../App.css';
import '../components/Courses.css';
import './ProgramDetail.css';

import {fetchMessagesFirebase}  from '../actions/message.js'
import Registration from '../components/Registration'
import ImageGallery from '../components/ImageGallery'
import Trainers from '../components/Trainers'
import Download from '../components/Download'

import {getNumber} from '../helpers/helpers'
import {NAVIGATION_MOBILE} from '../actions/types'

class ProgramDetail extends Component  {
   
    constructor() {
        super();
    
        this.state = {
          init:false,
          id:0,
        };      
        this.onClick = this.onClick.bind(this);
   
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            const {id} = this.props.match.params;
            this.setState({id});
        }    
      }


    componentDidMount() {   
    
        const {init} = this.state;
        const { id } = this.props.match.params;  ;

        if(this.divElement ) {           
            this.updateDimensions();
        }
        if (!init && id){
          this.setState( {id, init:true},
          ) 
        }
        window.addEventListener("resize", this.updateDimensions.bind(this));         
      }

      componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    
    updateDimensions() {               

        if(this.divElement ) {          
            var style = window.getComputedStyle(this.divElement, null);        
            var width = 1+getNumber(style.getPropertyValue("width"));           
            //console.log('margin', margin);         
            this.setState({width, height: width,}) ;      
        }      
    }

    onClick(index ) {
        const { history} = this.props;
        history.push(`/course/${index}` );
    }
   
    /*
       <div className="programDetailAnotherBox bg-gradient" style={styleHeight}>222</div>
                <div className="programDetailAnotherBox bg-gradient" style={styleHeight}>33</div>
  */
      renderProgram() {        
        const {id, height} = this.state;
        const {courses, navigationType, ProgramDetailTitle1Size, ProgramDetailTitle2Size,
            ProgramDetailLink1Size, ProgramDetailTitle3Size,
            BoxCourseRow1TextSize, 
            BoxCourseRow2TextSize, BoxCourseRow3TextSize} = this.props;
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const programDetailTitle1Style = {fontSize: `${ProgramDetailTitle1Size}` } ;
        const programDetailTitle2Style = {fontSize: `${ProgramDetailTitle2Size}` } ;
        const ProgramDetailLink1Style = {fontSize: `${ProgramDetailLink1Size}` } ;
        const ProgramDetailTitle3Style = {fontSize: `${ProgramDetailTitle3Size}` } ;
        if(id===-1) return "";
        const styleHeight = {height: `${height}px`, marginRight:'10px'};  
        const styleR1 = {top: `${Math.round(0.65*height)}px` , fontSize: '25px'};
        const styleR3 = {top: `${Math.round(0.75*height)}px` }

  
        var indexarray = [0,1,2,3,4];
        var oldindex = indexarray.indexOf(parseInt(id));
       
        if (oldindex !== -1 ) indexarray = indexarray.filter( (val)=>  val!== parseInt(id)) ;
        if(mobile) indexarray = indexarray.filter( (val, index)=>  index<2) ;
        else indexarray = indexarray.filter( (val, index)=>  index<3) ;
       
     
        const course = courses[id];
        const programDetailBoxStyle= mobile?{paddingLeft: '10px'}:{paddingLeft: '100px'};
        const programDetailAnotherBoxStyle = mobile?{ width:'48%'}:{ width:'28%'}
        const BoxCourseRow1TextStyle= {fontSize: `${BoxCourseRow1TextSize}px`};
        const BoxCourseRow2TextStyle= {fontSize: `${BoxCourseRow2TextSize}px`};
        const BoxCourseRow3TextStyle= {fontSize: `${BoxCourseRow3TextSize}px`};

        return (       
            <div className="borderTest programDetailBox" style={programDetailBoxStyle}> 

                <div className="borderTest programDetailRow" style={{alignItems: 'center'}}> 
                    <Link className="programDetail_link1" to="/" style={ProgramDetailLink1Style}>Home</Link>
                    <i  className="material-icons footerIcon" >arrow_right_alt</i> 
                    <Link className="programDetail_link1 programDetail_link2" to="/courses" style={ProgramDetailLink1Style}>Kursprogramm</Link> 
                    <i  className="material-icons footerIcon" >arrow_right_alt</i> 
                    <div className="programDetail_link1 programDetail_link3" style={ProgramDetailLink1Style}>{course.title}</div> 
                 </div>
                 <div className="borderTest" style={{height:'20px'}}></div>
                <div className="borderTest programDetailRow">
                    <div style={{flex:1, paddingRight:'30px'}}>
                        <div className="programDetail_title_1 " style={programDetailTitle1Style}>{course.title}</div>
                        <div className="borderTest" style={{height:'20px'}}></div>
                        <div className="programDetail_title_2 " style={programDetailTitle2Style}>{course.text}</div>
                        <div className="borderTest" style={{height:'50px'}}></div>
                        <div className="programDetail_text ">{course.description}
                        </div>   
                    </div>  
                    <div style={{flex:1}}> 
                        <img  width="100%" src={`../images/${course.url64}`}  alt={course.title}/> 
                    </div>   
                </div>


                <div className="borderTest" style={{height:'50px'}}></div>
                <div className="programDetail_title_3" style={ProgramDetailTitle3Style}>Schauen Sie sich diese Programme an </div>     
                <div className="borderTest" style={{height:'20px'}}></div>  
                <div className="borderTest programDetailRow">                    
                    {
                    indexarray.map((val ,index)=> ( 
                        <div key={index} className="programDetailAnotherBox bg-gradient" 
                            style={{...programDetailAnotherBoxStyle, ...styleHeight}}
                            ref={ (divElement) => this.divElement = divElement}  >
                    
                            <div className="boxCourse_rows  boxCourse_row1_text"
                                    style={{...styleR1, ...BoxCourseRow1TextStyle}}>{courses[val].title}
                            </div>
                                
                            <div className="boxCourse_rows boxCourse_row3_box  " 
                            style={styleR3} >
                                <div onClick={()=>this.onClick(val)} style={{cursor: 'pointer', ...BoxCourseRow3TextStyle}} className="boxCourse_row3_text" >MEHR LESEN</div>
                                <div onClick={()=>this.onClick(val)} style={{cursor: 'pointer'}} className="long-arrow-right"></div>                             
                            </div>
                        </div> 
                    ))}
                
                                
        </div>
    </div>

        );
    }

    render() {
        const {id} = this.state;
        const {courses, navigationType, offsetY, mobileNavHeight, 
            desktopNavIconHeight, ProgramDetailLink1Size} = this.props;
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        if(id===-1) return "";
        const course = courses[id];
        const showStickyNav = offsetY>10;
        const stickyNavTop = mobile?mobileNavHeight:desktopNavIconHeight;
        const programDetailBoxStyle= mobile?{paddingLeft: '10px'}:{paddingLeft: '100px'};
        const ProgramDetailLink1Style = {fontSize: `${ProgramDetailLink1Size}` } ;

        return ( 
            <React.Fragment>    

            { showStickyNav && 
           
                <div className="borderTestGreen programDetailRow" 
                    style={{...programDetailBoxStyle, width:'100%',
                    position: 'fixed', top: `${stickyNavTop}px`, zIndex:'30',
                    left:'0px', backgroundColor: 'white', 
                    boxShadow:' 0 0 20px 10px rgba(115, 101, 237, 0.11)'
                    }}> 
                    <Link className="programDetail_link1" to="/" style={ProgramDetailLink1Style}>Home</Link>
                    <i  className="material-icons footerIcon" >arrow_right_alt</i> 
                    <Link className="programDetail_link1 programDetail_link2" to="/courses" style={ProgramDetailLink1Style}>Kursprogramm</Link> 
                    <i  className="material-icons footerIcon" >arrow_right_alt</i> 
                    <div className="programDetail_link1 programDetail_link3"  style={ProgramDetailLink1Style}>{course.title}</div> 
             </div>}
      


            <div className="borderTest" style={{height:'20px'}}></div>
            {this.renderProgram()}


            <div className="borderTest" style={{height:'20px'}}></div>
            <div className="borderTest" style={{height:'50px'}}></div>
            <ImageGallery history={this.props.history}/>

            <Trainers/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Download/>
            <div className="borderTest" style={{height:'50px'}}></div>

             <Registration history={this.props.history}/>
             </React.Fragment>    
        );

    }
    
}
const mapStateToProps = (state) => {  
   
    const courses = _.map(state.courses.courses, (val, uid) => {  
    
        return {...val, uid };
      });
      const coursesCount = courses.length;
   return {      
    courses,
    coursesCount,
    navigationType: state.setup.navigationType,
    offsetY: state.setup.offsetY,
    mobileNavHeight: state.setup.mobileNavHeight,
    desktopNavIconHeight: state.setup.desktopNavIconHeight,
    ProgramDetailTitle1Size: state.fonts.ProgramDetailTitle1.fontSize,
    ProgramDetailTitle2Size: state.fonts.ProgramDetailTitle2.fontSize,
    ProgramDetailLink1Size: state.fonts.ProgramDetailLink1.fontSize,
    ProgramDetailTitle3Size: state.fonts.ProgramDetailTitle3.fontSize,
    BoxCourseRow1TextSize: state.fonts.BoxCourseRow1Text.fontSize,
    BoxCourseRow2TextSize: state.fonts.BoxCourseRow2Text.fontSize,
    BoxCourseRow3TextSize: state.fonts.BoxCourseRow3Text.fontSize,


   }
  }
export default connect(mapStateToProps,
    {  fetchMessagesFirebase,
        })(ProgramDetail);



