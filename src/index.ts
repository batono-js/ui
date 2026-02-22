export * from './types/results.js'
export * from './types/types.js'
export * from './definitions/index.js';
export {NBSP} from "./utils/utils.js";

export type {HeaderOptions} from "./definitions/Header.js";
export type {ActionOptions} from "./definitions/ActionButton.js";
export type {HttpMethod} from "./actions/RequestAction.js";

import {
  ActionButton,
  ActionButtons,
  type ActionOptions,
  Field,
  Header,
  type HeaderOptions,
  Inline,
  Link,
  Meta,
  Note,
  Row,
  Rows,
  Section,
  Stat,
  Text
} from "./definitions/index.js";
import {type HttpMethod, RequestAction} from "./actions/RequestAction.js";
import {ModalAction} from "./actions/ModalAction.js";
import type {RenderVariant} from "./types/types.js";
import type {IBuildable, IDefinedAction} from "@batono/core";

export const bt = {
  // actions
  request: (method: HttpMethod, url: string) => new RequestAction(method, url),
  modal: (title: string) => new ModalAction(title),
  actionButtons: (...items: ActionButton[]) => new ActionButtons(...items),

  // layout
  rows: (...items: Row[]) => new Rows(...items),
  row: (...items: IBuildable[]) => new Row(...items),
  inline: (...items: IBuildable[]) => new Inline(...items),

  header: (title: string, options?: HeaderOptions) => new Header(title, options),
  meta: (content: string | null) => new Meta(content),
  section: (title: string, rows: Rows) => new Section(title, rows),
  field: (label: string, value: IBuildable | string | null, variant?: RenderVariant) => new Field(label, value, variant),
  stat: (label: string, content: string) => new Stat(label, content),
  text: (content: string) => new Text(content),
  link: (content: string, action: IDefinedAction) => new Link(content, action),
  action: (label: string, action: IDefinedAction, options?: ActionOptions) => new ActionButton(label, action, options),
  note: (content: string, author: string, timestamp: string, actions?: ActionButtons) => new Note(content, author, timestamp, actions),
}

export type Bt = typeof bt
