import {type IActionDefinition, type IInteractionGraph} from "@batono/core";
import type {ModalActionResult} from "../types/results.js";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export class ModalAction implements IActionDefinition<ModalAction, ModalActionResult> {
  readonly #title: string
  readonly #payload?: Record<string, unknown>

  constructor(title: string, payload?: Record<string, unknown>) {
    this.#title = title
    if (payload) this.#payload = payload
  }

  withPayload(payload: Record<string, unknown>): ModalAction {
    return new ModalAction(this.#title, payload)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): ModalActionResult {
    return buildDefinition(interactionGraph, {
      type: 'modal' as const,
      title: this.#title,
      payload: this.#payload,
    })
  }
}
