const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vialact',
    password: 'hideaki123',
    database: 'users_db'
});

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao MySQL...');
});

// Tabela hash para armazenar usuários em memória
class HashTable {
    constructor(size) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
    }

    // Função hash simples para demonstração
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    // Inserir um par chave-valor na tabela hash
    insert(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }
        bucket.push({ key, value });
    }

    // Buscar um valor dado uma chave
    search(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                return bucket[i].value;
            }
        }
        return null;
    }

    // Remover um par chave-valor dado uma chave
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                return;
            }
        }
    }
}

const usersTable = new HashTable(100); // Tamanho da tabela hash é 100

// Rota para registrar um novo usuário
app.post('/auth/register', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos foram fornecidos
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Insere o usuário na tabela hash (em memória)
    usersTable.insert(email, { nome, senha });

    // Insere o usuário no banco de dados MySQL
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário no MySQL:', err);
            return res.status(500).json({ message: 'Erro interno ao registrar usuário' });
        }

        console.log('Usuário registrado com sucesso no MySQL:', result);
        res.status(200).json({ message: 'Usuário registrado com sucesso' });
    });
});

// Rota para buscar um usuário pelo e-mail
app.get('/auth/user/:email', (req, res) => {
    const email = req.params.email;

    // Busca o usuário na tabela hash (em memória)
    const user = usersTable.search(email);

    if (user) {
        res.status(200).json(user);
    } else {
        // Se não encontrado na tabela hash, busca no MySQL
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Erro ao buscar usuário no MySQL:', err);
                return res.status(500).json({ message: 'Erro interno ao buscar usuário' });
            }

            if (results.length > 0) {
                const userFromDB = results[0];
                res.status(200).json({ nome: userFromDB.nome, senha: userFromDB.senha });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
