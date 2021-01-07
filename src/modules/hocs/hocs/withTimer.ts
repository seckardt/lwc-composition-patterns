import { LightningElement, track, wire } from 'lwc';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { withState } from 'mixins/mixins';
// eslint-disable-next-line @lwc/lwc/no-unknown-wire-adapters
import getTime from '../wires/getTime';
import withTimerTemplate from './withTimer.html';

export const withTimer = dedupeMixin(
    (superclass: typeof LightningElement): typeof superclass => {
        const Ctor = withState(superclass);
        class Dynamic extends superclass {
            @track
            ctor: typeof Ctor = Ctor;

            @wire(getTime)
            time: string | null = null;

            render(): typeof withTimerTemplate {
                return withTimerTemplate;
            }
        }

        return Dynamic;
    }
);
