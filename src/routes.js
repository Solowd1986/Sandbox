import MainPage from "./components/Pages/Index/MainPage";
import Category from "./components/Pages/Categorie/Category";
import Product from "./components/Pages/Product/Product";
import Order from "./components/Pages/Order/Order";


const routes = [
    { url: "/", component: MainPage, exact: true },
    { url: "/category/:type", component: Category, exact: true },
    { url: "/category/:type/:sub", component: Category, exact: true },
    { url: "/product/:category/:name", component: Product, exact: true },
    { url: "/order", component: Order, exact: true }
];

export default routes;

