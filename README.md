# Mini POS App with Admin Login 🛍️

[cite_start]This repository contains the source code for a **Point of Sale (POS) Web Application** designed for an Admin to manage products and record sales[cite: 4, 5]. [cite_start]The project fulfills the requirements of the Heliverse assignment[cite: 2].

## 🔗 Overview & Submission

| Component | Required Technology | Details |
| :---: | :---: | :---: |
| **Frontend** | [cite_start]React or Next.js preferred [cite: 7] | React |
| **Backend API** | [cite_start]Node.js with Express or Hono [cite: 8] | Node.js with Express |
| **Database** | [cite_start]MongoDB or PostgreSQL [cite: 10] | MongoDB |
| **Authentication** | [cite_start]Basic Authentication for Admin [cite: 12] | [cite_start]JWT and bcrypt [cite: 18, 19] |

* [cite_start]**Live Demo:** [Insert your Netlify/Vercel link here] (Example demo provided: https://stellular-paletas-0c5ee7.netlify.app/login [cite: 13])
* [cite_start]**Submission Form:** [Click here to submit your assignment] [cite: 86]

***

## ✨ Core Features

### 1. Admin Authentication [cite: 15]
* [cite_start]Admin can register (once) and log in[cite: 17].
* [cite_start]Uses **JWT-based authentication** [cite: 18] [cite_start]to protect routes.
* [cite_start]Passwords are **hashed using bcrypt** before saving[cite: 19].

### [cite_start]2. Product Management (Admin Only) [cite: 20]
* [cite_start]**CRUD Operations:** View all products in a table, Edit, or delete a product[cite: 26, 27, 71, 75, 77].
* New products include **Name**, **Price**, and **Stock Quantity**[cite: 22, 24, 25, 73].
* [cite_start]Stock is **automatically reduced** when a sale occurs[cite: 28, 38].

### [cite_start]3. Sales Management [cite: 33]
* Admin creates a sale by **selecting product(s)** and **entering quantity**[cite: 35, 36].
* [cite_start]Sale record is saved with **Product Name**, **Quantity**, **Total Amount**, and **Date/Time**[cite: 41, 42, 43, 44, 79, 80].

### [cite_start]4. Dashboard [cite: 45]
* Shows key metrics:
    * [cite_start]Total Products [cite: 48]
    * [cite_start]Total Sales [cite: 50]
    * Total Revenue [cite: 51]

***

## 📂 Project Structure

The project is organized into `backend` and `frontend` directories, storing admin details, products, and sales in the DB[cite: 83]:
POS/ ├── backend/ │ ├── config/ # DB connection setup │ ├── middleware/ # JWT, auth protection  │ ├── models/ # DB schemas for Admin, Product, Sale │ ├── routes/ # Express routes (auth, products, sales) │ ├── .env # Environment variables │ ├── seedAdmin.js # Optional script for one-time admin setup │ ├── server.js # Main entry file │ └── package.json └── frontend/ ├── src/ │ ├── pages/ # Login, Dashboard, Product List (CRUD), Sales (Create sale) │ ├── components/ # UI components (Basic ShadCN or Bootstrap UI) │ └── api/ # API calls (using React Query or Axios)  └── Readme.md
***

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB Instance (Local or Atlas)

### ⚙️ Backend Setup
1.  Navigate to `backend` and install dependencies:
    ```bash
    cd backend
    npm install
    ```
2.  Set up your `.env` file (e.g., `MONGO_URI`, `JWT_SECRET`).
3.  Start the server:
    ```bash
    npm start
    ```

### 🖥️ Frontend Setup
1.  Navigate to `frontend` and install dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
2.  Start the app:
    ```bash
    npm run dev # or npm start
    ```
    *All non-login/register pages are Protected Routes[cite: 58].*

***

## 📜 Backend Routes Implemented

| Route | Method | Description |
| :---: | :---: | :---: |
| `/auth/register` | `POST` | One-time Admin registration  |
| `/auth/login` | `POST` | Admin login [cite: 70] |
| `/products` | `GET` | View all products [cite: 71] |
| `/products` | `POST` | Add new product [cite: 73] |
| `/products/:id` | `PUT` | Edit product [cite: 75] |
| `/products/:id` | `DELETE` | Delete product [cite: 77] |
| `/sales` | `POST` | Create a sale transaction [cite: 79] |
| `/sales` | `GET` | View all sales records [cite: 80] |
