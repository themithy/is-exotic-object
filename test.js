
const isExoticObject = require('./index')

test('primitive type', () => {
  expect(isExoticObject()).toBe(false)
  expect(isExoticObject(undefined)).toBe(false)
  expect(isExoticObject(null)).toBe(false)
  expect(isExoticObject(false)).toBe(false)
  expect(isExoticObject('abc')).toBe(false)
  expect(isExoticObject(0)).toBe(false)
  expect(isExoticObject(0n)).toBe(false)
  expect(isExoticObject(Symbol())).toBe(false)
})

test('regular object (via literal)', () => {
  expect(isExoticObject({})).toBe(false)
})

test('regular object (via constructor)', () => {
  expect(isExoticObject(new Set())).toBe(false)
  expect(isExoticObject(new Map())).toBe(false)
  expect(isExoticObject(new WeakSet())).toBe(false)
  expect(isExoticObject(new WeakMap())).toBe(false)
  expect(isExoticObject(new Int8Array())).toBe(false)
})

test('exotic object (via literal)', () => {
  expect(isExoticObject([])).toBe(true)
  expect(isExoticObject(/abc/)).toBe(true)
})

test('exotic object (via constructor)', () => {
  expect(isExoticObject(new Boolean())).toBe(true)
  expect(isExoticObject(new Number())).toBe(true)
  expect(isExoticObject(new String())).toBe(true)
  expect(isExoticObject(new Date())).toBe(true)
  expect(isExoticObject(new Array())).toBe(true)
  expect(isExoticObject(new Error())).toBe(true)
})

test('arguments object', () => {
  function get() {
    return arguments
  }

  expect(isExoticObject(get())).toBe(true)
})

test('function object', () => {
  expect(isExoticObject(function() {})).toBe(true)
  expect(isExoticObject(() => {})).toBe(true)
})

test('mismatched array prototype', () => {
  const arr = []

  Object.setPrototypeOf(arr, Object.prototype)

  expect(isExoticObject(arr)).toBe(true)
})

test('regular prototype', () => {
  expect(isExoticObject(Object.prototype)).toBe(false)
})

test('exotic prototype', () => {
  expect(isExoticObject(Boolean.prototype)).toBe(true)
  expect(isExoticObject(Number.prototype)).toBe(true)
  expect(isExoticObject(String.prototype)).toBe(true)
  expect(isExoticObject(Date.prototype)).toBe(true)
  expect(isExoticObject(Array.prototype)).toBe(true)
  expect(isExoticObject(Error.prototype)).toBe(true)
})

test('proxy', () => {
  expect(isExoticObject(new Proxy({}, {}))).toBe(true)
  expect(isExoticObject(new Proxy(new Date(), {}))).toBe(true)
})

