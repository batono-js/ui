import {__BATONO_INTERNAL_BUILD_SYMBOL, buildDefinition} from "@batono/core/internal";
import {type Defined, type IBuildable, type IInteractionGraph} from "@batono/core";

export interface DividerResult extends Defined {
  $type: 'divider'
}

export class Divider implements IBuildable {
  [__BATONO_INTERNAL_BUILD_SYMBOL](interactionGraph: IInteractionGraph): DividerResult {
    return buildDefinition(interactionGraph, 'divider', {})
  }
}
