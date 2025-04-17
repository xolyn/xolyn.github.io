let music = null;
let lrc   = null;

const uploadMask = document.getElementById('uploadMask');

document.addEventListener('click', function(event) {
    const target = document.getElementById('uploads');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (!target.contains(event.target) && !uploadBtn.contains(event.target) && event.target !== uploadBtn) {
      target.style.display='none';
    }
  });

// 2. 拖拽事件：进入／离开 body 时显示或隐藏遮罩
window.addEventListener('dragover', e => {
  e.preventDefault();
  uploadMask.style.visibility = 'initial';
  uploadMask.style.opacity    = 1;
});
window.addEventListener('dragleave', e => {
  e.preventDefault();
  uploadMask.style.visibility = 'hidden';
  uploadMask.style.opacity    = 0;
});
window.addEventListener('drop', e => {
  e.preventDefault();
  uploadMask.style.visibility = 'hidden';
  uploadMask.style.opacity    = 0;
  handleFiles(e.dataTransfer.files);
});

// 3.／4. 点击上传按钮：动态创建 input[type=file]
const musicInput = createFileInput('audio/*', files => handleFiles(files));
const lrcInput   = createFileInput('.lrc',    files => handleFiles(files));

document.getElementById('addMusic')
        .addEventListener('click', () => musicInput.click());
document.getElementById('addLyrics')
        .addEventListener('click', () => lrcInput.click());

function createFileInput(accept, onChange){
  const inp = document.createElement('input');
  inp.type   = 'file';
  inp.accept = accept;
  inp.style.display = 'none';
  inp.onchange = e => onChange(e.target.files);
  document.body.appendChild(inp);
  return inp;
}

// 5. 处理所有上传文件
function handleFiles(files){
  for (let file of files) {
    const name = file.name;
    const ext  = name.substring(name.lastIndexOf('.') + 1).toLowerCase();

    if (file.type.startsWith('audio/')) {
      music = file;
      loadMetadata(file);
      initPlayer(file);
      showNotif('Music uploaded!');

    }
    else if (ext === 'lrc') {
      lrc = file;
      loadLyrics(file);
      showNotif('Lyrics uploaded, ready to play!');
      
    }
    else {
      showNotif('Invalid format!');
    }
  }
}

// 7. 读取音频 metadata 并更新页面
function loadMetadata(file) {
    jsmediatags.read(file, {
      onSuccess: tag => {
        const { title, artist } = tag.tags;
        document.getElementById('title').textContent  = title  || 'Unknown title';
        document.getElementById('artist').textContent = artist || 'Unknown artist';
        document.title=`Now playing: ${title  || 'Unknown title'}-${artist || 'Unknown artist'}`;
  
        const picture = tag.tags.picture;
        if (picture) {
          const arrayBuffer = new Uint8Array(picture.data).buffer;
          const blob = new Blob([arrayBuffer], { type: picture.format });
          const url = URL.createObjectURL(blob);
          document.getElementById('thumbnail').src = url;
        } else {
          document.getElementById('thumbnail').src = 'tn.png';
        }
      },
      onError: error => {
        console.warn('Unable to extract metadata.', error);
      }
    });
  }


//=====================================playback=====================================
let audio = null;
let seekBall = null;

function initPlayer(file) {
    if (!file) return;
  
    // 1. 如果已存在旧 audio，把它的 URL 释放掉
    if (audio) {
      URL.revokeObjectURL(audio.src);
    }
  
    // 2. 新建 audio
    audio = new Audio(URL.createObjectURL(file));
    audio.load();

    audio.addEventListener('timeupdate', () => {
      if (!lyrics.length || !audio.duration) return;
      const t = audio.currentTime;
      let idx = lyrics.findIndex((item, i) => {
        const nextTime = (lyrics[i + 1] && lyrics[i + 1].time) || Infinity;
        return t >= item.time && t < nextTime;
      });
      if (idx === -1) idx = lyrics.length - 1;
      renderLyrics(idx, 2);
    });
  
    // 3. 绑定播放/暂停
    const playBtn = document.getElementById('play');
    playBtn.onclick = () => {
      if (audio.paused) {
        audio.play().catch(() => {});  // swallow AbortError
      } else {
        audio.pause();
      }
    
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (audio.paused) {
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
      }
    });

    };
  
    // 4. 删除旧的 seekBall (if has)
    const old = document.getElementById('seekBall');
    if (old) old.remove();
  
    // 5. 创建新的 seekBall
    const control = document.getElementById('control');
    const w = 10;
    seekBall = document.createElement('div');
    seekBall.id = 'seekBall';
    Object.assign(seekBall.style, {
      position: 'absolute',
      top: `-${w/2}px`,
      left: '0',
      width: `${w}px`,
      height: `${w}px`,
      borderRadius: '50%',
      background: '#ccc',
      cursor: 'pointer',
    });
    control.appendChild(seekBall);
  
    // 6. 随播放更新小球位置
    audio.ontimeupdate = () => {
      const maxX = control.clientWidth - seekBall.clientWidth;
      const pct  = audio.currentTime / audio.duration || 0;
      seekBall.style.left = `${pct * maxX}px`;
    };
  
    // 7. 拖拽跳转
    let dragging = false;
    seekBall.onmousedown = e => (dragging = true, e.preventDefault());
    document.onmousemove = e => {
      if (!dragging) return;
      const rect = control.getBoundingClientRect();
      let x = e.clientX - rect.left;
      const maxX = control.clientWidth - seekBall.clientWidth;
      x = Math.max(0, Math.min(x, maxX));
      audio.currentTime = (x / maxX) * audio.duration;
    };
    document.onmouseup = () => dragging = false;
  }

