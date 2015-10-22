#PlayMall-web-fe

## 接口

### 通用接口
  ```
    {
        "status": 0, // 0成功，1登录超时或登录不成功，２其他业务错误
        "msg": {} // msg为object, 对应每个字段的错误，全局错误用global字段
    }

  ```

### 登录接口

    * URL: /api/login
    * METHOD: POST
    * PARAM: 
        * username
        * password
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "用户名或者错误"
        }
    }
  ```

### 获取系统信息

    * URL: /api/getConst
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            // 商场列表
            "mallList": [
                {
                   "text": "杭州",
                   "value": "1",
                   "children": [
                        {
                           "text": "百联商场",
                           "value": "1"
                        },
                        {
                           "text": "瑞都国际",
                           "value": "2"
                        },
                        ...
                   ]
                },
                {
                   "text": "上海",
                   "value": "2",
                   "children": [
                        {
                           "text": "中环百货",
                           "value": "3"
                        },
                        {
                           "text": "南都商城",
                           "value": "4"
                        },
                        ...
                   ]
                }
            ],
            // 搜乐分类
            "experienceCategoryList": [
                {
                    "text": "胃口",
                    "value": 1
                },
                {
                    "text": "美美",
                    "value": 2
                },
                {
                    "text": "童趣",
                    "value": 3
                }
            ],
            // 大咖分类
            "bigshotCategoryList": [
                {
                    "text": "大咖类别胃口",
                    "value": 1
                },
                {
                    "text": "美美",
                    "value": 2
                },
                {
                    "text": "童趣",
                    "value": 3
                },
                {
                    "text": "奢侈",
                    "value": 4
                }
            ],
            // 角色列表
            "roleList": [
                {
                    "text": "ADMIN",
                    "value": "ADMIN"
                },
                {
                    "text": "MALL",
                    "value": "MALL"
                },
                {
                    "text": "SHOP",
                    "value": "SHOP"
                },
                {
                    "text": "SHOPKEEPER",
                    "value": "SHOPKEEPER"
                }
            ]
        }
    }
  ```

### 获取用户信息

    * URL: /api/getCurrentUser
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            "username": "dandanmao"
        }
    }
  ```

### 体验列表 / 大咖列表


    * URL: /api/getExperienceList (体验)
    * URL: /api/getBigshotList (大咖)
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": [
            {
                "id": "1",
                "name": "欢乐七宝行",
                "category": "旅游",
                "startTime": "2015-03-08 17:00",
                "endTime": "2015-03-09 17:00",
                "starNum": 3,
                "mall": "正大广场",
                "mallId": "2",
                "couponId": "32" // 仅针对已绑定优惠信息的体验
            },
            {
                "id": "2",
                "name": "清凉夏天",
                "category": "旅游",
                "startTime": "2015-03-08 17:00",
                "endTime": "2015-03-09 17:00",
                "starNum": 3,
                "mall": "悉尼歌剧院",
                "mallId": "3"
            },
            {
                "id": "3",
                "name": "比基尼特卖",
                "category": "亲子",
                "startTime": "2015-03-08 17:00",
                "endTime": "2015-03-09 17:00",
                "starNum": 3,
                "mall": "正大广场",
                "mallId": "4"
            },
            {
                "id": "4",
                "name": "儿童艺术展",
                "category": "展览",
                "startTime": "2015-03-08 17:00",
                "endTime": "2015-03-09 17:00",
                "starNum": 3,
                "mall": "世贸广场",
                "mallId": "2"
            }
        ]
    }
  ```

### 删除体验 / 大咖 / 评论

    * URL: /api/deleteExperience (体验)
    * URL: /api/deleteBigshot (大咖)
    * METHOD: POST
    * PARAM: 
        * id
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "删除成功"
        }
    }
  ```

### 获取某条体验

    * URL: /api/getExperience/$id $id为空时表示新建，只给一些选项列表 (体验)
    * URL: /api/getBigshot/$id $id为空时表示新建，只给一些选项列表 (大咖)
    * METHOD: GET
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            "id": "123",
            "name": "横溪西瓜节",
            "tagList": ["好玩", "美女多", "吃的便宜"],
            "content": "我们的祖国是花园",
            "category": "1",
            "starNum": 3,
            "city": "1",
            "mall": "2",
            "pic1": "http://www.xxx.com/xx.png",
            "pic2": "http://www.xxx.com/xx2.png"
        }
    }
  ```

