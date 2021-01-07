import { LightningElement, track } from 'lwc';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { withState } from 'mixins/mixins';
import withWrapperTemplate from './withWrapper.html';

export const withWrapper = dedupeMixin(
    (superclass: typeof LightningElement): typeof superclass => {
        const Ctor = withState(superclass);
        class Dynamic extends superclass {
            @track
            ctor: typeof Ctor = Ctor;

            render(): typeof withWrapperTemplate {
                return withWrapperTemplate;
            }
        }

        return Dynamic;
    }
);
