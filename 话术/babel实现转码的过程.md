babel 主要作用是转译代码，让低端运行环境(如浏览器和 node )能够认识并执行

### 原理
parser -> transform -> generator

parser 通过此法分析和语法分析将代码转成 AST 树，通过 transform 将 ES6 的 AST 转成 ES5 的 AST，在这部分便可以进行插件操作，generator 将 AST 转成源码

> 词法分析将字符串形式的代码转换为**令牌（token）**，语法分析将令牌转成 AST 形式。
