import { api, LightningElement } from 'lwc';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import merge from 'deepmerge';
import { coerceStringProperty } from 'c/utils';
import {
    getState,
    Initial,
    state,
    updateState,
    withState,
    WithState,
} from './withState';

const DEFAULT_ROLE = 'article';
const INITIAL = {
    [state]: {
        ariaRole: DEFAULT_ROLE,
    },
};

export interface WithAriaRole extends WithState {
    role: string;
}

export const withAriaRole = dedupeMixin(
    (superclass: typeof LightningElement): typeof superclass & WithAriaRole => {
        class Dynamic extends withState(superclass) {
            constructor(initial: Initial = {}) {
                super(merge(initial, INITIAL));
            }

            @api
            set role(value: string) {
                this[updateState]({
                    ariaRole: coerceStringProperty(value, DEFAULT_ROLE),
                });
            }

            get role(): string {
                return this[getState]('ariaRole');
            }
        }

        return Dynamic;
    }
);
