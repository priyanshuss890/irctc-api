const pool = require('../config/db');

const bookSeats = async (userId, trainId, seats) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Lock the train row for update
        const [train] = await connection.query(
            'SELECT available_seats FROM trains WHERE id = ? FOR UPDATE',
            [trainId]
        );

        if (train[0].available_seats < seats) {
            await connection.rollback();
            return null; // Not enough seats
        }

        // Update available seats
        await connection.query(
            'UPDATE trains SET available_seats = available_seats - ? WHERE id = ?',
            [seats, trainId]
        );

        // Create booking
        const [result] = await connection.query(
            'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
            [userId, trainId, seats]
        );

        await connection.commit();
        return result.insertId;

    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
};

module.exports = { bookSeats };
