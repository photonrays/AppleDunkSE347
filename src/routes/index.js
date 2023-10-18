import Home from "../Pages/Home";
import DetailProduct from "../Pages/DetailProduct";
import NotFound from "../Pages/NotFound";
import Order from "../Pages/Order";
import News from "../Pages/News";
import NewsPage from '../Pages/NewsCategory/components/NewsPage'

import Info from "../Pages/Customer/Info";
import Addresses from "../Pages/Customer/Addresses";
import History from "../Pages/Customer/History";
import ChangePassword from "../Pages/Customer/ChangePassword";
import Avatar from "../Pages/Customer/Avatar";
import ProductReviews from "../Pages/Customer/ProductReviews";
import Addaddress from "../Pages/Customer/addAddress";
import Orderdetail from "../Pages/Customer/Orderdetail";
import Baohanh from "../Pages/Customer/Baohanh";

import Billdetail from "../Pages/Payment/Billdetail";
import PaymentFinish from "../Pages/Payment/PaymentFinish";

import Login from "../Pages/Login_Register/Login";
import Register from "../Pages/Login_Register/Register";
import Policy from "../Pages/Policy";
import NewPass from "../Pages/Login_Register/ForgetPass/NewPass";
import SearchResults from "../Pages/SearchResults";
import ProductList from "../Pages/ProductList";
import AnotherProductList from "../Pages/ProductList/Components/AnotherProductList";
import NewsCategory from "../Pages/NewsCategory";
import BaohanhDetail from "../Pages/Customer/BaohanhDetail";
import KhuyenMai from "../Pages/KhuyenMai";
import Store from "../Pages/Store";
import HomeSecond from "../SecondTemplate/HomeSecond";

const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/home", component: <HomeSecond /> },
    { path: "/detailproduct", component: <DetailProduct /> },
    { path: "/*", component: <NotFound />, layout: null },
    { path: "/cart", component: <Order /> },
    { path: "/store", component: <Store /> },

    { path: "/iphone", component: <ProductList type="iPhone" /> },
    { path: "/iphone/:slug", component: <AnotherProductList type="iPhone" /> },

    { path: "/ipad", component: <ProductList type="iPad" /> },
    { path: "/ipad/:slug", component: <AnotherProductList type="iPad" /> },

    { path: "/mac", component: <ProductList type="Mac" /> },
    { path: "/mac/:slug", component: <AnotherProductList type="Mac" /> },

    { path: "/watch", component: <ProductList type="Watch" /> },
    { path: "/watch/:slug", component: <AnotherProductList type="Watch" />},

    { path: "/am-thanh", component: <ProductList type="Âm thanh" /> },
    { path: "/am-thanh/:slug", component: <AnotherProductList type="Âm thanh" /> },
    
    { path: "/phu-kien", component: <ProductList type="Phụ kiện" /> },
    { path: "/phu-kien/:slug", component: <AnotherProductList type="Phụ kiện" /> },

    { path: "/tin-tuc", component: <News /> },
    { path: "/tin-tuc/:id", component: <NewsPage /> },
    { path: "/apple-news", component: <NewsCategory /> },
    { path: "/news-review", component: <NewsCategory /> },
    { path: "/tin-kham-pha", component: <NewsCategory /> },
    { path: "/thu-thuat", component: <NewsCategory /> },
    { path: "/tin-khac", component: <NewsCategory /> },

    { path: "/customer/info", component: <Info /> },
    { path: "/customer/addresses", component: <Addresses /> },
    { path: "/customer/addAddress", component: <Addaddress /> },
    { path: "/customer/history", component: <History /> },
    { path: "/customer/changePassword", component: <ChangePassword /> },
    { path: "/customer/avatar", component: <Avatar /> },
    { path: "/customer/productReviews", component: <ProductReviews /> },
    { path: "/customer/baohanh", component: <Baohanh /> },
    { path: "/customer/baohanh/detail/:id", component: <BaohanhDetail /> },
    { path: "/khuyenmai", component: <KhuyenMai /> },

    { path: "/detailproduct/:id", component: <DetailProduct /> },
    {
        path: "/customer/orderdetail/:id",
        component: <Orderdetail />,
    },
    { path: "/billdetail", component: <Billdetail /> },
    { path: "/paymentfinish", component: <PaymentFinish /> },

    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/resetpass/:id/:token", component: <NewPass /> },
    { path: "/policy", component: <Policy /> },

    { path: "/search", component: <SearchResults /> },
];

export { publicRoutes };
