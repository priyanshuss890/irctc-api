# IRCTC API

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env` file using `.env.example`
4. Setup MySQL database using provided SQL schema
5. Start server: `npm start`

## API Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/admin/trains - Add new train (Admin only)
- GET /api/user/trains?source=&destination= - Get trains between stations
- POST /api/user/bookings - Book seats
- GET /api/user/bookings/:id - Get booking details

## Testing
Use Postman collection for testing all endpoints. Include required headers:
- Admin endpoints: `X-API-KEY`
- User endpoints: `Authorization: Bearer <JWT_TOKEN>`