<?php


sleep(22);

//print json_encode("true");
//die();


require_once "./php/functions/functions.php";
require_once "./php/db/RequestHandler.php";

use php\db\RequestHandler as Request;

//spl_autoload_register(function ($class) {
//    $path = __DIR__ . DIRECTORY_SEPARATOR . str_replace('\\', '/', $class . '.php');
//    if (file_exists($path)) {
//        include $path;
//    } else {
//        echo 'Такой файл не найден по пути : ' . $path . '</br>';
//    }
//});


//$str = "/src/rest/php/index.php/api/product/phones/1";
//$str2 = preg_match("@product\/([a-z]*)\/([0-9]*)$@", $str, $matches);
//if ($str2) {
//    var_dump_pre($matches);
//} elseif ($str2 === 0) {
//    var_dump_pre("zero");
//} elseif ($str2 === false) {
//    var_dump_pre("erorr reg");
//}


//
//$str = "/src/rest/php/index.php/api/product/phones/1";
//$str2 = preg_match("@product\/([a-z]*)@", $str, $matches);
//
//if (!empty($matches[1] && !empty($matches[2]))) {
//} else {
//    throw new \Error("URI not have paramtres");
//}


//die;

if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $uri = trim(filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_URL));
//    print "result - " . $uri;
//    die();
    $prefix = "api/";
    $cnt = strpos($uri, $prefix) + strlen($prefix);
    $res = mb_substr($uri, $cnt, strlen($uri));

    try {
        //  api\/index$ - true/false check
        if ($res === "index") {
            print json_encode(Request::getIndexPageData());

        } elseif (strpos($res, "category") !== false) {

            //     category\/([a-z]*)$
            $category_title = trim(filter_var(substr($res, strpos($res, "/") + 1), FILTER_SANITIZE_STRING));
            print json_encode(Request::getCategoryItems($category_title));

        } elseif (strpos($res, "product") !== false) {
            //   product\/([a-z]*)\/([0-9]*)$

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
            throw new Error("Page with this parametres not exist");
            //return json_encode(["error" => "URI Route Error API"]);
        }
    } catch (\Error $e) {
        //print "Error with your request" . $e->getMessage();
        print json_encode(["server error" => $e . " URI Catch Error API"]);
        //print "В ваш запрос беззастенчиво вкралась ошибка.";
    } catch (\Exception $e) {
        //print "Error with your request" . $e->getMessage();
        print json_encode(["server exception" => $e . " URI Catch Error API"]);
        //print "В ваш запрос беззастенчиво вкралась ошибка.";
    }


}

