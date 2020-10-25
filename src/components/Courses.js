import React, {Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import {Swipeable} from 'react-swipeable';

import './Courses.css';
import '../App.css';
import '../css/typography.css';
class Courses extends Component  {
   
    constructor() {
        super();
  
      
        const firstCourse = 0;
        const secondCourse = 1;
        const thirdCourse = 2;

        this.state = {
          init:false,
          height:100,
          hover:[false, false, false, false, false],
          firstCourse,
          secondCourse,
          thirdCourse,
          position: 0,
          direction: 'next',
          sliding: false
          };
          this.setCurrentCourses = this.setCurrentCourses.bind(this); 
          this.onClick = this.onClick.bind(this);
          this.handleHover = this.handleHover.bind(this);
          this.nextSlide = this.nextSlide.bind(this);
          this.prevSlide = this.prevSlide.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));

        if(this.divElement ||this.divElementContainer ) {           
            this.updateDimensions();
        }    
                 
    }
    componentDidUpdate(prevProps, prevState) {
         
        if(prevProps.navigationType !== this.props.navigationType) {
            this.updateDimensions(); 
        } 
    }

    updateDimensions() {         

        var heightImage = 579; //getNumber(styleImage.getPropertyValue("height"));
        var widthImage = 434; //getNumber(styleImage.getPropertyValue("width"));  

        if(this.divElement ) {           
            const obj = this.divElement.getBoundingClientRect();
            const { width } = obj;

            const height = Math.round(heightImage*width/widthImage);
            // console.log('width/widthImage', width/widthImage)
            this.setState({height, width}) ;  

        }    else {
            this.setState({width:widthImage}) ;  
        }
     
        if(this.divElementContainer) {
            const obj = this.divElementContainer.getBoundingClientRect();
            const { width } = obj;
          
            const widthCourse = Math.round(width/3);
            const heightCourse = Math.round(heightImage*widthCourse/widthImage);
            this.setState({widthContainer:width,widthCourse, heightCourse}) ; 
        }
    }

    setCurrentCourses( i) {
        const { firstCourse,
            secondCourse,
            thirdCourse} = this.state;
        const { coursesCount} = this.props;
       
        let newFirstCourse = (firstCourse+i+coursesCount)%coursesCount;
        let newSecondCourse = (secondCourse+i+coursesCount)%coursesCount;
        let newThirdCourse = (thirdCourse+i+coursesCount)%coursesCount;
       
    
        this.setState({firstCourse: newFirstCourse, 
                    secondCourse: newSecondCourse,
                    thirdCourse: newThirdCourse
        })

    }
    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }

    onClick( ) {
        const { history} = this.props;
        history.push(`/courses` );
    }

    renderCourse(index, indexCourse) {
        const {  height, width, hover,} = this.state;
        const {courses, BoxCourseRow1TextSize, 
            BoxCourseRow2TextSize, BoxCourseRow3TextSize} = this.props;

       const courseBoxStyle= {height: `${height}px`};
       const heightStyle= {height: `${height}px`};
       const styleR1 = {top: `${Math.round(0.65*height)}px` }
       const styleR2 = {top: `${Math.round(0.74*height)}px` }
       const styleR3 = {top: `${Math.round(0.85*height)}px` }

    
        const classNameImg=[hover[0]?"bg-img-over":"bg-img",
                        hover[1]?"bg-img-over":"bg-img",
                        hover[2]?"bg-img-over":"bg-img"] ;
        
        const course = courses[indexCourse];
        const BoxCourseRow1TextStyle= {fontSize: `${BoxCourseRow1TextSize}px`};
        const BoxCourseRow2TextStyle= {fontSize: `${BoxCourseRow2TextSize}px`};
        const BoxCourseRow3TextStyle= {fontSize: `${BoxCourseRow3TextSize}px`};

        
        return (
            <div className=" borderTest boxCourse " style={courseBoxStyle}
                ref={ (divElement) => this.divElement = divElement}
                     onMouseEnter={()=>{this.handleHover(index);}} 
                     onMouseLeave={()=>{this.handleHover(index);}}
                     >                                 
                    <div className={classNameImg[index]} style={heightStyle}>
                            <img className="" src={`../images/${course.url}`} 
                                        height={height} width={width}  
                                        alt={course.title}/> 
                        </div>
                        <div className=" boxCourse_rows  boxCourse_row1_text"
                            style={{...styleR1, ...BoxCourseRow1TextStyle}}>{course.title}</div>
                        <div className=" boxCourse_rows  boxCourse_row2_text"
                         style={{...styleR2, ...BoxCourseRow2TextStyle}} >{course.text}</div>
                        <div className=" boxCourse_row3_box boxCourse_rows " 
                         style={{...styleR3,}} >
                            <div onClick={this.onClick} style={{cursor:'pointer', ...BoxCourseRow3TextStyle}} className="boxCourse_row3_text">MEHR LESEN</div>
                            <div onClick={this.onClick} style={{cursor:'pointer'}} className="long-arrow-right"></div>                             
                        </div>
                    </div>
        );
    }

   
    doSliding(direction, previousposition, position, nextposition) {
            this.setState({
                sliding: true,
                direction,
                position,
                firstCourse:previousposition,
                secondCourse:position,
                thirdCourse:nextposition,
            });
    
            setTimeout(() => {
                this.setState({
                    sliding: false
                });
            }, 50);
    }
    
    nextSlide() {
        const { position } = this.state;
        const {courses} = this.props;
        const numItems = courses.length || 1;
        const p = (position === numItems - 1) ? 0 : position + 1;
        const nextp = (p+1+numItems)%numItems;
        const prevp = (p-1+numItems)%numItems;
        this.doSliding('next',prevp, p , nextp);
    }

    prevSlide() {
        const { position } = this.state;
        const {courses} = this.props;
        const numItems = courses.length;
        const p = position === 0 ? numItems - 1 : position - 1;
        const nextp = (p+1+numItems)%numItems;
        const prevp = (p-1+numItems)%numItems;
        this.doSliding('prev', prevp, p , nextp);
    }

    handleSwipe(isNext) {
        isNext ? this.nextSlide() : this.prevSlide();
    }

    renderCourseMobile(index, indexCourse) {
        const {  height, width,} = this.state;
       const {courses, BoxCourseRow1TextSize,
        BoxCourseRow2TextSize, BoxCourseRow3TextSize} = this.props;

       const courseBoxStyle= (index===1)? {height: `${height}px`, width:'70%'}: 
                                         {height: `${height}px`, width:'14%'};
        const marginImage =  (index===0)?{marginRight:'1%'}:((index===2)?{marginLeft:'1%'}:{})
       const heightStyle= {height: `${height}px`, width:'70%'};
       const widthCourseStyle = (index===1)?{width:'70%'}:{width:'10%'}; 
       const styleR1 = {top: `${Math.round(0.65*height)}px` }
       const styleR2 = {top: `${Math.round(0.74*height)}px` }
       const styleR3 = {top: `${Math.round(0.85*height)}px` }
   
       const BoxCourseRow1TextStyle= {fontSize: `${BoxCourseRow1TextSize}px`};
        const BoxCourseRow2TextStyle= {fontSize: `${BoxCourseRow2TextSize}px`};
        const BoxCourseRow3TextStyle= {fontSize: `${BoxCourseRow3TextSize}px`};
        if(index!==1) {
            const imgUrl = (index===0)?`../images/${courses[indexCourse].url2L}`:
                                    `../images/${courses[indexCourse].url2R}`
            return (  
            <div className="borderTest  boxCourse" 
                style={{...courseBoxStyle,...marginImage}}         >
                        <img className="" 
                        src={imgUrl} 
                            width="100%" 
                            alt={courses[indexCourse].title}/> 
            </div>
            );
        }  else 
        return (
         

            <div className=" borderTest boxCourse" 
                style={{...courseBoxStyle}}
                ref={ (divElement) => this.divElement = divElement}
                onMouseEnter={()=>{this.handleHover(index);}} 
                onMouseLeave={()=>{this.handleHover(index);}}
            >
                   <Swipeable
            onSwipedLeft={() => this.handleSwipe(true)}
            onSwipedRight={() => this.handleSwipe()}>

           
            <div  style={{...heightStyle, ...widthCourseStyle}} >
                     <img className="" src={`../images/${courses[indexCourse].url}`} 
                        height={height} width={width}  
                        alt={courses[indexCourse].title}/> 
            </div>
           <div className=" boxCourse_rows  boxCourse_row1_text"
                style={{...styleR1, ...BoxCourseRow1TextStyle}} >{courses[indexCourse].title}</div> 
            <div className=" boxCourse_rows  boxCourse_row2_text"
                style={{...styleR2, ...BoxCourseRow2TextStyle}} >{courses[indexCourse].text}</div>
            <div className=" boxCourse_row3_box boxCourse_rows  "
                    style={{...styleR3}}>
                    <div onClick={this.onClick} style={{cursor:'pointer', ...BoxCourseRow3TextStyle}} className="boxCourse_row3_text">MEHR LESEN</div>
                    <div onClick={this.onClick} style={{cursor:'pointer'}} className="long-arrow-right"></div>                               
            </div>
            </Swipeable>
        </div>
    
        );
    }
 
     render() { 
        
       const { firstCourse, secondCourse, thirdCourse, 
        height, hover} = this.state;
       const {isTouch, ContainerTitle1, ContainerTitle4} = this.props;

       const heightStyle= {height: `${height}px`};
 

        const myBlue= '#2d299c';
        const backgroundLineBack = {background: hover[3]?'white':myBlue};
        const backgroundLineNext = {background: hover[4]?'white':myBlue};
        const borderArrowBack = {borderColor: hover[3]?'white':myBlue};
        const borderArrowNext = {borderColor: hover[4]?'white':myBlue};
        const backgroundBack = {cursor:'pointer', backgroundColor: hover[3]?myBlue:'#f0f0f0'};
        const backgroundNext = {cursor:'pointer', backgroundColor: hover[4]?myBlue:'#f0f0f0'};
        const old = false;

        const mobile = isTouch; // (navigationType===NAVIGATION_MOBILE);
        const containerCoursesStyle= {width:' 100%'};
        const containerTitle1Style= {fontSize: `${ContainerTitle1}px`}
        const containerTitle4Style= {fontSize: `${ContainerTitle4}px`}
        return (     
               
            <div className="borderTestBlue component_container_courses"  
            ref={ (divElement) => this.divElementContainer = divElement}
            > 
                <div className="borderTest" style={{height:'40px'}}></div>       
                <div className="container_title_1" style={containerTitle1Style}>ETWAS FÜR DICH</div>
                <div className="container_title_4" style={containerTitle4Style}> Unsere Kursangebote </div>    
                <div className="borderTest" style={{height:'40px'}}></div>          

                <div className=" containerCourses" style={{...heightStyle,...containerCoursesStyle }} >
                    {!old && mobile && this.renderCourseMobile(0, firstCourse) } 
                    {!old && mobile && this.renderCourseMobile(1, secondCourse) } 
                    {!old && mobile && this.renderCourseMobile(2, thirdCourse) } 


                    {!old && !mobile && this.renderCourse(0, firstCourse) } 
                    {!old && !mobile &&this.renderCourse(1, secondCourse) } 
                    {!old && !mobile &&this.renderCourse(2, thirdCourse) }                                             
                </div>   
           
                {!isTouch && <div className=" containerLinks">
                    <div    style={backgroundBack} 
                            className="containerLink"  
                            onMouseEnter={()=>{this.handleHover(3);}} 
                            onMouseLeave={()=>{this.handleHover(3);}}
                            onClick={()=> {this.setCurrentCourses(-1);}}>                   
                        <div style={borderArrowBack} className=" border-arrow-left"/>
                        <div style={backgroundLineBack} className=" border-line-left"/>
                    </div>
                    <div className="containerMidle center">
                        <div className="midle-line"/>
                        <div className="midle-line-long "/>
                        <div className="midle-line"/>
                    </div>
                    <div    style={backgroundNext} 
                            className="containerLink " 
                            onMouseEnter={()=>{this.handleHover(4);}} 
                            onMouseLeave={()=>{this.handleHover(4);}}
                            onClick={()=> {this.setCurrentCourses(1);}}>
                     
                     <div style={borderArrowNext} className=" border-arrow"/>                                        
                     <div style={backgroundLineNext} className=" border-line"/>
                   
                    </div>
                </div>  
                }              
     
            </div>
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
    isTouch: state.setup.isTouch,
    ContainerTitle1: state.fonts.ContainerTitle1.fontSize,
    ContainerTitle4: state.fonts.ContainerTitle4.fontSize,
    BoxCourseRow1TextSize: state.fonts.BoxCourseRow1Text.fontSize,
    BoxCourseRow2TextSize: state.fonts.BoxCourseRow2Text.fontSize,
    BoxCourseRow3TextSize: state.fonts.BoxCourseRow3Text.fontSize,


   }
 }
 export default connect(mapStateToProps, {})(Courses);



