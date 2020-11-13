import { state } from 'c/base';
import { setStore, withStore } from 'mixins/mixins';
import type { Likes } from 'hocs/hocs';
import { ID as LikesId, withTemplate, withTimer, withWrapper } from 'hocs/hocs';
import html from './component.html';

const ITEMS = [
    {
        companyName: 'Company One',
        accountName: 'Anypoint Connectors',
        accountValue: 500000,
        currency: 'USD',
        closeDate: new Date('9/30/2015'),
    },
    {
        companyName: 'Company Two',
        accountName: 'Cloudhub',
        accountValue: 185000,
        currency: 'EUR',
        closeDate: new Date('12/15/2015'),
    },
    {
        companyName: 'Company Three',
        accountName: 'Japanese Widgets',
        accountValue: 35000,
        currency: 'JPY',
        closeDate: new Date('10/12/2015'),
    },
    {
        companyName: 'Company One',
        accountName: 'Database Droppers',
        accountValue: 50000,
        currency: 'USD',
        closeDate: new Date('10/30/2016'),
    },
    {
        companyName: 'Company Two',
        accountName: 'Trust Hero',
        accountValue: 615000,
        currency: 'EUR',
        closeDate: new Date('6/15/2016'),
    },
    {
        companyName: 'Company Three',
        accountName: 'Foo Fighters',
        accountValue: 735000,
        currency: 'JPY',
        closeDate: new Date('1/1/2016'),
    },
];

const INITIAL = {
    [state]: {
        hasItems: true,
        items: ITEMS,
    },
};

export default class Component extends withStore(
    withTimer(withWrapper(withTemplate(html)))
) {
    constructor() {
        super(INITIAL);
    }

    connectedCallback(): void {
        // Init likes store
        const likes: Record<string, number> = {
            'Company One': 20,
            'Company Two': 75,
            'Company Three': 159,
        };
        const data = Object.keys(likes).reduce(
            (acc: Record<string, Likes>, key: string) => {
                acc[key] = { count: likes[key], isLiked: false };
                return acc;
            },
            {}
        );

        // @ts-ignore
        this[setStore](LikesId, data);
    }
}
