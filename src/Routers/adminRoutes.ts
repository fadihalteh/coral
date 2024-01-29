import express from 'express';
// import adminBrandRoute from './adminBrandRoute';  // Import your admin-specific route files
// import adminCategoryRoute from './adminCategoryRoute';
import adminRoute from './admin/adminRoute';
import userRoute from './admin/userRoute';


// Import other admin route files as needed

const router = express.Router();

// Middleware specific to admin routes (if any)
// router.use(adminMiddleware);

// Admin-specific routes
// router.use('/brand', adminBrandRoute);
// router.use('/category', adminCategoryRoute);
router.use('/users', userRoute);

router.use('/', adminRoute);
// Add other admin routes as needed

export default router;