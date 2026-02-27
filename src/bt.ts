import {
  EventAction,
  ModalAction,
  NavigateAction,
  type NavigateActionOptions,
  RequestAction,
  type RequestActionOptions
} from "./actions/index.js"
import {type ConditionalBuildable, DefinedFlow} from "@batono/core";
import {
  Button,
  type ButtonOptions, Custom,
  Divider,
  Icon,
  type IconOptions,
  Image,
  Link,
  Row,
  type RowOptions,
  Rows,
  type RowsOptions,
  Text
} from "./definitions/index.js";
import type {HtmlTarget, HttpMethod, ImageSize} from "./index.js";

export const bt = {
  // UI primitives
  text: (content: string) =>
    new Text(content),

  link: (label: string, href: string, target?: HtmlTarget) =>
    new Link(label, href, target),

  image: (src: string, alt: string, size?: ImageSize) =>
    new Image(src, alt, size),

  icon: (name: string, size?: ImageSize, options?: IconOptions) =>
    new Icon(name, size, options),

  divider: () =>
    new Divider(),

  button: (label: string, flow: DefinedFlow, options?: ButtonOptions) =>
    new Button(label, flow, options),

  row: (optionsOrFirst: RowOptions | ConditionalBuildable, ...items: ConditionalBuildable[]) =>
    new Row(...[optionsOrFirst, ...items] as ConditionalBuildable[]),

  rows: (optionsOrFirst: RowsOptions | ConditionalBuildable, ...items: ConditionalBuildable[]) =>
    new Rows(...[optionsOrFirst, ...items] as ConditionalBuildable[]),

  custom: (type: string, data?: Record<string, unknown>) =>
    new Custom(type, data),

  // Actions
  request: (method: HttpMethod, url: string, payload?: Record<string, unknown>, options?: RequestActionOptions) =>
    new RequestAction(method, url, payload, options),

  navigate: (url: string, payload?: Record<string, unknown>, options?: NavigateActionOptions) =>
    new NavigateAction(url, payload, options),

  modal: (modal: string, payload?: Record<string, unknown>) =>
    new ModalAction(modal, payload),

  event: (name: string, payload?: Record<string, unknown>) =>
    new EventAction(name, payload),
}

export type Bt = typeof bt
