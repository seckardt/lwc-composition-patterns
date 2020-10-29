import { api } from 'lwc';
import Base from '../base/base';

export default function AriaRoleMixin(
    BaseElement: new (...args: unknown[]) => Base
): new (...args: unknown[]) => Base {
    class AriaRole extends BaseElement {
        private _role: string | null = null;

        get defaultState(): { [key: string]: unknown } {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const defState = super.defaultState || {};
            return {
                ...defState,
                ariaRole: this._role,
            };
        }

        @api
        set role(value: string | null) {
            this._role = typeof value === 'string' ? value : null;
            this.setState({ ariaRole: this._role });
        }

        get role(): string | null {
            return this._role;
        }
    }

    return AriaRole;
}
