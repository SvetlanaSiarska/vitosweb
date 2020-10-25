import { combineReducers } from 'redux'


import { 
        AUTH_LOG_IN,
        AUTH_LOG_OUT
     } from '../actions/types'
import WeatherReducer from './WeatherReducer';
import InfoReducer from './InfoReducer'
import MessagesReducer from './MessagesReducer';
import GalleryReducer from './GalleryReducer'
import RegistrationReducer from './RegistrationReducer'
import SetupReducer from './SetupReducer'
import FontsReducer from './FontsReducer';


const INITIAL_STATE_AUTH = {authenticated: false, currentUserUid:''};

const AuthenticationReducer = (state=INITIAL_STATE_AUTH, action) => {    
    switch(action.type) {
        case AUTH_LOG_IN:   
            return {...state, authenticated: true, currentUserUid: action.payload};
        case AUTH_LOG_OUT:    
        return {...state, authenticated: false, currentUserUid: ''};
        default:
            return state;
    }
};
const courses = [ 
    {title:'Privatlektionen', text: '1 oder 2 Personen à 45 oder 60 Minuten', url: 'PrivateLesson.jpg',
            url2R: 'PrivateLesson_2.jpg', url2L: 'PrivateLesson_2L.jpg',
            url64: 'PrivateLesson_64.jpg', url1: 'PrivateLesson_1.jpg',
            description:'Im Privatunterricht haben Sie die freie Wahl der Unterrichtszeiten und geniessen eine individuelle Betreuung. Persönliche Ziele können damit am besten erreicht werden. Unterrichtet werden alle, vom Einsteiger bis zum Wettkampfspieler. Die Privatstunde ist auch ein optimaler Einstieg für Anfänger.'},
    {title:'Gruppentrainings', text: '3er oder 4er Gruppen à 60 Minuten', url: 'GroupLesson.jpg',
        url2R: 'GroupLesson_2.jpg', url2L: 'GroupLesson_2L.jpg',
        url64: 'GroupLesson_64.jpg',  url1: 'GroupLesson_1.jpg',
        description:'Profitieren Sie von einem günstigeren Tarif und erleben Sie zusätzliche Motivation in der Gruppe. Gruppenkurse sind für drei bis vier Personen vom Einsteiger bis zum Wettkampfspieler gedacht. Sie spielen und trainieren, unter Berücksichtigung des Alters, mit Spielerinnen und Spieler der gleichen Niveaus.'},
    {title:'Wettkampftrainings', text: '3er oder 4er Gruppen à 120 Minuten', url: 'Wettkampfschule.jpg',
        url2R: 'Wettkampfschule_2.jpg', url2L: 'Wettkampfschule_2L.jpg',
        url64: 'Wettkampfschule_64.jpg',
        url1: 'Wettkampfschule_1.jpg',  
        description:'Training und Betreuung für leistungsorientierte Junioren, Nachwuchs- und IC-Spieler. Diese High-Performance-Trainings beinhalten technische, taktische, mentale und konditionelle Aspekte des Tennissports.'},
    {title:'Kids Tennis', text: 'Der ideale Einstieg für alle 5-9jährigen Kinder', url: 'KidsTennis.jpg', 
        url2R: 'KidsTennis_2.jpg',  url2L: 'KidsTennis_2L.jpg', 
        url64: 'KidsTennis_64.jpg',  url1: 'KidsTennis_1.jpg',
        description: 'Bereits die Kleinsten (ab ca. 4 Jahre) können beim Tennis Spaß haben! Spielerisch und altersgerecht lernen sie über die Programme Kids Tennis High School (Swiss Tennis). Mit druckreduzierten Bällen und verkleinerten Spielfeldern gelingen auch den Kleinsten schnell die ersten Ballwechsel und Erfolgserlebnisse stellen sich fast wie von selbst ein. Die Kids Tennis High School ist spannende Geschichte und motivierendes Spiel in einem...'},
    {title:'Ferienkurse', text: 'Camps, Intensivkurse oder Privatunterricht', url: 'TennisWeekend.jpg',
        url2R: 'TennisWeekend_2.jpg',  url2L: 'TennisWeekend_2L.jpg',
        url64: 'TennisWeekend_64.jpg',
        url1: 'TennisWeekend_1.jpg', 
        description:'Tägliche Trainingseinheiten unter Einbezug von leistungsfördernden Massnahmen wie Videoanalysen, Konditionstraining, Mental-Work oder spezielle Taktikschulungen garantieren eine intensive und qualitativ hochstehende Trainingsperiode. Die Camps und Trainingsweekends finden in der Schweiz oder im Ausland statt (vgl. Ausschreibungen).'},
];

const CoursesReducer = (state, action) => {    
    switch(action.type) {      
        default:
            return {...state, courses};;
    }
};
export default combineReducers( {
    auth: AuthenticationReducer,
    weather: WeatherReducer,
    info: InfoReducer,
    messages: MessagesReducer,
    galleries: GalleryReducer,
    registration: RegistrationReducer,
    setup: SetupReducer,
    courses: CoursesReducer,
    fonts: FontsReducer
})