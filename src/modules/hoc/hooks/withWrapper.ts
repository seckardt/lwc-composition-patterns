import { LightningElement, track } from 'lwc';
import withWrapperTemplate from './withWrapper.html';

export function withWrapper(
    BaseElement: typeof LightningElement
): typeof LightningElement {
    class Dynamic extends LightningElement {
        @track
        ctor: unknown = BaseElement;

        render(): typeof withWrapperTemplate {
            return withWrapperTemplate;
        }
    }

    return Dynamic;
}
