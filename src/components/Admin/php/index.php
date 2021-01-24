<?php

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

$uri = trim(filter_var($_SERVER["REQUEST_URI"], FILTER_SANITIZE_STRING));
//$uri = "api/product/gadgets/3";
$prefix = "api/";
$cnt = strpos($uri, $prefix) + strlen($prefix);
$res = mb_substr($uri, $cnt, strlen($uri));

if ($res === "index") {
    //var_dump_pre(Request::getIndexPageData());
    //print json_encode(Request::getIndexPageData());
} elseif (strpos($res, "category") !== false) {
    $category_title = substr($res, strpos($res, "/") + 1);
    //var_dump_pre(Request::getCategoryItems($category_title));
    //print $category_title;
} elseif (strpos($res, "product") !== false) {
    $list = explode("/", substr($res, strpos($res, "/") + 1));
    $category_title = $list[0];
    $product_id = $list[1];
    $result = Request::getOneItem($product_id, $category_title);

    //print $category_title;
    //print $product_id;
    //$data = "";
    //print json_encode($data);
} elseif (strpos($res, "lazyload") !== false) {
    // timeout 4 sec maximun, else - error msg
    //sleep(1);

    $category_title = substr($res, strpos($res, "/") + 1);
    //var_dump_pre(Request::getLazyLoadItems($category_title));
} else {
    print false;
}


die();




/*
 * Пути для звпуска от папки dist
 */
//require_once realpath('vendor/autoload.php');

//require_once "./php/functions/functions.php";


/*
 * Пути для работы без папки dist, просто запуск скриптов от data.php
 */
//require_once realpath('../../vendor/autoload.php');
//require_once realpath('php/functions/functions.php');


/*
 * Пути для запуска скрипта самостоятельно, но нужно прописать новые пути автозагрузки
 * и вызвать php composer.phar dump-autoload
 * Пути для работы отдельного модуля:
 *  "php\\db\\": "src/js/php/db",
 *  "php\\auth\\": "src/js/php/auth",
 *  "php\\auth\\helpers\\": "src/js/php/auth/helpers"
 *
 * Пути для работы модуля от папки dist:
 *  "php\\db\\": "php/db",
 *  "php\\auth\\": "php/auth",
 *  "php\\auth\\helpers\\": "php/auth/helpers"
 *
 *  Вызови - php composer.phar dump-autoload + npm run prod-reload
 */


require_once "./php/db/DbConnect.php";
require_once "./php/db/DbQueryCore.php";
require_once "./php/db/UsersModel.php";
require_once "./php/db/AdminModel.php";


use \php\auth\helpers\UserToken as UserToken;
use \php\auth\UserRegistration as UserRegistration;
use \php\auth\helpers\DataSanitizeHelper as DataSanitizeHelper;
use \php\db\DbQueryCore;
use php\db\RequestHandler;


$passedData = [
    "login" => "bob",
    "email" => "lo1go@yaw.ru",
    "psw" => 1234,
];


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Сюда обращается метод submitAddRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Add") {
        $table = $_POST['table'];
        DbQueryCore::insert($table, $_POST);
        print json_encode($_POST);
        exit();
    }
    //Сюда обращается метод submitEditRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Edit") {
        $id = $_POST['id'];
        $table = $_POST['table'];
        DbQueryCore::update($id, $table, $_POST);
        //print json_encode($_POST);
        exit();
    }
    //Сюда обращается метод submitDeleteRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Delete") {
        $id = $_POST['id'];
        $table = $_POST['table'];
        DbQueryCore::delete($table, $id);
        print json_encode($_POST);
        exit();
    }


    if (isset(getallheaders()["Token-Status"])) {
        $token = $_POST["token"];

        if (UserToken::verifyUserData($token)) {
            if (UserToken::hasTokenExpired($token)) {
                print UserToken::setTokenParams($token, ["has-expired" => true]);
            } else {
                print UserToken::packedData(["allowed" => true, "header" => getallheaders()["Token-Status"]]);
                //print UserToken::packedData(["allowed" => true]);
            }
        } else {
            print UserToken::packedData(["allowed" => false]);
            //var_dump_pre("Token wrong");
        }
        exit();

    }


    if (isset(getallheaders()["Data-Type"])) {

        $sanitizedPost = DataSanitizeHelper::run($_POST);

        $tokenSuccess = [
            "result" => true,
            "tokenName" => "auth",
            "uid" => 34467,
            "allowed" => true,
            "path" => "/",
            "tokenId" => "sdf657gfhytutyutyu",
            "name" => "Stan",
            "role" => "user"
        ];

        $expired = [
            "has-expired" => false,
            "expiration-date" => (time() + 3600) * 1000,
            "max-age" => 3600
        ];

        //print UserToken::packedData($tokenData);


        $responce["errors"] = [];
        if (!empty(UserRegistration::checkUserRegistrationFields(DataSanitizeHelper::run($sanitizedPost)))) {
            $responce["errors"]["registrationFormErrors"] = UserRegistration::checkUserRegistrationFields(DataSanitizeHelper::run($sanitizedPost));
        }

        if (empty($responce["errors"])) {
            print UserToken::packedData(array_merge($sanitizedPost, $tokenSuccess, $expired));
        } else {
            print UserToken::packedData(array_merge($sanitizedPost, $tokenSuccess, $expired, $responce["errors"]));
        }


        //print json_encode($responce);
    }

    if (isset($_POST["auth-submit"])) {
        print "post from auth-submit";
    }

    if (empty($_POST)) {
        print "empty arr\n";
    }
}


if ($_SERVER["REQUEST_METHOD"] == "GET") {

    //Сюда обращается метод showListOfTables из класса AdminInitPanel
    if (array_key_exists('tables', $_GET)) {
        $res = DbQueryCore::getAllTablesNames();
        print json_encode($res);
        exit();
    }

    //Сюда обращается метод addRecord из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Add-Get-Fields") {
        $res = DbQueryCore::getFieldNamesOfOneTable($_GET["table"]);
        print json_encode($res);
        exit();
    }

    //Сюда обращается метод editItem из класса AdminInitPanel
    if (isset(getallheaders()["Request-Type"]) && getallheaders()["Request-Type"] === "Record-Edit-Get-Item") {
        $res = DbQueryCore::getItem($_GET["table"], $_GET["id"]);
        print json_encode($res);
        exit();
    }

    //Сюда обращается метод renderTableRecords из класса AdminInitPanel
    if (array_key_exists('table', $_GET)) {
        $res = DbQueryCore::getAll($_GET["table"]);
        print json_encode($res);
        exit();
    }
}


if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    if (array_key_exists('id', $_GET)) {
        print false;
        //print "data with id = " . $_GET['id'] . " deleted";
    }
}