### 增加 / 编辑体验 / 大咖

    * URL: /api/addExperience (体验)
    * URL: /api/addBigshot (大咖)
    * METHOD: POST
    * PARAM: 

  ```
    {
        "id": "1", // 新增时无
        "category": "2", // 分类
        "name": "横系西瓜节", // 活动名称
        "startTime": "2012-01-01 15:00", // 开始时间
        "endTime": "2012-01-01 17:00", // 结束时间
        "starNum": 3,
        "pic1": "123", // 图1,大图
        "pic2": "456", // 图2,小图
        "mall": "3", // 商场
        "content": "这里是很多很多html", // 活动描述
        "tagList": "美女多,开门早,吃的多" //标签
    }
  ```

    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "添加成功"
        },
        "data": {
            "id": 3
        }
    }
  ```

### 上传接口

    * URL: /api/upload/$type  $type取1,2,分别表示体验/大咖的大图，小图,对应pic1,pic2, $type取3表示抢鲜图片
    * METHOD: POST
    * PARAM: 
        * filename: 文件数据
    *RESPONSE

  ```
    {
        "status": 0,
        "msg": {
            "global": "尺寸不符合要求"
        },
        "data": {
            "id": 123  // 上传成功后返回的id
        }
    }
  ```

### 抢鲜列表


    * URL: /api/getFreshList
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": "",
        "data": [
            {
                "id": "1",
                "title": "快来抢免费更衣间",
                "shop": "有衣裤",
                "mall": "正大广场",
                "count": "100人",
                "startTime": "2015-03-08",
                "endTime": "2015-03-08"
            },
            {
                "id": "1",
                "title": "快来抢免费更衣间",
                "shop": "有衣裤",
                "mall": "正大广场",
                "count": "100人",
                "startTime": "2015-03-08",
                "endTime": "2015-03-08"
            },
            {
                "id": "2",
                "title": "一折甩卖破鞋",
                "shop": "有衣裤",
                "mall": "正大广场",
                "count": "120人",
                "startTime": "2015-03-08",
                "endTime": "2015-03-08"
            },
            {
                "id": "3",
                "title": "快来抢免费更衣间",
                "shop": "有衣裤",
                "mall": "正大广场",
                "count": "1000人",
                "startTime": "2015-03-08",
                "endTime": "2015-03-08"
            },
            {
                "id": "4",
                "title": "冰棍免费吃",
                "shop": "口渴了",
                "mall": "长泰广场",
                "count": "1000人",
                "startTime": "2015-03-08",
                "endTime": "2015-03-08"
            }
        ]
    }
  ```

### 删除抢鲜

    * URL: /api/deleteFresh
    * METHOD: POST
    * PARAM: 
        * id
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "删除成功"
        }
    }
  ```

### 获取某条抢鲜信息

    * URL: /api/getFresh/$id $id为空时表示新建，只给选项列表: mallList
    * METHOD: GET
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            "title": "快来抢更衣间特权",
            "imageList": "http://g.hiphotos.baidu.com/image/pic/item/1b4c510fd9f9d72aee889e1fd22a2834359bbbc0.jpg,http://image.tianjimedia.com/uploadImages/2011/253/5SGVFD0KYZW2.jpg,http://file.iqilu.com/upimg/userup/0810/2111313M4c.jpg,http://pic38.nipic.com/20140306/251960_131610098000_2.jpg",
            "mall": "3",
            "shop": "口渴了",
            "count": "100",
            "content": "我们的祖国是花园",
            "startTime": "2012-05-21 10:00",
            "endTime": "2012-05-22 10:00"
        }
    }
  ```

