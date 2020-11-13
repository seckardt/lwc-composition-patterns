import merge from 'deepmerge';
import Base, { Initial, state, updateState } from 'c/base';

const INITIAL = {
    [state]: {
        hover: false,
    },
};

export function HoverMixin(BaseElement: typeof Base): typeof BaseElement {
    return class Hover extends BaseElement {
        constructor(initial: Initial = {}) {
            super(merge(initial, INITIAL));
        }

        connectedCallback(): void {
            // @ts-ignore
            super.connectedCallback && super.connectedCallback();

            // @ts-ignore
            this.addEventListener('mouseenter', (): void =>
                this[updateState]({
                    hover: true,
                })
            );

            // @ts-ignore
            this.addEventListener('mouseleave', (): void =>
                this[updateState]({
                    hover: false,
                })
            );
        }
    };
}
