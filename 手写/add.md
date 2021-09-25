```js
let a = "123456789012345678";
let b = "1";
// 1. 先找出最大的长度的数
// 2. 给较小的数填充向前填充0
function add(a ,b){
  let maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, '0');
  b = b.padStart(maxLength, '0');
  // 123456789012345678
  // 000000000000000001
  let res = ''; // 返回的值
  let sum = 0; // 同位相加的和
  let t = 0; // 同位相加和的十位数
  let r = 0; // 同位相加和的个位数
  for(let i = maxLength - 1; i >= 0; i--) {
    sum = parseInt(a[i]) + parseInt(b[i]) + t;
    t = Math.floor(sum / 10) // 拿到十位数的值
    r = sum % 10; // 拿到个位数的值
    res = r + res;
  }
  return res;
}

console.log(add(a, b)); // 123456789012345679
```
