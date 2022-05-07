import keyboardData from './keyboardData.js';

const alphabetCharCodes = [
  { min: 1072, max: 1105 }, // rus lowerCase
  { min: 1025, max: 1071 }, // rus upperCase
  { min: 97, max: 122 }, // en lowerCase
  { min: 65, max: 90 }, // en upperCase
];

/**
 *      TO-DO list
 *
 * 2. Add animations
 * 3. Move create keyboard dom to separate file
 * 7. Mousedown for capslock, shift
 * 8. Change language on pres Ctrl + Shift
 * 9. Add sticky to virtual shift
 * 10. Capslock letters typing
 */

const createDom = () => {
  const mainContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');

  let isCapsLockSelected = false;
  let lang = localStorage.getItem('lang') || 'en';
  let isCapsLockKeyUp = true;

  keyboardData.forEach((keys) => {
    const row = document.createElement('div');

    row.classList.add('row');

    keys.forEach(({
      value, code, shift, classes = [],
    }) => {
      const key = document.createElement('button');

      key.dataset.code = code;
      key.dataset.ru = value.ru || value;
      key.dataset.en = value.en || value;

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

  mainContainer.innerHTML += `<h1 class="title">Windows Virtual Keyboard</h1>
  <p class="text">Change Language: Ctrl + Shift</p>`;

  mainContainer.classList.add('container');
  keyboard.classList.add('keyboard');

  mainContainer.append(textarea);
  mainContainer.append(keyboard);

  document.body.append(mainContainer);

  let cursorStart = 0;
  let cursorEnd = 0;

  textarea.addEventListener('mouseup', () => {
    cursorStart = textarea.selectionStart;
    cursorEnd = textarea.selectionEnd;
  });

  const shiftKeys = [...keyboard.querySelectorAll(`[data-${lang}-shift]`)];
  const getCapsLockKeys = (currentLang = lang) => shiftKeys
    .filter((item) => alphabetCharCodes.some(({ min, max }) => {
      const letterCharCode = item.dataset[currentLang].charCodeAt(0);

      return letterCharCode >= min && letterCharCode <= max;
    }));

  document.addEventListener('keydown', ({ code }) => {
    const key = document.querySelector(`[data-code=${code}]`);
    textarea.focus();

    key?.classList.add('key_active');
    switch (code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        const shiftCapsLockKeys = getCapsLockKeys();

        shiftKeys.forEach((item) => {
          if (isCapsLockSelected && shiftCapsLockKeys.includes(item)) {
            item.innerHTML = item.dataset[lang];
          } else {
            item.innerHTML = item.dataset[`${lang}Shift`];
          }
        });
        break;

      case 'Tab':
        textarea.value += '    ';
        break;

      case 'CapsLock':
        if (isCapsLockKeyUp) {
          const capsLockKeys = getCapsLockKeys();
          isCapsLockKeyUp = false;

          capsLockKeys.forEach((item) => {
            item.innerHTML = item.dataset[isCapsLockSelected ? lang : `${lang}Shift`];
          });

          key.classList.toggle('key_capslock-active');
          isCapsLockSelected = !isCapsLockSelected;
        }
        break;

      default:
    }
  });

  document.addEventListener('keyup', ({ code }) => {
    const key = document.querySelector(`[data-code=${code}]`);

    textarea.focus();

    key?.classList.remove('key_active');
    switch (code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        const capsLockKeys = getCapsLockKeys();

        shiftKeys.forEach((item) => {
          if (isCapsLockSelected && capsLockKeys.includes(item)) {
            item.innerHTML = item.dataset[`${lang}Shift`];
          } else {
            item.innerHTML = item.dataset[lang];
          }
        });
        break;
      case 'CapsLock':
        isCapsLockKeyUp = true;
        break;
      default:
    }

    cursorStart = textarea.selectionStart;
    cursorEnd = textarea.selectionEnd;
  });

  keyboard.addEventListener('mousedown', ({ target }) => {
    const { tagName, classList, dataset } = target;
    textarea.focus();

    if (tagName === 'BUTTON') {
      const oldValue = textarea.value;

      textarea.value = oldValue.slice(0, cursorStart);
      classList.add('key_active');

      switch (dataset.code) {
        case 'Lang':
          // const capsLockKeys = getCapsLockKeys('ru');
          lang = lang === 'en' ? 'ru' : 'en';
          localStorage.setItem('lang', lang);
          target.innerHTML = dataset[lang];

          const langKeys = keyboardData.flat()
            .filter(({ value }) => value.en);
          const keys = langKeys.map(({ code }) => keyboard.querySelector(`[data-code=${code}]`));

          keys.forEach((key) => {
            if (isCapsLockSelected) {
              const letterCharCode = key.dataset[lang].charCodeAt(0);
              const isCapsLockLetter = alphabetCharCodes
                .some(({ min, max }) => key.dataset.code !== 'Lang' && letterCharCode >= min && letterCharCode <= max);

              key.innerHTML = key.dataset[isCapsLockLetter ? `${lang}Shift` : lang];
            } else {
              key.innerHTML = key.dataset[lang];
            }
          });
          break;
        case 'Tab':
          textarea.value += '    ';
          break;

        case 'Space':
          textarea.value += ' ';
          break;

        case 'Enter':
          textarea.value += '\n';
          break;
        case 'Backspace':
          if (cursorStart === cursorEnd) {
            textarea.value = textarea.value.slice(0, cursorStart - 1);
          }
          break;
        case 'Delete':
          if (cursorStart === cursorEnd) {
            cursorEnd++;
          }
          break;
        case 'AltLeft':
        case 'AltRight':
        case 'ControlLeft':
        case 'ControlRight':
          break;
        case 'ArrowLeft':
          textarea.value += oldValue.slice(cursorEnd);

          if (cursorStart && cursorStart === cursorEnd) {
            cursorStart--;
            cursorEnd = cursorStart;
          }
          break;

        case 'ArrowDown':
          textarea.value += '🠗';
          break;

        case 'ArrowUp':
          textarea.value += '🠕';
          break;

        case 'ArrowRight':
          textarea.value += oldValue.slice(cursorEnd);

          if (cursorStart && cursorStart === cursorEnd) {
            cursorStart++;
            cursorEnd = cursorStart;
          }
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          break;
        case 'CapsLock':
          break;
        default:
          textarea.value += dataset[lang];
      }

      if (!['ArrowLeft', 'ArrowRight'].includes(dataset.code)) {
        textarea.value += oldValue.slice(cursorEnd);
        cursorStart = textarea.value.length - (oldValue.length - cursorEnd);
        cursorEnd = cursorStart;
      }
    } else {
      cursorStart = textarea.value.length;
      cursorEnd = cursorStart;
    }
  });

  keyboard.addEventListener('mouseup', ({ target: { tagName, classList } }) => {
    textarea.focus();

    if (tagName === 'BUTTON') {
      textarea.setSelectionRange(cursorEnd, cursorEnd);
      classList.remove('key_active');
    }
  });
};

document.onload = createDom();
