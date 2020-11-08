import MainPage from "~components/Pages/Index/MainPage";
import Category from "~components/Pages/Category/Category";
import Product from "~components/Pages/Product/Product";
import Order from "~components/Pages/Order/Order";
import Error404 from "./components/Core/Error404/Error404";


const routes = [
    { url: "/", component: MainPage, exact: true },
    { url: "/category/:type", component: Category, exact: true },
    { url: "/product/:category/:id", component: Product, exact: true },
    { url: "/order", component: Order, exact: true },
    { url: "/404", component: Error404, exact: true }
];

export default routes;

