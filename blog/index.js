const totop=function () {window.scrollTo({top:0, behavior: 'smooth'});}
const toend=function(){window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});}

const a11yPart='<div id="a11y" style="box-sizing: border-box; display: flex; position: fixed; bottom: 0; background-color: #fff; right:calc(3em - 100vw); transition: transform .5s;"> <div id="togg"  onclick="showA11y()" style="cursor: pointer; width: 3em; height: 3em; border: 1px solid black; display: flex; border-right: none;"> <div style="margin: auto; font-family:inter">←</div> </div><div id="a11yMenu" style="box-sizing: border-box; border: 1px solid black; width: calc(100vw - 3em); display: flex;"> <center style="overflow-x: auto; overflow-y: hidden; text-wrap: nowrap; display: block; margin: auto;"> <a style="padding: 0 .5rem;" href="javascript: totop()">TOP</a> <a style="padding: 0 .5rem;" href="javascript: window.location.href=window.location.origin">HOME</a> <a style="padding: 0 .5rem;" href="javascript: history.back()">BACK</a> <a style="padding: 0 .5rem;" href="javascript:toend() ">END</a> </center> </div> </div>'
// ondblclick="history.back()"
document.body.innerHTML+=a11yPart;
    function showA11y(){
    toggCtx=document.querySelector('#a11y>#togg>div')
    toggCtx.innerHTML=toggCtx.innerHTML==='←'?'→':'←';
    a11y.style.transform=a11y.style.transform===''?'translateX(calc(3em - 100vw))':'';
}

const link = document.createElement('link');
const fontName='inter';
link.rel = 'stylesheet';
link.href = 'https://xolyn.github.io/font.css';
document.head.appendChild(link)
document.body.style.fontFamily = fontName;
document.querySelectorAll('.markdown-body').forEach(x => x.style.fontFamily = fontName);

// long press:
const button = document.getElementById('togg');
let pressTimer;

function startPress() { pressTimer = setTimeout(() => { history.back(); }, 500); } 
function cancelPress() { clearTimeout(pressTimer); }

button.addEventListener('mousedown', startPress);
button.addEventListener('touchstart', startPress); // touching
button.addEventListener('mouseup', cancelPress);
button.addEventListener('mouseleave', cancelPress);
button.addEventListener('touchend', cancelPress); // touching
