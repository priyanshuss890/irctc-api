const { bookSeats } = require('../models/bookingModel');

const bookSeat = async (req, res) => {
    try {
        const { trainId, seats } = req.body;
        const bookingId = await bookSeats(req.user.id, trainId, seats);

        if (!bookingId) {
            return res.status(400).json({ error: 'Not enough seats available' });
        }

        res.status(201).json({ bookingId });
    } catch (err) {
        res.status(500).send('Booking failed');
    }
};

module.exports = { bookSeat };
