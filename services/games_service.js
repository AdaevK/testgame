const generate = require('nanoid/generate');

const generatePattern = '0123456789';
const lengthNumber = 4;

// Проверка сгенерированного числа на кол-во одинаковых цифр не более 2
function isNotFailNumber(number) {
  const obj = number.split('').reduce((acc, n) => {
    if (acc[n]) {
      acc[n] += 1;
    } else {
      acc[n] = 1;
    }
    return acc;
  }, {});

  return Object.values(obj).some(count => count >= 3);
}

function isValid(value) {
  return (typeof value === 'string' && value.length === 4);
}

function getExistingCount(number, array) {
  const regexp = new RegExp(array.join('|'), 'g');
  const result = number.match(regexp);
  if (result === null) return 0;
  return result.length;
}

module.exports = () => class GameService {
  static generate() {
    let number;

    do {
      number = generate(generatePattern, lengthNumber);
    } while (isNotFailNumber(number));

    return '1213'; // number;
  }

  static check({ number, input }) {
    if (!isValid(number)) {
      return { state: 'end' };
    }

    if (!isValid(input)) {
      return { state: 'invalid', error: 'Введите 4-х значное число' };
    }

    const inputArray = input.split('');
    let existingCount = getExistingCount(number, inputArray);
    if (!existingCount) return {};

    let inTheirPlacesCount = 0;
    inputArray.forEach((digit, index) => {
      if (number[index] === digit) {
        inTheirPlacesCount += 1;
        existingCount -= 1;
      }
    });

    const result = 'B'.repeat(inTheirPlacesCount)
      + 'K'.repeat(existingCount);

    return {
      ...(result === 'BBBB' ? { state: 'win' } : undefined),
      result,
    };
  }
};
