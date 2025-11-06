import $http from 'axios'

// Mock服务，基础路径 (到 Apifox 的云端Mock中找)
const baseUrl = 'https://m1.apifoxmock.com/m1/593188-0-default';

// 查询指定 id 的宠物
$http.get(`${baseUrl}/pet/1`).then(res => {
  console.log('查询---》', res.data);
}).catch(err => {
  console.log('查询---》', err);
})

// 新增
$http.post(`${baseUrl}/pet`, {
  name: '太牛了',
  status: 'sold'
}).then(res => {
  console.log('新增---》', res.data);
}).catch(err => {
  console.log('新增---》', err);
})

// 修改
$http.put(`${baseUrl}/pet`, {
  name: 'test',
}).then(res => {
  console.log('修改---》', res.data);
}).catch(err => {
  console.log('修改---》', err);
})

// 删除
$http.delete(`${baseUrl}/pet/0`).then(res => {
  console.log('删除---》', res.data);
}).catch(err => {
  console.log('删除---》', err);
})
