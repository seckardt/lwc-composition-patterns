import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import Base from 'c/base';

type Data<T = unknown> = Record<string, T>;
const Store = new BehaviorSubject<{ [key in symbol]: Data }>(Object.freeze({}));

export const setStore: unique symbol = Symbol('setStore');
export const getStore: unique symbol = Symbol('getStore');
export const observeStore: unique symbol = Symbol('observeStore');
export const updateStore: unique symbol = Symbol('updateStore');

export function withStore(BaseElement: typeof Base): typeof Base {
    return class StoreElement extends BaseElement {
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
    };
}
