export const set = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const get = (key) => {
  const item = localStorage.getItem(key)
  if (item) {
    const obj = JSON.parse(item)
    return obj
  } else {
    return null
  }
}

export const remove = (key) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}

export const locset = (key, value) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const locget = (key) => {
  const item = localStorage.getItem(key)
  if (item) {
    const obj = JSON.parse(item)
    return obj
  } else {
    return null
  }
}

export const locremove = (key) => {
  localStorage.removeItem(key)
}

export const locclear = () => {
  localStorage.clear()
}
