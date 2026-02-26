import type {InlineResult} from "../types/results.js";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";

export class Inline implements IBuildable {
  readonly #items: IBuildable[]

  constructor(...items: IBuildable[]) {
    this.#items = items
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): InlineResult {
    return buildDefinition(interactionGraph, 'inline', {
      items: this.#items.map(item => item[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph))
    })
  }
}
