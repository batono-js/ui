import {
  __BATONO_INTERNAL_BUILD_SYMBOL,
  buildDefinition,
  isBuildableItem,
  resolveBuildableArray
} from "@batono/core/internal";
import {type ConditionalBuildable, type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";

export interface RowsOptions extends Record<string, unknown> {
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export interface RowsResult extends Defined {
  $type: 'rows'
  items: Defined[]
  options?: RowsOptions | undefined
}

export class Rows implements IBuildable {
  readonly #items: IBuildable[]
  readonly #options?: RowsOptions

  constructor(...items: ConditionalBuildable[])
  constructor(options: RowsOptions, ...items: ConditionalBuildable[])
  constructor(...args: (ConditionalBuildable | RowsOptions)[]) {
    const [first, ...rest] = args
    if (first !== undefined && isBuildableItem(first)) {
      this.#items = args as IBuildable[]
    } else {
      this.#options = first as RowsOptions
      this.#items = rest as IBuildable[]
    }
  }

  withOptions(options: RowsOptions): Rows {
    return new Rows(options, ...this.#items)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): RowsResult {
    return buildDefinition(interactionGraph, 'rows', {
      items: resolveBuildableArray(this.#items, interactionGraph),
      options: this.#options,
    })
  }
}
