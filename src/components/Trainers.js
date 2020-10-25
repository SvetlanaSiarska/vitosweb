import React, { Component} from 'react'
import { connect } from 'react-redux'
import {Swipeable} from 'react-swipeable';

import './Trainers.css';
import '../css/typography.css';

import {getRandomInt} from '../helpers/helpers'
import {NAVIGATION_MOBILE} from '../actions/types'

class Trainers extends Component  {
   
    constructor(props) {
        super(props);
               
        
        const trainersInfo = [ 
            {name:'Vito Gugolz     ', image: 'T4.jpg', image2: 'T4_2.jpg', info:[   'Leiter Tennisschule',
            'Swiss Olympic Trainer',
            'Sportlehrer I/II Uni Basel',			
            'Instruktor/Experte J&S',
            'Kindertennisleiter']},
            {name:'Michael Santeler', image: 'T2.jpg', image2: 'T2_2.jpg', info:[   'Kursleiter', 'Kids Tennis Leiter']},
           
            {name:'Jindra Srejma   ', image: 'T3.jpg', image2: 'T3_2.jpg', info:[  'Dipl. Tennislehrer CZ',
                                                            'Wettkampftrainer CZ',
                                                            'Kindertennisleiter CZ']},
            {name:'Andreas Kunz    ', image: 'T1.jpg', image2: 'T1_2.jpg', info:[  'Kursleiter J&S',
                                                        'Kids Tennis Leiter']},
            {name:'Patrice Geitner ', image: 'T5.jpg', image2: 'T5_2.jpg', info:[ 'Dipl. Tennislehrer FFT',
                                                            'Wettkampftrainer FFT',
                                                            'Kindertennisleiter ']},
       
        ];
        /*       
            {name:'Alex Molina', image: 'T6.jpg', info:[   'Tennis Instruktor Spanien (RFET)',
                                                             'Kids Tennis Instruktor (RFET)']}
        */
        const states = [ [15, 0],  [15, 15], [30, 15], [40, 15], [40, 30], [40, 40] ];
        const trainer = getRandomInt(trainersInfo.length);
        this.state = {
            init : false,
            trainersInfo,
            currentTrainer:trainer,
            nextCurrentTrainer: (trainer+1)%(trainersInfo.length),
            states,
            offset:200,
            lineWidth:20,
            position: 0,
            direction: 'next',
            sliding: false,
            translateX:0,
        }
        this.setCurrentTrainer = this.setCurrentTrainer.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    } 

    updateDimensions() {              

        if(this.divElementImg &&  this.props.navigationType && this.divElementScreenWidth) {     
                          
            const mobile =  (this.props.navigationType===NAVIGATION_MOBILE);
            const factor =mobile?0.7: 0.25;
            const screenObj = this.divElementScreenWidth.getBoundingClientRect();          
            var  calculatedWidth=factor*screenObj.width;

            var height = this.divElementImg.getBoundingClientRect().height;
            //var init = false;
            if (height===0) {
                //init = true;
                height = 1.370*calculatedWidth;
            }
            const offset = Math.round(height/2);           
            this.setState({offset})
            //console.log('offset', offset)
        }
    }

