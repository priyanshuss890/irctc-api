const getTrainById = async (trainId) => {
    const [rows] = await pool.query('SELECT * FROM trains WHERE id = ?', [trainId]);
    return rows[0];
};

module.exports = { 
    addTrain, 
    getTrainsBetweenStations, 
    getTrainById 
};
