import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {TextResult} from "../types/results.js";

export class Text implements IBuildable {

  readonly #content: string

  constructor(content: string) {
    this.#content = content
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): TextResult {
    return buildDefinition(interactionGraph, {
      type: 'text' as const,
      content: this.#content
    })
  }
}
