import { LightningElement } from 'lwc';
import type { State } from '../types/state';
import { defaultState, setState, state } from '../types/state';

export default class Base extends LightningElement {
    private _state = {};

    constructor() {
        super();
        this[setState](this[defaultState]);
    }

    get [defaultState](): State {
        return super[defaultState] || {};
    }

    get [state](): State {
        return this._state;
    }

    get state(): string {
        return JSON.stringify(this[state], null, 2);
    }

    [setState](statePartial: Partial<State> = {}): void {
        this._state = Object.freeze({ ...this._state, ...statePartial });
    }
}
