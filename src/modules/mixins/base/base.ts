import { LightningElement } from 'lwc';

export default class Base extends LightningElement {
    private _state: { [key: string]: unknown } = {};

    constructor() {
        super();
        this.setState(this.defaultState);
    }

    get defaultState(): { [key: string]: unknown } {
        return super.defaultState || {};
    }

    get state(): string {
        return JSON.stringify(this._state, null, 2);
    }

    setState(statePartial: Partial<{ [key: string]: unknown }> = {}): void {
        this._state = Object.freeze({ ...this._state, ...statePartial });
    }
}
