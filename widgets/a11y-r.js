(function(){
    if(!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Material+Symbols+Outlined"]')) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
        document.head.appendChild(link);
    }

    if(!document.getElementById('custom-material-symbol-style')) {
        var style = document.createElement('style');
        style.id = 'custom-material-symbol-style';
        style.innerHTML = `
.material-symbols-outlined{
    font-family: 'Material Symbols Outlined';
    font-size: .8rem;
    color:black;
    transition: ease .5s;
    cursor: pointer;
    width: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .3rem;
    border-radius: 9999rem;
    background-color: transparent;
    padding: .3rem;
}
.material-symbols-outlined:hover{
    background-color:#eee;
}
        `;
        document.head.appendChild(style);
    }

    if(!document.getElementById('floating-toolbar')) {
        var div = document.createElement('div');
        div.id = 'floating-toolbar';
        div.style.position = 'fixed';
        div.style.bottom = '.5rem';
        div.style.left = '50%';
        div.style.transform = 'translateX(-50%)';
        div.style.display = 'flex';
        div.style.zIndex= '9999';
        div.style.padding = '.2rem';
        div.style.border = '1px solid #eee';
        div.style.borderRadius = '9999rem';
        div.style.backgroundColor = 'rgba(255,255,255,.3)';
        div.style.backdropFilter = 'blur(3px)';
        div.style.webkitBackdropFilter = 'blur(3px)';
        div.innerHTML = `
            <div onclick="window.location.href=window.location.origin" class="material-symbols-outlined">&#xe88a;</div>
            <div onclick="history.back()" class="material-symbols-outlined">&#xe5c4;</div>
            <div onclick="window.location.reload()" class="material-symbols-outlined">&#xe5d5;</div>
            <div onclick="window.scrollTo({top:0, behavior: 'smooth'})" class="material-symbols-outlined">&#xe5d8;</div>
            <div onclick="window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});" class="material-symbols-outlined">&#xe5db;</div>
        `;
        document.body.appendChild(div);
    }
})();
