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


    /**
     * 1. Приходит категория, например, phones - из этого слова создаются имена таблиц БД,
     *    к котормы будут запросы.
     * 2. Количество результатов выдачи можно ограничить через limit
     * @param $category
     * @param null $limit
     * @return array
     */
    public static function getCategoryItems($category, $limit = null)
    {
        $list = $category . "_list";
        $promo_table = substr($category, 0, strlen($category) - 1) . "_promo";
        $img_table = substr($category, 0, strlen($category) - 1) . "_img";

        $query = $limit ? "SELECT * FROM {$list} LIMIT {$limit}" : "SELECT * FROM {$list}";
        $pdo = Connect::exec()->prepare($query);
        $pdo->execute();
        $list_result = $pdo->fetchAll();


        $queryCategory = "SELECT * FROM category WHERE category_alias='{$category}'";
        $pdo = Connect::exec()->prepare($queryCategory);
        $pdo->execute();
        $list_main = $pdo->fetch();


        foreach ($list_result as $item) {
            $id = $item["id"];
            $id_field = substr($category, 0, strlen($category) - 1) . "_id";
            $key = array_search($item, $list_result);

            $img_list = [];
            foreach (self::getImg($id, $id_field, $img_table) as $k => $v) {
                if (!in_array($k, ["id", $id_field])) {
                    $img_list[$k] = "/static/media/" . $category . "/" . $v;
                }
            }
            $list_result[$key]["img"] = $img_list;

            $list_result[$key]["promo"] = self::getPromo($id, $id_field, $promo_table);
            if ($category === "phones") {
                $spec_table = substr($category, 0, strlen($category) - 1) . "_specifications";
                $list_result[$key]["specifications"] = self::getSpecifications($id, $id_field, $spec_table);
            }
        }

        $list_main = [
            "alias" => $list_main["category_title"],
            "title" => $list_main["category_alias"],
            "img" => [
                "path" => $list_main["img_prefix"] . "/" . $list_main["category_title_img"],
                "alt" => $list_main["category_title"],
            ],
        ];

        return ["main" => $list_main, "data" => $list_result];
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
