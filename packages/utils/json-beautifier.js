/* eslint-disable no-misleading-character-class */
let
  escapable = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  keyable = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/,
  gap,
  indent,
  meta = {    // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    "'": "\\'",
    '\\': '\\\\'
  },
  rep;

export default function convert(object, options = {}) {
  var space = options.space || 2,
  dropQuotesOnKeys = options.dropQuotesOnKeys == false ? false: true,
  dropQuotesOnNumbers = options.dropQuotesOnNumbers || false,
  inlineShortArrays = options.inlineShortArrays || false,
  inlineShortArraysDepth = options.inlineShortArraysDepth || 1,
  quoteType = options.quoteType || 'single',
  minify = options.minify || false;
  
  if (dropQuotesOnNumbers) walkObjectAndDropQuotesOnNumbers(object);

  var result = stringify(object, null, minify ? undefined : space, dropQuotesOnKeys, quoteType);
  if (inlineShortArrays && !minify) {
    var newResult = inlineShortArraysInResult(result);
    if (inlineShortArraysDepth > 1) {
      for (var i = 1; i < inlineShortArraysDepth; i++) {
        result = newResult;
        newResult = inlineShortArraysInResult(result);
        if (newResult == result) break;
      }
    }
    result = newResult;
  }

  return result;
}

function walkObjectAndDropQuotesOnNumbers(object) {
  if (!isObject(object)) return;
  var keys = Object.keys(object);
  if (!keys) return;

  keys.forEach(function (key) {
    var value = object[key];
    if (typeof value == 'string') {
      var number = value - 0;
      object[key] = isNaN(number) ? value : number;
    } else if (isObject(value) || Array.isArray(value)) {
      walkObjectAndDropQuotesOnNumbers(value);
    }
  });
}

function isObject(o) {
  return o && typeof o == 'object';
}

// Collapses arrays inline when they fit inside the specified width 
// in characters (including indentation).
function inlineShortArraysInResult(result, width) {
  width || (width = 80);
  if (typeof width != 'number' || width < 20) {
    throw "Invalid width '" + width + "'. Expecting number equal or larger than 20."
  }
  var list = result.split('\n'),
    i = 0,
    start = null,
    content = [];
  while (i < list.length) {
    var startMatch = !!list[i].match(/\[/),
      endMatch = !!list[i].match(/\],?/);

    if (startMatch && !endMatch) {
      content = [list[i]];
      start = i;
    } else if (endMatch && !startMatch && start) {
      content.push((list[i] || '').trim());
      var inline = content.join(' ');
      if (inline.length < width) {
        list.splice(start, i - start + 1, inline);
        i = start;
      }
      start = null;
      content = [];
    } else {
      if (start) content.push((list[i] || '').trim());
    }
    i += 1;
  }
  return list.join('\n');
}

function stringify(value, replacer, space, dropQuotesOnKeys, quoteType) {

  // The stringify method takes a value and an optional replacer, and an optional
  // space parameter, and returns a JSON text. The replacer can be a function
  // that can replace values, or an array of strings that will select the keys.
  // A default replacer method can be provided. Use of the space parameter can
  // produce text that is more easily readable.

  var i;
  gap = '';
  indent = '';

  // If the space parameter is a number, make an indent string containing that
  // many spaces.

  if (typeof space === 'number') {
    for (i = 0; i < space; i += 1) {
      indent += ' ';
    }

    // If the space parameter is a string, it will be used as the indent string.

  } else if (typeof space === 'string') {
    indent = space;
  }

  // If there is a replacer, it must be a function or an array.
  // Otherwise, throw an error.

  rep = replacer;
  if (replacer && typeof replacer !== 'function' &&
    (typeof replacer !== 'object' ||
      typeof replacer.length !== 'number')) {
    throw new Error('JSON.stringify');
  }

  // Make a fake root object containing our value under the key of ''.
  // Return the result of stringifying the value.

  return str('', { '': value }, dropQuotesOnKeys, quoteType);
}

function str(key, holder, dropQuotesOnKeys, quoteType) {

  // Produce a string from holder[key].

  var i,          // The loop counter.
    k,          // The member key.
    v,          // The member value.
    length,
    mind = gap,
    partial,
    value = holder[key];

  // If the value has a toJSON method, call it to obtain a replacement value.

  if (value && typeof value === 'object' &&
    typeof value.toJSON === 'function') {
    value = value.toJSON(key);
  }

  // If we were called with a replacer function, then call the replacer to
  // obtain a replacement value.

  if (typeof rep === 'function') {
    value = rep.call(holder, key, value);
  }

  // What happens next depends on the value's type.

  switch (typeof value) {
    case 'function':
      return value;
    case 'string':
      return quote(value, quoteType);

    case 'number':

      // JSON numbers must be finite. Encode non-finite numbers as null.

      return isFinite(value) ? String(value) : 'null';

    case 'boolean':
    case 'null':

      // If the value is a boolean or null, convert it to a string. Note:
      // typeof null does not produce 'null'. The case is included here in
      // the remote chance that this gets fixed someday.

      return String(value);

    // If the type is 'object', we might be dealing with an object or an array or
    // null.

    case 'object':

      // Due to a specification blunder in ECMAScript, typeof null is 'object',
      // so watch out for that case.

      if (!value) {
        return 'null';
      }

      // Make an array to hold the partial results of stringifying this object value.

      gap += indent;
      partial = [];

      // Is the value an array?

      if (Object.prototype.toString.apply(value) === '[object Array]') {

        // The value is an array. Stringify every element. Use null as a placeholder
        // for non-JSON values.

        length = value.length;
        for (i = 0; i < length; i += 1) {
          partial[i] = str(i, value, dropQuotesOnKeys, quoteType) || 'null';
        }

        // Join all of the elements together, separated with commas, and wrap them in
        // brackets.

        v = partial.length === 0
          ? '[]'
          : gap
            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
            : '[' + partial.join(',') + ']';
        gap = mind;
        return v;
      }

      // If the replacer is an array, use it to select the members to be stringified.

      if (rep && typeof rep === 'object') {
        length = rep.length;
        for (i = 0; i < length; i += 1) {
          if (typeof rep[i] === 'string') {
            k = rep[i];
            v = str(k, value, dropQuotesOnKeys, quoteType);
            if (v) {
              partial.push((dropQuotesOnKeys ? condQuoteKey(k, quoteType) : quote(k, quoteType)) + (gap ? ': ' : ':') + v);
            }
          }
        }
      } else {

        // Otherwise, iterate through all of the keys in the object.

        for (k in value) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            v = str(k, value, dropQuotesOnKeys, quoteType);
            if (v) {
              partial.push((dropQuotesOnKeys ? condQuoteKey(k, quoteType) : quote(k, quoteType)) + (gap ? ': ' : ':') + v);
            }
          }
        }
      }

      // Join all of the member texts together, separated with commas,
      // and wrap them in braces.

      v = partial.length === 0
        ? '{}'
        : gap
          ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
          : '{' + partial.join(',') + '}';
      gap = mind;
      return v;
  }
}

function quote(string, quoteType) {

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

  escapable.lastIndex = 0;

  var surroundingQuote = '"';
  if (quoteType === 'single') {
    surroundingQuote = "'";
  }

  return escapable.test(string) ? surroundingQuote + string.replace(escapable, function (a) {
    var c = meta[a];
    return typeof c === 'string'
      ? c
      : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
  }) + surroundingQuote : surroundingQuote + string + surroundingQuote;
}

function condQuoteKey(string, quoteType) {
  return keyable.test(string) ? string : quote(string, quoteType);
}