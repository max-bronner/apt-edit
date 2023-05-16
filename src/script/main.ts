import { parseConst } from './parser/constParser';

const fileInput= <HTMLInputElement>document.getElementById('file-reader__input');

fileInput.addEventListener('change', async function(event: Event) {
  
  const target = <HTMLInputElement>event.target;

  const constFile  =  target.files && target.files[0];

  if (constFile) {
    const constData = await constFile.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
      return parseConst(arrayBuffer);
    });
    console.log('const', constData);
  }
}, false);
