# Giftly - Backend

## Description

This repository contains the **backend code** for the **Giftly Project**, a web app that allows users to collabratively write a card for someone. Giftly allows users to create and collaborate on personalized cards. Users can select templates, customize content, add GIFs and images, and share the completed card with the recipient.
The app uses Postgres and Prisma.

The **frontend repository** with the user interface implementation can be found [here](https://github.com/nathidaum/giftly-frontend).

---

## Instructions to Run the Backend

### Clone the Repository

```bash
git clone https://github.com/nathidaum/giftly-backend.git
cd giftly-backend
```

### Install Dependencies 
```bash
npm install
```

### Set up Environment Variables

1. Create a `.env` file in the root directory.
2. Add the following variables:

```bash
PORT=<Port Number>                # The port the server will run on (e.g., 5000)
DATABASE_URL=<Postgres Connection URL> # The connection string for your PostgreSQL database
TOKEN_SECRET=<Your Token Secret>  # A secret key for JWT authentication
ORIGIN=https://giftly-cards.netlify.app/ # Frontend origin URL
```

Note: You will need a PostgreSQL database instance. Ensure the DATABASE_URL is properly configured.

### Run the application
To start the development server, run:
```bash
npm run dev
```
Once the server is running, open your browser and navigate to http://localhost:5173.

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express**: Web framework for handling routes and middleware
- **PostgreSQL**: SQL database for storing data
- **Prisma**: ODM for database interaction

## Demo
You can see the live frontend application hosted [here](https://giftly-cards.netlify.app/).
