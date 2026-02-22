import {Text} from "./Text.js";
import type {RenderVariant} from "../types/types.js";
import type {FieldResult} from "../types/results.js";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";

export class Field implements IBuildable {
  readonly #label: string
  readonly #value: IBuildable | null
  readonly #variant?: RenderVariant

  constructor(label: string, value: IBuildable | string | null, variant?: RenderVariant) {
    this.#label = label
    if (variant) this.#variant = variant
    if (value == null) {
      this.#value = null
    } else if (typeof value === 'string') {
      this.#value = new Text(value)
    } else {
      this.#value = value
    }
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): FieldResult {
    return buildDefinition(interactionGraph, {
      type: 'field' as const,
      label: this.#label,
      value: this.#value?.[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph) ?? null,
      variant: this.#variant,
    })
  }
}
