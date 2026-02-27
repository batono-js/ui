import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";

export interface CustomResult extends Defined {
  $type: 'custom'
  type: string
  data?: Record<string, unknown> | undefined
}

export class Custom implements IBuildable {
  readonly #type: string
  readonly #data?: Record<string, unknown>

  constructor(type: string, data?: Record<string, unknown>) {
    this.#type = type
    if (data !== undefined) this.#data = data
  }

  withData(data: Record<string, unknown>): Custom {
    return new Custom(this.#type, data)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): CustomResult {
    return buildDefinition(interactionGraph, 'custom', {
      type: this.#type,
      data: this.#data,
    })
  }
}
