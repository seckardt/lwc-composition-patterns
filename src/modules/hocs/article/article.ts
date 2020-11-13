import { getState, state, updateState } from 'c/base';
import { api } from 'lwc';
import {
    coerceNumberProperty,
    coerceStringProperty,
    formatCurrency,
    formatDate,
} from 'c/utils';
import { withLikes, withTemplate } from 'hocs/hocs';
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
        this[updateState]({ uid: companyName, companyName });
    }

    get companyName(): string {
        return this[getState]('companyName');
    }

    @api
    set accountName(value: string) {
        this[updateState]({ accountName: coerceStringProperty(value, '') });
    }

    get accountName(): string {
        return this[getState]('accountName');
    }

    @api
    set accountValue(value: number) {
        coerceNumberProperty(value, 0);
        const accountValue = coerceNumberProperty(value, 0);
        this[updateState]({
            accountValue,
            accountValueFormatted: formatCurrency(
                accountValue,
                this.accountCurrency
            ),
        });
    }

    get accountValue(): number {
        return this[getState]('accountValue');
    }

    @api
    set accountCurrency(value: string) {
        const currency = coerceStringProperty(value, DEFAULT_CURRENCY);
        this[updateState]({
            accountCurrency: currency,
            accountValueFormatted: formatCurrency(this.accountValue, currency),
        });
    }

    get accountCurrency(): string {
        return this[getState]('accountCurrency');
    }

    @api
    set accountCloseDate(value: Date | null) {
        value = typeof value === 'string' ? new Date(value) : value;
        this._accountCloseDate =
            value instanceof Date && !isNaN(value.valueOf()) ? value : null;
        this[updateState]({
            accountCloseDate: formatDate(this._accountCloseDate),
        });
    }

    get accountCloseDate(): Date | null {
        return this._accountCloseDate;
    }
}
