import { LightningElement, track } from 'lwc';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { withState, WithState } from 'mixins/mixins';
import withWrapperTemplate from './withWrapper.html';

export const withWrapper = dedupeMixin(
    (superclass: typeof LightningElement): typeof superclass & WithState => {
        const Ctor = withState(superclass);
        class Dynamic extends Ctor {
            @track
            ctor: typeof Ctor = Ctor;

            render(): typeof withWrapperTemplate {
                return withWrapperTemplate;
            }
        }

        return Dynamic;
    }
);
