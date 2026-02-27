import {
  __BATONO_INTERNAL_BUILD_SYMBOL,
  buildDefinition,
  isBuildableItem,
  resolveBuildableArray
} from "@batono/core/internal";
import {type ConditionalBuildable, type Defined, type IBuildable, type IInteractionGraph,} from "@batono/core";

export interface RowOptions extends Record<string, unknown> {
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  wrap?: boolean
}

export interface RowResult extends Defined {
  $type: 'row'
  items: Defined[]
  options?: RowOptions | undefined
}

export class Row implements IBuildable {
  readonly #items: ConditionalBuildable[]
  readonly #options?: RowOptions

  constructor(...items: ConditionalBuildable[])
  constructor(options: RowOptions, ...items: ConditionalBuildable[])
  constructor(...args: (ConditionalBuildable | RowOptions)[]) {
    const [first, ...rest] = args
    if (first !== undefined && isBuildableItem(first)) {
      this.#items = args as ConditionalBuildable[]
    } else {
      this.#options = first as RowOptions
      this.#items = rest as ConditionalBuildable[]
    }
  }

  withOptions(options: RowOptions): Row {
    return new Row(options, ...this.#items)
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): RowResult {
    return buildDefinition(interactionGraph, 'row', {
      items: resolveBuildableArray(this.#items, interactionGraph),
      options: this.#options,
    })
  }
}

