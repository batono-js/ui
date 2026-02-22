import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {RowResult} from "../types/results.js";

export class Row implements IBuildable {
  readonly #items: IBuildable[]

  constructor(...items: IBuildable[]) {
    this.#items = items
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): RowResult {
    return buildDefinition(interactionGraph, {
      type: 'row' as const,
      items: this.#items.map(item => item[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph))
    })
  }
}
