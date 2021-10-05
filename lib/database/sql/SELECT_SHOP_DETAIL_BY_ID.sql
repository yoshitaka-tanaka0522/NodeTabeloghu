SELECT
  shop_category.id,
  shop_category.name,
  shop_category.post_code,
  shop_category.address,
  shop_category.tel,
  shop_category.holiday,
  shop_category.seats,
  shop_category.price_range,
  shop_category.score,
  shop_category.geolocation_latitude,
  shop_category.geolocation_longitude,
  -- 出力の際にカンマ区切りで結合する
  GROUP_CONCAT(m_category.name separator ', ') as categories
FROM
(
  SELECT
    *
  FROM
    (
      -- t_shopテーブルからidを指定してデータを取得する
      SELECT * FROM t_shop WHERE id = ?
    ) as shop
  -- データに対してLEFTJOIN(表で一致しない項目も表示する外部結合)でカテゴリと結合する
  -- t_shop_categoryテーブルのshop_idとt_shopテーブルのidを結合してshop_categoryのテーブル名にする
  LEFT JOIN t_shop_category ON shop.id = t_shop_category.shop_id
) as shop_category
LEFT JOIN m_category ON shop_category.category_id = m_category.id
-- 複数カテゴリ設定されている可能性があるのでグルーピングを行う
GROUP BY shop_category.id