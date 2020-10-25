import React, { Component} from 'react'
import '../App.css';


class HowTo extends Component  {
   
        

    render() {
        
        return ( 
            <div  className="component_container" style={{ alignItems: 'flex-start' }}>                     
            
                <div className="borderTest" style={{height:'30px'}}/>
                <div>
                    <a href="https://firebasestorage.googleapis.com/v0/b/web-tvg.appspot.com/o/HowTo%2FCreateGallery.mp4?alt=media&token=f050376d-2a8b-4828-bc95-5e58492560b1" 
                            target="_blank" rel="noopener noreferrer" >
                        How to create a new gallery
                    </a>
                </div>
                <div>
                    <a href="https://firebasestorage.googleapis.com/v0/b/web-tvg.appspot.com/o/HowTo%2FCreateNews.mp4?alt=media&token=e2dfd271-63b6-4e62-834a-2275a9f82fb6" 
                            target="_blank" rel="noopener noreferrer" >
                        How to create a new news
                    </a>
                </div>
                <div>
                    <a href="https://firebasestorage.googleapis.com/v0/b/web-tvg.appspot.com/o/HowTo%2FWhereToPlay.mp4?alt=media&token=5fecf48f-f578-42a6-8bf7-50f2204cf63f" 
                            target="_blank" rel="noopener noreferrer" >
                        How to change the place where we play
                    </a>
                </div>
            </div>
            
            
        );

    }
    
}

export default HowTo



