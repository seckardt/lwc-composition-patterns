import Base from 'c/base';
import { AriaRoleMixin, HoverMixin } from 'mixins/mixins';

export default class Component extends AriaRoleMixin(HoverMixin(Base)) {
    get stateJson(): string {
        return JSON.stringify(this._state, null, 2);
    }
}
