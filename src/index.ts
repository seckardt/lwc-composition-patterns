import { createElement } from 'lwc';
import XApp from 'x/app';

const app = createElement('x-app', { is: XApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
const rootNode = document.querySelector('#main');
rootNode && rootNode.appendChild(app);
