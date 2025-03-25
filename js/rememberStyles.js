function remember(divElement, styles) {
    if (!divElement.id) {
        console.warn('Element has no id; cannot remember styles.');
        return;
    }
    const key = `remember_style_${divElement.id}`;
    
    // apply
    for (const [prop, val] of Object.entries(styles)) {
        divElement.style[prop] = val;
    }
    
    // write in
    localStorage.setItem(key, JSON.stringify(styles));
}


function checkRemember() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('remember_style_')) {
            const elementId = key.replace('remember_style_', '');
            const element = document.getElementById(elementId);
            if (element) {
                const storedStyles = JSON.parse(localStorage.getItem(key));
                for (const [prop, val] of Object.entries(storedStyles)) {
                    if (element.style[prop] !== val) {
                        element.style[prop] = val;
                    }
                }
            }
        }
    }
}
