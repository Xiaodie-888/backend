# 后台管理系统后端

这是一个基于 Express.js 和 MySQL 构建的后台管理系统后端，提供完整的用户管理、产品管理、日志管理等功能。

## 功能特点

- 用户认证
  - 账号注册
  - 用户登录
  - 密码加密存储
  - JWT token 认证

- 用户信息管理
  - 修改用户基本信息（昵称、年龄、性别、邮箱）
  - 修改密码
  - 头像上传及更新
  - 账号绑定
  - 用户删除

- 系统管理
  - 用户状态管理（冻结/解冻）
  - 分页获取用户列表
  - 部门用户管理
  - 登录日志
  - 操作日志

- 产品管理
  - 产品入库申请
  - 产品出库管理
  - 产品信息编辑
  - 产品审核流程
  - 出库记录管理

## 技术栈

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Multer (文件上传)
- Bcrypt (密码加密)
- Joi (数据验证)

## 项目结构

```
backend/
├── app.js              # 应用入口文件
├── router/             # 路由文件
│   ├── user.js        # 用户相关路由
│   ├── login.js       # 登录相关路由
│   ├── login_log.js   # 登录日志路由
│   ├── product.js     # 产品管理路由
│   └── operation_log.js# 操作日志路由
├── router_handler/     # 路由处理器
│   ├── user.js        # 用户相关处理逻辑
│   ├── login.js       # 登录相关处理逻辑
│   ├── login_log.js   # 登录日志处理逻辑
│   ├── product.js     # 产品管理处理逻辑
│   └── operation_log.js# 操作日志处理逻辑
├── db/                 # 数据库配置
│   └── index.js       # 数据库连接配置
├── jwt_config/        # JWT配置
│   └── index.js       # JWT密钥配置
└── public/            # 静态资源
    └── upload/        # 用户头像存储目录
```

## API 接口说明

### 用户认证
- POST `/login/register` - 用户注册
- POST `/login/login` - 用户登录

### 用户信息管理
- POST `/user/changeName` - 修改用户昵称
- POST `/user/changeAge` - 修改用户年龄
- POST `/user/changeSex` - 修改用户性别
- POST `/user/changeEmail` - 修改用户邮箱
- POST `/user/changePassword` - 修改用户密码
- POST `/user/uploadAvatar` - 上传用户头像
- POST `/user/bindAccount` - 绑定用户账号
- POST `/user/changeLevel` - 修改用户部门或职位
- POST `/user/getUserInfo` - 获取用户信息

### 用户管理
- POST `/user/banUser` - 冻结用户
- POST `/user/thawUser` - 解冻用户
- POST `/user/deleteUser` - 删除用户
- POST `/user/getStatusUserList` - 获取状态用户列表
- POST `/user/getUserListForPage` - 获取指定页码的用户列表
- POST `/user/getUserLength` - 获取用户总数
- POST `/user/getUserByDepartment` - 获取指定部门的用户列表
- POST `/user/UserLengthForDepartment` - 获取指定部门总人数
- POST `/user/UserLengthForStatus` - 获取指定状态总人数

### 产品管理
- POST `/product/addProduct` - 产品申请入库
- POST `/product/getProductList` - 获取产品列表
- POST `/product/getProductLength` - 获取产品列表长度
- POST `/product/editProduct` - 编辑产品
- POST `/product/searchProduct` - 搜索产品
- POST `/product/deleteProduct` - 删除产品
- POST `/product/Outbound` - 出库申请
- POST `/product/getApplyList` - 获取审核列表
- POST `/product/getApplyLength` - 获取审核列表长度
- POST `/product/audit` - 产品审核
- POST `/product/withdraw` - 撤回申请
- POST `/product/againApply` - 再次申请
- POST `/product/getOutboundList` - 获取出库产品列表
- POST `/product/searchOutbound` - 搜索出库数据
- POST `/product/cleanOutbound` - 清空出库列表
- POST `/product/productInfo` - 获取当前产品信息

