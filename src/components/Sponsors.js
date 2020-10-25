import React, { Component} from 'react'
import { connect } from 'react-redux'

import './Sponsors.css';
import '../App.css';
import {isDesktop} from '../helpers/helpers'
import {NAVIGATION_MOBILE} from '../actions/types'


class Sponsors extends Component  {
   
    constructor(props) {
        super(props);   
        
        //{code: 'WILSON', name:'Wilson', image: 'wilson_hover.png', imagehover: 'wilson.png', url:'https://www.wilson.com/de-de'},
            
        const sponsorsInfo = [ 
            {code: 'TECNI', name:'Tecnifibre', image: 'technifibre.png', imagehover: 'technifibre_hover.png', url:'https://www.tecnifibre.com'},
            {code:'TENNISCLUB', name:'Tennis Club', image: 'bltc.png', imagehover: 'bltc_hover.png', url:'https://www.bltc.ch'},
            {code: 'VITIS', name:'Vitis', image: 'vitis.png', imagehover: 'vitis_hover.png', url:'https://www.vitis-allschwil.ch/'}, 
            {code: 'PASSION', name:'Passion', image: 'Passion.png', imagehover: 'Passion_hover.png', url:'https://www.pilates-allschwil.ch/'}, 
        ];
       
        const sponsorsCount = sponsorsInfo.length;
       
        this.state = {
            init : false,
            sponsorsInfo,
            sponsorsCount,
            PASSION: 0,
            TECNI: 0,
            TENNISCLUB: 0,
            VITIS:0,
        }     
        
        /*
        const state = this.state; 
        for(let i=0; i<this.state.sponsorsCount; i++) {
            const sponsor = this.state.sponsorsInfo[i];
            const {code } = sponsor;
            state[code] = 0;
        }
        this.setState(state);
        */
        this.divElementLogo = [];
        this.divElementLine = [];
        this.onmouseoverLine = this.onmouseoverLine.bind(this);
        this.onmouseoutLine = this.onmouseoutLine.bind(this);
    } 

    componentDidMount() {
        for(let i=0; i<this.state.sponsorsCount; i++) {
       
            if(this.divElementLogo[i] && this.divElementLine[i]) {           
                this.divElementLogo[i].addEventListener('mouseover', ()=> {                                  
                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    this.divElementLine[i].dispatchEvent(event);
                });
                this.divElementLogo[i].addEventListener('mouseout', ()=> {                                  
                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent("mouseout", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    this.divElementLine[i].dispatchEvent(event);
                });
            }    
        }
                 
    }

    componentWillUnmount() {
        for(let i=0; i<this.state.sponsorsCount; i++) {
            this.divElementLogo[i].removeEventListener("mouseover", ()=>{});
            this.divElementLogo[i].removeEventListener("mouseout", ()=>{});
        }            
    }

   
    onmouseoverLine(i) {
        //console.log('onmouseoverLine')
       
        this.setState({hoverindex:i});
    }
    onmouseoutLine(i) {
        //console.log('onmouseoutLine')
       
        this.setState({hoverindex:-1});
    }

    onChange = (name, value) => {
        const state = this.state; 
        state[name] = value;
        this.setState(state);
    }

    onGoToSponsor = (code)  => {
        
        const {sponsorsInfo} = this.state;
        const desktop = isDesktop();
              
        if(code!=='' && (
            (this.state[code]===1 && !desktop) 
            || (this.state[code]===0 && desktop)
            )
        ){
            sponsorsInfo.forEach(sponsor => {
                if(code===sponsor.code) {
                    var win = window.open(sponsor.url, '_blank');
                    win.focus();
                }                    
           });            
        }
        if(code!=='' && this.state[code]===0 && !desktop){
           this.onChange(code, 1);
          
       
           sponsorsInfo.forEach(sponsor => {
                if(code!==sponsor.code)
                    this.onChange(sponsor.code, 0);            
           });
        }  
        /*
        if(code===''){
            history.push(`/news` );
        } 
        */        
    }

    render() {
        const {navigationType} = this.props;
        const {sponsorsInfo, sponsorsCount, hoverindex} = this.state;
        const mobile =  (navigationType===NAVIGATION_MOBILE);

        const boxSponsorWidth = {cursor:'pointer',  
                width:mobile?'100%':`${100/sponsorsCount}%` }
        const containerSponsorsStyle = mobile?{ flexWrap: 'wrap' }: {flexDirection: 'row',
            alignItems: 'center'};
        return ( 
           
           <div className="containerSponsors " style={containerSponsorsStyle}>
              {sponsorsInfo.map((sponsor, index) => {
                   const image= hoverindex===index? sponsor.imagehover:sponsor.image;
                   const heightline = (hoverindex===index|| mobile )?2:1;
                  const src = `../images/${image}`;
                    const height = {height: `${heightline}px`};

                  return (
                    <div key={index} className="borderTest boxSponsor" style={boxSponsorWidth} 
                    onClick={() => this.onGoToSponsor(sponsor.code)}>
                       
                            <div className="sponsorLine"
                            style={height}
                            onMouseOver={()=>this.onmouseoverLine(index)}
                            onMouseOut={()=>this.onmouseoutLine(index)}
                            ref={ (divElement) => this.divElementLine[index] = divElement} >

                            </div>
                       
                        <div className="sponsorLogo" 
                            ref={ (divElement) => this.divElementLogo[index] = divElement} >
                        <img  src={src}  
                            style={{border:'none', outline: 'none'}} 
                                width="100%"  alt={sponsor.name}/>
                        </div>
                    </div>
                    );
              }

              )}
            </div>
           
        );
      
    }


}

const mapStateToProps = (state) => {  
    return {
        navigationType: state.setup.navigationType,
    }
}

export default connect(mapStateToProps,
    {  })(Sponsors);



