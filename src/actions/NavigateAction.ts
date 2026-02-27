import {type Defined, type IActionDefinition, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import type {HtmlTarget} from "../types/types.js";

export interface NavigateActionOptions extends Record<string, unknown> {
  target?: HtmlTarget
  replace?: boolean
}

export interface NavigateActionResult extends Defined {
  $type: 'navigate'
  url: string
  options?: NavigateActionOptions | undefined
}

export class NavigateAction implements IActionDefinition<NavigateAction, NavigateActionResult> {
  readonly #url: string
  readonly #payload?: Record<string, unknown>
  readonly #options?: NavigateActionOptions

  constructor(url: string, payload?: Record<string, unknown>, options?: NavigateActionOptions) {
    this.#url = url
    if (payload) this.#payload = payload
    if (options) this.#options = options
  }

  withPayload(payload: Record<string, unknown>): NavigateAction {
    return new NavigateAction(this.#url, payload, this.#options)
  }

  withOptions(options: NavigateActionOptions): NavigateAction {
    return new NavigateAction(this.#url, this.#payload, options)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): NavigateActionResult {
    return buildDefinition(interactionGraph, 'navigate', {
      url: this.#url,
      payload: this.#payload,
      options: this.#options,
    })
  }
}
