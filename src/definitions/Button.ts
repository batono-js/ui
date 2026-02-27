import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {
  type Defined,
  type DefinedFlow,
  type FlowReferenceResult,
  type IBuildable,
  type IInteractionGraph
} from "@batono/core";

export interface ButtonOptions extends Record<string, unknown> {
  variant?: string
  disabled?: boolean
}


export interface ButtonResult extends Defined {
  $type: 'button'
  label: string
  $flow: FlowReferenceResult
  options?: ButtonOptions | undefined
}

export class Button implements IBuildable {
  readonly #label: string
  readonly #flow: DefinedFlow
  readonly #options?: ButtonOptions

  constructor(label: string, flow: DefinedFlow, options?: ButtonOptions) {
    this.#label = label
    this.#flow = flow
    if (options !== undefined) this.#options = options
  }

  withOptions(options: ButtonOptions): Button {
    return new Button(this.#label, this.#flow, options)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): ButtonResult {
    return buildDefinition(interactionGraph, 'button', {
      label: this.#label,
      $flow: this.#flow[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
      options: this.#options,
    })
  }
}
