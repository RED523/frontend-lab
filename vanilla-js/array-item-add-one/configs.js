document.getElementById('btnone').addEventListener('click', () => {
  const list = [1,2,3,4,5];

  // 方法一：for 循环
  for(let i = 0; i < list.length; i++) {
      list[i]++;
  }
  console.log('方法一：for 循环 -->', list);
})

document.getElementById('btnotwo').addEventListener('click', () => {
  const list = [1,2,3,4,5];

  // 方法二：forEach
  list.forEach((item, index) => list[index]++)
  console.log('方法二：forEach -->', list)
  // 或者
  list.forEach((item, index, self) => self[index]++) // 可以不使用外面的 list
  console.log('方法二：forEach（不使用外面的 list）--> ', list)
})

document.getElementById('btnthree').addEventListener('click', () => {
  const list = [1,2,3,4,5];

  // 方法三：map
  list.map((item, index) => list[index]++)
  console.log('方法三：map --> ', list)
  // 或者
  list.map((item, index, self) => self[index]++) // 可以不使用外面的 list
  console.log('方法三：map（不使用外面的 list）--> ', list)
})


