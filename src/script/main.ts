import { parseConst } from './parser/constParser';
import { getFiles } from './parser/utilities';

const fileInput = <HTMLInputElement>(
  document.getElementById('file-reader__input')
);

fileInput.addEventListener(
  'change',
  async function (event: Event) {
    const target = <HTMLInputElement>event.target;

    const [constFile, aptFile] = getFiles(target.files);

    const constData = await constFile
      .arrayBuffer()
      .then((arrayBuffer: ArrayBuffer) => {
        return parseConst(arrayBuffer);
      });
    console.log('const', constData);

    const aptData = await aptFile
      .arrayBuffer()
      .then((arrayBuffer: ArrayBuffer) => {
        const index = constData.aptOffset;
        // parse apt
      });
  },
  false
);
