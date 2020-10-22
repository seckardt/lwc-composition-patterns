export type State = { [key: string]: unknown };
export const state = Symbol('state');
export const defaultState = Symbol('defaultState');
export const setState = Symbol('setState');
