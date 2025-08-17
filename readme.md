# Padharo - Tourism Marketplace Platform

## Overview
Padharo is a comprehensive tourism marketplace platform that allows users to discover, book, and review tourist destinations and experiences. Built with Node.js and Express.js, this platform provides a robust solution for managing tourism listings, user accounts, reviews, and shopping cart functionality.

## Features
- User authentication and authorization
- Tourism listing management (CRUD operations)
- Shopping cart functionality
- Review and rating system
- Interactive maps integration
- Category-based filtering
- Responsive design

## Architecture

### Backend Architecture
- **Framework**: Express.js
- **Database**: MongoDB (implied by the models structure)
- **Authentication**: Session-based authentication
- **File Upload**: Multer middleware for handling file uploads

### Project Structure
```
├── app.js                 # Application entry point
├── cloudConfig.js         # Cloud storage configuration
├── middleware.js          # Custom middleware functions
├── schema.js             # Data validation schemas
│
├── controllers/          # Route controllers
│   ├── cart.js
│   ├── listing.js
│   ├── review.js
│   └── users.js
│
├── models/              # Database models
│   ├── cart.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/             # Express routes
│   ├── cart.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/             # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── users/
│   └── cart/
│
├── public/           # Static files
│   ├── css/
│   └── js/
│
└── utils/           # Utility functions
    ├── ExpressError.js
    └── wrapAsync.js
```

### Key Components
1. **Models**: Define data structure and database interactions
2. **Controllers**: Handle business logic and request processing
3. **Routes**: Define API endpoints and route handlers
4. **Views**: EJS templates for server-side rendering
5. **Middleware**: Custom middleware for authentication, error handling, etc.
6. **Public Assets**: Static files including CSS, JavaScript, and images
7. **Utils**: Helper functions and error handling utilities

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/ujjwal9631/Padharo.git
```

2. Install dependencies:
```bash
cd Padharo
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the server:
```bash
npm start
```

## Technical Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **View Engine**: EJS
- **Frontend**: HTML, CSS, JavaScript
- **Maps Integration**: (Map service integration)
- **File Storage**: Cloudinary
- **Authentication**: Express-session

## Features in Detail

### User Management
- User registration and authentication
- Profile management
- Session handling

### Listing Management
- Create, read, update, and delete tourism listings
- Image upload functionality
- Location mapping
- Category-based organization

### Shopping Cart
- Add/remove items
- Update quantities
- Cart persistence

### Review System
- Add reviews to listings
- Rating system
- Review management

### UI/UX Features
- Responsive design
- Interactive maps
- Category filters
- Dynamic content loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Express.js team
- MongoDB team
- Contributors and maintainers

---
For more information, please contact: [Your Contact Information]