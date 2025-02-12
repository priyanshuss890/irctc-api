const pool = require('../config/db');

const addTrain = async (name, source, destination, totalSeats) => {
    const [result] = await pool.query(
        'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
        [name, source, destination, totalSeats, totalSeats]
    );
    return result.insertId;
};

const getTrainsBetweenStations = async (source, destination) => {
    const [rows] = await pool.query(
        'SELECT * FROM trains WHERE source = ? AND destination = ?',
        [source, destination]
    );
    return rows;
};

module.exports = { addTrain, getTrainsBetweenStations };