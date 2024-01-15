import express from 'express';
import categoryRoute from './Routers/categoryRoute';


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use('/category', categoryRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
