# Yuhan's Plant Shelf

A full-stack web app for tracking a personal plant collection. Built with **Express** (API) and **React + Vite** (front-end), using a **MySQL** database.

---

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MAMP](https://www.mamp.info/) (or any MySQL server)
- phpMyAdmin (included with MAMP)

---

## Database Setup

1. Start MAMP and open **phpMyAdmin**
2. Create a database named `yuhans_plant_shelf`
3. Create a user `plant_shelf_visitor` with password `plantsarenice88` and grant it full access to the database
4. Import the SQL files in this order (order matters due to the foreign key):
   - `api/tables/plant_types.sql`
   - `api/tables/plants.sql`

> **Using a different MySQL port?** Open `api/db.js` and update the `port` value to match your setup (default is `8889` for MAMP, `3306` for standard MySQL).

---

## Running the API

```bash
cd api
npm install
npm start
```

The server runs at **http://localhost:3001**

> **Using a different port?** Update the `PORT` value in `api/server.js` and the `API` constant in each file under `web/src/` to match.

> Uploaded images are served from `api/uploads/`. Add any existing plant images there if they aren't already present.

---

## Running the Front-end

Open a second terminal:

```bash
cd web
npm install
npm run dev
```

The app runs at **http://localhost:5173**

---

## Project Structure

```
my-plant-shelf/
├── api/
│   ├── routes/
│   │   ├── plants.js          # CRUD endpoints for plants
│   │   └── plantTypes.js      # GET endpoint for plant types
│   ├── tables/
│   │   ├── plants.sql         # Plants table export
│   │   └── plant_types.sql    # Plant types table export
│   ├── uploads/               # Uploaded plant images (static)
│   ├── db.js                  # MySQL connection
│   ├── server.js              # Express entry point
│   └── storage.js             # Multer file upload config
└── web/
    └── src/
        ├── components/
        │   └── PlantCard.jsx  # Plant card with delete button
        └── pages/
            ├── Archive.jsx        # Main page — plant grid + filter sidebar
            ├── PlantDetail.jsx    # Single plant view
            ├── AddPlantForm.jsx   # Add a new plant
            └── EditPlantForm.jsx  # Edit an existing plant
```

---

## Features

- Browse all plants in a filterable grid
- Filter by plant type (Succulent, Tropical, Fern, etc.)
- View full details for a single plant
- Add a new plant with an image upload
- Edit an existing plant's details
- Delete a plant from the archive
