const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

app.use(express.json());
app.use(cors({ origin: '*' }));



function getUsersFromDb() {
  const dbFilePath = './api/db.json';
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  return dbData.users;
}

function findUserByEmail(email) {
  return getUsersFromDb().find(user => user.email === email);
}

// Endpoint registraz
app.post('/express/register', (req, res) => {
  const userData = req.body

  // ID utente
  const dbFilePath = './api/db.json';
  let dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
  const userId = dbData.userIdCounter;
  dbData.userIdCounter++;
  fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));

  userData.id = userId;

  //password bcrypt
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(userData.password, saltRounds);
  userData.password = hashedPassword;

  // Salva nel db.json
  saveUserData(userData);

  res.status(201).json({ message: 'Registrazione avvenuta con successo!' });
});
function saveUserData(data) {
  const dbFilePath = './api/db.json';
  let dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

  if (!dbData.users) {
    dbData.users = [];
  }

  dbData.users.push(data);
  fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));
}
const secretKey = crypto.randomBytes(32).toString('hex');

// Endpoint email
app.get('/check-email/:email', (req, res) => {
  const emailToCheck = req.params.email;
  const dbFilePath = './api/db.json';
  let dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

  // controllo email
  const emailExists = dbData.users.some(user => user.email === emailToCheck);
  res.json(emailExists);
});

// Endpoint login e token
app.post('/express/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenziali non valide.' });
  }

  //token JWT
  const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

// verifica token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// rotta protetta
app.get('/express/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'Questa è una rotta protetta.' });
});

// questo e' cosa appare scritto in console quando lancio il server
const port = 3100;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
