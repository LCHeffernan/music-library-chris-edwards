const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { id: artist_id } = req.params;
  console.log('------------>', artist_id);
  try {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
      [name, year, artist_id]
    );
    res.status(201).json(album);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create album' });
  }
};

const createAlbums = async (req, res) => {
  const { albums } = req.body;
  const { id: artist_id } = req.params;
  try {
    if (!Array.isArray(albums)) {
      return res.status(400).json({ message: 'Albums should be an array' });
    }
    const insertValues = albums
      .map((album) => `('${album.name}', ${album.year}, ${artist_id})`)
      .join(',');
    const {
      rows: [insertedAlbums],
    } = await db.query(
      `INSERT INTO Albums (name, year, artist_id) VALUES ${insertValues} RETURNING *`
    );
    res.status(201).json(insertedAlbums);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create albums' });
  }
};

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums ORDER BY name ASC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);

    if (!album) {
      return res.status(404).json({
        message: `The album ID: ${id} does not exist`,
      });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year } = req.body;

  let query, params;

  if (name && year) {
    query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING name , year, id`;
    params = [name, year, id];
  } else if (name) {
    query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING name , year, id`;
    params = [name, id];
  } else if (year) {
    query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING name , year, id`;
    params = [year, id];
  }
  try {
    const {
      rows: [albums],
    } = await db.query(query, params);

    if (!albums) {
      return res.status(404).json({ message: `Album ${id} does not exist` });
    }
    res.status(200).json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(
      'DELETE FROM Albums WHERE id = $1 RETURNING id , name, year',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: `The album ID: ${id} does not exist`,
      });
    }

    const deletedAlbum = rows[0];
    res.status(200).json(deletedAlbum);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createAlbum,
  createAlbums,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
};
