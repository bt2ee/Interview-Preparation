```js
const jsonp = ({url, params, callback}) => {
  const getUrl = () => {
    let dataSrc = ''
    for(let key in params) {
      if(params.hasOwnProperty(key)) {
        dataSrc +=`${key}=${params[key]}&`
      }
    }
    dataSrc+= `callback=${callback}`
    return `${url}?${dataSrc}`
  }

  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement('script')
    scriptEle.url = getUrl()
    document.body.append(scriptEle)
    window[callback] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}
```
