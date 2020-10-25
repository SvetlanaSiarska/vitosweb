import { FETCH_WEATHER
   } from './types.js'
  
import axios from 'axios';

  const fetchWeatherAction = (data) => {

    return {
        type: FETCH_WEATHER,
        payload: data        
    };
};

const APP_ID = "4cc03fe922b957103ff7576ab3a0352d";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Basel&appid=${APP_ID}&lang=de`;
  
  export const fetchWeather = () => {
    //console.log('FFFFFFFFFFfetchWeather');
    return (dispatch) => {
      return axios.get(apiUrl)
        .then(response => {
            //console.log('response', response)
            const {status} = response;
            if(status!==200) {
              const nodata = 1;
              dispatch(fetchWeatherAction({nodata}))
            } else {
              const {weather, main} = response.data;
              //console.log('weather', weather)
              //console.log('temp', main.temp -273.15)
              const {icon, description}  = weather[0];
              const {temp} = main;
              const temperature = Math.ceil((temp -273.15)*10)/10;
              const nodata = 0;
              dispatch(fetchWeatherAction({nodata, icon, description, temperature }))
            }    
        })
        .catch(error => {
          throw(error);
        });
    };
  };

// https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22
//api.openweathermap.org/data/2.5/weather?q={city name}
//4cc03fe922b957103ff7576ab3a0352d

// https://api.openweathermap.org/data/2.5/weather?q=Basel&appid=4cc03fe922b957103ff7576ab3a0352d


  /*export const fetchWeather = () => {   
 
    return function(dispatch) {
      
      firebase.database().ref(`/users/`).on("value", function(snapshot) {     
          let data = snapshot.val();
          const action = getWeatherAction(data);
          dispatch(action);                 
      }, function(error) { console.log(error); });
    }
  };
  */
 