const totop=function () {window.scrollTo({top:0, behavior: 'smooth'});}
const toend=function(){window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});}

const a11yPart='<div id="a11y" style="display: flex; position: fixed; bottom: 0; background-color: #fff; right:calc(3em - 100vw); transition: transform .5s;"> <div id="togg" onclick="showA11y()" style="cursor: pointer; box-sizing: border-box; width: 3.0em; height: 3.0em; border: 1px solid black; display: flex; border-right: none;"> <div style="margin: auto;">←</div> </div><div id="a11yMenu" style="box-sizing: border-box; border: 1px solid black; width: calc(100vw - 3.0em); display: flex;"> <center style="overflow-x: auto; overflow-y: hidden; text-wrap: nowrap; display: block; margin: auto;"> <a style="padding: 0 .5rem;" href="javascript: totop()">TOP</a> <a style="padding: 0 .5rem;" href="javascript: window.location.href=window.location.origin">HOME</a> <a style="padding: 0 .5rem;" href="">THEME</a> <a style="padding: 0 .5rem;" href="javascript:toend() ">END</a> </center> </div> </div>'

document.body.innerHTML+=a11yPart;

    function showA11y(){
    toggCtx=document.querySelector('#a11y>#togg>div')
    toggCtx.innerHTML=toggCtx.innerHTML==='←'?'→':'←';
    a11y.style.transform=a11y.style.transform===''?'translateX(calc(3em - 100vw))':'';
}