### 登录日志
- POST `/login_log/loginLog` - 记录登录日志
- POST `/login_log/getLoginLogList` - 获取登录记录列表
- POST `/login_log/getLoginLogLength` - 获取登录记录总数
- POST `/login_log/searchLoginLogList` - 搜索最近十条登录记录
- POST `/login_log/clearLoginLogList` - 清空登录日志
- POST `/login_log/getDayAndNumber` - 获取每日登录统计

### 操作日志
- POST `/operation_log/operationLog` - 记录操作日志
- POST `/operation_log/getOperationLogList` - 获取操作记录列表
- POST `/operation_log/getOperationLogLength` - 获取操作日志总数
- POST `/operation_log/searchOperation` - 搜索指定日期操作日志
- POST `/operation_log/clearOperationList` - 清空操作日志

## 安装和运行

1. 克隆项目
```bash
git clone [项目地址]
cd backend
```

2. 安装依赖
```bash
npm install
```

3. 配置数据库
- 创建 MySQL 数据库
- 修改 `db/index.js` 中的数据库配置

4. 配置 JWT
- 修改 `jwt_config/index.js` 中的 JWT 密钥

5. 启动服务器
```bash
npm start
```

## 数据库表结构

### users 表 - 用户信息表
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account VARCHAR(12) NOT NULL,
  password VARCHAR(60) NOT NULL,
  name VARCHAR(4),
  age INT,
  sex TINYINT,
  email VARCHAR(50),
  image_url VARCHAR(255),
  status TINYINT,
  department VARCHAR(50),
  position VARCHAR(50),
  create_time DATETIME,
  update_time DATETIME
);
```

### product 表 - 产品信息表
```sql
CREATE TABLE product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(20) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_category VARCHAR(50),
  product_unit VARCHAR(20),
  warehouse_number INT,
  product_single_price DECIMAL(10,2),
  product_create_person VARCHAR(50),
  product_create_time DATETIME,
  product_update_time DATETIME,
  audit_status VARCHAR(20),
  product_out_number INT,
  apply_person VARCHAR(50),
  apply_notes TEXT,
  apply_time DATETIME,
  audit_person VARCHAR(50),
  audit_time DATETIME,
  audit_notes TEXT
);
```

### out_product 表 - 出库记录表
```sql
CREATE TABLE out_product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id VARCHAR(20) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_unit VARCHAR(20),
  product_out_number INT,
  product_single_price DECIMAL(10,2),
  audit_person VARCHAR(50),
  apply_person VARCHAR(50),
  apply_time DATETIME,
  audit_time DATETIME
);
```

### login_log 表 - 登录日志表
```sql
CREATE TABLE login_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account VARCHAR(12) NOT NULL,
  name VARCHAR(50),
  email VARCHAR(50),
  login_time DATETIME
);
```

### operation_log 表 - 操作日志表
```sql
CREATE TABLE operation_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  account VARCHAR(12) NOT NULL,
  name VARCHAR(50),
  content TEXT,
  level VARCHAR(20),
  status VARCHAR(20),
  time DATETIME
);
```

## 安全特性

1. 密码加密：使用 bcrypt 进行密码加密存储
2. 数据验证：使用 Joi 进行请求数据验证
3. Token 认证：使用 JWT 进行用户认证
4. 文件安全：上传文件自动重命名，避免文件名冲突

## 注意事项

1. 上传头像大小限制：建议在前端进行图片压缩
2. 文件类型限制：只允许上传图片文件
3. 邮箱格式验证：需符合标准邮箱格式
4. 密码要求：
   - 长度：6-12位
   - 必须包含字母和数字
   - 不能是纯数字或纯字母

## 开发环境

- Node.js >= 12.0.0
- MySQL >= 5.7


## 联系方式
22xrpeng@stu.edu.cn
如有问题或建议，欢迎提出 Issue 或发起 Pull Request。 