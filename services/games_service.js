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
  return (
    typeof value === 'string'
    && value.trim().length === lengthNumber
    && Number.isFinite(Number(value))
  );
}

class CheckGame {
  constructor(number, input) {
    this._number = number;
    this._input = input.split('');
  }

  call() {
    return this.calculateResult().join('');
  }

  calculateResult() {
    const existing = this.getObjectExisting();
    return this._input.map((digit, index) => {
      if (existing[digit]) {
        return this._number[index] === digit ? 'B' : 'K';
      }
      return '_';
    });
  }

  getObjectExisting() {
    const regexp = new RegExp(this._input.join('|'), 'g');
    const match = this._number.match(regexp);
    if (match === null) return {};
    return match.reduce((acc, n) => {
      acc[n] = true;
      return acc;
    }, {});
  }
}

module.exports = () => class GameService {
  static generate() {
    let number;

    do {
      number = generate(generatePattern, lengthNumber);
    } while (isNotFailNumber(number));

    return number;
  }

  static check({ number, input }) {
    if (!isValid(number)) {
      return { state: 'end' };
    }

    if (!isValid(input)) {
      return { state: 'invalid', error: 'Введите 4-х значное число' };
    }

    const checkGame = new CheckGame(number, input);
    const result = checkGame.call();

    return {
      ...(result === 'BBBB' ? { state: 'win' } : undefined),
      result,
    };
  }
};
