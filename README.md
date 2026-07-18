# Volt ⚡

Volt is a premium sneaker store built for speed, comfort, and style. Browse running, basketball, lifestyle, and limited-edition footwear — filter by size, price, and category, and get full product detail pages with image galleries.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4, Zustand, Base UI |
| Backend | NestJS 11, Prisma 5, PostgreSQL |
| Language | TypeScript throughout |
| Package manager | pnpm |

---

## Project structure

```
volt/
├── client/   # Next.js frontend
└── server/   # NestJS backend
```

---

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database

---

## Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd volt
```

---

### 2. Server

```bash
cd server
pnpm install
```

Create a `.env` file in `server/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/volt
PORT=3000
CORS_ORIGIN=http://localhost:3001
```

Run the database migration and generate the Prisma client:

```bash
pnpm prisma migrate deploy
pnpm prisma generate
```

Start the dev server:

```bash
pnpm start:dev
```

The API will be running at `http://localhost:3000`.

---

### 3. Client

```bash
cd client
pnpm install
```

Create a `.env.local` file in `client/`:

```env
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:3000
```

Start the dev server:

```bash
pnpm dev
```

The app will be running at `http://localhost:3001`.

> Set a custom port in `package.json` if needed: `"dev": "next dev -p 3001"`

---

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | List products with filters |
| `GET` | `/products/search?q=` | Search products by name, description, or tag |
| `GET` | `/products/:id` | Get a single product by ID |

### Filter query params for `GET /products`

| Param | Type | Example |
|---|---|---|
| `priceMin` | number | `5000` |
| `priceMax` | number | `150000` |
| `sizes` | number[] | `sizes=8&sizes=9` |
| `tags` | string[] | `tags=running&tags=casual` |
| `isNew` | boolean | `true` |
| `ratingMin` | number | `4` |
| `limit` | number | `10` |
| `page` | number | `0` |

---

## Features

- Product listing with filter sidebar — price range, sizes, categories, availability, minimum rating
- Responsive shop layout — inline sidebar on desktop, slide-up drawer on mobile, side drawer on tablet
- Product detail page with image gallery, thumbnails, size selector, and add to cart
- Navbar search navigates to `/shop?search=`
- Shimmer skeleton loaders on product grid and product detail
- Image fallback via `onError` to `/image-fail.svg`
- In-memory product cache in Zustand — avoids redundant fetches on navigation
- SEO metadata on all routes with async `generateMetadata` on product pages
- All prices in Naira (₦) with locale-formatted numbers
