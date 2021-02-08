<?php


//sleep(1);

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


if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $uri = trim(filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_STRING));
    //$uri = "api/product/gadgets/3";
    //$uri = "api/category/gadgets";
    $prefix = "api/";
    $cnt = strpos($uri, $prefix) + strlen($prefix);
    $res = mb_substr($uri, $cnt, strlen($uri));

    try {
        if ($res === "index") {
            print json_encode(Request::getIndexPageData());

        } elseif (strpos($res, "category") !== false) {
            $category_title = substr($res, strpos($res, "/") + 1);
            print json_encode(Request::getCategoryItems($category_title));

        } elseif (strpos($res, "product") !== false) {
            $list = explode("/", substr($res, strpos($res, "/") + 1));
            $category_title = $list[0];
            $product_id = $list[1];
            $result = Request::getOneItem($product_id, $category_title);

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
        print "В ваш запрос беззастенчиво закралась ошибка.";
    }
}

