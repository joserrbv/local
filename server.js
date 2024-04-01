const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { check, validationResult } = require("express-validator");

const app = express();

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

// conexão com o banco

const db = require("./db/db");

db();

const API_PASSWORD = process.env.API_PASSWORD;
// Rota de autenticação na página inicial
// Rota para a página inicial
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Rota para autenticar a senha
app.post("/", (req, res) => {
  const { password } = req.body;

  if (password === process.env.API_PASSWORD) {
    // Senha correta, conceda acesso à API
    res.status(200).send("Acesso concedido à API");
  } else {
    // Senha incorreta, negue o acesso
    res.status(401).send("Credenciais inválidas");
  }
});

// Middleware de validação para o registro de usuários
const validateUserRegistration = [
  check("email").isEmail({}),
  check("password").isLength({ min: 6 }),
];

// Importando o modelo de usuário
const User = require("./model/user");

User();

// Rotas CRUD

// Função para criar o hash da senha
async function hashSenha(senha) {
  const saltRounds = 10;
  const hashedSenha = await bcrypt.hash(senha, saltRounds);
  return hashedSenha;
}

// Rota para criar um novo usuário
app.post("/api/users", validateUserRegistration, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    username,
    email,
    password,
    confirmPassword,
    companyName,
    cnpj,
    whatsapp,
    address,
    instagram,
  } = req.body;

  // Verificar se a senha e a confirmação de senha coincidem
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "As senhas password e confirmPassword não coincidem." });
  }

  // Criar hash da senha
  const hashedPassword = await hashSenha(password);

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Este email já está cadastrado" });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmPassword,
      companyName,
      cnpj,
      whatsapp,
      address,
      instagram,
    });
    await newUser.save();
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Read
app.get("/api/users", (req, res) => {
  User.find()
    .then((usuarios) => res.json(usuarios))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Read one user
app.get("/api/users/:id", (req, res) => {
  User.findOne()
    .then((usuarios) => res.json(usuarios))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Update
app.put("/api/users/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((usuario) => res.json(usuario))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Delete
app.delete("/api/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "usuario deletado com sucesso" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// ////////////
// Middleware de validação para o login de usuários
const validateUserLogin = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
];

// Rota de login
app.post("/api/users/login", validateUserLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encontre o usuário no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("Credenciais inválidas");
    }

    console.log(password, user.password);

    // Verifique se a senha corresponde ao hash no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Credenciais inválidas");
    }

    // Se as credenciais estiverem corretas, o login é bem-sucedido
    return res.status(200).send("Login bem-sucedido");
  } catch (error) {
    console.error("Erro ao fazer login", error);
    return res.status(500).send("Erro interno do servidor");
  }
});

app.listen(PORT, () => console.log(`Api rodando na porta ${PORT}`));
