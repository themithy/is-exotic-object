
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

  const builtinTag = Object.prototype.toString.apply(obj).slice(8, -1)

  return builtinTag === 'Array'
    || builtinTag === 'Arguments'
    || builtinTag === 'Error'
    || builtinTag === 'Boolean'
    || builtinTag === 'Number'
    || builtinTag === 'String'
    || builtinTag === 'Date'
    || builtinTag === 'RegExp'
}

module.exports = isExoticObject

