const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

const Router = require('@koa/router')
const router = new Router()

const arrayOfGoods = require('./goods.json')

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});

// Cors
const cors = require('@koa/cors');
app.use(
  cors({
    origin: '*',
    allowHeaders: 'X-Requested-With, Content-Type, Origin',
    credentials: true,
  }),
);

// Subscription
router.post('/subscription', async (ctx) => {
  try {
    const { email }  = ctx.request.body;
    const isValid = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)

    if (isValid) {
      ctx.body = `На вашу почту ${email} было отправлено письмо`;
    } else if (!isValid){
      ctx.body = 'Почта введена некорректно'
    }
  } catch (err) {
    handleError(err, ctx)
  }
})

// Order 
router.post('/userdata', async (ctx) => {
  try {
    const { userName, surname, phone, address }  = ctx.request.body;

    if (!userName && !surname && !phone && !address){
      ctx.body = 'Введите данные'
    } else if (!userName) {
      ctx.body = 'Введите имя';
    } else if (!surname){
      ctx.body = 'Введите фамилию'
    } else if (!phone){
      ctx.body = 'Введите телефон'
    } else if (!address){
      ctx.body = 'Введите адрес'
    } else {
      ctx.body = `Спасибо за заказ, ${userName} ${surname}!`
    }
  } catch (err) {
    handleError(err, ctx)
  }
})

// Router

router.get('/goods', (ctx) => {
  ctx.response.body = arrayOfGoods
})

// Skirt 

router.get('/goods/skirt', async (ctx) => {

  try {

    if (arrayOfGoods[0].name === "Юбка") {
      const skirt = arrayOfGoods[0]
      ctx.body = skirt
      ctx.response.status = 200
    } else {
      throw new Error('Item not found')
    }
      
  } catch (err) {
      console.log(err);
      ctx.body = err.message
  }
})

// Платье 

router.get('/goods/dress', async (ctx) => {

  try {
    
    if (arrayOfGoods[1].name === "Платье") {
      const dress = arrayOfGoods[1]
      ctx.body = dress
      ctx.response.status = 200
    } else {
      throw new Error('Item not found')
    }
      
  } catch (err) {
      console.log(err);
      ctx.body = err.message
  }
})

// Комбинезон 

router.get('/goods/jumpsuit', async (ctx) => {

  try {

    if (arrayOfGoods[2].name === "Комбинезон") {
      const jumpsuit = arrayOfGoods[2]
      ctx.body = jumpsuit
      ctx.response.status = 200
    } else {
      throw new Error('Item not found')
    }
      
  } catch (err) {
      console.log(err);
      ctx.body = err.message
  }
})

// Рубашка

router.get('/goods/shirt', async (ctx) => {

  try {
    
    if (arrayOfGoods[3].name === "Рубашка") {
      const shirt = arrayOfGoods[3]
      ctx.body = shirt
      ctx.response.status = 200
    } else {
      throw new Error('Item not found')
    }
      
  } catch (err) {
      console.log(err);
      ctx.body = err.message
  }
})

// Пальто

router.get('/goods/trenchcoat', async (ctx) => {

  try {
    
    if (arrayOfGoods[4].name === "Пальто") {
      const trenchcoat = arrayOfGoods[4]
      ctx.body = trenchcoat
      ctx.response.status = 200
    } else {
      throw new Error('Item not found')
    }
      
  } catch (err) {
      console.log(err);
      ctx.body = err.message
  }
})

// Брюки

router.get('/goods/trousers', async (ctx) => {

  try {
    
    if (arrayOfGoods[5].name === "Брюки") {
      const trousers = arrayOfGoods[5]
      ctx.body = trousers
      ctx.response.status = 200
    } else {
      throw new Error('Item not found')
    }
      
  } catch (err) {
      console.log(err);
      ctx.body = err.message
  }
})

app.use(router.routes()).use(router.allowedMethods())

// Logger 

app.use(async (ctx, next) => {
  console.log('request accepted');

  const start = Date.now()
  const ms = Date.now() - start

  console.log(`${ctx.method} ${ctx.url} - ${ms}`);

  ctx.body = 'Hello World'
})