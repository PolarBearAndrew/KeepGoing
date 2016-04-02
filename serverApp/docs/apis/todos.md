
### GET /api/v1/todos

* 取得所有待辦事項清單

#### returns

``` js
data: [
	{
		id: 48,
		title: "做報告",
		desc: null,
		type: 'none',
		needTime: 30,
		expectAt: "2016-03-26T09:03:37.000Z",
		endAt: "2016-03-29T14:52:52.000Z",
		completed: true
	},
	{
		id: 49,
		title: "寫作業",
		desc: null,
		type: 'none',
		needTime: 30,
		expectAt: "2016-03-26T09:03:41.000Z",
		endAt: null,
		completed: false
	},
]
```

***********

### POST /api/v1/todo

* 建立新的代辦事項

#### params

name | type | desc
---- | ---- | ----
title | string, isRequired |
desc | string, isRequired |
type | string, isRequired |
needTime | number, isRequired |
expectAt | date, isRequired |
endAt | date, default null |

#### returns

name | desc
---- | ----
data | id

``` js
{
	data : 1
}
```

*************

### PUT /api/v1/todo/:id

* 修改 todo 資料
* 完成/取消完成/刪除 不建議使用這個端點

#### params

name | type | desc
---- | ---- | ----
title | string, isRequired |
desc | string, isRequired |
type | string, isRequired |
needTime | number, isRequired |
expectAt | date, isRequired |
endAt | date, default null |

**************

### PUT /api/v1/todos/:id/complete

* 完成代辦事項

#### returns

name | desc
---- | ----
data | id

``` js
{
	data : 1
}
```

**************

### PUT /api/v1/todos/:id/undo

* 取消完成代辦事項

#### returns

name | desc
---- | ----
data | id

``` js
{
	data : 1
}
```

**************

### DELETE /api/v1/todos/:id

* 刪除代辦事項
* 並不會真正刪除, 僅 trashed 藍為設為 true

#### returns

name | desc
---- | ----
data | id

``` js
{
	data : 1
}
```
