import {generateObj} from './data.js';
import {generatePictures} from './miniature.js';
import {openBigPicture} from './picture-modal.js';
import './upload-picture.js';

const blockMiniatures = generateObj(25);
generatePictures (blockMiniatures);
openBigPicture(blockMiniatures);


