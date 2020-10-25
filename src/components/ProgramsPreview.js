import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

import {NAVIGATION_MOBILE} from '../actions/types'
import './Preview.scss';
import './Program.css';
import './Courses.css';
import '../App.css';
import '../css/typography.css';

import {getNumber} from '../helpers/helpers'


class ProgramsPreview extends Component  {
   
    constructor() {
        super();
        
        this.state = {
          //courses,
          init:false,
          height :100,
          marginTop:0,
          hover:[false, false, false, false, false],
          };
        this.onClick = this.onClick.bind(this);
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));

        if(this.divElement  && this.divElementSecond) {           
            this.updateDimensions();
        }    
                 
    }
    updateDimensions() {               

        if(this.divElement && this.divElementSecond ) {           
            var style = window.getComputedStyle(this.divElement, null);        
            var width = 1+getNumber(style.getPropertyValue("width"));
            var rect = this.divElement.getBoundingClientRect();
       

             
            var rect2 = this.divElementSecond.getBoundingClientRect();
            const marginTop =  Math.round(rect2.left - rect.left - width);
            //console.log('margin', margin);         
            this.setState({width, height: width, marginTop}) ;      
        }      
    }
    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }
    
    onClick(index ) {
        const { history} = this.props;
        history.push(`/course/${index}` );
    }
    renderBox(index) {

        const {height,width, hover, } = this.state;
        const { courses, navigationType,
            BoxCourseRow1TextSize, 
            BoxCourseRow2TextSize, BoxCourseRow3TextSize} = this.props;
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        
        const styleR1 = hover[index]? {top: `${Math.round(0.55*height)}px` }:{top: `${Math.round(0.65*height)}px` };
        const styleR2 = hover[index]? {top: `${Math.round(0.68*height)}px`}:{top: `${Math.round(0.62*height)}px`, display: 'none' };
        const styleR3 = {top: `${Math.round(0.81*height)}px` }
        const classNameBox = hover[index]?" programBox":"programBox bg-gradient";
        const classNameImg = hover[index]?"bg-img-over":"bg-gradient";
        const displayNone =  hover[index]?{}:{display: 'none'};
        const programBoxStyle=mobile?{ width:'49%'}:{width:'32%'};
        const BoxCourseRow1TextStyle= {fontSize: `${BoxCourseRow1TextSize}px`};
        const BoxCourseRow2TextStyle= {fontSize: `${BoxCourseRow2TextSize}px`};
        const BoxCourseRow3TextStyle= {fontSize: `${BoxCourseRow3TextSize}px`};
        const course = courses[index];
        return (
        <div className={classNameBox}   style={programBoxStyle}
            ref={ (divElement) => {if(index===0) this.divElement = divElement;
                if(index===1) this.divElementSecond = divElement;  
            }}
            onMouseEnter={()=>{this.handleHover(index);}} 
            onMouseLeave={()=>{this.handleHover(index);}}
        >
         <div  className={classNameImg} style={{ height : `${height}px`}}>
                <img className="" style={displayNone} src={`../images/${course.url1}`} 
                        height={height} width={width} alt={course.title}/>                             
        </div>

        <div className="boxCourse_rows  boxCourse_row1_text"
            style={{...styleR1, ...BoxCourseRow1TextStyle}}>{course.title}</div>
        <div className="boxCourse_rows  boxCourse_row2_text"
         style={{...styleR2, ...BoxCourseRow2TextStyle}} >{course.text}</div>
        <div className="boxCourse_rows boxCourse_row3_box  " 
         style={{...styleR3,}} >
            <div onClick={()=>this.onClick(index)} style={{cursor: 'pointer', ...BoxCourseRow3TextStyle}} className="boxCourse_row3_text">MEHR LESEN</div>
            <div onClick={()=>this.onClick(index)} style={{cursor: 'pointer'}} className="long-arrow-right"></div>                             
        </div>
    </div>);
    }
    renderTeaser(margin) {
        const {height, marginTop} = this.state;
        const {SuperTitleProgramsSize, TitleProgramsSize} = this.props;
        const heightStyle= {height: `${height}px`};
        const programBoxStyle={width:'32%'};
        const SuperTitleProgramsStyle= {fontSize: `${SuperTitleProgramsSize}px`};
        const TitleProgramsStyle= {fontSize: `${TitleProgramsSize}px`};

        return ( <div style={{
            marginLeft:`${margin}px`, 
            marginRight:`${margin}px`}}>

            <div className="supertitlesPrograms" style={SuperTitleProgramsStyle}>ETWAS FÜR DICH</div>
            <div className="titlesPrograms" style={TitleProgramsStyle}>Unsere Kursangebote</div>
            <div className="borderTest" style={{height:'20px'}}></div>
            <div className="programBoxes" >

                <div className="programBoxRow" style={heightStyle}>
                   {this.renderBox(0)}                   
                   {this.renderBox(1)}
                   {this.renderBox(2)}
                </div>
                <div className="programBoxRow" style={{...heightStyle, marginTop : `${marginTop}px`}}>
                     {this.renderBox(3)}
                     {this.renderBox(4)}
                    <div className="programBox" style={programBoxStyle}/>
                </div>
            </div>
         </div>);
    }
    
    renderTeaserMobile(margin) {
        const {height, marginTop} = this.state;
        const {SuperTitleProgramsSize, TitleProgramsSize} = this.props;
        const heightStyle= {height: `${height}px`};
        const programBoxStyle={width:'49%'};

        const SuperTitleProgramsStyle= {fontSize: `${SuperTitleProgramsSize}px`};
        const TitleProgramsStyle= {fontSize: `${TitleProgramsSize}px`};

        return (
            <React.Fragment>
             <div style={{
                marginLeft:`${margin}px`, 
                marginRight:`${margin}px`}}>

                    <div className="supertitlesPrograms" style={SuperTitleProgramsStyle}>ETWAS FÜR DICH</div>
                    <div className="titlesPrograms" style={TitleProgramsStyle}>Unsere Kursangebote</div>
                    <div className="borderTest" style={{height:'20px'}}></div>
            </div>
            <div className=" programBoxes" >

                <div className="borderTestBlue programBoxRow" style={heightStyle}>
                   {this.renderBox(0)}                   
                   {this.renderBox(1)}                  
                </div>
                <div className="programBoxRow" style={{...heightStyle, marginTop : `${marginTop}px`}}>
                    {this.renderBox(2)}    
                    {this.renderBox(3)}    
                </div>
                <div className="programBoxRow" style={{...heightStyle, marginTop : `${marginTop}px`}}>
                   
                     {this.renderBox(4)}
                    <div className="programBox" style={programBoxStyle}/>
                </div>
            </div>
        
         </React.Fragment>
         );
    }

     render() {  
        const {infoLeft, infoHeight, navigationType, marginGrid, 
            heightInfoHeader, marginMobileGrid,
            ContainerTitle1, ContainerTitle2, ContainerText} = this.props;
        
        const screenWidth = Math.min(window.screen.width, window.innerWidth) ;
        const mobile =  (navigationType===NAVIGATION_MOBILE);
        const margin= mobile?marginMobileGrid: marginGrid;
        const styleMargin= mobile?'5%':`${margin}px`;
        var marginTop = mobile? 50:50-(infoHeight-heightInfoHeader);
        const width = !mobile? infoLeft - 1.5*marginGrid: screenWidth- 2*marginGrid;
      const styleWidth = !mobile?`${width}px`:'90%'
      const st = mobile?{  alignItems: 'center'}:{};
      const textStyle = mobile? {textAlign: 'center'}:{textAlign: 'left'};
      const containerTitle1Style= {fontSize: `${ContainerTitle1}px`}
      const containerTitle2Style= {fontSize: `${ContainerTitle2}px`}
      const containerTextStyle= {fontSize: `${ContainerText}px`}
      

      return (     
        <React.Fragment>
            <div className="borderTest container_preview" style={{
               
                marginLeft:`${styleMargin}`, 
                marginRight:`${styleMargin}`,
                marginTop:`${marginTop}px`,
                width:`${styleWidth}`,
                minHeight: `${infoHeight-40-50}px`,
                ...st}}> 

             
                <div className="container_title_1 " style={containerTitle1Style}>LET’S PLAY TENNIS</div>
                <div className="container_title_2 " style={containerTitle2Style}>TVG Programs</div>
                <div className="borderTest" style={{height:'20px'}}></div>
                <div className="container_text " style={{...textStyle, ...containerTextStyle}}>Seit über 20 Jahren bietet die Tennisschule Vito 
                    Gugolz in Basel und Umgebung qualifiziert-hochstehenden und pädagogisch 
                    wertvollen Tennisunterricht an. 

                </div>       
            </div>

            <div className="borderTest" style={{height:'40px'}}></div>
            {!mobile && this.renderTeaser(marginGrid) }
            {mobile && this.renderTeaserMobile(marginGrid) }

        </React.Fragment>
        );
    }
    
}


