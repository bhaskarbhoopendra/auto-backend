import { Router } from 'express';
import AuthRouter from '../modules/users/user.routes';
import BrandRouter from '../modules/brands/brand.routes';
import CategoryRouter from '../modules/category/category.routes';
import ProductRouter from '../modules/products/product.routes';
import CartRouter from '../modules/cart/cart.routes';
import WishlistRouter from '../modules/wishlist/wishlist.routes';
import RecommendationRouter from '../modules/recommended/recommended.routes';
import RatingRouter from '../modules/ratings/rating.routes';
const routes = Router();

routes.use('/users', AuthRouter);
routes.use('/brands', BrandRouter);
routes.use('/categories', CategoryRouter);
routes.use('/products', ProductRouter);
routes.use('/cart', CartRouter);
routes.use('/wishlist', WishlistRouter);
routes.use('/recommendations', RecommendationRouter);
routes.use('/ratings', RatingRouter);

export default routes;
