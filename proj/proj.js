const swiper = new Swiper('.swiper', {navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  pagination: {
el: '.swiper-pagination',
type: 'custom',
renderCustom: function (swiper, current, total) {
  return `${current}/${total}`;
}
}
});


const projs=[
{
  "name": "Gambler's Ruin",
  "url": "https://xolyn.github.io/grd.html",
  "img": "https://images.unsplash.com/photo-1726004592905-dc5cd794bda6?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},

{
  "name":"NOVIQ",
  "url": "https://xolyn.github.io/noviq",
  "img":"https://images.unsplash.com/photo-1565656898731-61d5df85f9a7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
  "name": "Pseudo Lexicon",
  "url": "https://xolyn.github.io/pslex",
  "img": "https://images.unsplash.com/photo-1595325093677-422a41bcf51c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
"name": "Optimization plyaground",
"url": "https://xolyn.github.io/academic/opt.html",
"img": "https://images.unsplash.com/photo-1628268509381-c70293fa638d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
"name": "YAFIWG",
"url": "https://github.com/xolyn/yafiwg",
"img": "https://f.zly.vg/assets/yafiwg.jpg"
},
{
"name": "beamer2ppt",
"url": "https://github.com/xolyn/beamer2ppt",
"img": "https://f.zly.vg/assets/b2p.jpg"
},
{
"name": "Birthday paradox",
"url": "https://xolyn.github.io//academic/bp.html",
"img": "https://images.unsplash.com/photo-1669502067440-6a09729d072d?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
"name": "CLI personal webpage",
"url": "https://aqmn.github.io/cmd",
"img": "https://shorturl.at/anrE3"
},
{
"name": "Time Series Analysis",
"url": "https://xolyn.github.io/5999proj",
"img": "https://images.unsplash.com/photo-1700157710823-2e9e58414802?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
"name": "Gadgetz",
"url": "https://xolyn.github.io/widgets/",
"img": "https://i.pinimg.com/originals/30/8d/fd/308dfd052f050d31b8c05c6a63c0831f.gif"
},
{
"name": "The bug index",
"url": "https://f.zly.vg/bug",
"img": "https://f.zly.vg/assets/bug.png"
}
]

const carousel = document.querySelector('#swiper-wrapper');

projs.forEach(item => {
const cell = document.createElement('div');
cell.className = 'swiper-slide';

cell.innerHTML = `
<img src='${item.img}'  style='width: 100%; height: auto; position: relative;'/>
<br><a style='position: absolute; left: 5%; bottom: 5%; color: white; mix-blend-mode: difference' href='${item.url}'>${item.name}</a>
`;

carousel.appendChild(cell);
});