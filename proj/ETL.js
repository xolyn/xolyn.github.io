var allprojs=[]
const supabaseUrl = 'https://vuqcoijjybmcujzdybdi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cWNvaWpqeWJtY3VqemR5YmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3OTA4NTIsImV4cCI6MjA1ODM2Njg1Mn0.HN4XbQDEg2pKhxgCCaZjFqI_FYExGV0QZIX0Gn5Tios';
const client  = supabase.createClient(supabaseUrl, supabaseKey);
async function fetchData() {
const { data, error } = await client
.from('projinfo')
.select('name, url, img, desc');

if (error) {
console.error('查询失败：', error);
return;
}
allprojs=data;

allprojs.forEach(proj => {
var injection = document.createElement("div");
injection.classList.add('proj')
injection.innerHTML=`
    <div class="thumbnail">
        <img src="${proj.img}">
    </div>
    <div class="desc">
        <p>${proj.name}</p> 
        <p style='font-size:smaller'>${proj.desc || ''}</p>
        <a style="font-size: small;" href="${proj.url}">Explore</a>
    </div>
`
document.getElementById('inject').appendChild(injection);
}
)
}