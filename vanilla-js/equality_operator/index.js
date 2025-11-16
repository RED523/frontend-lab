// 等于、不等于
null == undefined // true
undefined == 0 // false
null == 0 // false

'NaN' == NaN // false
6 ==  NaN // false
NaN == NaN // false
NaN != NaN // true

true == 1 // true
true == 2 // false
false == 0 // true

'5' == 5 // true
'5' == true // false
[] == 0 // true
[] == [] // false
[] == ![] // true

// 全等、不全等
null === undefined // false
undefined === 0 // false
null === 0 // false

'NaN' === NaN // false
6 ===  NaN // false
NaN === NaN // false
NaN !== NaN // true

true === 1 // false
true === 2 // false
false === 0 // false

'5' === 5 // false
'5' === true // false
[] === 0 // false
[] === [] // false
[] === ![] // false


// 例子：
55 == '55' // true 转换后相等
55 === '55' // false，不相等，因为数据类型不同

55 != '55' // fasle，转换后相等
55 !== '55' // true，不相等，因为数据类型不同

