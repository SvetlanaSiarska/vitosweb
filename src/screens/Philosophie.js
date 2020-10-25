import React, { Component} from 'react'
import  PhilosophiePreview  from '../components/PhilosophiePreview'
import  Trainers  from '../components/Trainers'
import  Download  from '../components/Download'
import  Registration  from '../components/Registration'
import Principles from '../components/Principles'

class Philosophie extends Component  {

    render() {
        return ( 
            <React.Fragment >
            <PhilosophiePreview />
            <div className="borderTest" style={{height:'50px'}}></div>
            <Principles/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Trainers/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Download/>
            <div className="borderTest" style={{height:'50px'}}></div>
            <Registration history={this.props.history}/>

        </React.Fragment>
            );
    }
    
  }


export default (Philosophie);

