import {type Defined, type IActionDefinition, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import type {HttpMethod} from "../types/types.js";

export interface RequestActionOptions extends Record<string, unknown> {
  headers?: Record<string, string>
  timeout?: number
}

export interface RequestActionResult extends Defined {
  $type: 'request'
  method: HttpMethod
  url: string
  options?: RequestActionOptions | undefined
  payload?: Record<string, unknown> | undefined
}

export class RequestAction implements IActionDefinition<RequestAction, RequestActionResult> {
  readonly #method: HttpMethod
  readonly #url: string
  readonly #payload?: Record<string, unknown>
  readonly #options?: RequestActionOptions

  constructor(method: HttpMethod, url: string, payload?: Record<string, unknown>, options?: RequestActionOptions) {
    this.#method = method
    this.#url = url

    if (options) this.#options = options
    if (payload) this.#payload = payload
  }

  withPayload(payload: Record<string, unknown>): RequestAction {
    return new RequestAction(this.#method, this.#url, payload, this.#options)
  }

  withOptions(options: RequestActionOptions): RequestAction {
    return new RequestAction(this.#method, this.#url, this.#payload, options)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): RequestActionResult {
    return buildDefinition(interactionGraph, 'request', {
      method: this.#method,
      url: this.#url,
      payload: this.#payload,
      options: this.#options
    })
  }
}
