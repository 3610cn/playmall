#PlayMall-web-fe

## 接口

### 通用接口
  ```
    {
        "status": 0, // 0成功，非0失败
        "message": ""
    }

  ```

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
