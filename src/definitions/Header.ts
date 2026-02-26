import type {ActionsResult, HeaderResult, InlineResult} from "../types/results.js";
import {type IBuildable, type IInteractionGraph} from "@batono/core";
import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";

export type HeaderOptions = {
  avatar?: string
  subtitle?: IBuildable<InlineResult>
  actions?: IBuildable<ActionsResult>
}

export class Header implements IBuildable<HeaderResult> {
  readonly #title: string
  #avatar?: string
  #subtitle?: IBuildable<InlineResult>
  #actions?: IBuildable<ActionsResult>

  constructor(title: string, options?: HeaderOptions) {
    this.#title = title
    if (options?.avatar) this.#avatar = options.avatar
    if (options?.subtitle) this.#subtitle = options.subtitle
    if (options?.actions) this.#actions = options.actions
  }

  withAvatar(avatar: string) {
    this.#avatar = avatar
    return this
  }

  withSubtitle(subtitle: IBuildable<InlineResult>) {
    this.#subtitle = subtitle
    return this
  }

  withActions(actions: IBuildable<ActionsResult>) {
    this.#actions = actions
    return this
  }

  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): HeaderResult {
    return buildDefinition(interactionGraph,'header', {
      title: this.#title,
      avatar: this.#avatar,
      subtitle: this.#subtitle?.[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
      actions: this.#actions?.[__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph),
    })
  }
}
