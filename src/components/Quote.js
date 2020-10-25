import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Quote.css';
import '../App.css';
import '../css/typography.css';



class Quote extends Component  {
    
   
    render() {  
       
        return (   
            <div className="component_container">    
                 
                <div className="borderTest quote-text-box quote-text" > 
                    <div className="borderTest quote-quote-box quote-quote">“</div> 
                    
                    Ob Breitensport, Wettkampfsport oder Leistungssport – wir haben für alle 
                    Tennisbegeisterten das passende Angebot. 
                </div>
            </div>    
        );
    }
    
}


const mapStateToProps = (state) => {    
    // console.log('state.galleries.imageRefs', state.galleries.imageRefs)
   return {     
       
   }
 }
 export default connect(mapStateToProps, {})(Quote);



