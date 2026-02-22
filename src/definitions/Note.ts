import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import type {ActionsResult, NoteResult} from "../types/results.js";

export class Note implements IBuildable<NoteResult> {
  readonly #content: string
  readonly #author: string
  readonly #timestamp: string
  readonly #actions?: IBuildable<ActionsResult>

  constructor(content: string, author: string, timestamp: string, actions?: IBuildable<ActionsResult>) {
    this.#content = content
    this.#author = author
    this.#timestamp = timestamp
    if (actions) this.#actions = actions
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): NoteResult {
    return buildDefinition(interactionGraph, {
      type: 'note' as const,
      content: this.#content,
      author: this.#author,
      timestamp: this.#timestamp,
      actions: this.#actions?.[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
    })
  }
}
