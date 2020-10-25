export function getNumber(text) {
    const px = text.indexOf('px');
    return parseInt(text.slice(0, px));
}

export function isDesktop() {
    const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    return isDesktop;
}

export function formatNumberTo2dDigits(myNumber) {
    var formattedNumber = ("0" + myNumber).slice(-2);
    return formattedNumber;
}

export function formatDateForNews(timestamp) {

    var d = new Date(timestamp);
    var weekday = new Array(7);
    weekday[0] = "Sontag";
    weekday[1] = "Montag";
    weekday[2] = "Dienstag";
    weekday[3] = "Mittwoch";
    weekday[4] = "Donnerstag";
    weekday[5] = "Freitag";
    weekday[6] = "Samstag";
   
    const monthStr = d.toLocaleString('de-DE', { month: 'long' });
    const dayOfWeek = weekday[d.getDay()];
    const dayOfMonth = d.getDate();
    const year= d.getFullYear();

    const  n = `${dayOfWeek} ${dayOfMonth} ${monthStr} ${year}`;
    
    return n;
}

export function  getImageName(name) {
    var params = name.split(".");
    //console.log('params', params)
    //console.log('XXX', `${params[1]}/${params[0]}`)
    return params[0];
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}