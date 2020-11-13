import { track } from 'lwc';
import Base from 'c/base';
import withWrapperTemplate from './withWrapper.html';

export function withWrapper(BaseElement: typeof Base): typeof BaseElement {
    class Dynamic extends BaseElement {
        @track
        ctor: unknown = BaseElement;

        render(): typeof withWrapperTemplate {
            return withWrapperTemplate;
        }
    }

    return Dynamic;
}
