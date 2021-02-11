<?php


sleep(1);

//print json_encode("true");
//die();

require_once "./php/functions/functions.php";
require_once "./php/db/RequestHandler.php";
use php\db\RequestHandler as Request;

spl_autoload_register(function ($class) {
    $path = __DIR__ . DIRECTORY_SEPARATOR . str_replace('\\', '/', $class . '.php');
    if (file_exists($path)) {
        include $path;
    } else {
        echo 'Такой файл не найден по пути : ' . $path . '</br>';
    }
});


//$promo_list = [];
//
//foreach (Request::getPromo(1, "phone_id", "phone_promo") as $k => $v) {
//    $promo = [];
//
//    foreach ($v as $k2 => $v2) {
//        if (!in_array($k2, ["id", "phone_id"])) {
//            if ($k2 === "img_path") {
//                $promo[$k2] = "/static/media/" . "/" . $v2;
//            } else {
//                $promo[$k2] = $v2;
//            }
//        }
//
//    }
//    $promo_list[] = $promo;
//}
//
//
//var_dump_pre($promo_list);

//$result = Request::getOneItem(1, "gadgets");
//var_dump_pre($result);
//die;
//$uri = "api/product/gadgets/3";
//$uri = "api/category/gadgets";


//$arr = array_merge(Request::getCategoryItems("phones"));
//var_dump_pre(shuffle($arr));



if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $uri = trim(filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_URL));
    $prefix = "api/";
    $cnt = strpos($uri, $prefix) + strlen($prefix);
    $res = mb_substr($uri, $cnt, strlen($uri));

    try {
        if ($res === "index") {
            print json_encode(Request::getIndexPageData());

        } elseif (strpos($res, "category") !== false) {
            $category_title = trim(filter_var(substr($res, strpos($res, "/") + 1), FILTER_SANITIZE_STRING));
            print json_encode(Request::getCategoryItems($category_title));

        } elseif (strpos($res, "product") !== false) {
            $list = explode("/", substr($res, strpos($res, "/") + 1));
            $category_title = trim(filter_var($list[0], FILTER_SANITIZE_STRING));
            $product_id = trim(filter_var($list[1], FILTER_SANITIZE_STRING));
            print json_encode(Request::getOneItem($product_id, $category_title));

        } elseif (strpos($res, "lazyload") !== false) {
            // timeout 4 sec maximun, else - error msg
            //sleep(1);
            $category_title = substr($res, strpos($res, "/") + 1);
            //var_dump_pre(Request::getLazyLoadItems($category_title));

        } else {
            return false;
        }
    } catch (\Exception $e) {
        //print "Error with your request" . $e->getMessage();
        print "В ваш запрос беззастенчиво вкралась ошибка.";
    }
}

