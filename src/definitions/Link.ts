import type {LinkResult} from "../types/results.js";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IDefinedAction, type IInteractionGraph} from "@batono/core";

export class Link implements IBuildable<LinkResult> {
  readonly #content: string
  readonly #action: IDefinedAction

  constructor(content: string, action: IDefinedAction) {
    this.#content = content
    this.#action = action
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): LinkResult {
    return buildDefinition(interactionGraph, 'link', {
      content: this.#content,
      action: this.#action[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph)
    })
  }
}
