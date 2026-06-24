---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 4fcbb670faf26cd09d1ed1c99000473f_a28d1918684a11f18805525400d9a7a1
    ReservedCode1: LSODPKG3XEDWEBF3rlm9EBD7lmYk+jcDSwe1CxMNP3uN9em0GziR74/6KB/D43KRuJAQRIJS+hjNU3mH/1um4jCWg3zWEmK/4uIaQ3zwJMf+saxCFvTbjg1F+jWUu0n5fm0yeiVX6nyXX+8CjCTvOIRIUI1MYpeOHXT616aqwfw/BVp7eTuxBfFSPi8=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 4fcbb670faf26cd09d1ed1c99000473f_a28d1918684a11f18805525400d9a7a1
    ReservedCode2: LSODPKG3XEDWEBF3rlm9EBD7lmYk+jcDSwe1CxMNP3uN9em0GziR74/6KB/D43KRuJAQRIJS+hjNU3mH/1um4jCWg3zWEmK/4uIaQ3zwJMf+saxCFvTbjg1F+jWUu0n5fm0yeiVX6nyXX+8CjCTvOIRIUI1MYpeOHXT616aqwfw/BVp7eTuxBfFSPi8=
---



# Purple Leaf 产品目录

Purple Leaf 户外家具产品目录及销量分析系统，基于纯前端 HTML 构建，无需服务器即可使用。

## 文件说明

| 文件 | 功能 |
|---|---|
| `index.html` | 产品目录主页，3409 个 SKU，按三级品类导航，支持产品卡浏览、销量评估跳转 |
| `l1_sales_summary.html` | 一级品类（7个）销量汇总，折线图 + 排行表格，支持 9 个指标切换 |
| `l2_sales_summary.html` | 二级品类（35个）销量汇总，折线图 + 排行表格 |
| `l3_sales_summary.html` | 三级品类（327个）销量汇总，折线图 + 排行表格，支持 TOP N 筛选 |
| `sales_trend_template.html` | 单个 SKU 销量趋势页面，按 SKU 跳转，展示 5 个月分平台销量折线图 |
| `Purple Leaf Catalog.xlsx` | 产品数据源（"网站抓取"子表） |
| `2026_06_11_235857-2026-5月-US-核心sku销量月统计_xxx.xlsx` | 销量数据源（含一级/二级/三级分类汇总子表） |

## 数据来源

- 产品信息：`Purple Leaf Catalog.xlsx` → 网站抓取子表
- 销量数据：`2026-5月-US-核心sku销量月统计.xlsx` → 一级/二级/三级分类汇总子表
- 覆盖平台：Amazon US / Shopify US / Wayfair US / Home Depot / Target / Overstock / Lowes / Walmart

## 使用方式

1. 直接在浏览器打开 `index.html`
2. 左侧导航栏按三级品类浏览产品
3. 点击产品卡上的"销量评估"查看该 SKU 销量趋势
4. 导航栏底部"品类销量汇总"可跳转 L1/L2/L3 汇总页
5. 汇总页支持图例点击高亮、分平台切换、TOP N 筛选

## 更新方式

1. 修改本地 Excel 数据源
2. 借助 Marvis AI 重新生成 HTML 文件
3. `git add` → `git commit` → `git push`
*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
