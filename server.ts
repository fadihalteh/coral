import express from 'express';
import categoryRoute from './Routers/categoryRoute';
import brandRoute from './Routers/brandRoute';


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use('/category', categoryRoute);
app.use('/brand', brandRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
