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
 * 1. CapsLock toggle on keyDown selected
 * 2. Add animations
 * 3. Move create keyboard dom to separate file
 * 4. Change '/' and '`' buttons (47 unicode and 126) on lang change
 * 5. Add delete button
 */

const createDom = () => {
  const mainContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');
  let isCapsLockSelected = false;
  let lang = 'en';

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

      case 'ControlLeft':
      case 'ControlRight':
        break;

      case 'Backspace':
        break;

      case 'Tab':
        textarea.value += '    ';
        break;

      case 'CapsLock':
        const capsLockKeys = getCapsLockKeys();

        capsLockKeys.forEach((item) => {
          item.innerHTML = item.dataset[isCapsLockSelected ? lang : `${lang}Shift`];
        });

        key.classList.toggle('key_capslock-active');
        isCapsLockSelected = !isCapsLockSelected;
        break;

      case 'AltLeft':
      case 'AltRight':
        break;

      case 'ArrowLeft':
        break;

      case 'ArrowDown':
        break;

      case 'ArrowUp':
        break;

      case 'ArrowRight':
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
          const capsLockKeys = getCapsLockKeys('ru');

          lang = lang === 'en' ? 'ru' : 'en';
          target.innerHTML = target.dataset[lang];

          capsLockKeys.forEach((item) => {
            if (isCapsLockSelected) {
              item.innerHTML = item.dataset[`${lang}Shift`];
            } else {
              item.innerHTML = item.dataset[lang];
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

        default:
          textarea.value += dataset.en;
      }

      textarea.value += oldValue.slice(cursorEnd);
      cursorStart = textarea.value.length - (oldValue.length - cursorEnd);
      cursorEnd = cursorStart;
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
