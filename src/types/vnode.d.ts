// eslint-disable-next-line no-use-before-define
export declare type VNodes = Array<VNode | null>;

export declare interface VNode {
    sel: string | undefined;
    children: VNodes | undefined;
    elm: Node | undefined;
    parentElm?: Element;
    text: string | undefined;
    key: string | number | undefined;
}

export declare type Template = (
    api: unknown,
    cmp: unknown,
    slotSet: unknown,
    cache: unknown
) => VNodes;
