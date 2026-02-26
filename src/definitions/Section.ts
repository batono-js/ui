import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {ActionsResult, RowsResult, SectionResult} from "../types/results.js";
import type {RenderVariant} from "../types/types.js";

export class Section implements IBuildable<SectionResult> {
  readonly #title: string
  readonly #rows: IBuildable<RowsResult>
  #icon?: string
  #variant?: RenderVariant
  #actions?: IBuildable<ActionsResult>

  constructor(title: string, rows: IBuildable<RowsResult>) {
    this.#title = title
    this.#rows = rows
  }

  withIcon(icon: string) {
    this.#icon = icon
    return this
  }

  withVariant(variant: RenderVariant) {
    this.#variant = variant
    return this
  }

  withActions(actions: IBuildable<ActionsResult>) {
    this.#actions = actions
    return this
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): SectionResult {
    return buildDefinition(interactionGraph, 'section', {
      title: this.#title,
      icon: this.#icon,
      variant: this.#variant,
      actions: this.#actions?.[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
      rows: this.#rows[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
    })
  }
}
