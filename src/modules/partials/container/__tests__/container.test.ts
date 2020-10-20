import { querySelector } from 'kagekiri';
import { createElement } from 'lwc';
import Container from '../container';

describe('partials-container', () => {
    let element: Container & HTMLElement;

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element = createElement('partials-container', {
            is: Container,
        });
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should render a container with a template outlet', async () => {
        document.body.appendChild(element);
        await Promise.resolve();

        const partialEl = <HTMLElement>querySelector('.partial');
        const greetingEl = partialEl.querySelector('.greeting');
        const { textContent = '' } = greetingEl || {};
        expect(textContent).toBe(
            "Hello Homer, my name is Marge. Guess what, I'm calling you from within a partial!"
        );

        const callerCallsEl = <HTMLDivElement>(
            partialEl.querySelector('.calls-caller')
        );
        const calleeCallsEl = <HTMLDivElement>(
            partialEl.querySelector('.calls-callee')
        );
        expect(callerCallsEl.textContent).toBe(
            'You already called me 0 time(s).'
        );
        expect(calleeCallsEl.textContent).toBe(
            'I already called you 0 time(s).'
        );

        // Dispatch click events
        const anchorCalleeEl = <HTMLAnchorElement>(
            partialEl.querySelector('div.callback a')
        );
        const anchorCallerEl = <HTMLAnchorElement>querySelector('.container a');
        anchorCallerEl.dispatchEvent(new MouseEvent('click'));
        await Promise.resolve();

        expect(callerCallsEl.textContent).toBe(
            'You already called me 1 time(s).'
        );
        expect(calleeCallsEl.textContent).toBe(
            'I already called you 0 time(s).'
        );

        anchorCalleeEl.dispatchEvent(new MouseEvent('click'));
        await Promise.resolve();

        expect(callerCallsEl.textContent).toBe(
            'You already called me 1 time(s).'
        );
        expect(calleeCallsEl.textContent).toBe(
            'I already called you 1 time(s).'
        );
    });
});
