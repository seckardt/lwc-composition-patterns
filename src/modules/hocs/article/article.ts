import { api } from 'lwc';
import {
    coerceNumberProperty,
    coerceStringProperty,
    formatCurrency,
    formatDate,
} from 'c/utils';
import { withLikes, withTemplate } from 'hocs/hocs';
import { getState, state, updateState } from 'mixins/mixins';
import html from './article.html';

const DEFAULT_CURRENCY = 'USD';
const INITIAL = {
    [state]: {
        companyName: null,
        accountName: null,
        accountValue: null,
        accountValueFormatted: null,
        accountCurrency: DEFAULT_CURRENCY,
        accountCloseDate: null,
    },
};

const withLikesStateFul = withLikes('companyName');

export default class Article extends withLikesStateFul(withTemplate(html)) {
    _accountCloseDate: Date | null = null;

    constructor() {
        super(INITIAL);
    }

    @api
    set companyName(value: string) {
        const companyName = coerceStringProperty(value, '');
        // @ts-ignore
        this[updateState]({ uid: companyName, companyName });
    }

    get companyName(): string {
        // @ts-ignore
        return this[getState]('companyName');
    }

    @api
    set accountName(value: string) {
        // @ts-ignore
        this[updateState]({ accountName: coerceStringProperty(value, '') });
    }

    get accountName(): string {
        // @ts-ignore
        return this[getState]('accountName');
    }

    @api
    set accountValue(value: number) {
        coerceNumberProperty(value, 0);
        const accountValue = coerceNumberProperty(value, 0);
        // @ts-ignore
        this[updateState]({
            accountValue,
            accountValueFormatted: formatCurrency(
                accountValue,
                this.accountCurrency
            ),
        });
    }

    get accountValue(): number {
        // @ts-ignore
        return this[getState]('accountValue');
    }

    @api
    set accountCurrency(value: string) {
        const currency = coerceStringProperty(value, DEFAULT_CURRENCY);
        // @ts-ignore
        this[updateState]({
            accountCurrency: currency,
            accountValueFormatted: formatCurrency(this.accountValue, currency),
        });
    }

    get accountCurrency(): string {
        // @ts-ignore
        return this[getState]('accountCurrency');
    }

    @api
    set accountCloseDate(value: Date | null) {
        value = typeof value === 'string' ? new Date(value) : value;
        this._accountCloseDate =
            value instanceof Date && !isNaN(value.valueOf()) ? value : null;
        // @ts-ignore
        this[updateState]({
            accountCloseDate: formatDate(this._accountCloseDate),
        });
    }

    get accountCloseDate(): Date | null {
        return this._accountCloseDate;
    }
}
