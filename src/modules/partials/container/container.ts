import { LightningElement, track } from 'lwc';
import type { Template } from 'types/vnode';
import partial from './partial.html';

const CALLERS = ['Homer', 'John', 'Alice', 'Siegfried', 'Romeo'];
const CALLEES = ['Marge', 'Jane', 'Bob', 'Roy', 'Juliet'];

type Context = {
    callerName: string;
    calleeName: string;
    callerCalls: number;
    calleeCalls: number;
    handleClick(event: MouseEvent): void;
};

export default class Container extends LightningElement {
    private interval: number | undefined;

    private calls: { [key: string]: number } = {};

    readonly partial: Template = partial;

    @track
    partialContext: Context = {
        callerName: CALLERS[0],
        calleeName: CALLEES[0],
        callerCalls: 0,
        calleeCalls: 0,
        handleClick: (event: MouseEvent) => this.handleClickCallee(event),
    };

    connectedCallback(): void {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.interval = window.setInterval(() => {
            const random = Math.floor(Math.random() * CALLERS.length);
            const caller = CALLERS[random];
            const callee = CALLEES[random];
            this.updateContext({
                callerName: caller,
                calleeName: callee,
                callerCalls: this.calls[caller] || 0,
                calleeCalls: this.calls[callee] || 0,
            });
        }, 2500);
    }

    disconnectedCallback(): void {
        this.interval && window.clearInterval(this.interval);
    }

    handleClickCaller(event: MouseEvent): void {
        this.handleClick(event, 'callerCalls');
    }

    handleClickCallee(event: MouseEvent): void {
        this.handleClick(event, 'calleeCalls');
    }

    private handleClick(
        event: MouseEvent,
        key: 'callerCalls' | 'calleeCalls'
    ): void {
        const anchorEl = <HTMLAnchorElement>event.currentTarget;
        const { dataset } = anchorEl;
        const { value = '' } = dataset;
        const calls = this.calls[value] ? this.calls[value] + 1 : 1;
        this.calls[value] = calls;
        this.updateContext({ [key]: calls });
    }

    private updateContext(context: Partial<Context>): void {
        this.partialContext = { ...this.partialContext, ...context };
    }
}