### 获取店铺列表

    * URL: /api/getShop
    * METHOD: GET
    * PARAM: 
        * mall // 商场id
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": null,
        "data":[
            {"value": 1, "text": "星巴克"},
            {"value": 3, "text": "哈根达斯"},
            {"value": 6, "text": "克里斯丁"},
            {"value": 18, "text": "SPOONCHEL"}
        ]
    }
  ```

### 增加 / 编辑抢鲜

    * URL: /api/addFresh
    * METHOD: POST
    * PARAM: 

  ```
    "id": 2,
    "title": "快来抢更衣间特权",
    "mall": "3",
    "shop": "口渴了",
    "count": "100",
    "content": "我们的祖国是花园",
    "startTime": "2012-05-21 10:00",
    "endTime": "2012-05-22 10:00",
    "imageList": "id1,id2,id3"
  ```

    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "添加成功"
        },
        "data": {
            "id": 3
        }
    }
  ```

### 验证优惠码

    * URL: /api/fresh/verify
    * METHOD: POST
    * PARAM: 

  ```
    "code": 1231u3123123
  ```

    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "code": "验证码错误"
        }
    }
  ```

### 评论列表

    * URL: /api/getCommentList
    * METHOD: GET
    * PARAM: 

    * RESPONSE: 

  ```
{
    "status": 0,
    "msg": "",
    "data": [
        {
            "id": "1",
            "username": "panzhexu",
            "content": "快来抢免费更衣间"
        },
        {
            "id": "2",
            "username": "zhoutianli",
            "content": "快来抢免费更衣间"
        },
        {
            "id": "3",
            "username": "panzhexu",
            "content": "快来抢免费更衣间"
        },
        ...
    ]
}
  ```

## 富媒体编辑器

需求要求编辑器有更多功能，因此对编辑器进行了升级，相应有一些接口变化：

### 获取配置项（编辑器加载时首先访问后端，获取配置文件）

    * 
    * URL: /api/editor?action=config
    * METHOD: GET
    * PARAM: 
        参考 URL
    * RESPONSE

    > 读取`/mockup/editor.json`内容返回

### 上传接口

    * URL: /api/editor?action=uploadimage
    * METHOD: POST
    * PARAM: 
        * uploadFile: 文件数据
    *RESPONSE

  ```
    {
        "url":"http://img.playmall.cn.com/336eba80b4d3ac466e8d4f068c490558/6eb21c482b50318f4f97721150f483e1.jpg",
        "state":"SUCCESS"
    }
  ```


## 用户管理

### 用户列表

    * URL: /api/getUserList
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": "",
        "data": [
            {
                "id": "1",
                "username": "dandanmao",
                "phone": "18612290791",
                "role": "ADMIN",
                "mallid": 1, // 可选，针对购物中心用户
                "mallname": "百联南方购物中心", // 可选，针对购物中心用户
                "shopid": 1, // 或mallid、无
                "shopname": "果然点" // 或mallid、无
            },
            {
                "id": "2",
                "username": "panzhexu",
                "phone": "18612290792",
                "role": "SHOP",
                "mallid": 1, // 可选，针对购物中心用户
                "mallname": "百联南方购物中心", // 可选，针对购物中心用户
                "shopid": 1, // 可选，针对店铺用户
                "shopname": "真滋味" // 可选，针对店铺用户
            },
            {
                "id": "3",
                "username": "loki",
                "phone": "18612290793",
                "role": "MALL",
                "mallid": 1, // 可选，针对购物中心用户
                "mallname": "百联南方购物中心", // 可选，针对购物中心用户
                "shopid": 1, // 可选，针对店铺用户
                "shopname": "真滋味" // 可选，针对店铺用户
            },
            ...
        ]
    }
  ```

