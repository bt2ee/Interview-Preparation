```js
function hasPrototypeProperty(obj, name) {
    return !obj.hasOwnProperty(name) && (name in obj);
}
```
