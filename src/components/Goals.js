import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Goals.css';
import '../App.css';
import '../css/typography.css';

class Quote extends Component  {
   

   
    render() {  
       const {ParagraphTitleSize, ParagraphTextSize} = this.props;
       const paragraphTitleStyle= {fontSize: `${ParagraphTitleSize}px` } ;
       const paragraphTextStyle= {fontSize: `${ParagraphTextSize}px` } ;
        return (   
            <div className="component_container container-color ">   
                <img src="../images/ball.png"  
                       style={{border:'none', outline: 'none'}} width="50px" alt="gUnterrichtszieleirl"/>
                <div className="borderTest" style={{height:'20px'}}></div> 
                <div className="paragraph-title"style={paragraphTitleStyle} > Unterrichtsziele   </div>
                <div className="borderTest" style={{height:'20px'}}></div> 
                <div className="borderTest goal-text-box  paragraph-text"  style={paragraphTextStyle}> 
                Spass und Freude am Tennisspiel zu wecken oder zu steigern, durch klare Verbesserungen in technischen, 
                taktischen oder konditionellen Aspekten. Die Trainings sollen zugleich fördern und fordern!
                </div>
            </div>    
        );
    }
    
}


const mapStateToProps = (state) => {    
    // console.log('state.galleries.imageRefs', state.galleries.imageRefs)
   
   return {    
        ParagraphTitleSize: state.fonts.ParagraphTitle.fontSize,
        ParagraphTextSize: state.fonts.ParagraphText.fontSize,       
   }
 }
 export default connect(mapStateToProps, {})(Quote);



