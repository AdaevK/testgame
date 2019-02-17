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

module.exports = () => class GameService {
  static generate() {
    let number;

    do {
      number = generate(generatePattern, lengthNumber);
    } while (isNotFailNumber(number));

    return number;
  }
};
