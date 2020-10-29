import { LightningElement } from 'lwc';
import type { Template } from 'types/vnode';

export function withTemplate(template: Template): typeof LightningElement {
    return class Dynamic extends LightningElement {
        render(): typeof template {
            return template;
        }
    };
}
