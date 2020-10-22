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
    callerMessage: string;
    handleClick(event: MouseEvent): void;
};

export default class Container extends LightningElement {
    private calls: { [key: string]: number } = {};

    private messageTimeout: number | undefined;

    readonly pairs = CALLERS.map(
        (caller: string, idx: number) => `${caller} & ${CALLEES[idx]}`
    );

    readonly partial: Template = partial;

    @track
    partialContext: Context = {
        callerName: CALLERS[0],
        calleeName: CALLEES[0],
        callerCalls: 0,
        calleeCalls: 0,
        callerMessage: '',
        handleClick: (event: MouseEvent) => this.handleClickCallee(event),
    };

    disconnectCallback(): void {
        this.messageTimeout && window.clearTimeout(this.messageTimeout);
    }

    handleSelect(event: Event): void {
        const selectEl = <HTMLSelectElement>event.currentTarget;
        const idx = parseInt(selectEl.value, 10);
        const caller = CALLERS[idx];
        const callee = CALLEES[idx];
        this.updateContext({
            callerName: caller,
            calleeName: callee,
            callerMessage: '',
            callerCalls: this.calls[caller] || 0,
            calleeCalls: this.calls[callee] || 0,
        });
    }

    handleClickCaller(event: MouseEvent): void {
        this.handleClick(event, 'callerCalls');
    }

    handleClickCallee(event: MouseEvent): void {
        this.handleClick(event, 'calleeCalls');
    }

    handleMessage(event: MouseEvent): void {
        const buttonEl = <HTMLButtonElement>event.currentTarget;
        const textareaEl = <HTMLTextAreaElement>(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.template.querySelector('.caller-message textarea')
        );
        this.updateContext({ callerMessage: textareaEl.value });
        textareaEl.value = '';
        textareaEl.disabled = true;
        buttonEl.disabled = true;

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.messageTimeout = window.setTimeout(() => {
            this.updateContext({ callerMessage: '' });
            textareaEl.disabled = false;
            buttonEl.disabled = false;
        }, 5000);
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
