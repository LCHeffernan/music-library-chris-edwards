const db = require('../db/index');

const createArtist = async (req, res) => {
  const { name, genre } = req.body;

  try {
    const {
      rows: [artist],
    } = await db.query(
      `INSERT INTO Artists (name, genre) VALUES ('${name}', '${genre}') RETURNING *`
    );
    res.status(201).json(artist);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create artist' });
  }
};

module.exports = { createArtist };