### 增加 / 编辑用户

    * URL: /api/addUser
    * METHOD: POST
    * PARAM: 

  ```
    "id": 3,
    "username": "dandanmao",
    "password": "xxxx"
    "phone": "18622271876",
    "type": 1 // 1ADMIN 2MALL 3SHOPKEEPER 4SHOP
    "mallid": 1 // 商城相关用户专用, optional
    "shopid": 1 // 商户相关用户专用, optional
  ```

    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "添加成功"
        },
        "data": {
            "id": 3
        }
    }
  ```

### 删除用户

    * URL: /api/deleteUser
    * METHOD: POST
    * PARAM: 
        * id
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "删除成功"
        }
    }
  ```

### 获取某个用户信息

    * URL: /api/getUser/$id
    * METHOD: GET
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            "id": 1,
            "username": "",
            "password": "",
            "phone": 18877722211,
            "type": "ADMIN", // ADMIN MALL SHOPKEEPER SHOP
            "mallid": 1, // 可选，针对购物中心用户
            "mallname": "百联南方购物中心", // 可选，针对购物中心用户
            "shopid": 1, // 可选，针对店铺用户
            "shopname": "真滋味" // 可选，针对店铺用户
        }
    }
  ```

## 优惠管理

### 获取优惠列表

    * URL: /api/getCouponList
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": [
            {
                "id": 1,
                "title": "快来抢优惠啦",
                "content": "快快来抢优惠啦快来抢优惠啦快来抢优惠啦快来抢优惠啦来抢优惠啦",
                "startTime": "2016-10-07 14:00",
                "endTime": "2016-10-17 14:00",
                "oldPrice": "25.00",
                "price": "12.00",
                "shop": "优衣库",
                "count": 20
            },
            {
                "id": 2,
                "title": "快来抢优惠啦",
                "content": "快快来抢优惠啦快来抢优惠啦快来抢优惠啦快来抢优惠啦来抢优惠啦",
                "startTime": "2016-10-07 14:00",
                "endTime": "2016-10-17 14:00",
                "oldPrice": "25.00",
                "price": "12.00",
                "shop": "优衣库",
                "count": 20
            },
            {
                "id": 3,
                "title": "快来抢优惠啦",
                "content": "快快来抢优惠啦快来抢优惠啦快来抢优惠啦快来抢优惠啦来抢优惠啦",
                "startTime": "2016-10-07 14:00",
                "endTime": "2016-10-17 14:00",
                "oldPrice": "25.00",
                "price": "12.00",
                "shop": "优衣库",
                "count": 20
            },
            ...
        ]
    }
  ```

### 获取某条优惠信息

    * URL: /api/getCoupon/$id
    * METHOD: GET
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            "id": 3,
            "title": "快来抢优惠啦",
            "content": "快快来抢优惠啦快来抢优惠啦快来抢优惠啦快来抢优惠啦来抢优惠啦",
            "startTime": "2016-10-07 14:00",
            "endTime": "2016-10-17 14:00",
            "oldPrice": "25.00",
            "price": "12.00",
            "shop": "优衣库",
            "count": 20
        }
    }
  ```

### 增加 / 编辑优惠

    * URL: /api/addCoupon
    * METHOD: POST
    * PARAM: 

  ```
    "id": 3,
    "title": "快来抢优惠啦",
    "content": "快快来抢优惠啦快来抢优惠啦快来抢优惠啦快来抢优惠啦来抢优惠啦",
    "startTime": "2016-10-07 14:00",
    "endTime": "2016-10-17 14:00",
    "oldPrice": "25.00",
    "price": "12.00",
    "shop": "优衣库",
    "count": 20
  ```

    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "添加成功"
        },
        "data": {
            "id": 3
        }
    }
  ```

### 删除优惠

    * URL: /api/deleteCoupon
    * METHOD: POST
    * PARAM: 
        * id
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "删除成功"
        }
    }
  ```

### 获取指定mall下的优惠列表


    * URL: /api/getCouponListByMallId
    * METHOD: GET
    * PARAM: 
        * mallId // 指定mall的id
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {},
        "data": {
            "couponList": [
                {
                    "text": "快来抢免费更衣间",
                    "value": "1"
                },
                {
                    "text": "夏季大坑宾",
                    "value": "2"
                }
            ]
        }
    }
  ```

