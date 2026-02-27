import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";

export interface TextResult extends Defined {
  $type: 'text'
  content: string
}

export class Text implements IBuildable {

  readonly #content: string

  constructor(content: string) {
    this.#content = content
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): TextResult {
    return buildDefinition(interactionGraph, 'text', {
      content: this.#content
    })
  }
}
