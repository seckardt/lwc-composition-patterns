import { withTemplate, withTimer, withWrapper } from '../hooks';
import html from './component.html';

export default class Component extends withTimer(
    withWrapper(withTemplate(html))
) {}
