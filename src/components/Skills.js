import React, { Component} from 'react'
import { connect } from 'react-redux'
import {Swipeable} from 'react-swipeable';

import './Skills.css';
import '../App.css';
import '../css/typography.css';

import {getNumber} from '../helpers/helpers'
import {NAVIGATION_MOBILE} from '../actions/types'


class Skills extends Component  {
   
    constructor(props) {
        super(props);   
        
        const skills = [ 
            {code: '1', text:'Professionelles Trainerteam mit höchstem Ausbildungsstand'},
            {code: '2', text:'Langjährige Erfahrungen im Sport-und Tennisunterricht'},
            {code: '3', text:'Alters- und spielstärkengerechter Unterricht' },
            {code: '4', text:'Berücksichtigung neuster sportwissenschaftlicher Grundlagen'}, 
            {code: '5', text:'Einbindung von neusten pädagogischen und methodischen Erkenntnissen'}, 
            {code: '6', text:'Professionelles Equipment als sinnvolle Unterrichtshilfen'}, 
        ];
       
        const skillsCount = skills.length;
        const firstSkill = 0;
        const secondSkill = 1;
        this.state = {
            skills, 
            skillsCount,
            firstSkill,
            secondSkill,
            position: 0,
            direction: 'next',
            sliding: false,
        }  
        this.setCurrentSkills = this.setCurrentSkills.bind(this);   
    } 

    componentDidMount() {
          
        if(this.divSkill1 && this.divSkill2) {           
            var style1 = window.getComputedStyle(this.divSkill1, null);
            var height1 = getNumber(style1.getPropertyValue("height"));
            var style2 = window.getComputedStyle(this.divSkill2, null);
            var height2 = getNumber(style2.getPropertyValue("height"));
            const height = Math.max(height1, height2);
            this.setState({height})
        }
    }

    setCurrentSkills(i) {
        const {firstSkill, secondSkill, skillsCount} = this.state;
       
        let newFirstSkill = 0;
        let newSecondSkill = 0;
        if(i<0) {
            newFirstSkill = firstSkill+i;
            if (newFirstSkill<0) {
                newFirstSkill = skillsCount-1;
                newSecondSkill = 0;
            }  else 
                newSecondSkill = newFirstSkill+1;               
        }
        if(i>0) {
            newSecondSkill = secondSkill+i;
            if (newSecondSkill>skillsCount-1) {
                newSecondSkill = 0;
                newFirstSkill = skillsCount-1;
            } else {
                newFirstSkill = newSecondSkill-1;
            }           
        }
     
        this.setState({firstSkill: newFirstSkill,
            secondSkill: newSecondSkill});
    }
   
    nextSlide() {
        const { skills} = this.state;    
        const { position } = this.state;
        const numItems = skills.length || 1;
        this.doSliding('next', position === numItems - 1 ? 0 : position + 1);
    }

    prevSlide() {
        const { skills} = this.state;    
        const { position } = this.state;
        const numItems = skills.length;
        this.doSliding('prev', position === 0 ? numItems - 1 : position - 1);
    }

    doSliding(direction, position) {
        this.setState({
            sliding: true,
            direction,
            position,
            firstSkill:position,
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

    renderSkil(skillIndex) {
        const {skills,} = this.state;
        const {navigationType, isTouch} = this.props;
        const hardcodedHeight = 147;
        const heightStyle = { height: `${hardcodedHeight}px`, paddingLeft:'2px'};
        const mobile = (navigationType===NAVIGATION_MOBILE);
      
      
        const boxSkillStyle= mobile?( isTouch?{ width:'95%'}:{width:'86%'}):{ width:'43%'}
        const boxSkill_number_boxStyle= mobile? {width:'20%'}:{ width:'30%'};
        const boxSkill_textStyle= mobile? {width:'80%'}:{ width:'70%'};

        return ( 
            <div className="borderTestBlue boxSkill " style={{...heightStyle,...boxSkillStyle}}
                ref={ (divElement) => this.divSkill1 = divElement}  >
                
                <div className="boxSkill_number_box borderTestBlue" style={boxSkill_number_boxStyle}>
                    <div className=" boxSkill_number"> 0{skillIndex+1}</div> 
                </div>
                <div className="boxSkill_text_box borderTest"  style={boxSkill_textStyle}>
                    <div className="boxSkill_text "  >
                            {skills[skillIndex].text}
                    </div>       
                </div>   

            </div>
            );
    }
 
    render() {
        
        const {firstSkill, secondSkill} = this.state;  
        const {isTouch, navigationType} = this.props;
        const hardcodedHeight = 147;
        const heightStyle = { height: `${hardcodedHeight}px`, paddingLeft:'2px'};
        const mobile = (navigationType===NAVIGATION_MOBILE);
      
        return ( 
            <Swipeable
                        onSwipedLeft={() => this.handleSwipe(true)}
                        onSwipedRight={() => this.handleSwipe()}>
                       

                        
            <div className="containerSkills_main ">  
                <div className="containerSkills_title">  
                    Unsere Stärken
                </div>   
                <div className="borderTest" style={{height:'20px'}}></div>
                <div className=" borderTestblue  containerSkills ">
                    
                    {!isTouch && <div className="boxLink borderTest" style={{cursor:'pointer',...heightStyle}}
                            onClick={()=> {this.setCurrentSkills(-1);}}>
                            <div className="long-arrow-leftB"></div>  
                        </div>   
                    }                
                   
                   {mobile &&  
                            this.renderSkil(firstSkill)
                       
                    }
                     {false && this.renderSkil(firstSkill)}
                    {!mobile && this.renderSkil(firstSkill)}
                    {!mobile && this.renderSkil(secondSkill)}

                    {!isTouch && <div className="boxLink borderTest" style={{cursor:'pointer',...heightStyle}}
                            onClick={()=> {this.setCurrentSkills(1);}}>  
                            <div  className="long-arrow-rightB"></div> 
                        </div>  
                    }   
                </div>   
            </div>   
       
            </Swipeable>        
        );
      
    }

}
// →  ← 
const mapStateToProps = (state) => {  
    return {
        isTouch: state.setup.isTouch,
        navigationType: state.setup.navigationType,
    }
}

export default connect(mapStateToProps,
    {  })(Skills);



