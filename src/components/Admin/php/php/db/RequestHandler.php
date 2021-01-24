<?php

namespace php\db;
require_once "DbConnect.php";

use php\db\DbConnect as Connect;

class RequestHandler extends DbConnect
{
    public static function getAll()
    {
        $data['phones'][] = "";
        $data['gadgets'][] = "";
        $data['accessoires'][] = "";

        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM category");
            $pdo->execute();
            return $pdo->fetchAll();
        } catch (\Exception $e) {
            return "Ошибка при операции getItem " . $e->getMessage();
        }
    }

    public static function getIndexList($category)
    {
        if ($category === "phones") {
            $list = "phones_list";
            $spec = "phone_specifications";
            $promo = "phone_promo";
            $img = "phone_img";

            try {
                $pdo = Connect::exec()->prepare("SELECT * FROM {$list} LIMIT 4");
                $pdo->execute();
                $list_result = $pdo->fetchAll();

                foreach ($list_result as $item) {
                    $id = $item["id"];

                    $pdo_spec = Connect::exec()->prepare("SELECT * FROM {$spec} WHERE phone_id={$id}");
                    $pdo_spec->execute();
                    $list_spec = $pdo_spec->fetchAll();
                    var_dump($list_spec);


                }
                return $list_result;
            } catch (\Exception $e) {
                return \php\helpers\Output::show("Ошибка при операции getItem " . $e->getMessage());
            }
        } else {
            $list = $category . "_list";
            $promo = $category . "_promo";
            $img = $category . "_img";

            return true;
        }

//        $itemList = "SELECT * FROM {$category} LIMIT 4";
//        try {
//            $pdo = \php\db\DbConnect::exec()->prepare("SELECT * FROM {$category} LIMIT 4");
//            $pdo->execute();
//            $list = $pdo->fetchAll();
//            foreach ($list as $item) {
//                $id = $item["id"];
//
//                $pdo = \php\db\DbConnect::exec()->prepare("SELECT * FROM {$category} LIMIT 4");
//                $pdo->execute();
//                $list = $pdo->fetchAll();
//                print $id;
//            }
//            return "";
//        } catch (\Exception $e) {
//            return \php\helpers\Output::show("Ошибка при операции getItem " . $e->getMessage());
//        }


    }
}
