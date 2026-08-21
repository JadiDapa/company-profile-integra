# Integra — Company Profile & Helpdesk Platform

Integra is a Next.js web app for an internet service provider. It combines a public marketing site (home, about, services, activities, gallery, contact) with an authenticated customer/technician **ticketing (helpdesk) system** for reporting and resolving connectivity issues tied to a customer's device (WiFi router/SSID).

## Features

### Public site (`/`)
- **Home** — hero carousel, statistics, "check your area" location widget, product/service highlights, latest activities, FAQ, CTA.
- **About** — company story, vision & mission, "find us" map/contact block.
- **Services** — catalog of offerings: Internet Service, Infrastructure Network, Data Center, Telephone, Managed Services, Software Development.
- **Activities** — searchable list of company activities/news, each with a detail slug.
- **Gallery** — searchable photo gallery.
- **Contact** — inquiry form (name, email, phone, message, service interest).

### Authentication
- Sign-in is handled by **Clerk**, with two flows in [`signInUser`](app/actions/user.actions.ts):
  - **Existing username** → looked up directly in the app's `User` table and routed by role (`ADMIN`/`TECHNICIAN` → `/dashboard`, `USER` → `/my-tickets`).
  - **New username** → must match a registered device's SSID + password; on success a Clerk account and a Prisma `User` (role `USER`) are created automatically, then routed to `/my-tickets`.

### Customer ticketing (`/my-tickets`)
- Customers see their device's active ticket and history of completed tickets.
- **Create Ticket** modal: reason, detail, and required photo evidence upload (images are resized/compressed server-side).

### Admin & technician dashboard (`/dashboard`)
- **Devices** — manage registered devices (SSID/password used for customer sign-in and ticket ownership).
- **Tickets** — list, search, and drill into a ticket's detail page: status/priority badges, submission images from the customer, a technician "working evidence" uploader (shown once a ticket is `IN_PROGRESS`), and a full activity/status-change log timeline.
- **Ticket lifecycle**: `SUBMITTED → CONFIRMED → IN_PROGRESS → COMPLETED` (or `CANCELED`). Confirming a ticket assigns the acting admin as **handler**; moving to `IN_PROGRESS` requires assigning a **technician**. Every transition is logged.
- **Galleries** — create/manage gallery entries and their images (drag-and-drop ordering).
- **Activities** — create/update activity posts.
- **My Tickets** (technician view) — tickets assigned to the signed-in technician.
- Role-based sidebar navigation (`ADMIN` vs `TECHNICIAN` see different menu items).

## Tech stack

- **Framework:** Next.js 16 (App Router, Server Actions), React 19
- **Auth:** Clerk
- **Database:** PostgreSQL via Prisma ORM (`@prisma/adapter-pg`)
- **Forms/validation:** React Hook Form + Zod
- **UI:** Tailwind CSS v4, shadcn/ui (Radix primitives), `@tanstack/react-table`, `@dnd-kit`
- **Media:** local-disk file storage, images processed with `sharp`

## Getting started

### Prerequisites
- Node.js 20+
- A PostgreSQL database
- A Clerk application (publishable + secret key)

### Setup

```bash
npm install
```

Create a `.env` file with:

```bash
DATABASE_URL=                        # PostgreSQL connection string
NEXT_PUBLIC_BASE_API_URL=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Run migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build       # production build
npm run start        # start production server
npm run db:deploy    # prisma migrate deploy + prisma generate (used for deployments)
npx prisma studio    # inspect the database
npx prisma db seed   # run prisma/seed.ts
```

Uploaded media (ticket evidence, gallery/activity images) is written to a local `media/` directory and served from `/api/media/[...path]` — this requires the app to run on a single persistent instance/volume.

## Project structure

```
app/
  (root)/        # public marketing pages
  (dashboard)/   # authenticated admin/technician dashboard
  (auth)/        # Clerk sign-in
  actions/       # Server Actions (the app's data-access entry points)
  api/media/     # serves uploaded files from disk
components/      # UI, organized to mirror the route groups above
lib/
  services/      # Prisma queries / business logic
  validators/    # Zod schemas + DTO types
  columns/       # @tanstack/react-table column definitions
prisma/          # schema, migrations, seed
```

See [CLAUDE.md](CLAUDE.md) for a deeper architecture walkthrough (data flow layering, media handling, ticket lifecycle internals).

## Known limitations / roadmap

A few pieces are scaffolded but not yet wired up end-to-end:
- The main `/dashboard` overview page is a placeholder (no stats/summary widgets yet — ticket/device counts currently only surface via `StatisticCard`/list pages).
- The public **Contact** form does not submit anywhere yet (currently logs to the console).
- The home page's **"Check Your Area"** location search is static UI with no lookup logic behind it.
