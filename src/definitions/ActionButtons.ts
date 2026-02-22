import type {ActionResult, ActionsResult} from "../types/results.js";
import { type IBuildable, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export class ActionButtons implements IBuildable<ActionsResult> {
  readonly #items: IBuildable<ActionResult>[]

  constructor(...items: IBuildable<ActionResult>[]) {
    this.#items = items
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): ActionsResult {
    return buildDefinition(interactionGraph, {
      type: 'actions' as const,
      items: this.#items.map(item => item[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph))
    })
  }
}
