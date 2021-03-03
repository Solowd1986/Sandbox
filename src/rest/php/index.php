<?php


//sleep(121);
//header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
//die();

require_once "./php/functions/functions.php";
require_once "./php/db/RequestHandler.php";
use php\db\RequestHandler as Request;


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    $uri = trim(filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_URL));
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
        print json_encode(["error" => true, "server error" => $e . " URI Catch Error API"]);
        //print "В ваш запрос беззастенчиво вкралась ошибка.";
    } catch (\Exception $e) {
        //print "Error with your request" . $e->getMessage();
        print json_encode(["error" => true, "server exception" => $e . " URI Catch Error API"]);
        //print "В ваш запрос беззастенчиво вкралась ошибка.";
    }


}

