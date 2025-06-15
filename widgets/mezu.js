(function () {
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const existingIds = Array.from(headers)
        .filter(header => header.id)
        .map(header => header.id);

    if (existingIds.length > 0) {
        console.error('[meZu] Context menu failed to created due to existing id(s) attributes:', existingIds);
        return; // Stop execution if any header already has an ID
    }

    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.bottom = '1rem';
    menu.style.right = '1rem';
    menu.style.maxWidth = '40dvw';
    menu.style.maxHeight = '50vh';
    menu.style.overflowY = 'auto';
    menu.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    menu.style.backdropFilter = 'blur(10px)';
    menu.style['-webkit-backdrop-filter'] = 'blur(10px)';
    menu.style.border = '1px solid #eee';
    menu.style.padding = '10px 10px 10px 0';
    menu.style.zIndex = '10000';
    menu.style.borderRadius = '.2rem';
    menu.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.1)';
    menu.style.fontFamily = 'Arial, sans-serif';
    menu.style.overflowY = 'auto';

    let currentLevel = 0;
    let listStack = [menu];

    const style = document.createElement('style');
    style.textContent = `
    a.mezu-link::before {
            content: '\\00A0';
            width: 4px;
            display: inline-block;
            background-color: #eee;
            border-radius: 9999rem;
            height: auto;
            margin-right: 5px;
            }

        a.mezu-link {
            margin: .2rem 0;
            font-family: sans-serif;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color:inherit !important;
            font-size:smaller;
            transition: filter 0.3s ease;
        }

        a.mezu-link:hover {
            filter: brightness(0.8);
        }
    `;
    document.head.appendChild(style);

    headers.forEach((header, index) => {
        const level = parseInt(header.tagName.charAt(1)); // h1 -> 1, h2 -> 2 ...
        
        if (!header.id) {
            header.id = `section-${index + 1}`;
        }

        if (!header.hasAttribute('name')) {
            header.setAttribute('name', header.id);
        }

        const item = document.createElement('div');
        item.innerHTML = `<a class='mezu-link' href="#${header.id}" style="color: #007BFF; text-decoration: none; display: block; padding-left: ${level * 10}px">${header.textContent}</a>`;

        item.querySelector('a').addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(header.id);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 60,
                    behavior: 'smooth'
                });
            }
        });

        if (level > currentLevel) {
            const newUl = document.createElement('div');
            newUl.style.marginLeft = `${level * 5}px`;
            listStack[listStack.length - 1].appendChild(newUl);
            listStack.push(newUl);
        } else if (level < currentLevel) {
            while (listStack.length > level + 1) {
                listStack.pop();
            }
        }

        listStack[level] ? listStack[level].appendChild(item) : menu.appendChild(item);
        currentLevel = level;
    });

    document.body.appendChild(menu);
})();