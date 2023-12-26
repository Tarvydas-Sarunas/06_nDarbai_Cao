require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dbConfig = require('./config');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET /shirts -parodo visus shirts
app.get('/api/shirts', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM `shirts`';
    const [rows] = await conn.execute(sql);
    res.json(rows);
  } catch (error) {
    // jei yra klaida tai klaidos blokas
    return [null, error];
  } finally {
    // atsijungti nuo DB jei prisijungimas buvo
    if (conn) conn.end();
  }
});

// GET /shirts/order -parodo pagal kaina 10 pigiausiu
// app.get('/api/shirts/order', async (req, res) => {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'SELECT * FROM `shirts` ORDER BY shirt_price ASC LIMIT 10';
//     const [rows] = await conn.execute(sql);

//     // patikrinu arbu issiusta
//     if (rows.length === 0) {
//       res.status(404).json({ msg: 'jokio shirts nerasta' });
//     } else {
//       res.json(rows);
//     }
//   } catch (error) {
//     // En cas d'erreur, logguer et renvoyer une réponse d'erreur
//     console.error(error);
//     res.status(500).json({ msg: 'Somthing was wrong' });
//   } finally {
//     // Se déconnecter de la base de données si la connexion a été établie
//     if (conn) conn.end();
//   }
// });

// POST /shirts -pridedu viena shirts
app.post('/api/shirts', async (req, res) => {
  let conn;
  const {
    shirt_brand,
    shirt_model,
    shirt_size,
    shirt_price,
    shirt_discription,
  } = req.body;
  // galime tureti validacijas
  if (shirt_brand.trim() === '') {
    res.status(400).json({
      err: 'shirt brand is required',
    });
    return;
  }
  // kuriu connection
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO shirts
  (shirt_brand,
    shirt_model,
    shirt_size,
    shirt_price,
    shirt_discription)
  VALUES (?, ?, ?, ?, ?)`;
    const [rows] = await conn.execute(sql, [
      shirt_brand,
      shirt_model,
      shirt_size,
      shirt_price,
      shirt_discription,
    ]);
    if (rows.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.json({ msg: 'no affected rows' });
  } catch (error) {
    // jei yra klaida tai klaidos blokas
    console.log(error);
    console.log('klaida sukurti posta');
    res.status(500).json({
      msg: 'Something went wrong',
    });
  } finally {
    // atsijungti nuo DB jei prisijungimas buvo
    if (conn) conn.end();
  }
});

// get postus pagal numatyta postu parametra
app.get('/api/shirts/order', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    let limit = +req.query.limit || 10;

    // Assurez-vous que la limite est comprise entre 10 et 100
    limit = Math.min(Math.max(limit, 10), 100);

    const sql = 'SELECT * FROM `shirts` ORDER BY shirt_price ASC LIMIT ?';
    const [rows] = await conn.execute(sql, [limit]);

    // patikrinu arbu issiusta
    if (rows.length === 0) {
      res.status(404).json({ msg: 'jokio shirts nerasta' });
    } else {
      res.json(rows);
    }
  } catch (error) {
    // En cas d'erreur, logguer et renvoyer une réponse d'erreur
    console.error(error);
    res.status(500).json({ msg: 'Somthing was wrong' });
  } finally {
    // Se déconnecter de la base de données si la connexion a été établie
    if (conn) conn.end();
  }
});

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
