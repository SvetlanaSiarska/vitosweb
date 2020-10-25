import  { Component} from 'react'


class Screen extends Component  {

    constructor(props) {
        super(props);     
        this.state = {
            widthInit:  100,
            heightInit: 100,   
        }      
    }

    updateDimensions() {     
        let update_width  = window.innerWidth;
        let update_height = window.innerHeight; //Math.round(update_width);
        const centerX = update_width/2;
        const centerY = update_height/2;
        console.log('update_width', update_width)
        this.setState({ widthInit: update_width,
                        heightInit: update_height, 
                        centerX, 
                        centerY });   
                        
    }
    
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

   
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return null;
    }
    
  }


export default (Screen);

