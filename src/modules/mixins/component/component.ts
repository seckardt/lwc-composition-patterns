import Base from '../base/base';
import AriaRoleMixin from '../mixins/aria-role.mixin';
import HoverMixin from '../mixins/hover.mixin';

export default class Component extends AriaRoleMixin(HoverMixin(Base)) {}
