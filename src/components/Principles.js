import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Swipeable} from 'react-swipeable';


import './Goals.css';
import './Principles.css';
import './Courses.css';
import '../App.css';
import  {formatNumberTo2dDigits} from '../helpers/helpers'
import {getNumber} from '../helpers/helpers'


class Principles extends Component  {
   
    constructor(props) {
        
        super(props);
        const priciples = [ {title:'Grundsätze unserer Arbeit', 
                    text: 'Perfektes Techniktraining als Basis für Erfolg, Freude und Gesundheit  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Freude und Spass am Tennissport vermitteln – als Grundvoraussetzung für maximalen Lernerfolg  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Individuelle Betreuung garantieren sowie entsprechende Zielsetzungen formulieren  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Begeisterung fürs Tennis bei Jung und Alt entfachen  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Trainingsmöglichkeiten anbieten für jedes Alter und jede Spielstärke '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Die Stärken unserer Schüler ausbauen und gleichzeitig die Schwächen ausmerzen  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Höchste Präsenz beim Unterricht unter Berücksichtigung neuster methodischer, didaktischer und pädagogischer Grundaspekten  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Sinnvoller Einsatz von Lehrhilfen oder Videoanalysen  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Ständige Aus- und Weiterbildung des ganzen Trainerteams  '},
                    {title:'Grundsätze unserer Arbeit', 
                    text: 'Zuverlässigkeit, Pünktlichkeit und Loyalität der Trainer sind für uns Ehrensache  '}
    ]

   


        const countPrinciples = priciples.length;

        this.state = {            
            currentPrinciple: 0,   
            priciples,
            countPrinciples,
            position: 0,
            direction: 'next',
            sliding: false,
        };       
        this.setCurrentPrinciple = this.setCurrentPrinciple.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));

