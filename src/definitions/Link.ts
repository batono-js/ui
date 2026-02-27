import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";
import type {HtmlTarget} from "../types/types.js";


export interface LinkResult extends Defined {
  $type: 'link'
  label: string
  href: string
  target?: HtmlTarget | undefined
}

export class Link implements IBuildable {
  readonly #label: string
  readonly #href: string
  readonly #target?: HtmlTarget

  constructor(label: string, href: string, target?: HtmlTarget) {
    this.#label = label
    this.#href = href
    if (target) this.#target = target
  }

  withTarget(target: HtmlTarget): Link {
    return new Link(this.#label, this.#href, target)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): LinkResult {
    return buildDefinition(interactionGraph, 'link', {
      label: this.#label,
      href: this.#href,
      target: this.#target,
    })
  }
}
