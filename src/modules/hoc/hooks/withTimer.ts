import { LightningElement, track, wire } from 'lwc';
// eslint-disable-next-line @lwc/lwc/no-unknown-wire-adapters
import getTime from '../wires/getTime';
import withTimerTemplate from './withTimer.html';

export function withTimer(
    BaseElement: typeof LightningElement
): typeof LightningElement {
    class Dynamic extends LightningElement {
        @track
        ctor: unknown = BaseElement;

        @wire(getTime)
        time: string | null = null;

        render(): typeof withTimerTemplate {
            return withTimerTemplate;
        }
    }

    return Dynamic;
}
