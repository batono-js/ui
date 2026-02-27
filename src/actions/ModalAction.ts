import {type Defined, type IActionDefinition, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export interface ModalActionResult extends Defined {
  $type: 'modal'
  modal: string
  payload?: Record<string, unknown> | undefined
}

export class ModalAction implements IActionDefinition<ModalAction, ModalActionResult> {
  readonly #modal: string
  readonly #payload?: Record<string, unknown>

  constructor(modal: string, payload?: Record<string, unknown>) {
    this.#modal = modal
    if (payload) this.#payload = payload
  }

  withPayload(payload: Record<string, unknown>): ModalAction {
    return new ModalAction(this.#modal, payload)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): ModalActionResult {
    return buildDefinition(interactionGraph, 'modal', {
      modal: this.#modal,
      payload: this.#payload,
    })
  }
}
