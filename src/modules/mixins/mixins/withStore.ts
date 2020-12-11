import { LightningElement } from 'lwc';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import { withState, WithState } from './withState';

type Data<T = unknown> = Record<string, T>;
const Store = new BehaviorSubject<{ [key in symbol]: Data }>(Object.freeze({}));

export const setStore: unique symbol = Symbol('setStore');
export const getStore: unique symbol = Symbol('getStore');
export const observeStore: unique symbol = Symbol('observeStore');
export const updateStore: unique symbol = Symbol('updateStore');

export interface WithStore extends WithState {
    [setStore]<T>(key: symbol, newValue: Data<T>): void;
    [getStore]<T>(key: symbol): Data<T>;
    [observeStore]<T>(key: symbol): Observable<Data<T>>;
    [updateStore]<T>(key: symbol, partial: Partial<Data<T>>): void;
}

export const withStore = dedupeMixin(
    (superclass: typeof LightningElement): typeof superclass & WithStore => {
        class Dynamic extends withState(superclass) {
            private readonly disconnected$ = new Subject<void>();

            [setStore]<T>(key: symbol, newValue: Data<T> = {}): void {
                Store.next(
                    Object.freeze({
                        ...Store.value,
                        [key]: newValue,
                    })
                );
            }

            [getStore]<T>(key: symbol): Data<T> {
                // @ts-ignore
                return Store.value[key];
            }

            [observeStore]<T>(key: symbol): Observable<Data<T>> {
                return Store.pipe(
                    pluck(key),
                    // @ts-ignore
                    distinctUntilChanged(isEqual),
                    takeUntil(this.disconnected$)
                );
            }

            [updateStore]<T>(key: symbol, partial: Partial<Data<T>>): void {
                const oldVal: Data<T> = this[getStore](key);

                Store.next(
                    Object.freeze({
                        ...Store.value,
                        [key]: merge(oldVal, partial),
                    })
                );
            }

            disconnectedCallback(): void {
                this.disconnected$.next();
                super.disconnectedCallback();
            }
        }

        return Dynamic;
    }
);
