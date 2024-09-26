# Project Title

## Technology Stack

- **Programming Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Validator.js
- **Error Handling**: Custom error handling with middleware
- **Environment Variables**: dotenv
- **Type Checking**: TypeScript

## Prerequisites

- Node.js (version)
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devbenho/starship.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables. Example:
   ```plaintext
   MONGO_URI=mongodb+srv://devbenho:gTmgWn7Pn2d9mI52@cluster0.wbu7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true
    JWT_SECRET=secret
    NODE_ENV=production
    PORT=2707
    JWT_EXPIRATION=1d
   ```

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. For production, build the project and start the server:
   ```bash
   npm run build
   npm start
   ```

## API DOCS
[Postman Documentation Link](https://documenter.getpostman.com/view/22579338/2sAXqy2e6z)