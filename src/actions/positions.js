import { SET_INFO_POSITION,
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
    SET_HIGHT_BIG_IMAGE_NAVIGATION,
    SET_SCROLL_DOWN_SIZE,
    SET_SCREEN_SIZE,
    CHANGE_FONTS
} from './types.js'
   


export const changeFontsSize = (data) => {
    return {
        type: CHANGE_FONTS, 
        payload:  data     
    };    
};

export const setScreenSize = (data) => {

    return {
        type: SET_SCREEN_SIZE, 
        payload:  data     
    };    
};

export const setMobileNavigationIcon = (data) => {
    
        return {
            type: SET_MOBILE_NAV_ICON_HEIGHT, 
            payload:  data     
        };    
};
export const setMobileNavigationHeight = (data) => {
    
        return {
            type: SET_MOBILE_NAV_HEIGHT, 
            payload:  data     
        };    
};

export const setNavigationHeight  = (data) => {
    
    return {
        type: SET_NAV_HEIGHT, 
        payload:  data     
    };    
};
    
export const setInfoPosition = (data) => {
    
    return {
        type: SET_INFO_POSITION, 
        payload:  data     
    };    
};


export const setNavigationType = (data) => {  
    return {
        type: SET_NAVIGATION_TYPE, 
        payload:  data     
    };    
};

export const setInfoVisible = (data) => {    
   

    let visible = true;
    if(data.includes('/news/')) 
        visible = false;
    else if(data.includes('/course/')) 
        visible = false;
    else if(data.includes('admin')) 
        visible = false;
    else if(data.includes('howto')) 
        visible = false;
    else if(data.includes('newsgallery')) 
        visible = false;

        
    return {
        type: SET_INFO_VISIBLE, 
        payload:  visible     
    };    
};

export const setOpenCloseInfo = () => {    
   
      return {
        type: SET_OPEN_CLOSE_INFO  
    };    
};

export const setYOffset = (data) => {    
   
    return {
      type: SET_Y_OFFSET,
      payload:  data 

  };    
};

export const setTopLinkNavigation = (data) => {    
   
    return {
      type: SET_TOP_LINK_NAVIGATION,
      payload:  data 

  };    
};

export const setHightBigImageNavigation = (data) => {    
   
    return {
      type: SET_HIGHT_BIG_IMAGE_NAVIGATION,
      payload:  data 

  };    
};
export const setTopBigImageNavigation = (data) => {    
   
    return {
      type: SET_TOP_BIG_IMAGE_NAVIGATION,
      payload:  data 

  };    
};

export const setScrollDownElemSize = (data) => {    
   
    return {
      type: SET_SCROLL_DOWN_SIZE,
      payload:  data 

  };    
};

export const setNavigationProps = (data) => {    
   
    var showNavBorder = true;
    var showNavigationBigPicture = true;
    var items = {contact: "item", 
    news: "item", 
    courses: "item", 
    philosophie : "item",
    aboutus: "item",
    home: "item", 
    };
    let imagename = "Home.jpg";
    items["home"] = "itemselected";

    var title ='You only live once, but you get to serve twice.';
    var subtitle= 'Tennis is for everyone.';
    var maxWidthText = 400;
    var maxMobileWidthText = 400;
    
    if(data.includes('/aboutus')) {
        imagename = "Tennisschule.jpg";
        items["aboutus"] = "itemselected";
        items["home"] = "item";
        title ='Qualität und Kontinuität zahlen sich aus!';
        subtitle= 'Die Topadresse für Tennisunterrich';
        maxWidthText = 500;
        maxMobileWidthText = 400;
    } else if(data.includes('/philosophie')) {
        imagename = "Philosophie.jpg";
        items["philosophie"] = "itemselected";
        items["home"] = "item";
        title ='Die Kunst ist, einmal mehr aufzustehen, als man umgeworfen wird.';
        subtitle= 'WINSTON CHURCHILL';
        maxWidthText = 550;
        maxMobileWidthText = 450;
    }  else if(data.includes('/courses')) {
        imagename = "Programs.jpg";
        items["courses"] = "itemselected";
        items["home"] = "item";
        title ='Die Tennisschule mit dem umfassenden Angebot';
        subtitle= 'TENNIS & SPORT FOR EVERYBODY';
        maxWidthText = 500;
        maxMobileWidthText = 400;
    }  else if(data.includes('/course/')) {
        imagename = "Programs.jpg";
        showNavigationBigPicture=false;
        //items["aboutus"] = "itemselected";
        items["home"] = "item";
        showNavigationBigPicture = false;
        maxWidthText = 500;
        showNavBorder=false; 
    } else if(data.includes('/news/')) {
        imagename = "News.jpg";
        items["news"] = "itemselected";
        items["home"] = "item";
        showNavigationBigPicture = false;     
        showNavBorder=false;     
    
    }   else if(data.includes('/news')) {
        imagename = "News.jpg";
        items["news"] = "itemselected";
        items["home"] = "item";
        showNavigationBigPicture = true;
        title ='Schauen Sie sich unsere neuesten Nachrichten an und bleiben Sie auf dem Laufenden';
        subtitle= '';
        maxWidthText = 700;        
        maxMobileWidthText = 550;
    }  else if(data.includes('/contact')) {
            imagename = "Kontakt.jpg";
            items["contact"] = "borderTest itemselected";   
            items["home"] = "borderTest item";   
            maxWidthText = 400;  
            maxMobileWidthText = 400;
    }        
    

    return {
        type: SET_NAVIGATION_BACKGROUND, 
        payload:  {imagename, items, showNavigationBigPicture, title, 
            subtitle, 
            maxWidthText, 
            maxMobileWidthText ,
            showNavBorder }   
    };    
};
