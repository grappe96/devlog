const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const devlogDir = path.join(outDir, 'devlog');

// devlog 디렉토리가 없으면 생성
if (!fs.existsSync(devlogDir)) {
  fs.mkdirSync(devlogDir, { recursive: true });
}

// out 디렉토리의 파일들을 확인하고 이동
fs.readdirSync(outDir).forEach((file) => {
  // _next와 devlog 디렉토리, .nojekyll 파일은 그대로 두고, 나머지만 이동
  if (file !== '_next' && file !== 'devlog' && file !== '.nojekyll') {
    const srcPath = path.join(outDir, file);
    const destPath = path.join(devlogDir, file);
    
    try {
      // 디렉토리인 경우 재귀적으로 이동
      if (fs.statSync(srcPath).isDirectory()) {
        if (fs.existsSync(destPath)) {
          fs.rmSync(destPath, { recursive: true, force: true });
        }
        fs.renameSync(srcPath, destPath);
      } else {
        // 파일인 경우 이동
        fs.renameSync(srcPath, destPath);
      }
    } catch (error) {
      console.error(`파일 이동 중 오류 발생: ${file}`, error);
    }
  }
});

console.log('✅ Export 파일 구조 수정 완료');
