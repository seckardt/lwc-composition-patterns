import { api } from 'lwc';
import merge from 'deepmerge';
import Base, { Initial, getState, state, updateState } from 'c/base';
import { coerceStringProperty } from 'c/utils';

const DEFAULT_ROLE = 'article';
const INITIAL = {
    [state]: {
        ariaRole: DEFAULT_ROLE,
    },
};

export function AriaRoleMixin(BaseElement: typeof Base): typeof BaseElement {
    class AriaRole extends BaseElement {
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

    return AriaRole;
}
