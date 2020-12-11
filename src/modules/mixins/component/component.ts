import Base from 'c/base';
import { withAriaRole, withHover } from 'mixins/mixins';

export default class Component extends withAriaRole(withHover(Base)) {
    get stateJson(): string {
        return JSON.stringify(this.state, null, 2);
    }
}
