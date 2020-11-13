import { api, LightningElement, track } from 'lwc';
import { Subject } from 'rxjs';

type SymbolMap<T> = {
    [key in string | number | symbol]: T;
};
export type State = Record<string, unknown>; // TODO: Can further be defined/types
export type Initial = SymbolMap<Record<string, unknown> | null>;

export const state: unique symbol = Symbol('state');
export const setState: unique symbol = Symbol('setState');
export const getState: unique symbol = Symbol('getState');
export const updateState: unique symbol = Symbol('updateState');

function get<T extends Initial, K extends keyof T>(
    object: T,
    key: K
): Record<string, unknown> | null {
    const val =
        typeof object === 'object' && object != null
            ? ((object[key] as unknown) as Record<string, unknown>)
            : null;
    return typeof val === 'object' && val != null ? val : null;
}

export default class Base extends LightningElement {
    @track
    _state: State = {};

    protected readonly disconnected$ = new Subject<void>();

    constructor(initial: Initial = {}) {
        super();
        const initialState = get(initial, state);
        if (initialState) {
            this[setState](initialState);
        }
    }

    @api
    set state(value: State) {
        this[setState](value);
    }

    get state(): State {
        return this._state;
    }

    [setState](newState: State = {}): void {
        this._state = Object.freeze({ ...newState });
    }

    [getState]<T>(key: string): T {
        return this._state[key] as T;
    }

    [updateState](statePartial: Partial<State> = {}): void {
        this._state = Object.freeze({
            ...this._state,
            ...statePartial,
        });
    }

    disconnectedCallback(): void {
        this.disconnected$.next();
        super.disconnectedCallback();
    }
}
