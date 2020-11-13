import '@lwc/synthetic-shadow';

import { createElement } from 'lwc';
import App from 'c/app';

const app = createElement('c-app', { is: App });
// eslint-disable-next-line @lwc/lwc/no-document-query
const rootNode = document.querySelector('#main');
rootNode && rootNode.appendChild(app);
