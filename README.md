# sshokh.uz — client

Minimal personal portfolio. [Next.js](https://nextjs.org) (App Router) + Tailwind, styled with shadcn/ui.

## Setup

```bash
bun install
bun dev
```

Runs on http://localhost:3000.

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:8000   # Django API (see ../server)
NEXT_PUBLIC_TARGET_ID=your_discord_user_id     # for live presence via Lanyard
```

- `NEXT_PUBLIC_SERVER_URL` — backend serving `/api/data/` (projects, skills, bio).
- `NEXT_PUBLIC_TARGET_ID` — Discord id for live presence; join [discord.gg/lanyard](https://discord.gg/lanyard) first. Without it the status stays "offline".

## Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run build` | Production build |
| `bun start` | Serve the production build |
| `bun run lint` | Run ESLint |
