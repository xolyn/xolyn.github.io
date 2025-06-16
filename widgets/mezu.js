(function () {
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // 找到最小的 heading level
    let minLevel = 6;
    headers.forEach(header => {
        const level = parseInt(header.tagName.charAt(1));
        if (level < minLevel) minLevel = level;
    });

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
    menu.style.padding = '10px';
    menu.style.zIndex = '10000';
    menu.style.borderRadius = '.2rem';
    menu.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.1)';
    menu.style.fontFamily = 'inherit';
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
        const level = parseInt(header.tagName.charAt(1));
        // 以最小level为基准，计算缩进
        const indentLevel = level - minLevel;

        if (!header.id) {
            header.id = `section-${index + 1}`;
        }

        if (!header.hasAttribute('name')) {
            header.setAttribute('name', header.id);
        }

        const item = document.createElement('div');
        item.innerHTML = `<a class='mezu-link' href="#${header.id}" style="color: #007BFF; text-decoration: none; display: block; padding-left: ${indentLevel * 10}px">${header.textContent}</a>`;

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

        // 目录嵌套层级也以minLevel为基准
        if (indentLevel > currentLevel) {
            const newUl = document.createElement('div');
            newUl.style.marginLeft = `${indentLevel * 5}px`;
            listStack[listStack.length - 1].appendChild(newUl);
            listStack.push(newUl);
        } else if (indentLevel < currentLevel) {
            while (listStack.length > indentLevel + 1) {
                listStack.pop();
            }
        }

        listStack[indentLevel] ? listStack[indentLevel].appendChild(item) : menu.appendChild(item);
        currentLevel = indentLevel;
    });

    document.body.appendChild(menu);
})();