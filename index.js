
/*
 * Does not work well with proxies.
 */
function isExoticObject(obj) {
  const type = typeof obj

  if (type === 'function') {
    return true
  }

  if (obj === null || type !== 'object') {
    return false
  }

  const builtinTag = Object.prototype.toString.apply(obj).split(' ')[1]

  return builtinTag !== 'Object]'
}

module.exports = isExoticObject

