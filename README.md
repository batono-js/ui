# @batono/ui

> UI primitives for the Batono server-driven interaction protocol.

[![npm version](https://badge.fury.io/js/%40batono%2Fui.svg)](https://www.npmjs.com/package/@batono/ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![codecov](https://codecov.io/gh/batono-js/ui/branch/main/graph/badge.svg)](https://codecov.io/gh/batono-js/ui)

`@batono/ui` provides the UI building blocks for the Batono protocol — layout containers, content definitions, and
action primitives. It builds on top of `@batono/core` and is designed to be used together with it.

---

## Features

- ✅ Peer dependency on `@batono/core` only
- ✅ Fully composable layout system (`rows`, `row`, `inline`)
- ✅ Rich content definitions (`header`, `section`, `field`, `meta`, `note`, `stat`)
- ✅ Fluent builder API with method chaining
- ✅ Typed result interfaces for frontend renderers
- ✅ String shorthand for field values — auto-wrapped in `Text`

---

## Installation

```bash
npm install @batono/ui @batono/core
```

---

## Basic Usage

```ts
import {bt as btCore} from '@batono/core'
import {bt} from '@batono/ui'

const openProfile = btCore.defineAction(
  bt.request('GET', '/customers/42')
)

const graph = btCore.graph(
  bt.rows(
    bt.row(
      bt.header('Batman Forever', {
        avatar: 'BF',
        subtitle: bt.inline(
          bt.link('Bruno Labbadia', openProfile),
          bt.text(' · '),
          bt.text('K2602206207')
        )
      })
    ),
    bt.row(
      bt.section('Personal Data', bt.rows(
        bt.row(
          bt.field('First Name', 'Batman'),
          bt.field('Last Name', 'Forever')
        ),
        bt.row(
          bt.field('Email', null),
          bt.field('Phone', null)
        )
      ))
    )
  )
)

res.json(graph)
```

---

## Layout

### `rows` / `row`

The primary layout system. `rows` is a vertical stack of `row` containers. Each `row` distributes its children
horizontally with equal width.

```ts
bt.rows(
  bt.row(bt.field('First Name', 'Batman'), bt.field('Last Name', 'Forever')),
  bt.row(bt.field('Email', null))
)
```

### `inline`

A horizontal container without grid spacing — for composing inline content like subtitles.

```ts
bt.inline(
  bt.link('Parent', openParent),
  bt.text(' · '),
  bt.text('K2602206207')
)
```

---

## Definitions

### `header`

Page-level header with avatar, subtitle and actions.

```ts
bt.header('Batman Forever', {
  avatar: 'BF',
  subtitle: bt.inline(bt.text('Student')),
  actions: bt.actionButtons(
    bt.action('+ Book Unit', bookUnit, {variant: 'primary'})
  )
})
```

### `section`

A card container with a title, optional icon, actions and a rows layout.

```ts
bt.section('Personal Data', bt.rows(
  bt.row(bt.field('First Name', 'Batman'))
))
  .withIcon('🧑')
  .withVariant('accent')
  .withActions(bt.actionButtons(
    bt.action('Edit', editAction)
  ))
```

### `field`

A labeled value. Accepts a string shorthand — automatically wrapped in `Text`.

```ts
bt.field('First Name', 'Batman')
bt.field('Newsletter', 'Yes', 'bool-true')
bt.field('Email', null)  // renders as empty
bt.field('ID', bt.inline(bt.text('NJkR7'), bt.text(' (obfuscated)')))
```

### `meta`

A compact chip or badge for metadata display.

```ts
bt.meta('89544').withLabel('ID').withIcon('🆔')
bt.meta('New Customer').withVariant('badge-green')
bt.meta('Student').withVariant('badge-accent')
```

### `stat`

A large metric display for key numbers.

```ts
bt.stat('Available Units', '99.0')
bt.stat('Available (HH:mm)', '74:15')
```

### `note`

A timestamped note with author and optional actions.

```ts
bt.note(
  'Student mentioned difficulties in analysis.',
  'Maria K.',
  '2026-02-12T11:15:00',
  bt.actionButtons(
    bt.action('✕', deleteNote, {variant: 'ghost'})
  )
)
```

### `text` / `link`

Inline content primitives.

```ts
bt.text('Some text')
bt.link('Open Profile', openProfileAction)
```

---

## Actions

### `request`

An HTTP action definition.

```ts
bt.request('POST', '/bookings')
bt.request('DELETE', '/users/42').withPayload({id: 42})
```

### `modal`

A modal dialog action.

```ts
bt.modal('Are you sure?')
```

### `actionButtons`

A container for `action` buttons, used in `header` and `section`.

```ts
bt.actionButtons(
  bt.action('+ Book Unit', bookUnit, {variant: 'primary'}),
  bt.action('+ Note', addNote, {variant: 'secondary'})
)
```

---

## Variants

`RenderVariant` is used on `field`, `meta`, `section` and `action` to signal visual intent to the renderer.

| Variant        | Usage                       |
|----------------|-----------------------------|
| `primary`      | Primary action button       |
| `secondary`    | Secondary action button     |
| `ghost`        | Subtle/destructive action   |
| `mono`         | Monospace text (IDs, codes) |
| `bool-true`    | Positive boolean value      |
| `bool-false`   | Negative boolean value      |
| `badge-green`  | Success/positive badge      |
| `badge-accent` | Highlighted badge           |
| `accent`       | Highlighted section         |

---

## Frontend Types

`@batono/ui` exports typed result interfaces for frontend renderers — no dependency on build-time classes needed.

```ts
import type {
  HeaderResult,
  SectionResult,
  FieldResult,
  RowsResult,
  Defined
} from '@batono/ui'
```

All result types extend `Defined` from `@batono/core`:

```ts
interface Defined {
  $schema: string
  $graph: string
  type: string
}
```

---

## Utilities

```ts
import {NBSP} from '@batono/ui'

bt.text(`${NBSP}·${NBSP}`) // non-breaking space separator
```

---

## Design Goals

- **Semantic over generic** — `header`, `section`, `field` express intent, not just structure
- **Fluent API** — method chaining for optional properties keeps constructors clean
- **Frontend-agnostic** — result interfaces work with any renderer (Vue, React, vanilla)
- **Composable** — every definition is an `IBuildable`, freely nestable
- **Renderer-friendly** — `type` discriminator on every node enables exhaustive switch rendering

---

## License

MIT
