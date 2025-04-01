# Free Brain

## Overview

Free Brain is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to store and organize various resources, including links, code snippets, documents, and videos, making them easily accessible and retrievable. Additionally, an AI feature will be integrated to summarize content upon user request.

## Features

- **User Authentication**: Secure login and signup functionality.
- **Resource Management**: Store and categorize links, code snippets, documents, and videos.
- **AI Integration**: Summarize content using AI upon request.
- **Search & Filter**: Easily retrieve stored content.
- **Responsive UI**: Optimized for both mobile and desktop users.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI Feature**: OpenAI API (or a similar AI summarization tool)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Steps to Run the Project

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/free-brain.git
   cd free-brain
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   REACT_APP_BACKEND_URL=http://localhost:5000
   AI_API_KEY=your_ai_api_key
   ```

4. **Start the Backend**

   ```sh
   cd backend
   npm start
   ```

5. **Start the Frontend**

   ```sh
   cd frontend
   npm start
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | /auth                 | User registration   |
| POST   | /auth                 | User authentication |
| GET    | /contents             | Fetch all resources |
| POST   | /contents             | Add a new resource  |
| DELETE | /contents/\:contentId | Delete a resource   |
|        |                       |                     |

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. Feel free to use and modify it!

## Contact

For any inquiries, reach out at[ devlprnitish@gmail.com](mailto\:your-email@gmail.com) or open an issue on GitHub.

