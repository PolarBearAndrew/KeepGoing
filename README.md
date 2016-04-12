# KeepGoing
A todo list  for my self

[![Throughput Graph](https://graphs.waffle.io/PolarBearAndrew/KeepGoing/throughput.svg)](https://waffle.io/PolarBearAndrew/KeepGoing/metrics)

## How to start

#### clientApp dev server

安裝相依套件

`$ npm install`

請動開發用伺服器

`$ npm start`

#### serverApp

安裝相依套件

`$ npm install`

安裝 babel-register

`$ npm install babel-register`

啟動伺服器 (在 KeepGoing/ 執行)

`$ sh start.sh`


*************************

#### 基本功能

* 新增代辦項目
	* 新增時選擇篩選優先權, 可以直接新增該優先權的工作項目
	* 新增時預設為明天的工作 // todo
	* 新增時預設該工作項目所需時間為 30 min // todo
	* 新增時預設敘述為 null // todo


#### 篩選功能

篩選時取以下條件交集的代辦項目

* 篩選已完成/未完成/全部, doubleClick 可以重置整個篩選功能
* 篩選優先權
* 篩選在時間內能完成的工作
* 新增時選擇篩選優先權, 可以直接新增該優先權的工作項目
