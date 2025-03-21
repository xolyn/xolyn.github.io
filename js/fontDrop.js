const allowedExtensions = ['otf', 'ttf', 'eot', 'woff', 'woff2'];
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

// 点击 dropzone 打开文件选择框
dropzone.addEventListener('click', () => fileInput.click());

// 文件选择后处理
fileInput.addEventListener('change', (e) => {
handleFile(e.target.files[0]);
fileInput.value = ''; // 清空选择
});

// 拖拽处理
dropzone.addEventListener('dragover', e => e.preventDefault());
dropzone.addEventListener('drop', e => {
e.preventDefault();
const file = e.dataTransfer.files[0];
handleFile(file);
});

function handleFile(file) {
if (!file) return;
const ext = file.name.split('.').pop().toLowerCase();
if (!allowedExtensions.includes(ext)) {
    alert('Not a valid/supported font format (otf, ttf, eot, woff, woff2)');
    return;
}
const fontName = 'DroppedFont' + Date.now();
const reader = new FileReader();
reader.onload = function(event) {
    const fontData = event.target.result;
    const blob = new Blob([fontData]);
    const url = URL.createObjectURL(blob);
    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: '${fontName}';
            src: url('${url}');
        }
    `;
    document.head.appendChild(style);

    preview.innerHTML = `
        <p style='font-size: smaller'>File name: <code style='cursor: initial'>${file.name}</code></p>

        <div style='display:flex; width:100%'>
            <div style="font-family: '${fontName}'; font-size: xx-large; margin-right: 5dvw;">
                The quick brown fox jumps over the lazy dog.
            </div>
            <div style='margin: 0 auto'></div>
             <div onclick='addFont()' style=" display: flex; cursor: pointer; color: gray; border-radius: 999rem">
            <div style='width:min-content; height:min-content; margin:auto'>⊕</div>
            </div>
        </div>
        

        
    `;
};
reader.readAsArrayBuffer(file);
}