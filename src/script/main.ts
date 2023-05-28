import { useParserConst } from './parser/useParserConst';
import { useParserApt } from './parser/useParserApt';
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
        const parserApt = useParserApt(arrayBuffer);
        return parserApt.parseApt(constData.aptOffset);
      });
    console.log('apt', aptData);
  },
  false
);
