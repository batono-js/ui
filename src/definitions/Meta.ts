import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {MetaResult} from "../types/results.js";
import type {RenderVariant} from "../types/types.js";

export class Meta implements IBuildable<MetaResult> {
  readonly #content: string | null
  #label?: string
  #icon?: string
  #variant?: RenderVariant

  constructor(content: string | null) {
    this.#content = content
  }

  withLabel(label: string) {
    this.#label = label
    return this
  }

  withIcon(icon: string) {
    this.#icon = icon
    return this
  }

  withVariant(variant: RenderVariant) {
    this.#variant = variant
    return this
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): MetaResult {
    return buildDefinition(interactionGraph, {
      type: 'meta' as const,
      content: this.#content,
      label: this.#label,
      icon: this.#icon,
      variant: this.#variant,
    })
  }
}
