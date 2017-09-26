const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession.js')
const swagCtrl = require('./controllers/swag_controller')
const authCtrl = require('./controllers/auth_controller')
const cartCtrl = require('./controllers/cart_controller')
const searchCtrl = require('./controllers/search_controller')

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'I Haz secrets',
    saveUninitialized: false,
    resave: false,

}));

app.use(checkForSession);

app.use( express.static( `${__dirname}/../public/build`));



app.get('/api/swag', swagCtrl.read);
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);
app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);
app.delete('/api/cart', cartCtrl.delete);
app.get('/api/search', searchCtrl.search)



const port = 3000;
app.listen(port, () => { console.log(`Active server on ${port}.`); });