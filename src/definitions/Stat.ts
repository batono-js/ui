import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {StatResult} from "../types/results.js";

export class Stat implements IBuildable {
  readonly #label: string
  readonly #content: string

  constructor(label: string, content: string) {
    this.#label = label
    this.#content = content
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): StatResult {
    return buildDefinition(interactionGraph, {
      type: 'stat' as const,
      content: this.#content,
      label: this.#label
    })
  }
}
