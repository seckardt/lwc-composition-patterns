import type { Constructor } from '../types/main';
import type { State } from '../types/state';
import { mouseenter, mouseleave } from '../types/events';
import { defaultState, setState } from '../types/state';
import Base from '../base/base';

export default function HoverMixin(
    BaseElement: Constructor<Base>
): Constructor<Base> {
    return class Hover extends BaseElement {
        constructor() {
            super();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.addEventListener('mouseenter', (event): void =>
                this[mouseenter](event)
            );

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.addEventListener('mouseleave', (event): void =>
                this[mouseleave](event)
            );
        }

        get [defaultState](): State {
            const defState = super[defaultState] || {};
            return {
                ...defState,
                hover: false,
            };
        }

        [mouseenter](event: MouseEvent): void {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            super[mouseenter] && super[mouseenter](event);

            this[setState]({
                hover: true,
            });
        }

        [mouseleave](event: MouseEvent): void {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            super[mouseleave] && super[mouseleave](event);

            this[setState]({
                hover: false,
            });
        }
    };
}
