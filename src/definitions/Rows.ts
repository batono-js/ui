import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {RowResult, RowsResult} from "../types/results.js";

export class Rows implements IBuildable {
  readonly #items: IBuildable<RowResult>[]

  constructor(...items: IBuildable<RowResult>[]) {
    this.#items = items
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): RowsResult {
    return buildDefinition(interactionGraph, 'rows', {
      items: this.#items.map(item => item[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph))
    })
  }
}
