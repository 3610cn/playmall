#PlayMall-web-fe

## 接口

### 通用接口
  ```
    {
        "status": 0, // 0成功，非0失败
        "message": ""
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
        status: 0,
        message: "用户名密码不正确"
    }
  ```

### 体验列表


    * URL: /api/getExperienceList
    * METHOD: GET
    * PARAM: 
    * RESPONSE: 

  ```
    {
        "status": 0,
        "message": "",
        "data": [
            {
                "id": "1",
                "name": "欢乐七宝行",
                "category": "旅游",
                "date": "2015-03-08",
                "mall": "正大广场"
            },
            {
                "id": "2",
                "name": "清凉夏天",
                "category": "旅游",
                "date": "2015-03-29",
                "mall": "悉尼歌剧院"
            },
            {
                "id": "3",
                "name": "比基尼特卖",
                "category": "亲子",
                "date": "2015-03-18",
                "mall": "正大广场"
            },
            {
                "id": "4",
                "name": "儿童艺术展",
                "category": "展览",
                "date": "2015-03-12",
                "mall": "世贸广场"
            }
        ]
    }
  ```

### 删除体验

    * URL: /api/deleteExperience
    * METHOD: POST
    * PARAM: 
        * id
    * RESPONSE: 

  ```
    {
        status: 0,
        message: "删除成功"
    }
  ```

### 获取某条体验

    * URL: /api/getExperience/$id $id为空时表示新建，只给一些选项列表
    * METHOD: GET
    * RESPONSE: 

  ```
    {
        "status": 0,
        "message": "",
        "data": {
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
            "tagList": ["好玩", "美女多", "吃的便宜"],
            "content": "我们的祖国是花园"
        }
    }
  ```

### 增加 / 编辑体验

    * URL: /api/addExperience
    * METHOD: POST
    * PARAM: 

  ```
    {
        "id": "1", // 新增时无
        "category": "2", // 分类
        "name": "横系西瓜节", // 活动名称
        "date": "2012-01-01", // 活动时间
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
        status: 0,
        message: "添加成功",
        data: {
            id: 3
        }
    }
  ```

### 上传接口

    * URL: /api/upload/$type  $type取1,2,分别表示大图，小图,对应pic1,pic2
    * METHOD: POST
    * PARAM: 
        * filename: 文件数据
    *RESPONSE

  ```
    {
        status: 0,
        message: "上传成功",
        data: {
            id: 123  // 上传成功后返回的id
        }
    }
  ```
