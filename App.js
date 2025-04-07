const express = require('express');
const path = require('path');
const session = require('express-session');

const connection = require('./database/database');
const checkLogin = require('./middleware/checklogin');

const app = express();

// Rotas
const PerfilRoutes = require('./routes/PerfilRoutes');
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const ParticipanteRoutes = require('./routes/participanteRoutes');
const palestranteRoutes = require('./routes/palestranteRoutes');
const inscricaoRoutes = require('./routes/inscricaoRoutes')
const eventoRoutes = require('./routes/eventoRoutes')
const palestraRoutes = require('./routes/palestraRoutes')


// setup de ambiente
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
  secret: 'eventos',
  cookie: {
    maxAge: 1200000
  },
  resave: false,
  saveUninitialized: false
}));

// Ativar os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados
connection.authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso!');
  })
  .catch(erro => {
    console.log('Problemas na conexão!');
    console.log(erro);
  });

// Parser de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Models
// const Perfil = require('./models/perfil');
// const Usuario = require('./models/usuario');
// const Categoria = require('./models/categoria');
// const Marca = require('./models/marca');
// const Saida = require('./models/saida');
// const Entrada = require('./models/entrada');
// const Produto = require('./models/produto');
// const SaidaItem = require('./models/saidaitem');
// const EntradaItem = require('./models/entradaItem');

// Controllers

// Rotas
app.use('/perfis', PerfilRoutes);
app.use('/usuarios', UsuarioRoutes);
app.use('/participantes', ParticipanteRoutes);
app.use('/palestrantes', palestranteRoutes);
app.use('/inscricoes', inscricaoRoutes);
app.use('/eventos', eventoRoutes);
app.use('/palestras', palestraRoutes);

app.get('/', (req, res, next) => {
  res.render('index', {
    // inAdm: req.session.login.inAdm
  });
})


module.exports = app;
