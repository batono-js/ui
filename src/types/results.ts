import type {RenderVariant} from "./types.js";
import type {HttpMethod} from "../actions/RequestAction.js";
import type {ActionReferenceResult, Defined} from "@batono/core";

export interface TextResult extends Defined {
  $type: 'text'
  content: string
}

export interface LinkResult extends Defined {
  $type: 'link'
  content: string
  action: ActionReferenceResult
}

export interface StatResult extends Defined {
  $type: 'stat'
  label: string
  content: string
}

export interface ActionResult extends Defined {
  $type: 'action'
  label: string
  variant?: RenderVariant | undefined  // SPÄTER: string für jetzt
  action?: ActionReferenceResult | undefined
}

export interface ActionsResult extends Defined {
  $type: 'actions'
  items: ActionResult[]
}

export interface InlineResult extends Defined {
  $type: 'inline'
  items: Defined[]
}

export interface RowResult extends Defined {
  $type: 'row'
  items: Defined[]
}

export interface RowsResult extends Defined {
  $type: 'rows'
  items: RowResult[]
}

export interface RequestActionResult extends Defined {
  $type: 'request'
  method: HttpMethod
  url: string
  payload?: Record<string, unknown> | undefined
}

export interface ModalActionResult extends Defined {
  $type: 'modal'
  title: string
  payload?: Record<string, unknown> | undefined
}

export interface MetaResult extends Defined {
  $type: 'meta'
  content: string | null
  label?: string | undefined
  icon?: string | undefined
  variant?: RenderVariant | undefined  // SPÄTER: string für jetzt
}

export interface FieldResult extends Defined {
  $type: 'field'
  label: string
  value: Defined | null
  variant?: RenderVariant | undefined  // SPÄTER: string für jetzt
}

export interface NoteResult extends Defined {
  $type: 'note'
  content: string
  author: string
  timestamp: string
  actions?: ActionsResult | undefined
}

export interface HeaderResult extends Defined {
  $type: 'header'
  title: string
  avatar?: string | undefined
  subtitle?: InlineResult | undefined
  actions?: ActionsResult | undefined
}

export interface SectionResult extends Defined {
  $type: 'section'
  title: string
  icon?: string | undefined
  variant?: RenderVariant | undefined  // SPÄTER: string für jetzt
  actions?: ActionsResult | undefined
  rows: RowsResult
}
