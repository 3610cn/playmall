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
            ]
        }
    }
  ```

### 获取用户信息

    * URL: /api/getUser
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
                "mall": "悉尼歌剧院",
                "mallId": "3"
            },
            {
                "id": "3",
                "name": "比基尼特卖",
                "category": "亲子",
                "startTime": "2015-03-08 17:00",
                "endTime": "2015-03-09 17:00",
                "mall": "正大广场",
                "mallId": "4"
            },
            {
                "id": "4",
                "name": "儿童艺术展",
                "category": "展览",
                "startTime": "2015-03-08 17:00",
                "endTime": "2015-03-09 17:00",
                "mall": "世贸广场",
                "mallId": "2"
            }
        ]
    }
  ```

### 删除体验 / 大咖

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

### 获取指定mall下的优惠列表


    * URL: /api/getCouponList
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


    * URL: /api/addCoupon
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
            "categoryList": [
                {
                    "text": "胃口",
                    "value": "1"
                },
                {
                    "text": "美美",
                    "value": "2"
                },
                {
                    "text": "童趣",
                    "value": "3"
                },
                {
                    "text": "奢侈",
                    "value": "4"
                },
                {
                    "text": "化妆",
                    "value": "5"
                },
                {
                    "text": "教育",
                    "value": "6"
                }
            ],
            "tagList": ["好玩", "美女多", "吃的便宜"],
            "content": "我们的祖国是花园",
            "category": "1",
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
            "mallList": [
                {
                    "text": "正大广场",
                    "value": "1"
                },
                {
                    "text": "世贸广场",
                    "value": "2"
                },
                {
                    "text": "长泰广场",
                    "value": "3"
                }
            ],
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
