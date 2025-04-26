const lang = (navigator.language || 'en-US').toLowerCase();
const calendarMap = {
  'en-us': 'en.usa%23holiday%40group.v.calendar.google.com',
  'en-gb': 'en.uk%23holiday%40group.v.calendar.google.com',        
  'en-au': 'en.australian%23holiday%40group.v.calendar.google.com',
  'en-ca': 'en.canadian%23holiday%40group.v.calendar.google.com',  
  'de-de': 'de.german%23holiday%40group.v.calendar.google.com',    
  'en-in': 'en.indian%23holiday%40group.v.calendar.google.com',    
  'en-sg': 'en.singapore%23holiday%40group.v.calendar.google.com', 
  'en-my': 'en.malaysia%23holiday%40group.v.calendar.google.com',  
  'vi-vn': 'vi.vietnamese%23holiday%40group.v.calendar.google.com',
  'zh-cn': 'zh.china%23holiday%40group.v.calendar.google.com',
  'zh-tw': 'zh.taiwan%23holiday%40group.v.calendar.google.com',
  'fr-fr': 'fr.french%23holiday%40group.v.calendar.google.com',
  'ja-jp': 'ja.japanese%23holiday%40group.v.calendar.google.com',    
  'ko-kr': 'ko.south_korea%23holiday%40group.v.calendar.google.com',
  'default': 'en.usa%23holiday%40group.v.calendar.google.com'
};

// const today = new Date("2025-12-24");
const today = new Date();
const isoDate = today.toISOString().split("T")[0];
const timeMin = `${isoDate}T00:00:00Z`;
const timeMax = `${isoDate}T23:59:59Z`;

const calendarId = calendarMap[lang] || calendarMap['default'];
// for debugging: //
// const calendarId = calendarMap["en-us"]

function showFest(){
    setTimeout(()=>{
            fest.style.transition = 'transform .65s cubic-bezier(0.25, 1.5, 0.5, 1)';
            fest.style.transform = 'translate(-50%, 0)';

            setTimeout(() => {
            fest.style.transition = 'transform 0.3s cubic-bezier(0.42, 0, 1, 1)';
            fest.style.transform = 'translate(-50%, -30rem)';
            }, 2500);
        }, 1500);
}

const festHTML = `
<div id="fest" style=" border: 1px solid #eee;
  width: 80dvw; position: fixed; top: 1rem; left: 50%;
  transform: translate(-50%,-30rem);
  background-color: rgba(255,255,255,0);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  padding: 4dvh 0; border-radius: 1.5rem;
">
  <div style="text-align: center; width: 100%; color: black;">
    Today is <span id="holidays" style="font-style: italic;"></span> !
  </div>
</div>
`;

// another style (no pop-up)//
/* <div id="fest" style="
  width: 100dvw; position: fixed; bottom: 0; left: 50%;
  transform: translate(-50%,0); display:flex;
  background-color: rgba(255,255,255,0);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  padding: 4dvh 0;
">
  <div style="text-align: center; margin: auto 0 auto 1rem; color: black;">
    Today is <span id="holidays" style="font-style: italic;"></span> !
  </div>
    <div style="margin: auto 1rem auto auto; font-size:larger" onclick="fest.style.display='none';">&times;
  </div>
</div> */

const wrapper = document.createElement('div');
wrapper.innerHTML = festHTML;
document.body.appendChild(wrapper);

fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${atob('QUl6YVN5QmR1WGllYV8xRnROYkh'+'lUndXRnNEOU5UZkd1SDNQVzlB')}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`)
    .then(response => response.json())
    .then(data => {
    console.log(JSON.stringify(data,null,2))
    const holidays = [];
    if (data.items && data.items.length > 0) {
        data.items.forEach(event => {
        holidays.push(event.summary);
        document.getElementById('holidays').innerHTML=holidays.join(',');
        showFest()
        });
    } 
    })
    .catch(error => {
    console.error('Failed to fetch:', error);
    });