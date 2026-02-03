# Aurium API Backend

This is the backend for my organization project for student verification and authentication system. 
It manages student verification, authentication, and secure password storage with hashing. 
The backend also includes a workflow for admin account verification before login is enabled for students.

### Features:
- Manage and verify student identity.
- Generate and securely hash temporary passwords.
- Designed for integration with a frontend system using REST APIs.

More features are expected to come in...

## Development Resources
Here are the key tools and libraries used in this project:

**[Prisma](https://www.prisma.io/docs)**: Used as the Object-Relational Mapping (ORM) tool to handle database interactions, schema migrations, and ensure type safety for database queries.

**[Express](https://expressjs.com/)**: Acts as the framework to handle HTTP requests and create the RESTful API endpoints for the backend.

**[Node.js](https://nodejs.org/)**: Provides the JavaScript runtime environment to run the backend application.

**[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)**: Secures user passwords by hashing them before saving to the database, ensuring password security.
