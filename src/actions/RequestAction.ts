import type {RequestActionResult} from "../types/results.js";
import {type IActionDefinition, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class RequestAction implements IActionDefinition<RequestAction, RequestActionResult> {
  readonly #method: HttpMethod
  readonly #url: string
  readonly #payload?: Record<string, unknown>

  constructor(method: HttpMethod, url: string, payload?: Record<string, unknown>) {
    this.#method = method
    this.#url = url
    if (payload) this.#payload = payload
  }

  withPayload(payload: Record<string, unknown>): RequestAction {
    return new RequestAction(this.#method, this.#url, payload)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): RequestActionResult {
    return buildDefinition(interactionGraph, 'request', {
      method: this.#method,
      url: this.#url,
      payload: this.#payload,
    })
  }
}
