import { loadHeaderFooter } from './utils.mjs';
import './newsletter.js';
import Alert from './Alert.js';

loadHeaderFooter().catch((error) => console.error(error));

const alert = new Alert();
alert.init();