    updateDimensionsTrainers(updateOffset) {       
       
       
        if((this.divTrainersBoxMobile || this.divTrainersBox) 
            && this.divTrainers && this.divElementImg && this.divC0Box ) {
            
            const objBox = this.divTrainersBox?
                            this.divTrainersBox.getBoundingClientRect():
                            this.divTrainersBoxMobile.getBoundingClientRect();
            //const objC0 = this.divC0Box.getBoundingClientRect();
            const objText = this.divTrainers.getBoundingClientRect();
            const widthTrainersBox =  Math.round(Math.max(objBox.height, objBox.width));
            const heightTrainersBox =  Math.round(Math.min(objBox.height, objBox.width));
            const widthTrainersText =  Math.round(Math.max(objText.height, objText.width));
                   
          
            const objImg = this.divElementImg.getBoundingClientRect();
            const objC0Box = this.divC0Box.getBoundingClientRect();
            const translateX = -(objC0Box.width+objImg.width-heightTrainersBox)/2
            this.setState({ translateX, heightTrainersBox})
                       
                    
            const lineWidth = widthTrainersBox-widthTrainersText;
            
            if(lineWidth>5)
                this.setState({lineWidth })            
           
        }  
        if(updateOffset) this.updateDimensions();  
          
        if(this.divElementScreenWidth) {
            const obj = this.divElementScreenWidth.getBoundingClientRect();
            const {width} = obj;
            this.setState({screenWidth: width });
        }
        if(this.divElementScreenHeight) {
            const obj = this.divElementScreenHeight.getBoundingClientRect();
            const {height} = obj;
            this.setState({screenHeight: height});
        }   
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensionsTrainers.bind(this));
        window.removeEventListener('scroll', this.updateDimensions.bind(this))
    }

    componentDidMount() {    
        window.addEventListener('scroll', this.updateDimensions.bind(this))   
        window.addEventListener("resize", this.updateDimensionsTrainers.bind(this)); 
        this.updateDimensionsTrainers();        
    }    
    componentDidUpdate(prevProps, prevState) {
      
        if(prevState.currentTrainer !== this.state.currentTrainer){
            this.updateDimensionsTrainers()
        }    
        if(prevProps.navigationType !== this.props.navigationType) {
            this.updateDimensionsTrainers(); 
        }        
        if(prevProps.offsetY!==this.props.offsetY && this.state.init===false) {
            this.updateDimensionsTrainers(); 
            this.setState({init:true})        
        }      
    }
    setCurrentTrainer(i) {
        const {trainersInfo, currentTrainer} = this.state;
        const count = trainersInfo.length;
        let newCurrenTrainer = currentTrainer+i;
        if (newCurrenTrainer<0) 
            newCurrenTrainer = count-1;
        if (newCurrenTrainer>count-1) 
            newCurrenTrainer = 0;
        
        const nextCurrentTrainer = newCurrenTrainer+1%count;
        this.setState({currentTrainer: newCurrenTrainer, nextCurrentTrainer});
    }

    doSliding(direction, position, nextposition) {
        this.setState({
            sliding: true,
            direction,
            position,
            currentTrainer: position, 
            nextCurrentTrainer: nextposition,
        });

        setTimeout(() => {
            this.setState({
                sliding: false
            });
        }, 50);
    }

    nextSlide() {
        const { position, trainersInfo } = this.state;
        const numItems = trainersInfo.length || 1;
        const p = (position === numItems - 1) ? 0 : position + 1;
        const nextp = (p+1+numItems)%numItems;
        this.doSliding('next', p , nextp);
    }

    prevSlide() {
        const { position, trainersInfo } = this.state;
        const numItems = trainersInfo.length;
        const p = position === 0 ? numItems - 1 : position - 1;
        const nextp = (p+1+numItems)%numItems;
        this.doSliding('prev', p , nextp);
    }

    handleSwipe(isNext) {
        isNext ? this.nextSlide() : this.prevSlide();
    }

    renderTrainersMobile() {
        const {trainersInfo, currentTrainer, lineWidth,
             translateX, 
             heightTrainersBox, 
             offset, nextCurrentTrainer} = this.state;
           
        const {ContainerText, TrainerNameSize}=this.props;
        const trainer = trainersInfo[currentTrainer];
        const nextTrainer = trainersInfo[nextCurrentTrainer];
        const {info} = trainer;
        const src = `../images/${trainer.image}`;
        const nextSrc = `../images/${nextTrainer.image2}`;
        const styleRow1={marginTop: `${-offset-heightTrainersBox}px`}
        const m = 10;
        const containerTextStyle= {fontSize: `${ContainerText}px`}
        const TrainerNameStyle= {fontSize: `${TrainerNameSize}px`}

        

        const boxabsStyle = { 
            transform: `translate(${translateX}px, 0px)` 
        };
         return ( 
            <Swipeable
                    onSwipedLeft={() => this.handleSwipe(true)}
                    onSwipedRight={() => this.handleSwipe()}>
 
            {true && <div className="borderTestGreen boxAbsMobile" style={boxabsStyle}> 
                <div className="trainerNameBox rotatemobile"  
                            ref={ (divElement) => this.divTrainersBoxMobile = divElement}  > 
                    <div className=" trainerName"  style={TrainerNameStyle}
                        ref={ (divElement) => this.divTrainers = divElement}> {trainer.name} </div>
                        <div className="lineBox "  > 
                            <div className="Line " style={{width: `${lineWidth -5*m}px`}} ></div>                 
                    </div>                                                          
                </div>  
            </div>
            }

        
            <div className="row1"  style={styleRow1}>
                <div className="borderTest  c0mobile " 
                        ref={ (divElement) => this.divC0Box = divElement} >   </div>

                <div className="borderTest c3mobile "> 
                    <img ref={ (divElement) => this.divElementImg = divElement} 
                        src={src}  
                        style={{border:'none', outline: 'none'}} 
                        width="100%" alt={trainer.name}/> 
                </div>
                <div className=" c4mobile  "> 
                        <img  src={nextSrc} 
                        className="" 
                        style={{border:'none', outline: 'none'}}
                        width="100%" alt={nextTrainer.name}/>  
                </div>         
            </div>
            <div className="borderTest" style={{height:'20px'}}></div>
            <div className=" borderTest row1">              
        
                <div className="borderTest c2mobile">
                        {info.map((val,index)=>{  
                            return <div key={index} className="container_text" style={containerTextStyle} > • {val}</div> })}                
                </div>

                  
            </div>
            </Swipeable>
          
        
        )
    }

    renderTrainers() {
        const {trainersInfo, currentTrainer, states, translateX, 
            heightTrainersBox, lineWidth, offset} = this.state;
        const {ContainerText, TrainerNameSize}= this.props;
        const trainer = trainersInfo[currentTrainer];
        const {info} = trainer;
        const matchState = states[currentTrainer];        
        const src = `../images/${trainer.image}`;

        const boxabsStyle = { 
            transform: `translate(${translateX}px, 0px)` 
        };
        const containerTextStyle= {fontSize: `${ContainerText}px`}
        const styleRow1={marginTop: `${-offset-heightTrainersBox}px`}
        const m = 10;   
        const TrainerNameStyle= {fontSize: `${TrainerNameSize}px`}
        return ( 
            <React.Fragment>

           {  <div className=" boxabs" style={boxabsStyle}> 
                <div className=" borderTestBlue trainerNameBox rotate"  
                            ref={ (divElement) => this.divTrainersBox = divElement}  > 
                    <div className=" borderTestBlue trainerName" style={TrainerNameStyle} 
                        ref={ (divElement) => this.divTrainers = divElement}> {trainer.name} </div>
                        <div className="lineBox " > 
                            <div className="Line " style={{maxWidth:'150px', width: `${lineWidth -3*m}px`}} ></div>                 
                    </div>                                                          
                </div>  
            </div>
            }
        <div className="borderTest row1" style={styleRow1}>
            <div className=" c0 "  ref={ (divElement) => this.divC0Box = divElement}>                   
            </div>
      
            <div className="c2 " >
                    {info.map((val,index)=>{  
                        return <div className="container_text" style={containerTextStyle} key={index}> • {val}</div> })}                
            </div>

            <div className="borderTest c3 "> <img 
                    ref={ (divElement) => this.divElementImg = divElement}
                    src={src}  
                    style={{border:'none', outline: 'none'}} width="100%" alt={trainer.name}/> 
            </div>
            <div className="borderTest c4">
                <div className="c4Link c4center" style={{cursor:'pointer', marginBottom:'15px'}} 
                        onClick={()=>this.setCurrentTrainer(-1)}>
                        <i className=" up"></i>
                </div>
                <div className="c4center">{matchState[0]}</div>
                <div className="c4center" style={{marginBottom:'15px'}}>{matchState[1]} </div>
                <div className="c4Link c4center" style={{cursor:'pointer'}} onClick={()=>this.setCurrentTrainer(1)}> 
                    <i className=" down"></i> 
                </div>    
            </div>
        </div>
        </React.Fragment>
        )
    }
    render() {
        
        const { offset} = this.state;
        const { isTouch, ContainerTitle1, ContainerTitle4, ContainerText} = this.props;       
        const mobile = isTouch; // (navigationType===NAVIGATION_MOBILE);

        const styleContainerTrainers =mobile?{ paddingBottom: `${offset}px`}: 
                    {paddingBottom: `${offset+50}px`};

        const styleTextTrainers = mobile?{  alignSelf: 'center',  width:'80%'}:{ width:'50%'};
        const containerTitle1Style= {fontSize: `${ContainerTitle1}px`}
        const containerTitle4Style= {fontSize: `${ContainerTitle4}px`}
        const containerTextStyle= {fontSize: `${ContainerText}px`}

        return ( 
        <React.Fragment>
            <div className="screenWidth" ref={ (divElement) => this.divElementScreenWidth = divElement}  />
            <div className="screenHeight " ref={ (divElement) => this.divElementScreenHeight = divElement} />
               
            <div className="borderTest containerTrainers" style={styleContainerTrainers}>
                <div className="" style={{width:'100%', height:'1px'}} 
                        ref={ (divElement) => this.divElementScreenWidth = divElement}   ></div>
               <div className="container_title_1 " style={containerTitle1Style}>immer professionell</div>
               <div className="container_title_4" style={containerTitle4Style}>Unser Trainerkader</div>              

               <div className="borderTest" style={{height:'30px'}}></div>    
               <div className="container_text " style={{...styleTextTrainers, ...containerTextStyle}}>
                   Alle TVG-Trainer verfügen über beste 
               nationale und internationale Trainerausbildungen, spielten in ihren Ländern 
               in den höchsten Ligen und sammelten als Coaches wertvolle internationale Erfahrungen. 
               Diese Tatsache stellt alle Trainer auf die gleiche Leistungsstufe und garantiert 
               besten Tennisunterricht für alle Kunden.
               </div>
               <div className="borderTest" style={{height:'50px'}}></div> 


            </div>
           {isTouch?this.renderTrainersMobile():this.renderTrainers()}
            
        </React.Fragment>
           
        );
      
    }


}

const mapStateToProps = (state) => {  
    return {
        images: state.galleries.imageRefs,
        navigationType: state.setup.navigationType,
        offsetY: state.setup.offsetY,
        isTouch: state.setup.isTouch,
        ContainerTitle1: state.fonts.ContainerTitle1.fontSize,
        ContainerTitle4: state.fonts.ContainerTitle4.fontSize,
        ContainerText: state.fonts.ContainerText.fontSize,
        TrainerNameSize: state.fonts.TrainerName.fontSize,
    }
}

export default connect(mapStateToProps,
    {  })(Trainers);



