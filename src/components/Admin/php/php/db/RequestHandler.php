<?php

namespace php\db;
require_once "DbConnect.php";

use php\db\DbConnect as Connect;

class RequestHandler extends DbConnect
{
    public static function getIndexPageData()
    {
        $data['phones'] = self::getCategoryItems("phones", 4);
        $data['gadgets'] = self::getCategoryItems("gadgets", 4);;
        $data['accessoires'] = self::getCategoryItems("accessoires", 4);
        return $data;
    }

    public static function getCategoryItems($category, $limit = null)
    {
        $list = $category . "_list";
        $promo_table = substr($category, 0, strlen($category) - 1) . "_promo";
        $img_table = substr($category, 0, strlen($category) - 1) . "_img";

        $query = $limit ? "SELECT * FROM {$list} LIMIT {$limit}" : "SELECT * FROM {$list}";
        $pdo = Connect::exec()->prepare($query);
        $pdo->execute();
        $list_result = $pdo->fetchAll();

        foreach ($list_result as $item) {
            $id = $item["id"];
            $id_field = substr($category, 0, strlen($category) - 1) . "_id";
            $key = array_search($item, $list_result);

            $list_result[$key]["img"] = self::getImg($id, $id_field, $img_table);
            $list_result[$key]["promo"] = self::getPromo($id, $id_field, $promo_table);
            if ($category === "phones") {
                $spec_table = substr($category, 0, strlen($category) - 1) . "_specifications";
                $list_result[$key]["specifications"] = self::getSpecifications($id, $id_field, $spec_table);
            }
        }
        return $list_result;
    }

    public static function getOneItem($id, $category)
    {
        $list = $category . "_list";
        $promo_table = substr($category, 0, strlen($category) - 1) . "_promo";
        $img_table = substr($category, 0, strlen($category) - 1) . "_img";

        $query = "SELECT * FROM {$list} WHERE id={$id}";
        $pdo = Connect::exec()->prepare($query);
        $pdo->execute();
        $result = $pdo->fetch();

        $id_field = substr($category, 0, strlen($category) - 1) . "_id";
        $result["img"] = self::getImg($id, $id_field, $img_table);
        $result["promo"] = self::getPromo($id, $id_field, $promo_table);
        if ($category === "phones") {
            $spec_table = substr($category, 0, strlen($category) - 1) . "_specifications";
            $result["specifications"] = self::getSpecifications($id, $id_field, $spec_table);
        }
        return $result;
    }


    public static function getLazyLoadItems($category)
    {
        $res = self::getCategoryItems($category);
        shuffle($res);
        return $res;
    }


    public static function getImg($id, $field, $tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename} WHERE {$field}={$id}");
            $pdo->execute();
            return $pdo->fetch();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }

    public static function getPromo($id, $field, $tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename} WHERE {$field}={$id}");
            $pdo->execute();
            return $pdo->fetchAll();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }

    public static function getSpecifications($id, $field, $tablename)
    {
        try {
            $pdo = Connect::exec()->prepare("SELECT * FROM {$tablename} WHERE {$field}={$id}");
            $pdo->execute();
            return $pdo->fetch();
        } catch (\Exception $e) {
            return "Ошибка при операции " . $e->getMessage();
        }
    }
}
