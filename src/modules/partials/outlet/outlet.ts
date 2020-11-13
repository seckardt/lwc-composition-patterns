import { LightningElement, api } from 'lwc';
import type { Template } from 'types/vnode';
import defaultTemplate from './outlet.html';

type Context = { [key: string]: unknown };

export default class Outlet extends LightningElement {
    private _context: Context = {};

    private _partial: Template = defaultTemplate;

    @api
    set partial(value: Template) {
        this._partial = typeof value === 'function' ? value : defaultTemplate;
    }

    get partial(): Template {
        return this._partial;
    }

    @api
    set context(value: Context) {
        this._context = value != null && typeof value === 'object' ? value : {};
    }

    get context(): Context {
        return this._context;
    }

    render(): Template | undefined {
        // Thanks to some silly template sanity check (`isTemplateRegistered`) in the LWC engine we cannot
        // simply provide a delegate template, but rather have to patch the template's `call` function to
        // pass the correct context data to the actual rendering execution.
        // @see https://github.com/salesforce/lwc/blob/master/packages/@lwc/engine-core/src/framework/secure-template.ts
        const tpl = this.partial || defaultTemplate;
        // @ts-ignore
        tpl.call = (
            thisArg: unknown,
            tplApi: unknown,
            cmp: unknown,
            slotSet: unknown,
            cache: unknown
        ) => tpl(tplApi, this.context, slotSet, cache);
        return tpl;
    }
}
