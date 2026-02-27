import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";
import type {ImageSize} from "../types/types.js";

export interface ImageResult extends Defined {
  $type: 'image'
  src: string
  alt: string
  size?: ImageSize | undefined
}

export class Image implements IBuildable {
  readonly #src: string
  readonly #alt: string
  readonly #size?: ImageSize

  constructor(src: string, alt: string, size?: ImageSize) {
    this.#src = src
    this.#alt = alt
    if (size !== undefined) this.#size = size
  }

  withSize(size: ImageSize): Image {
    return new Image(this.#src, this.#alt, {...this.#size, ...size})
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): ImageResult {
    return buildDefinition(interactionGraph, 'image', {
      src: this.#src,
      alt: this.#alt,
      size: this.#size,
    })
  }
}
