import { LightningElement, track } from 'lwc';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import merge from 'deepmerge';
import isEqual from 'lodash.isequal';
import {
    getState,
    Initial,
    observeStore,
    state,
    updateState,
    updateStore,
    withState,
    withStore,
    WithStore,
} from 'mixins/mixins';
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

export interface WithLikes extends WithStore {
    handleClickLike(): void;
    handleClickDislike(): void;
}

export function withLikes(
    stateKey: string
): (superclass: typeof LightningElement) => typeof superclass & WithLikes {
    return dedupeMixin(
        (
            superclass: typeof LightningElement & WithStore
        ): typeof superclass & WithLikes => {
            const Ctor = withState(superclass);
            class Dynamic extends withStore(superclass) {
                @track
                ctor: typeof Ctor = Ctor;

                constructor(initial: Initial = {}) {
                    super(merge(initial, INITIAL));
                }

                handleClickLike(): void {
                    // @ts-ignore
                    const count: number = this[getState]('countLikes');

                    // @ts-ignore
                    const uid = this[getState]<string>(stateKey);

                    // @ts-ignore
                    this[updateStore](ID, {
                        [uid]: {
                            isLiked: true,
                            count: count + 1,
                        },
                    });
                }

                handleClickDislike(): void {
                    // @ts-ignore
                    const count: number = this[getState]('countLikes');

                    // @ts-ignore
                    const uid = this[getState]<string>(stateKey);

                    // @ts-ignore
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
                    // @ts-ignore
                    this[observeStore](ID)
                        .pipe(
                            filter(
                                (newState: Record<string, Likes>): boolean => {
                                    // @ts-ignore
                                    const uid = this[getState]<string>(
                                        stateKey
                                    );
                                    return (
                                        typeof uid === 'string' && !!newState
                                    );
                                }
                            ),
                            map(
                                (newState: Record<string, Likes>): Likes => {
                                    // @ts-ignore
                                    const uid = this[getState]<string>(
                                        stateKey
                                    );
                                    return newState[uid];
                                }
                            ),
                            distinctUntilChanged(isEqual)
                        )
                        .subscribe((newState: Likes) => {
                            const { isLiked, count: countLikes } = newState;
                            // @ts-ignore
                            this[updateState]({ isLiked, countLikes });
                        });
                }
            }

            return Dynamic;
        }
    );
}
