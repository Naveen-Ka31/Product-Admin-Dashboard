# Product Admin Dashboard

A responsive product administration dashboard built with **Next.js, React, TypeScript, Tailwind CSS, and Axios** using the free [DummyJSON](https://dummyjson.com/) API.

The application provides authentication, product browsing, search, filtering, sorting, pagination, product details, and product management features.

## Live Demo

**Live Application:** `https://product-admin-dashboard-dun-six.vercel.app/login`


---

## Features

### Authentication

* Login using the provided DummyJSON credentials
* Protected product pages
* Logout functionality
* Axios interceptor automatically attaches the authentication token to API requests
* Centralized API error handling

### Product Dashboard

* Product listing with:

  * Product image
  * Title
  * Category
  * Price
  * Rating
  * Stock
* Responsive desktop table
* Responsive mobile product cards

### Pagination

* Server-side pagination using `limit` and `skip`
* Page navigation
* Previous / Next controls
* Page sizes:

  * 10
  * 20
  * 50
* Displays the current result range

Example:

```text
Showing 21–40 of 194
```

### Search

* Product search using the DummyJSON search endpoint
* Debounced search input
* Search automatically returns to page 1
* Previous search requests are cancelled
* Request IDs prevent stale responses from replacing newer results

### Filtering and Sorting

* Filter products by category
* Sort by:

  * Price
  * Rating
  * Title
* Ascending and descending order

### Product Details

* Product images
* Description
* Price
* Rating
* Stock
* Category
* Brand
* Customer reviews
* Invalid product handling

### Product Management

* Add products
* Edit products
* Delete products
* Form validation
* Delete confirmation
* Loading and error states

### URL State

Search, pagination, category and sorting state are stored in the URL.

Example:

```text
/products?page=2&pageSize=20&search=phone
```

This allows the current dashboard state to survive page refreshes and makes filtered views shareable.

---

## Tech Stack

| Technology   | Purpose                                   |
| ------------ | ----------------------------------------- |
| Next.js      | React framework and routing               |
| React        | User interface                            |
| TypeScript   | Type safety                               |
| Tailwind CSS | Styling and responsive design             |
| Axios        | HTTP requests                             |
| DummyJSON    | Product and authentication API            |
| localStorage | Local persistence of mock product changes |
| Vercel       | Deployment                                |

---

## Project Structure

```text
src/
│
├── app/
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── products/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── edit/
│   │           └── page.tsx
│   │
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── Pagination.tsx
│   ├── ProductFilters.tsx
│   ├── ProductForm.tsx
│   ├── ProductTable.tsx
│   └── SearchBar.tsx
│
├── lib/
│   ├── axios.ts
│   ├── authApi.ts
│   ├── productApi.ts
│   └── productStorage.ts
│
└── types/
    └── product.ts
```

---

## API Endpoints Used

### Authentication

```text
POST /auth/login
```

### Products

```text
GET /products
GET /products/search
GET /products/categories
GET /products/category/{category}
GET /products/{id}
POST /products/add
PUT /products/{id}
DELETE /products/{id}
```

All API requests are made using Axios.

---

## Authentication Credentials

For the assignment:

```text
Username: emilys
Password: emilyspass
```

These credentials are provided by the DummyJSON API for testing.

---

## Handling DummyJSON Limitations

DummyJSON provides mock mutation endpoints for creating, updating and deleting products. These operations are not permanently stored on the remote API.

To keep the dashboard behaviour consistent, the application:

1. Sends the corresponding request to DummyJSON.
2. Receives the API response.
3. Stores locally added and updated products in `localStorage`.
4. Stores deleted product IDs locally.
5. Merges these local changes with the API product data when displaying the dashboard.

This allows the UI to reflect Add, Edit and Delete operations even though the mock API does not provide permanent persistence.

For a production application, these operations would instead be handled by a real backend and database.

---

## Search Race-Condition Handling

Fast typing can create multiple requests before previous responses return.

For example:

```text
p
ph
pho
phone
```

The application handles this using:

* Debouncing
* `AbortController`
* Request IDs

Only the latest valid request is allowed to update the UI.

This prevents an older, slower response from replacing the results for the user's latest search.

---

## URL Validation

Invalid URL values are handled safely.

Examples:

```text
/products?page=abc
/products?page=-1
/products?pageSize=100
/products?page=999
```

The application falls back to valid values or redirects to the nearest valid page instead of breaking the dashboard.

---

## Loading and Error States

The application provides feedback for:

* Loading products
* Loading product details
* Failed API requests
* Empty search results
* Invalid product IDs
* Failed product mutations

Where appropriate, users can retry failed requests.

---

## Responsive Design

The dashboard adapts to different screen sizes.

### Desktop

Products are displayed in a table.

### Mobile

Products are displayed as cards with:

* Image
* Title
* Category
* Price
* Rating
* Stock
* View
* Edit

---

## Installation

Clone the repository:

```bash
git clone PASTE_YOUR_GITHUB_REPOSITORY_URL_HERE
```

Enter the project directory:

```bash
cd product-admin-dashboard
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

To verify the production build locally:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## Deployment

The application is deployed using Vercel.

Vercel provides first-class support for Next.js applications and can automatically deploy new commits when the GitHub repository is connected.

Production URL:

```text
PASTE_YOUR_VERCEL_URL_HERE
```

---

## Assignment Requirements Covered

* [x] Login
* [x] Authentication
* [x] Logout
* [x] Product listing
* [x] Pagination
* [x] Page size selection
* [x] Search
* [x] Debounced search
* [x] Category filtering
* [x] Sorting
* [x] Product details
* [x] Add product
* [x] Edit product
* [x] Delete product
* [x] Delete confirmation
* [x] Form validation
* [x] Loading states
* [x] Empty states
* [x] Error states
* [x] Retry handling
* [x] URL state
* [x] Invalid URL handling
* [x] Race-condition protection
* [x] Responsive desktop/mobile UI
* [x] Axios API layer
* [x] Local handling of DummyJSON mutations

---

## Design and Architecture Decisions

### Axios API Layer

API calls are separated from UI components.

```text
UI Component
     ↓
API Function
     ↓
Axios Instance
     ↓
DummyJSON API
```

This keeps API logic reusable and easier to maintain.

### Reusable Components

Common functionality is separated into components such as:

* `ProductForm`
* `ProductTable`
* `Pagination`
* `SearchBar`
* `ProductFilters`

This keeps pages smaller and easier to maintain.

### URL-Based Dashboard State

Pagination, search, category and sorting values are stored in the URL so that the current dashboard state can be refreshed or shared.

---

## One Challenge and Solution

### Challenge

Fast product searches can result in multiple API requests completing in a different order from when they were started.

For example, a slower request for an earlier search could finish after the latest search request and overwrite the current results.

### Solution

The application combines debouncing, request cancellation using `AbortController`, and request IDs to ensure that only the latest request can update the product list.

---

## Where AI Helped

AI tools were used during development for:

* Understanding Next.js and React implementation patterns
* Breaking the assignment into smaller development steps
* Debugging implementation issues
* Reviewing component structure
* Explaining API integration
* Designing validation and error handling
* Improving the README documentation

All generated code was reviewed, tested and understood before being included in the project.

---

## Future Improvements

If this were developed as a production application with a real backend, the next improvements would include:

* Real database persistence
* Server-side authentication
* Role-based access control
* Secure HTTP-only authentication cookies
* Backend validation
* Automated tests
* CI/CD pipeline
* Better product management permissions
* Database-backed search and filtering
* Audit logging
* Production monitoring

---

## License

This project was created as a frontend development assignment and learning project.
