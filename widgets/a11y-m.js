const cssHref = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
let linkExists = !!document.querySelector(`link[href="${cssHref}"]`);
if (!linkExists) {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = cssHref;
    document.head.appendChild(link);
}

let a11ym=`
       <div id="outer" style="position: fixed; left:50%; bottom: 2rem; transform: translateX(-50%); z-index: 9999; background-color: #D7D2DA; width: fit-content; padding: .5rem;border-radius: 99rem; display: flex; transition: .45s ; ">
        <div id="left" style=" max-width: 5000px;overflow: hidden; transition: .45s ; text-wrap: nowrap; ">
            <div   onmouseover="this.style.backgroundColor='#6F6198';" onmouseout="this.style.backgroundColor='transparent';" onclick="window.scrollTo({top:0, behavior: 'smooth'})" class="material-symbols-outlined " style=" padding: .5rem; border-radius: 99rem; transition: .3s; cursor: pointer; margin: 0 .25rem;cursor: pointer; user-select: none;">&#xe5d8;</div>
            <div   onmouseover="this.style.backgroundColor='#6F6198';" onmouseout="this.style.backgroundColor='transparent';" onclick="window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});" class="material-symbols-outlined " style=" padding: .5rem; border-radius: 99rem; transition: .3s; cursor: pointer; margin: 0 .25rem; cursor: pointer; user-select: none;">&#xe5db;</div></div>
        <div id="toggle" 
        onclick="left.style.maxWidth=left.style.maxWidth=='0px'?'300px':'0px'; right.style.maxWidth=right.style.maxWidth=='0px'?'300px':'0px';"
        class="material-symbols-outlined" 
        style="display: flex;user-select: none; cursor: pointer; justify-content: center; align-items: center; padding: .5rem 1rem; border-radius: 99rem; background-color: #685496;">
    
             &#xe5d3;
        </div>
        <div id="right" style=" max-width: 5000px;overflow: hidden; transition: .45s ; text-wrap: nowrap; ">
            <div   onmouseover="this.style.backgroundColor='#6F6198';" onmouseout="this.style.backgroundColor='transparent';" onclick="history.back()" class="material-symbols-outlined " style=" cursor: pointer; user-select: none; padding: .5rem; border-radius: 99rem; transition: .3s; cursor: pointer; margin: 0 .25rem;">&#xe5c4;</div>
            <div   onmouseover="this.style.backgroundColor='#6F6198';" onmouseout="this.style.backgroundColor='transparent';" onclick="window.location.reload()" class="material-symbols-outlined " style=" cursor: pointer; user-select: none; padding: .5rem; border-radius: 99rem; transition: .3s; cursor: pointer; margin: 0 .25rem;">&#xe5d5;</div>
        </div>
    </div>
`

document.body.insertAdjacentHTML('beforeend', a11ym);

toggle.click();