### 体验 / 大咖绑定优惠信息


    * URL: /api/bindCoupon
    * METHOD: POST
    * PARAM: 
        * id // 搜乐或者大咖id
        * cid // 优惠信息id
        * type // 1: experience / 2: bigshot
    * RESPONSE: 

  ```
    {
        "status": 0,
        "msg": {
            "global": "添加优惠成功"
        }
    }
  ```

### 新增mall

    * URL: /api/addMall
    * METHOD: POST
    * PARAM:
        * id: "123" // 如果id不为空则为修改
        * name: "长泰广场"
        * logo: "xxx.jpg"
        * cityid: 1
        * address: "上海市黄浦区淮海中路1号",
        * phone: 1887776666 
    * RESPONSE:
        

```

    {
        "status":0,
        "msg": {
            "global": ""
        }
    }

```

### 列表mall

    * URL: /api/getMallList
    * METHOD: GET
    * PARAM:        
    * RESPONSE:

```
    {
        "status":0,
        "msg": {
            "global": ""
        },
        "data": [
            {
                "id": 1,
                "name": "百联中环购物中心",
                "logo": "xxx.png",
                "address": "普陀区真光路1288号百联购物广场店",
                "phone": 18877722211,
                "cityid": 123,
                "cityname": "杭州"
            },
            ...
        ]
    }
```

### 删除mall
    * URL: /api/deleteMall
    * METHOD: POST
    * PARAM: 
        * id: 123

    * RESPONSE:

```
    {
        "status":0,
        "msg": {
            "global": ""
        }
    }
```

### 查单个mall
    * URL: /api/getMall/$id
    * Method: GET
    * PARAM:
        * id: 123

    * RESPONSE:

```
    {
        "status": 0,
        "msg": {
            "global": ""
        }，
        "data": {
            "id": 1,
            "name": "",
            "logo": "",
            "address": "{\"latitude\":31.245392,\"longitude\":121.382919,\"name\": \"普陀区真光路1288号百联购物广场店\"}",
            "phone": 18877722211,
            "cityid": 123            
        }
    }
```


### 新增 / 修改shop

    * URL: /api/addShop
    * METHOD: POST
    * PARAM:
        * id: "123" // 如果id不为空，则修改
        * name: ""
        * logo: ""
        * cityid: 1
        * mallid: 1
        * address: "上海市黄浦区淮海中路1号",
        * phone: 1887776666 
    * RESPONSE:

```
    {
        "status":0,
        "msg": {
            "global": "添加成功"
        }
    }
```

### 列表shop
    * URL: /api/getShopList
    * METHOD: GET
    * PARAM:        
    * RESPONSE:

```
    {
        "status":0,
        "msg": {
            "global": ""
        },
        "data": [
            {
                "id": 1,
                "name": "",
                "logo": "",
                "address": "普陀区真光路1288号百联购物广场店",
                "phone": 18877722211,
                "cityname": "杭州",
                "mallname": "百联中环",
                "cityid": 123,
                "mallid": 1
            },
            ...
        ]
    }
```

### 删除shop
    * URL: /api/deleteShop
    * METHOD: POST
    * PARAM: 
        * id: 123

    * RESPONSE:

```
    {
        "status":0,
        "msg": {
            "global": "删除成功"
        }
    }
```

### 查单个shop
    * URL: /api/getShop/$id
    * Method: GET
    * PARAM:
        * id: 123

    * RESPONSE:

```
    {
        "status": 0,
        "msg": {
            "global": ""
        }，
        "data": {
            "id": 1,
            "name": "",
            "logo": "",
            "address": "{\"latitude\":31.245392,\"longitude\":121.382919,\"name\": \"普陀区真光路1288号百联购物广场店\"}",
            "phone": 18877722211,
            "cityid": 123,
            "mallid": 1
        }
    }
```
