import { SET_INFO_POSITION,
  NAVIGATION_MOBILE, 
  SET_NAVIGATION_TYPE, 
  SET_INFO_VISIBLE,
  SET_NAVIGATION_BACKGROUND,
  SET_OPEN_CLOSE_INFO,
  SET_Y_OFFSET,
  SET_MOBILE_NAV_HEIGHT,
  SET_NAV_HEIGHT,
  SET_MOBILE_NAV_ICON_HEIGHT,
  SET_TOP_LINK_NAVIGATION,
  SET_TOP_BIG_IMAGE_NAVIGATION,
  SET_SCROLL_DOWN_SIZE,
  SET_HIGHT_BIG_IMAGE_NAVIGATION
   } from '../actions/types.js'

   var items = {contact: "item", 
    news: "item", 
    courses: "item", 
    philosophie : "item",
    aboutus: "item",
    home: "itemselected"
    };
    const isTouch = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  const INITIAL_STATE = {
                isTouch,
                leftInfoPosition: 0, 
                heightInfo: 0,                  
                navigationType: NAVIGATION_MOBILE,
                infoVisible: true,
                navigationProps:{imagename:'Home.jpg', 
                    items, showNavigationBigPicture:true, 
                    title:'You only live once, but you get to serve twice.', 
                    subtitle:'Tennis is for everyone.',
                    maxWidthText: 400,
                    maxMobileWidthText:250,
                    showNavBorder:true},
                infoOpened : false,
                tabletBreakpoint: 1025,
                mobileBreakpoint: 541,
                marginGrid: 150,
                marginMobileGrid: 10,
                offsetY:0,
                scrollDownSize:{height: 105, width: 11},
                topBigImageNavigation:40,
                mobileNavIconHeight:0,
    };
  
    

  export default (state = INITIAL_STATE, action) => {

   
    switch (action.type) {
      //case SET_SCREEN_SIZE: 
      //return {...state, screenWidth:action.payload.width, screenHeight:action.payload.height, }
      case SET_SCROLL_DOWN_SIZE:
        return {...state, scrollDownSize : action.payload,}
      case SET_TOP_LINK_NAVIGATION: 
        return {...state, topLinkNavigation : action.payload,}
      case SET_TOP_BIG_IMAGE_NAVIGATION: 
        return {...state, topBigImageNavigation : action.payload,}
      case SET_HIGHT_BIG_IMAGE_NAVIGATION:
          return {...state, hightBigImageNavigation : action.payload,}
      case SET_Y_OFFSET: 
        return {...state, offsetY : action.payload,}
      case SET_MOBILE_NAV_HEIGHT: 
        return {...state, mobileNavHeight: action.payload}
      case SET_MOBILE_NAV_ICON_HEIGHT:
        return {...state, mobileNavIconHeight: action.payload}
      case SET_NAV_HEIGHT: 
        return {...state, desktopNavIconHeight: action.payload}
      case SET_INFO_POSITION:   

        //console.log( 'heightInfo', action.payload.height)
        return  { ...state, leftInfoPosition: action.payload.left, 
                  heightInfo: action.payload.height,
                  bottomInfo: action.payload.bottom,
                  heightInfoHeader: action.payload.headerHeight
                 }  
      
      case SET_NAVIGATION_TYPE:
          return {...state, navigationType: action.payload }
      case SET_INFO_VISIBLE: 
          return {...state, infoVisible: action.payload}
      case SET_NAVIGATION_BACKGROUND:
          return {...state, navigationProps: action.payload}
        case SET_OPEN_CLOSE_INFO:
          return {...state, infoOpened: !state.infoOpened}
      default:
          return state;
    }
  };
  
