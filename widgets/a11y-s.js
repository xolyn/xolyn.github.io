const totop=function () {window.scrollTo({top:0, behavior: 'smooth'});}
const toend=function(){window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});}

const a11yPart=`
<div id="a11y" style="box-sizing: border-box; display: flex; position: fixed; bottom: 0; background-color: #fff; right:calc(3em - 100vw); transition: transform .5s; z-index:9999">
    <div id="togg"  onclick="showA11y()" style="cursor: pointer; width: 3em; height: 3em; border: 1px solid black; display: flex; border-right: none;">
        <div style="margin: auto; font-family:inter">←</div>
    </div>
    <div id="a11yMenu" style="box-sizing: border-box; border: 1px solid black; width: calc(100vw - 3em); display: flex;">
        <center style="overflow-x: auto; overflow-y: hidden; text-wrap: nowrap; display: block; margin: auto;">
            <a style="padding: 0 .5rem; font-family:inherit" href="javascript: window.scrollTo({top:0, behavior: 'smooth'});">TOP</a>
            <a style="padding: 0 .5rem; font-family:inherit" href="javascript: window.location.href=window.location.origin">HOME</a>
            <a style="padding: 0 .5rem; font-family:inherit" href="javascript: history.back()">BACK</a>
            <a style="padding: 0 .5rem; font-family:inherit" href="javascript: window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});">END</a> 
            <a style="padding: 0 .5rem; font-family:inherit" href="javascript: window.location.href=window.location.href">REFRESH</a>
        </center>
    </div>
</div>`

// ondblclick="history.back()"
document.body.innerHTML+=a11yPart;
    function showA11y(){
    toggCtx=document.querySelector('#a11y>#togg>div')
    toggCtx.innerHTML=toggCtx.innerHTML==='←'?'→':'←';
    a11y.style.transform=a11y.style.transform===''?'translateX(calc(3em - 100vw))':'';
}
