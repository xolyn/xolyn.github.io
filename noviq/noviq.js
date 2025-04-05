var jsmediatags = window.jsmediatags;

//-------------------------------------------------- AUDIO --------------------------------------------------
const audioUpload = document.getElementById('audio-upload');
const audioInput = document.getElementById('audio-input');
const player = document.getElementById('player');
const thumbnail = document.getElementById('thumbnail');

function handleAudioFile(file) {
  if (!file || !file.type.startsWith('audio/')) {
    alert('Not a valid audio file.');
    return;
  }
  const audioURL = URL.createObjectURL(file);
  player.src = audioURL;
}

audioUpload.addEventListener('click', () => audioInput.click());

audioUpload.addEventListener('dragover', (e) => {
  e.preventDefault();
  audioUpload.style.backgroundColor = '#eee';
});

audioUpload.addEventListener('dragleave', () => {
  audioUpload.style.backgroundColor = '';
});

audioUpload.addEventListener('drop', (e) => {
  e.preventDefault();
  audioUpload.style.backgroundColor = '';
  const file = e.dataTransfer.files[0];
  handleAudioFile(file);
  extractAndDisplayThumbnail(file);
});

audioInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleAudioFile(file);
  extractAndDisplayThumbnail(file);
});


// --------------------------------------------------LYRICS --------------------------------------------------
const lrcUpload = document.getElementById('lrc-upload');
const lrcInput = document.getElementById('lrc-input');

lrcUpload.addEventListener('click', () => lrcInput.click());

lrcUpload.addEventListener('dragover', (e) => {
  e.preventDefault();
  lrcUpload.style.backgroundColor = '#eee';
});

lrcUpload.addEventListener('dragleave', () => {
  lrcUpload.style.backgroundColor = '';
});

lrcUpload.addEventListener('drop', (e) => {
  e.preventDefault();
  lrcUpload.style.backgroundColor = '';
  const file = e.dataTransfer.files[0];
  handleLrcFile(file);
});

lrcInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleLrcFile(file);
});

function handleLrcFile(file) {
  if (!file || !file.name.endsWith('.lrc')) {
    alert('请上传有效的 .lrc 歌词文件');
    return;
  }
  // 这里暂时不做歌词处理
  console.log('歌词文件已上传:', file.name);
}

// --------------------------------------------------THUMBNAIL --------------------------------------------------

function extractAndDisplayThumbnail(file) {
  jsmediatags.read(file, {
    onSuccess: function(tag) {
      const picture = tag.tags.picture;
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