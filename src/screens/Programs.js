import React, { Component} from 'react'
import  ProgramsPreview  from '../components/ProgramsPreview'
import  Sponsors  from '../components/Sponsors'
import  Trainers  from '../components/Trainers'
import  Download  from '../components/Download'
import  Registration  from '../components/Registration'
import Quote from '../components/Quote'
import Goals from '../components/Goals'



class Programs extends Component  {

    render() {
        return (  
        <React.Fragment>
  
            <ProgramsPreview history={this.props.history}/>
            <div className="borderTest" style={{height:'50px'}}></div>                                
            <Sponsors/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Trainers/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Quote/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Goals/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Download/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Registration history={this.props.history}/>

        </React.Fragment>
        )
    
    }
    
  }


export default (Programs);

