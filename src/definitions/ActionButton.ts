import type {ActionResult} from "../types/results.js";
import type {RenderVariant} from "../types/types.js";
import {type IBuildable, type IDefinedAction, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export type ActionOptions = {
  variant?: RenderVariant
}

export class ActionButton implements IBuildable<ActionResult> {
  readonly #label: string
  readonly #variant?: RenderVariant
  readonly #action?: IDefinedAction

  constructor(label: string, action?: IDefinedAction, options?: ActionOptions) {
    this.#label = label
    if (action) this.#action = action
    if (options?.variant) this.#variant = options.variant
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): ActionResult {
    return buildDefinition(interactionGraph, 'action', {
      label: this.#label,
      variant: this.#variant,
      action: this.#action?.[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
    })
  }
}
