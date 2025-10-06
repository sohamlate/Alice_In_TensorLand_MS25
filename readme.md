# Alice in TensorLand MS25

Alice in TensorLand MS25 is a full-stack MERN application designed to be a "Dependencies Manager" for tracking stock information, news, and market analytics related to supply chain dependencies. It allows users to manage a list of dependencies, view detailed financial metrics, and stay updated with relevant news feeds.

## Features

  - **Dependency Management:** Create, Read, Update, and Delete (CRUD) operations for supply chain dependencies.
  - **Financial Metrics:** Fetches and displays key financial metrics for each dependency using the Yahoo Finance API.
  - **News Feed:** Aggregates news from various RSS feeds related to the automotive industry, commodities, and financial markets.
  - **Market Analytics:** Provides an analytics dashboard with charts and market data from TradingView.
  - **Search Functionality:** Allows users to search for dependencies by ticker, description, or materials.

-----

## Technologies Used

### Backend

  - **Node.js:** JavaScript runtime environment.
  - **Express:** Web framework for Node.js.
  - **MongoDB:** NoSQL database for storing application data.
  - **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
  - **Axios:** Promise-based HTTP client for making requests to external APIs.
  - **Cloudinary:** Cloud-based image and video management service.
  - **Yahoo Finance 2:** Unofficial Yahoo Finance API for Node.js.
  - **Node Cron:** A simple cron-like job scheduler for Node.js.

### Frontend

  - **React:** JavaScript library for building user interfaces.
  - **Vite:** Next-generation front-end tooling.
  - **React Router:** Declarative routing for React.js.
  - **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
  - **Lucide React:** A lightweight and customizable icon library.
  - **Axios:** For making API requests to the backend.

### Additional

  - **Flask:** A micro web framework for the Python backend.

-----

## Setup and Installation

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    pnpm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=<YOUR_MONGODB_URI>
    PORT=5000
    CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
    CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
    ```
4.  Start the development server:
    ```bash
    pnpm dev
    ```

### Frontend

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```

-----

## Project Structure

```
.
├── backend
│   ├── config
│   │   └── cloudinary.js
│   ├── controllers
│   │   ├── dataInjectionController.js
│   │   ├── dependencyController.js
│   │   ├── eventController.js
│   │   └── newsController.js
│   ├── data
│   │   └── rss_feed_urls.js
│   ├── models
│   │   ├── Dependency.js
│   │   ├── Event_impact_assessments.js
│   │   └── RssItem.js
│   ├── routes
│   │   ├── dependencyRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── manualDataInjectionRoutes.js
│   │   └── news.js
│   ├── services
│   │   └── rssFetcher.js
│   ├── utils
│   │   └── financialMetrics.js
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── vercel.json
├── backend_flask
│   ├── .gitignore
│   ├── app.py
│   └── requirements.txt
└── frontend
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── assets
    │   │   ├── react.svg
    │   │   └── tata-logo.jpg
    │   ├── components
    │   │   ├── DeleteDependency.jsx
    │   │   ├── Dependency.jsx
    │   │   ├── DependencyCard.jsx
    │   │   ├── DependencyNews.jsx
    │   │   ├── EditDependency.jsx
    │   │   ├── Home.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── NewsEventDetail.jsx
    │   │   ├── NewsFeed.jsx
    │   │   ├── ReportText.js
    │   │   ├── Reportcard.jsx
    │   │   ├── Sales.jsx
    │   │   ├── SalesCard.jsx
    │   │   └── Stockform.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```
