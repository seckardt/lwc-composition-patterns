import type { Template } from 'types/vnode';
import Base from 'c/base';

export function withTemplate(template: Template): typeof Base {
    return class extends Base {
        render(): typeof template {
            return template;
        }
    };
}
