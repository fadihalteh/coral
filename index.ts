import express from 'express';
import usersRoute from './src/routers/usersRoute';
import addressesRoute from './src/routers/addressesRoute';
import reviewsRoute from './src/routers/reviewsRoute';
import productRoute from './src/routers/productRoute';
import categoryRoute from './src/routers/categoryRoute';
import brandRoute from './src/routers/brandRoute';
import searchSuggestionsRoute from './src/routers/searchSuggestionsRoute';
// import wishlistRoute from './Routers/wishlistRoute';
import ordersRoute from './src/routers/ordersRoute';
import shoppingCartRoute from './src/routers/shoppingCartRoute';


import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // enable set cookie
}));

app.use(express.json())
app.use('/users', usersRoute);
app.use('/addresses', addressesRoute);
app.use('/reviews', reviewsRoute);
app.use('/products', productRoute);
app.use('/category', categoryRoute);
app.use('/brand', brandRoute);
app.use('/search-suggestions', searchSuggestionsRoute);
// app.use('/wishlist', wishlistRoute);
app.use('/orders', ordersRoute);
app.use('/shopping-cart', shoppingCartRoute);






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


/// added 