import { api } from 'lwc';
import type { Constructor } from '../types/main';
import type { State } from '../types/state';
import { defaultState, setState } from '../types/state';
import Base from '../base/base';

export default function AriaRoleMixin(
    BaseElement: Constructor<Base>
): Constructor<Base> {
    class AriaRole extends BaseElement {
        private _role: string | null = null;

        @api
        set role(value: string | null) {
            this._role = typeof value === 'string' ? value : null;
            this[setState]({ ariaRole: this._role });
        }

        get role(): string | null {
            return this._role;
        }

        get [defaultState](): State {
            const defState = super[defaultState] || {};
            return {
                ...defState,
                ariaRole: this._role,
            };
        }
    }

    return AriaRole;
}