        if(this.divElement && this.divElementText && this.divElementTitle) {           
            this.updateDimensions();
        }                    
    }
    updateDimensions() {               
        
        if(this.divElement && this.divElementText && this.divElementTitle) {           
           // var style = window.getComputedStyle(this.divElement, null);
            ///var height = getNumber(style.getPropertyValue("height"))
            //var width = getNumber(style.getPropertyValue("width"))

            var styleText = window.getComputedStyle(this.divElementText, null);
            var heightText = getNumber(styleText.getPropertyValue("height"))
            if(window.innerWidth<900)
                heightText = 150;
            else if(window.innerWidth<500)
                heightText = 200;
            else 
                heightText = 110;

            var styleTitle = window.getComputedStyle(this.divElementTitle, null);
            var heightTitle = getNumber(styleTitle.getPropertyValue("height"))
            this.setState({heightText, heightTitle})           
        }      
    }


    setCurrentPrinciple(i) {
        const { currentPrinciple, countPrinciples} = this.state;    
        const newCurrentPrinciple = (currentPrinciple+i+countPrinciples)%countPrinciples;       
       
        this.setState({
            currentPrinciple:newCurrentPrinciple}, () => this.updateDimensions())
    }

    nextSlide() {
        const { countPrinciples} = this.state;    
        const { position } = this.state;
        const numItems = countPrinciples;

        this.doSliding('next', position === numItems - 1 ? 0 : position + 1);
    }

    prevSlide() {
        const { countPrinciples} = this.state;    
        const { position } = this.state;
        const numItems = countPrinciples;

        this.doSliding('prev', position === 0 ? numItems - 1 : position - 1);
    }

    doSliding(direction, position) {       

        this.setState({
            sliding: true,
            direction,
            position,
            currentPrinciple:position,
        });

        setTimeout(() => {
            this.setState({
                sliding: false
            });
        }, 50);
    }

    handleSwipe(isNext) {
        isNext ? this.nextSlide() : this.prevSlide();
    }


    renderPriciple() {
        
      const {priciples, currentPrinciple,
            heightText, heightTitle} = this.state;
      const {PrinciplesText1Size, PrinciplesText2Size, PrinciplesNumbersSize} = this.props;

      const PrinciplesText1Style= {fontSize: `${PrinciplesText1Size}` } ; 
      const PrinciplesText2Style= {fontSize: `${PrinciplesText2Size}` } ;   
         

      const paddingBox = 100;
      const height = 2*paddingBox + heightText + heightTitle;   

      const styleHeight = {height: `${height}px` }; 
      const styleR1 = {top: `${paddingBox}px` , fontSize: '25px'};
      const styleR3 = {top: `${paddingBox + heightTitle}px` }
     
    
      const principle = priciples[currentPrinciple];
      return (
      
            <div className="borderTest principles-container bg-gradient" 
                style={styleHeight} 
                ref={ (divElement) => this.divElement = divElement}  >
            
            <Swipeable
            onSwipedLeft={() => this.handleSwipe(true)}
            onSwipedRight={() => this.handleSwipe()}>

            <div className="borderTest boxCourse_rows  principles_row1_text" 
            ref={ (divElement) => this.divElementTitle = divElement}
                style={{...styleR1, ...PrinciplesText1Style}}>
                    {principle.title}
            </div>                        
            <div className="borderTest boxCourse_rows  principles-text-box"  style={styleR3} >
                <div className="borderTest principles_row2_text" style={{flex:1, ...PrinciplesText2Style}}> — </div>
                <div className="borderTest principles_row2_text"  
                    ref={ (divElement) => this.divElementText = divElement}  
                    style={{flex:8, ...PrinciplesText2Style}}> {principle.text} 
                </div> 
                <div className="borderTest "                               
                    style={{flex:1}}> 
                </div>                            
            </div>

            </Swipeable>
        </div> 
      
        );
    }
   
    render() {  
        const { currentPrinciple, countPrinciples } = this.state;
        const {isTouch, PrinciplesNumbersSize} = this.props;           
        const PrinciplesNumbersStyle= {fontSize: `${PrinciplesNumbersSize}` } ; 
        return (   
            <div className="borderTestBlue component_container" style={{paddingLeft: '0%',
                paddingRight: '0%'}} >              
               
               {this.renderPriciple()}

               {!isTouch && <div className="borderTestBlue gallery_row_3" >
                    <div className="borderTest gallery_links" > 

                        <div className="borderTest principles-numbers principles-numbers2" 
                            style={{ cursor:'pointer', fontSize: '33px', ...PrinciplesNumbersStyle}}
                            onClick={()=>this.setCurrentPrinciple(-1)} >
                                {`<`}
                        </div>
                        <div className="borderTest principles-nummer-box">
                            <div className="principles-numbers " style={PrinciplesNumbersStyle}>{formatNumberTo2dDigits(currentPrinciple+1)} </div>
                            <div style={{color:'#7c6bfe', padding:'0px 5px',  fontSize: '30px'}}>/  </div>
                            <div className="principles-numbers principles-numbers2" >{formatNumberTo2dDigits(countPrinciples)} </div>
                        </div>
                        <div className="borderTest principles-numbers principles-numbers2"  
                            style={{ cursor:'pointer', fontSize: '33px', ...PrinciplesNumbersStyle}} 
                            onClick={()=>this.setCurrentPrinciple(1)}>
                        {`>`}
                        </div>
                  </div>
              </div>
            }
        </div>    
        );
    }    
}

const mapStateToProps = (state) => {    
    // console.log('state.galleries.imageRefs', state.galleries.imageRefs)
   return {     
    isTouch: state.setup.isTouch,
    PrinciplesText1Size: state.fonts.PrinciplesText1.fontSize,
    PrinciplesText2Size: state.fonts.PrinciplesText2.fontSize,
    PrinciplesNumbersSize: state.fonts.PrinciplesNumbers.fontSize,

   }
 }
 export default connect(mapStateToProps, {})(Principles);



