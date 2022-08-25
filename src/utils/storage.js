export const getItem =(name)=>{
  const res =  window.localStorage.getItem(name)
  try {
   return JSON.parse(res)
  } catch (err) {
    return res
  }
}

export const setItem = (name, value) => {
    if(typeof value ==='object'){
        value = JSON.stringify(value)
    }
     window.localStorage.setItem(name,value)

}

export const delItem =name=>{
    window.localStorage.removeItem(name)
}