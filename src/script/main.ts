import { useParserConst } from './parser/constParser';
import { parseApt } from './parser/aptParser';
import { getFiles } from './parser/utilities';

const fileInput = <HTMLInputElement>(
  document.getElementById('file-reader__input')
);

fileInput.addEventListener(
  'change',
  async function (event: Event) {
    const target = <HTMLInputElement>event.target;

    const [aptFile, constFile] = getFiles(target.files);

    const constData = await constFile
      .arrayBuffer()
      .then((arrayBuffer: ArrayBuffer) => {
        const parserConst = useParserConst(arrayBuffer);
        return parserConst.parseConst();
      });
    console.log('const', constData);

    const aptData = await aptFile
      .arrayBuffer()
      .then((arrayBuffer: ArrayBuffer) => {
        const index = constData.aptOffset;
        parseApt(arrayBuffer, index);
        // parse apt
      });
  },
  false
);
