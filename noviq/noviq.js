var jsmediatags = window.jsmediatags;

//-------------------------------------------------- AUDIO --------------------------------------------------
const overlay = document.getElementById('overlay');
let dragCounter = 0;
window.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    const items = e.dataTransfer?.items;
    if (items && items.length > 0) {
    const item = items[0];
    const name = item.getAsFile()?.name.toLowerCase() || "";
    const type = item.type;
    if (type.startsWith('audio/')) {
        ultxt.textContent = 'Upload audio file here';
    } else {
        ultxt.textContent = 'Upload lyrics file here';
    }
    overlay.classList.add('show');

    }
});
window.addEventListener('dragover', (e) => {
    e.preventDefault(); // important 
});

window.addEventListener('dragleave', (e) => {
    dragCounter--;
    if (dragCounter <= 0) {
    overlay.classList.remove('show');
    }
});
window.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    overlay.classList.remove('show');
    // deal
});

// --------------------------------------------------THUMBNAIL --------------------------------------------------

function extractAndDisplayThumbnail(file) {
  jsmediatags.read(file, {
    onSuccess: function(tag) {
      const picture = tag.tags.picture;
      const songName = tag.tags.title || 'Upload';
      const artistName = tag.tags.artist || 'Unknown Artist';
      const albumName = tag.tags.album || 'Unknown Album';

      title.innerText = songName;
      artist.innerText = artistName;  
      album.innerText = albumName;

      if (picture) {
        const { data, format } = picture;
        let base64String = "";
        for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i]);
        }
        const imageUri = `data:${format};base64,${btoa(base64String)}`;
        document.getElementById('thumbnail').src = imageUri;
        document.getElementById('thumbnail').style.display = 'block';
      } else {
        document.getElementById('thumbnail').style.display = 'none';
      }
    },
    onError: function(error) {
      console.log("Error extracting thumbnail:", error);
      document.getElementById('thumbnail').style.display = 'none';
    }
  });
}
// // ----------------------------------------------- SPINNING -----------------------------------------------
// player.addEventListener('play', () => {
//   thumbnail.classList.add('rotate');
// });


// player.addEventListener('pause', () => {
//   thumbnail.classList.remove('rotate');
// });

// player.addEventListener('ended', () => {
//   thumbnail.classList.remove('rotate');
// });

// ----------------------------------------------- FULLSCREEN -----------------------------------------------
const fsBtn = document.getElementById('fs');

fsBtn.addEventListener('click', () => {
  const elem = document.documentElement; // 可以换成任何元素，如 document.body

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      console.error(`全屏失败: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});


// ----------------------------------------------- AUTO SCROLL -----------------------------------------------
const scrollStep = .8; // px per frame
const pauseDuration = 500; // ms when reaching edges

// 存储每个元素的状态
const scrollElements = [];

document.querySelectorAll('.autoscroll').forEach(el => {
  scrollElements.push({
    el,
    direction: 1,      // 初始向右
    pauseUntil: 1      // 用于暂停
  });
});

function autoScrollAll(timestamp) {
  scrollElements.forEach(item => {
    const { el } = item;

    // 如果处于暂停状态，跳过本轮滚动
    if (timestamp < item.pauseUntil) return;

    el.scrollLeft += scrollStep * item.direction;

    // 到达右边界
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
      item.direction = -1;
      item.pauseUntil = timestamp + pauseDuration;
    }

    // 到达左边界
    else if (el.scrollLeft <= 0) {
      item.direction = 1;
      item.pauseUntil = timestamp + pauseDuration;
    }
  });

  requestAnimationFrame(autoScrollAll);
}

// 启动
requestAnimationFrame(autoScrollAll);