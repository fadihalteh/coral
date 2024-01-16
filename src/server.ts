import express from 'express';
import usersRoute from './Routers/usersRoute';
import addressesRoute from './Routers/addressesRoute';
import reviewsRoute from './Routers/reviewsRoute';
import productRoute from './Routers/productRoute';
import categoryRoute from './Routers/categoryRoute';
import brandRoute from './Routers/brandRoute';
import searchSuggestionsRoute from './Routers/searchSuggestionsRoute';
import wishlistRoute from './Routers/wishlistRoute';
import ordersRoute from './Routers/ordersRoute';
import shoppingCartRoute from './Routers/shoppingCartRoute';


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
app.use('/wishlist', wishlistRoute);
app.use('/orders', ordersRoute);
app.use('/shopping-cart', shoppingCartRoute);






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


/// added 