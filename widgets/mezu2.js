(function () {
    // 1. 获取所有 heading
    const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    if (headers.length === 0) return;

    // 2. 计算最小 heading 层级
    let minLevel = 6;
    headers.forEach(header => {
        const level = parseInt(header.tagName.charAt(1));
        if (level < minLevel) minLevel = level;
    });

    // 3. 为无 id 的 heading 添加唯一 id
    headers.forEach((header, index) => {
        if (!header.id) header.id = `section-${index + 1}`;
        if (!header.hasAttribute('name')) header.setAttribute('name', header.id);
    });

    // 4. 创建 details 容器
    const details = document.createElement('details');
    details.style.position = 'fixed';
    details.style.top = '0';
    details.style.right = '0';
    // details.style.maxWidth = '40dvw';
    details.style.width = '100%';
    details.style.zIndex = '10000';
    details.style.fontFamily = 'inherit';
    details.style.background = 'rgba(255,255,255,0.5)';
    details.style.boxSizing = 'border-box'; // 让 padding 生效
    details.style.backdropFilter = 'blur(10px)';
    details.style.borderRadius = '.2rem';
    details.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.1)';
    details.style.border = '1px solid #eee';

    // 5. summary 始终为当前在 viewport 的 heading 文本
    const summary = document.createElement('summary');
    summary.style.boxSizing = 'border-box';
    summary.textContent = headers[0].textContent;
    summary.style.cursor = 'pointer';
    summary.style.fontWeight = 'bold';
    summary.style.padding = '.4em 0.6em';

    details.appendChild(summary);

    // 6. 生成目录部分，继承 mezu.js 的缩进、样式
    const menu = document.createElement('div');
    menu.style.maxHeight = '40vh';
    menu.style.overflowY = 'auto';
    menu.style.padding = '0.2em 0.5em 0.5em 0.5em';

    // 注入 CSS
    const style = document.createElement('style');
    style.textContent = `
        .mezu2-link {
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: rgb(100,100,100) !important;
            text-decoration: none;
            margin: .2rem 0;
            font-size: .8rem;
            border-radius: .15rem;
            transition: 0.2s;
            padding-left: 0;
        }
        .mezu2-link.active {
            font-weight: bold;
            color: rgb(0,0,0) !important;
        }

        .mezu2-link:hover {
            font-size: .85rem;
            color: rgb(0,0,0) !important;
        }

        .mezu2-link::before {
            content: '\\00A0';
            width: 4px;
            display: inline-block;
            background-color: #eee;
            border-radius: 9999rem;
            height: auto;
            margin-right: 5px;
        }
    `;
    document.head.appendChild(style);

    // 层级缩进（和原逻辑一致）
    let currentLevel = 0;
    let listStack = [menu];

    headers.forEach((header, index) => {
        const level = parseInt(header.tagName.charAt(1));
        const indentLevel = level - minLevel;

        const a = document.createElement('a');
        a.className = 'mezu2-link';
        a.href = `#${header.id}`;
        a.textContent = header.textContent;
        a.style.paddingLeft = `${indentLevel * 12}px`;

        a.addEventListener('click', function (e) {
            e.preventDefault();
            // 平滑滚动到目标 heading
            const target = document.getElementById(header.id);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 60,
                    behavior: 'smooth'
                });
            }
            // 关闭菜单（可选：是否展开可自定义）
            details.open = false;
        });

        // 层级菜单嵌套（扁平化处理）
        menu.appendChild(a);
    });

    details.appendChild(menu);
    document.body.appendChild(details);

    // 7. Intersection Observer：检测哪个 heading 在 viewport
    let activeIndex = 0;
    let ticking = false;

    // 保存每个 heading 的可见比例
    const visibilities = new Array(headers.length).fill(0);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const idx = headers.indexOf(entry.target);
            if (idx >= 0) visibilities[idx] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        if (!ticking) {
            window.requestAnimationFrame(updateActiveHeading);
            ticking = true;
        }
    }, {
        root: null,
        rootMargin: '0px 0px -30% 0px', // 下方预留，让 heading 提前高亮
        threshold: [0, 0.1, 0.5, 1]
    });

    headers.forEach(header => observer.observe(header));

    // 8. 更新 summary & 高亮
    function updateActiveHeading() {
        ticking = false;
        let maxRatio = 0;
        let firstVisible = 0;
        for (let i = 0; i < visibilities.length; i++) {
            if (visibilities[i] > maxRatio) {
                maxRatio = visibilities[i];
                firstVisible = i;
            }
        }
        // 如果没一个可见，优先 top 较高的 heading
        if (maxRatio === 0) {
            let minDist = Infinity;
            for (let i = 0; i < headers.length; i++) {
                const rect = headers[i].getBoundingClientRect();
                const dist = Math.abs(rect.top);
                if (dist < minDist) {
                    minDist = dist;
                    firstVisible = i;
                }
            }
        }
        // 更新 summary
        summary.textContent = headers[firstVisible].textContent;
        // 高亮目录项
        Array.from(menu.querySelectorAll('.mezu2-link')).forEach((a, i) => {
            a.classList.toggle('active', i === firstVisible);
        });
    }

    // 首次触发
    updateActiveHeading();

    // 页面滚动时，可能需要主动触发
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateActiveHeading);
    });

    // 可选：监听页面 resize
    window.addEventListener('resize', () => {
        window.requestAnimationFrame(updateActiveHeading);
    });
})();
