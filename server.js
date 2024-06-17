const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2'); // Importa o módulo mysql2
const authRoutes = require('./routes/auth');

const app = express();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vialact', // Seu usuário do MySQL
    password: 'hideaki123', // Sua senha do MySQL
    database: 'users_db' // Nome do seu banco de dados
});
 
// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao MySQL...');
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar rotas de autenticação
app.use('/auth', authRoutes);

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para registrar um novo usuário
app.post('/auth/register', (req, res) => {
    const { nome, email, password } = req.body;

    // Verifica se todos os campos foram fornecidos
    if (!nome || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Insere o usuário no banco de dados
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, password], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ message: 'Erro interno ao registrar usuário' });
        }

        console.log('Usuário registrado com sucesso:', result);
        res.status(200).json({ message: 'Usuário registrado com sucesso' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
