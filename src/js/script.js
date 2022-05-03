import keyboardData from './keyboardData.js';

const createDom = () => {
  const mainContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');

  keyboard.classList.add('keyboard');

  const lang = 'en';

  keyboardData.forEach((keys) => {
    const row = document.createElement('div');

    row.classList.add('row');

    keys.forEach(({
      value, code, shift, classes = [],
    }) => {
      const key = document.createElement('button');

      key.dataset.code = code;
      key.dataset.ru = value.ru || value;
      key.dataset.eu = value.en || value;

      if (shift) {
        key.dataset.ruShift = shift.ru;
        key.dataset.enShift = shift.en;
      }

      key.classList.add('key', ...classes);
      key.innerHTML = value[lang] || value;

      row.append(key);
    });

    keyboard.append(row);
  });

  mainContainer.append(textarea);
  mainContainer.append(keyboard);

  document.body.append(mainContainer);
};

document.onload = createDom();
