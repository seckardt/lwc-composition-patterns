import { LightningElement } from 'lwc';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import merge from 'deepmerge';
import { Initial, state, updateState, withState, WithState } from './withState';

const INITIAL = {
    [state]: {
        hover: false,
    },
};

export const withHover = dedupeMixin(
    (superclass: typeof LightningElement): typeof superclass & WithState => {
        class Dynamic extends withState(superclass) {
            constructor(initial: Initial = {}) {
                super(merge(initial, INITIAL));
            }

            connectedCallback(): void {
                // @ts-ignore
                super.connectedCallback && super.connectedCallback();

                // @ts-ignore
                this.addEventListener('mouseenter', (): void =>
                    this[updateState]({
                        hover: true,
                    })
                );

                // @ts-ignore
                this.addEventListener('mouseleave', (): void =>
                    this[updateState]({
                        hover: false,
                    })
                );
            }
        }

        return Dynamic;
    }
);
