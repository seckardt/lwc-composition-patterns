import { track, wire } from 'lwc';
import Base from 'c/base';
// eslint-disable-next-line @lwc/lwc/no-unknown-wire-adapters
import getTime from '../wires/getTime';
import withTimerTemplate from './withTimer.html';

export function withTimer(BaseElement: typeof Base): typeof BaseElement {
    class Dynamic extends BaseElement {
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
