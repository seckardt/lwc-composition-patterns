import { createElement } from 'lwc';
import Outlet from '../outlet';
import Partial from './partial.html';

describe('partials-outlet', () => {
    let element: Outlet & HTMLElement;

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element = createElement('partials-outlet', {
            is: Outlet,
        });
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render a template outlet using a partial and some context', () => {
        element.partial = Partial;
        element.context = { name: 'World' };

        document.body.appendChild(element);

        const { textContent = '' } = element.shadowRoot || {};
        expect(textContent).toBe('Hello World!');
    });

    it('should not fail rendering if no partial is given', () => {
        document.body.appendChild(element);

        const { textContent = '' } = element.shadowRoot || {};
        expect(textContent).toBe('');
    });

    it('should not fail rendering if no context is given', () => {
        element.partial = Partial;

        document.body.appendChild(element);

        const { textContent = '' } = element.shadowRoot || {};
        expect(textContent).toBe('Hello !');
    });
});
