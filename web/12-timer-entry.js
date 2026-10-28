(function(){'use strict';
const output=new URLSearchParams(location.search).get('nativeSpeaker')==='1';
document.title='Timer PRO · Tools EventsPRO';
EventsPROSpeakerTimerUI.mount(document.getElementById('timer'),{output,home:()=>window.open('https://tools.eventspro.es/','_blank')});
})();
