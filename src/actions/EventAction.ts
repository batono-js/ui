import {type Defined, type IActionDefinition, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export interface EventActionResult extends Defined {
  $type: 'event'
  name: string
  payload?: Record<string, unknown> | undefined
}

export class EventAction implements IActionDefinition<EventAction, EventActionResult> {
  readonly #name: string
  readonly #payload?: Record<string, unknown>

  constructor(name: string, payload?: Record<string, unknown>) {
    this.#name = name
    if (payload) this.#payload = payload
  }

  withPayload(payload: Record<string, unknown>): EventAction {
    return new EventAction(this.#name, payload)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): EventActionResult {
    return buildDefinition(interactionGraph, 'event', {
      name: this.#name,
      payload: this.#payload,
    })
  }
}
