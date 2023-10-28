import {generateObj} from './data.mjs';
import {generatePictures} from './miniature.mjs';
const blockMiniatures = generateObj(2);

console.log(generatePictures (blockMiniatures));

