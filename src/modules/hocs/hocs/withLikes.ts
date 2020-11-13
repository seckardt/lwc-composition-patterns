import { track } from 'lwc';
import isEqual from 'lodash.isequal';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import merge from 'deepmerge';
import Base, { getState, Initial, state, updateState } from 'c/base';
import { observeStore, updateStore, withStore } from 'mixins/mixins';
import withLikesTemplate from './withLikes.html';

const INITIAL = {
    [state]: {
        isLiked: false,
        countLikes: 0,
        countShares: 5,
        countViews: 7,
    },
};

export interface Likes {
    count: number;
    isLiked: boolean;
}

export const ID = Symbol('likes');

export function withLikes(
    stateKey: string
): (BaseElement: typeof Base) => typeof BaseElement & typeof withStore {
    return function factory(
        BaseElement: typeof Base
    ): typeof BaseElement & typeof withStore {
        class Dynamic extends withStore(BaseElement) {
            @track
            ctor: unknown = BaseElement;

            constructor(initial: Initial = {}) {
                super(merge(initial, INITIAL));
            }

            handleClickLike(): void {
                const count: number = this[getState]('countLikes');
                const uid = this[getState]<string>(stateKey);

                this[updateStore](ID, {
                    [uid]: {
                        isLiked: true,
                        count: count + 1,
                    },
                });
            }

            handleClickDislike(): void {
                const count: number = this[getState]('countLikes');
                const uid = this[getState]<string>(stateKey);
                this[updateStore](ID, {
                    [uid]: {
                        isLiked: false,
                        count: count - 1,
                    },
                });
            }

            render(): typeof withLikesTemplate {
                return withLikesTemplate;
            }

            connectedCallback(): void {
                this[observeStore](ID)
                    .pipe(
                        filter((newState: Record<string, Likes>): boolean => {
                            const uid = this[getState]<string>(stateKey);
                            return typeof uid === 'string' && !!newState;
                        }),
                        map(
                            (newState: Record<string, Likes>): Likes => {
                                const uid = this[getState]<string>(stateKey);
                                return newState[uid];
                            }
                        ),
                        distinctUntilChanged(isEqual)
                    )
                    .subscribe((newState: Likes) => {
                        const { isLiked, count: countLikes } = newState;
                        this[updateState]({ isLiked, countLikes });
                    });
            }
        }

        return Dynamic;
    };
}