//=====================================lyrics=====================================

let lyrics = [];
// 1. 读取并解析 LRC 文件
function loadLyrics(file) {
    const reader = new FileReader();
    reader.onload = () => {
      lyrics = parseLrcText(reader.result);
      // 按时间排序（有时候同一句多个时间戳）
      lyrics.sort((a, b) => a.time - b.time);
    };
    reader.readAsText(file, 'utf-8');
  }
  
  // 2. 把 LRC 文本转成 [{time, text}] 数组
function parseLrcText(text) {
  const lineRe = /\[(\d+):(\d+(?:\.\d+)?)\]/g;
  const result = [];
  text.split(/\r?\n/).forEach(line => {
    let match;
    const times = [];
    while ((match = lineRe.exec(line)) !== null) {
      const min = parseInt(match[1], 10);
      const sec = parseFloat(match[2]);
      times.push(min * 60 + sec);
    }
    const content = line.replace(lineRe, '').trim();
    times.forEach(t => result.push({ time: t, text: content }));
  });
  return result;
}
  
  // 3. 渲染：
  let lastHighlightedEl = null;

  function renderLyrics(currentIndex) {
    const container = document.getElementById('lrcShow');
    container.innerHTML='';

    if (container.children.length === 0) {
      lyrics.forEach((line, i) => {
        const lineEl = document.createElement('div');
        lineEl.style.fontSize = '8vmin';
        lineEl.classList.add('lrcLine');
        lineEl.style.fontFamily = 'inherit';
        lineEl.classList.add('blur'); // 默认添加模糊效果
        lineEl.id = `lyric-line-${i}`; 
        lineEl.textContent = line.text || '\u00A0';
        container.appendChild(lineEl);
      });
    }
  
    // 取消上一次高亮
    if (lastHighlightedEl) {
      lastHighlightedEl.style.color = 'gray';
      lastHighlightedEl.style.fontWeight = 'normal';
      lastHighlightedEl.classList.add('blur'); // 添加模糊效果
    }
  
    const currentEl = document.getElementById(`lyric-line-${currentIndex}`);
    if (currentEl) {
      // 加高亮
      currentEl.style.color = 'black';
      currentEl.style.fontWeight = 'bold';
      currentEl.classList.remove('blur'); // 移除模糊效果
      lastHighlightedEl = currentEl;
      currentEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

//=====================================notif=====================================

function showNotif(text, dur=1000) {
  const notif = document.getElementById('notif');
  const  exitCurve= 'transform 0.3s cubic-bezier(0.42, 0, 1, 1)';
  const  enterCurve= 'transform 0.5s cubic-bezier(0.25, 1.5, 0.5, 1)';
  if (!notif) return;

  notif.innerHTML = text;
  notif.style.transition = enterCurve;
  notif.style.transform = 'translate(-50%, 0)';

  setTimeout(() => {
    notif.style.transition = exitCurve;
    notif.style.transform = 'translate(-50%, -10rem)';
  }, dur);
}

//=====================================demo=====================================
function startDemo(){
  Promise.all([
    fetch('./song.mp3').then(res => res.blob()),
    fetch('./song.lrc').then(res => res.blob())
  ]).then(([mp3Blob, lrcBlob]) => {
    const mp3File = new File([mp3Blob], 'song.mp3', { type: 'audio/mp3' });
    const lrcFile = new File([lrcBlob], 'song.lrc', { type: 'text/plain' });

    handleFiles([mp3File, lrcFile]);

    document.getElementById('play').click();
  });

  setTimeout(()=>{showNotif(`
    <span style='color:gold'>2018 Grammy's Award winner
    </span>
    `, 5000)}, 5000);
}
