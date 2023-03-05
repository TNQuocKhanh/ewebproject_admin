export const save = (key, value, expirationSec) => {
  if (!Storage) {
    return false
  }
  const expirationMS = expirationSec * 1000
  const record = {
    value: value,
    timestamp: new Date().getTime() + expirationMS,
  }
  localStorage.setItem(key, JSON.stringify(record))

  return value
}

export const load = (key) => {
  if (!Storage) {
    return false
  }
  try {
    const item = localStorage.getItem(key)
    if (item) {
      const record = JSON.parse(item)
      if (!record) {
        return false
      }
      //return new Date().getTime() < record.timestamp && record.value
      return record.value
    }
  } catch (e) {
    return false
  }
}

export const remove = (key) => {
  if (!Storage) {
    return false
  }
  localStorage.removeItem(key)
}

export const update = (key, value) => {
  if (!Storage) {
    return false
  }
  try {
    const item = localStorage.getItem(key)
    if (item) {
      const record = JSON.parse(item)
      if (!record) {
        return false
      }
      const updatedRecord = { value: value, timestamp: record.timestamp }
      localStorage.setItem(key, JSON.stringify(updatedRecord))
      return updatedRecord
    }
  } catch (e) {
    return false
  }
}