const mapStateToProps = (state) => {    
    // console.log('state.galleries.imageRefs', state.galleries.imageRefs)

    const courses = _.map(state.courses.courses, (val, uid) => {  
    
        return {...val, uid };
      });
    const coursesCount = courses.length;
   return {
        navigationType: state.setup.navigationType,
        infoLeft: state.setup.leftInfoPosition,
        infoHeight: state.setup.heightInfo,
        heightInfoHeader: state.setup.heightInfoHeader,
        courses,
        coursesCount,
        marginGrid: state.setup.marginGrid,      
        marginGridTop: state.setup.marginGridTop,
        marginMobileGrid:  state.setup.marginMobileGrid,
        ContainerTitle1: state.fonts.ContainerTitle1.fontSize,
        ContainerTitle2: state.fonts.ContainerTitle2.fontSize,
        ContainerText: state.fonts.ContainerText.fontSize,
        BoxCourseRow1TextSize: state.fonts.BoxCourseRow1Text.fontSize,
        BoxCourseRow2TextSize: state.fonts.BoxCourseRow2Text.fontSize,
        BoxCourseRow3TextSize: state.fonts.BoxCourseRow3Text.fontSize,
        SuperTitleProgramsSize: state.fonts.SuperTitlePrograms.fontSize,
        TitleProgramsSize: state.fonts.TitlePrograms.fontSize,

   }
 }
 export default connect(mapStateToProps, {})(ProgramsPreview);



