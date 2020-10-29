import Base from '../base/base';

export default function HoverMixin(
    BaseElement: new (...args: unknown[]) => Base
): new (...args: unknown[]) => Base {
    return class Hover extends BaseElement {
        get defaultState(): { [key: string]: unknown } {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const defState = super.defaultState || {};
            return {
                ...defState,
                hover: false,
            };
        }

        connectedCallback(): void {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            super.connectedCallback && super.connectedCallback();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.addEventListener('mouseenter', (): void =>
                this.setState({
                    hover: true,
                })
            );

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.addEventListener('mouseleave', (): void =>
                this.setState({
                    hover: false,
                })
            );
        }
    };
}
