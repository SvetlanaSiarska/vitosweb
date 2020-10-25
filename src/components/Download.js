import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Download.css';
import '../App.css';
import '../css/typography.css';


class Download extends Component  {
   
    constructor() {
        super();
    
        this.state = {
          init:false,
          hover:[false],
          };
          this.onClick = this.onClick.bind(this);
          this.handleHover = this.handleHover.bind(this);

    }

    onClick() {

    }

    handleHover(i){
        let {hover} = this.state;
        hover[i] = !hover[i];
        this.setState({hover});
    }

    render() {  
        
       const {ContainerTitle1, ContainerTitle4, BoxButtonTextSize}= this.props;
       const styleButton = {width: '321px', cursor:'pointer'}
       const {hover} = this.state;
       const s = hover[0]?{cursor:'pointer',color:'white'}:{cursor:'pointer',color: '#3f379d'};
       const containerTitle1Style= {fontSize: `${ContainerTitle1}px`}
       const containerTitle4Style= {fontSize: `${ContainerTitle4}px`}
       const boxButtonTextStyle = {fontSize: `${BoxButtonTextSize}` } ;
        return (                  
            <div className="borderTest component_container" > 
                <div className="container_title_1" style={containerTitle1Style}>nur einen Klick entfernt</div>
                <div className=" container_title_4" style={containerTitle4Style}>
                Nützlicher Download </div>  
                <div className="borderTest" style={{height:'47px'}}></div>  
                <div style={styleButton} className="roundedButton " 
                    onClick={this.onClick}
                    onMouseEnter={()=>{this.handleHover(0);}} 
                    onMouseLeave={()=>{this.handleHover(0);}}
                >
                    
                    <div className="roundedButton_text"> 
                        <a href="../download/TVG_Sommer20_Trainer_Def.pdf"
                        style={{...s, ...boxButtonTextStyle}} download 
                        target="_blank" rel="noopener noreferrer"
                                                > 
                        PROGRAMM TENNISSCHULE</a> 
                        </div>
                </div>                   
            </div>
        );
    }
    
}


const mapStateToProps = (state) => {    

  return {
        ContainerTitle1: state.fonts.ContainerTitle1.fontSize, 
        ContainerTitle4: state.fonts.ContainerTitle4.fontSize,     
        BoxButtonTextSize: state.fonts.BoxButtonText.fontSize,  
   }
 }
 export default connect(mapStateToProps, {})(Download);



