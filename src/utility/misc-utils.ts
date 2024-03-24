function extract(object: any, keyList: string[]) {
  if (typeof object !== "object" || object === null) {
    throw new Error(
      "GENERIC_OBJECT_NOT_OBJECT " + "Expected object to be an object"
    );
  }
  let newObject: any = {};
  for (let key of keyList) {
    if (!object.hasOwnProperty(key)) {
      throw new Error(
        "GENERIC_OBJECT_KEY_MISSING" + `Expected object to have key "${key}"`
      );
    }
    newObject[key] = object[key];
  }
  return newObject;
}

function strip(object: any, keyList: string[]): void {
  if ("object" !== typeof object) {
    return;
  }
  if (Array.isArray(object)) {
    object.forEach((_object) => strip(_object, keyList));
    return;
  }
  for (let key of keyList) {
    if (object.hasOwnProperty(key)) {
      delete object[key];
    }
  }
  return;
}

function createDebouncedMethod(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

export function arrayDistinct(array) {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}


export { extract, strip, createDebouncedMethod };
