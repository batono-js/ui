# @batono/ui

> UI primitives for the Batono server-driven interaction protocol.

[![npm version](https://badge.fury.io/js/%40batono%2Fui.svg)](https://www.npmjs.com/package/@batono/ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![codecov](https://codecov.io/gh/batono-js/ui/branch/main/graph/badge.svg)](https://codecov.io/gh/batono-js/ui)

`@batono/ui` provides the standard UI building blocks for the Batono protocol — layout containers, content primitives,
and action definitions. It builds on top of `@batono/core` and is designed to be used together with it.

---

## Features

- ✅ Peer dependency on `@batono/core` only
- ✅ Layout primitives (`rows`, `row`)
- ✅ Content primitives (`text`, `link`, `image`, `icon`, `button`, `divider`)
- ✅ Action definitions (`request`, `navigate`, `modal`, `event`)
- ✅ Escape hatch for custom nodes (`custom`)
- ✅ Typed result interfaces for frontend renderers
- ✅ Fully typed with TypeScript

---

## Installation

```bash
npm install @batono/ui @batono/core
```

---

## Basic Usage

```ts
import {bt} from '@batono/core'
import {bt as btUi} from '@batono/ui'

const deleteUser = bt.defineFlow(
  btUi.request('DELETE', '/users/42')
)

const graph = bt.graph(
  btUi.rows(
    btUi.row(
      btUi.button('Delete User', deleteUser)
    )
  )
)

res.json(graph)
```

---

## Layout

### `rows`

A vertical stack of items.

```ts
btUi.rows(
  btUi.row(btUi.text('First')),
  btUi.row(btUi.text('Second'))
)
```

Accepts an optional `RowsOptions` as first argument:

```ts
btUi.rows({gap: 8}, btUi.row(...), btUi.row(...))
```

| Option  | Type                                    | Description                    |
|---------|-----------------------------------------|--------------------------------|
| `gap`   | `number`                                | Spacing between items          |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | Horizontal alignment of items  |

### `row`

A horizontal container.

```ts
btUi.row(btUi.text('Left'), btUi.text('Right'))
```

Accepts an optional `RowOptions` as first argument:

```ts
btUi.row({gap: 8, wrap: true}, btUi.text('A'), btUi.text('B'))
```

| Option  | Type                                    | Description                    |
|---------|-----------------------------------------|--------------------------------|
| `gap`   | `number`                                | Spacing between items          |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | Alignment of items             |
| `wrap`  | `boolean`                               | Allow items to wrap            |

Both `rows` and `row` support `when` for conditional items:

```ts
import {when} from '@batono/core'

btUi.rows(
  btUi.row(btUi.text('Always')),
  when(user.isAdmin, btUi.row(btUi.text('Admin only')))
)
```

---

## Content Primitives

### `text`

```ts
btUi.text('Hello world')
```

### `link`

```ts
btUi.link('Open Profile', '/profile/42')
btUi.link('Open in new tab', '/profile/42', '_blank')
```

### `image`

```ts
btUi.image('/avatar.png', 'User avatar')
btUi.image('/avatar.png', 'User avatar', {width: 64, height: 64})
```

### `icon`

```ts
btUi.icon('trash')
btUi.icon('trash', {width: 24, height: 24})
btUi.icon('trash', undefined, {color: 'red', variant: 'outline'})
```

### `button`

```ts
btUi.button('Delete', deleteFlow)
btUi.button('Delete', deleteFlow, {variant: 'ghost', disabled: false})
```

### `divider`

```ts
btUi.divider()
```

### `custom`

Escape hatch for renderer-specific nodes not covered by the standard primitives.

```ts
btUi.custom('my-special-widget', {foo: 'bar'})
```

---

## Actions

Action definitions are passed to `bt.defineFlow()` from `@batono/core`.

### `request`

```ts
btUi.request('POST', '/bookings')
btUi.request('DELETE', '/users/42').withPayload({id: 42})
btUi.request('POST', '/bookings', {id: 1}, {headers: {'X-Token': 'abc'}, timeout: 5000})
```

### `navigate`

```ts
btUi.navigate('/dashboard')
btUi.navigate('/profile/42', {id: 42}, {target: '_blank'})
```

### `modal`

```ts
btUi.modal('confirm-delete')
btUi.modal('confirm-delete').withPayload({id: 42})
```

### `event`

A generic custom event — handled by the renderer.

```ts
btUi.event('user:selected')
btUi.event('user:selected', {id: 42})
```

---

## Frontend Types

`@batono/ui` exports typed result interfaces for frontend renderers:

```ts
import type {
  RowsResult,
  RowResult,
  TextResult,
  LinkResult,
  ImageResult,
  IconResult,
  ButtonResult,
  DividerResult,
  CustomResult,
  RequestActionResult,
  NavigateActionResult,
  ModalActionResult,
  EventActionResult,
} from '@batono/ui'
```

All result types extend `Defined` from `@batono/core` and carry a `$type` discriminator for exhaustive switch rendering.

---

## Utilities

```ts
import {NBSP} from '@batono/ui'

btUi.text(`${NBSP}·${NBSP}`) // non-breaking space separator
```

---

## Design Goals

- **Minimal by default** — standard primitives only, no framework opinions
- **Extensible** — use `custom` for anything not covered, or implement `IBuildable` directly
- **Frontend-agnostic** — result interfaces work with any renderer (Vue, React, vanilla)
- **Composable** — every definition is an `IBuildable`, freely nestable

---

## License

MIT
