const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Registro de novo usuário
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, forneça e-mail e senha.' });
  }

  // Hash da senha
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(query, [email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao registrar o usuário:', err);
      return res.status(500).json({ message: 'Erro ao registrar o usuário.' });
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  });
});

module.exports = router;
