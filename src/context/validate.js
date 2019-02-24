import {castInteger, castNumber, castString} from './cast';
import {isString, isInteger, isNumber, isBoolean} from 'lodash';
function validateDataset(data, schema) {
  let rowNumber = 0;
  const errors = data.data.reduce((errors, row) => {
    Object.values(schema).forEach((i) => {
      if (!validateItem(row[i.name], i.type)) {
        const error = {
          row: rowNumber,
          field: i.name,
          message: `${row[i.name]} is not a valid ${i.type}`
        };
        errors.push(error);
        return errors;
      }
    });
    rowNumber++;
    return errors;
  }, []);
  return errors;
}

function validateItem(item, type) {
  switch(type) {
    case "string":
      if (!isString(item)) {
        if (!isString(castString("", item))) {
          return false;
        }
      }
      break;
    case "integer":
      if (!isInteger(item)) {
        item = castInteger("", item);
        if (!isInteger(castInteger("", item))) {
          return false;
        }
      }
      break;
    case "number":
      if (!isNumber(item)) {
        if (!isNumber(castNumber("", item))) {
          return false;
        }
      }
      break;
    case "boolean":
      if (!isBoolean(item)) {
        if (!(_TRUE_VALUES.includes(item) ||  _FALSE_VALUES.includes(item))) {
          return false;
        }
      }
      break;
    default:
      break;
  }
  return true;
}

const _TRUE_VALUES = ['true', 'True', 'TRUE', '1']
const _FALSE_VALUES = ['false', 'False', 'FALSE', '0']

export { validateDataset, validateItem }
