import { useParserConst } from './constParser/useParserConst';
import { useParserApt } from './aptParser/useParserApt';
import { getFiles } from './utilities/utilities';
import { playground } from './struct/playground/playground';

const fileInput = <HTMLInputElement>document.getElementById('file-reader__input');

// todo: remove and add proper testing - just for quick manual testing purpose
playground();

fileInput.addEventListener(
  'change',
  async function (event: Event) {
    const target = <HTMLInputElement>event.target;

    const [aptFile, constFile] = getFiles(target.files);

    const constData = await constFile.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
      const parserConst = useParserConst(arrayBuffer);
      return parserConst.parseConst();
    });
    console.log('const', constData);

    const aptData = await aptFile.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
      const parserApt = useParserApt(arrayBuffer);
      return parserApt.parseApt(constData.aptOffset);
    });
    console.log('apt', aptData);
  },
  false,
);
