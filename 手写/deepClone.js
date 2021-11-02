function deepClone(obj) {
  if (!obj && typeof obj !== "obj") {
    throw new Error("error argument");
  }
  const targetObj = Array.isArray(obj)?[]:{}
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepClone(obj[key])
      } else {
        targetObj[key] = obj[key]
      }
    }
  }
  return targetObj
}
