import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";
import type {ImageSize} from "../types/types.js";

export interface IconOptions extends Record<string, unknown> {
  color?: string
  variant?: string
}

export interface IconResult extends Defined {
  $type: 'icon'
  name: string
  size?: ImageSize | undefined
  options?: IconOptions | undefined
}

export class Icon implements IBuildable {
  readonly #name: string
  readonly #size?: ImageSize
  readonly #options?: IconOptions

  constructor(name: string, size?: ImageSize, options?: IconOptions) {
    this.#name = name
    if (size !== undefined) this.#size = size
    if (options !== undefined) this.#options = options
  }

  withSize(size: ImageSize): Icon {
    return new Icon(this.#name, {...this.#size, ...size}, this.#options)
  }

  withOptions(options: IconOptions): Icon {
    return new Icon(this.#name, this.#size, options)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): IconResult {
    return buildDefinition(interactionGraph, 'icon', {
      name: this.#name,
      size: this.#size,
      options: this.#options,
    })
  }
}
