import keyboardData from './keyboardData.js';

const alphabetCharCodes = [
  { min: 1072, max: 1105 }, // rus lowerCase
  { min: 1025, max: 1071 }, // rus upperCase
  { min: 97, max: 122 }, // en lowerCase
  { min: 65, max: 90 }, // en upperCase
];

const createDom = () => {
  const mainContainer = document.createElement('div');
  const textarea = document.createElement('textarea');
  const keyboard = document.createElement('div');

  let isCapsLockSelected = false;
  let lang = localStorage.getItem('lang') || 'en';
  let isCapsLockKeyUp = true;
  let isShiftSelected = false;

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
  <p class="text">Change Language: Shift + Ctrl</p>`;

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

  const keys = [...keyboard.querySelectorAll('button')];
  const shiftChangedKeys = [...keyboard.querySelectorAll(`[data-${lang}-shift]`)];
  const shiftKeys = [...keyboard.querySelectorAll('[data-code^="Shift"]')];
  const getCapsLockKeys = () => shiftChangedKeys
    .filter((item) => alphabetCharCodes.some(({ min, max }) => {
      const letterCharCode = item.dataset[lang].charCodeAt(0);

      return letterCharCode >= min && letterCharCode <= max;
    }));

  const changeLanguage = () => {
    const langKey = keyboard.querySelector("[data-code='Lang']");
    const langKeys = keyboardData.flat()
      .filter(({ value }) => value.en);
    const allKeys = langKeys.map(({ code }) => keyboard.querySelector(`[data-code=${code}]`));

    lang = lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', lang);
    langKey.innerHTML = lang.toUpperCase();

    allKeys.forEach((key) => {
      const element = key;

      if (isCapsLockSelected) {
        const letterCharCode = key.dataset[lang].charCodeAt(0);
        const isCapsLockLetter = alphabetCharCodes
          .some(({ min, max }) => key.dataset.code !== 'Lang' && letterCharCode >= min && letterCharCode <= max);

        element.innerHTML = key.dataset[isCapsLockLetter ? `${lang}Shift` : lang];
      } else {
        element.innerHTML = key.dataset[lang];
      }
    });
  };

  document.addEventListener('keydown', (event) => {
    const { code, ctrlKey, shiftKey } = event;

    textarea.focus();
    if (!code) {
      return;
    }
    const key = document.querySelector(`[data-code=${code}]`);
    const capsLockKeys = getCapsLockKeys();

    key?.classList.add('key_active');
    switch (code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        event.preventDefault();

        shiftChangedKeys.forEach((item) => {
          const element = item;

          if (isCapsLockSelected && capsLockKeys.includes(item)) {
            element.innerHTML = item.dataset[lang];
          } else {
            element.innerHTML = item.dataset[`${lang}Shift`];
          }
        });
        isShiftSelected = true;
        break;
      case 'AltLeft':
      case 'AltRight':
      case 'ControlLeft':
      case 'ControlRight':
        break;
      case 'Tab':
        textarea.setRangeText('    ', cursorStart, cursorEnd, 'end');
        break;

      case 'CapsLock':
        if (isCapsLockKeyUp) {
          isCapsLockKeyUp = false;

          capsLockKeys.forEach((item) => {
            const element = item;

            element.innerHTML = item.dataset[isCapsLockSelected ? lang : `${lang}Shift`];
          });

          key.classList.toggle('key_capsLock-active');
          isCapsLockSelected = !isCapsLockSelected;
        }
        break;
      case 'Backspace':
      case 'Space':
      case 'Enter':
      case 'Delete':
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        break;
      default:
        event.preventDefault();
        if (isCapsLockSelected && capsLockKeys.includes(key)) {
          textarea.setRangeText(key.dataset[isShiftSelected ? lang : `${lang}Shift`], cursorStart, cursorEnd, 'end');
        } else {
          textarea.setRangeText(key.dataset[isShiftSelected ? `${lang}Shift` : lang], cursorStart, cursorEnd, 'end');
        }
        cursorStart += 1;
        cursorEnd = cursorStart;
    }

    if (shiftKey && ctrlKey) {
      changeLanguage();
    }
  });

  document.addEventListener('keyup', ({ code }) => {
    if (!code) {
      return;
    }
    const key = document.querySelector(`[data-code=${code}]`);
    const capsLockKeys = getCapsLockKeys();

    textarea.focus();

    key?.classList.remove('key_active');
    switch (code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        shiftChangedKeys.forEach((item) => {
          const element = item;

          if (isCapsLockSelected && capsLockKeys.includes(item)) {
            element.innerHTML = item.dataset[`${lang}Shift`];
          } else {
            element.innerHTML = item.dataset[lang];
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
    const {
      tagName, classList, dataset, childNodes,
    } = target;
    const capsLockKeys = getCapsLockKeys();

    textarea.focus();

    if (tagName === 'BUTTON') {
      const oldValue = textarea.value;

      textarea.value = oldValue.slice(0, cursorStart);
      classList.add('key_active');

      switch (dataset.code) {
        case 'Lang':
          changeLanguage();
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
            cursorEnd += 1;
          }
          break;
        case 'AltLeft':
        case 'AltRight':
        case 'ControlLeft':
        case 'ControlRight':
          if (isShiftSelected) {
            changeLanguage();
          }
          break;
        case 'ArrowLeft':
          textarea.value += oldValue.slice(cursorEnd);

          if (cursorStart && cursorStart === cursorEnd) {
            cursorStart += -1;
            cursorEnd = cursorStart;
          }
          break;
        case 'ArrowDown':
          textarea.value += '▼';
          break;
        case 'ArrowUp':
          textarea.value += '▲';
          break;
        case 'ArrowRight':
          textarea.value += oldValue.slice(cursorEnd);

          if (cursorStart && cursorStart === cursorEnd) {
            cursorStart += 1;
            cursorEnd = cursorStart;
          }
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          isShiftSelected = !isShiftSelected;

          shiftChangedKeys.forEach((item) => {
            const element = item;

            if (isCapsLockSelected && capsLockKeys.includes(item)) {
              element.innerHTML = item.dataset[isShiftSelected ? lang : `${lang}Shift`];
            } else {
              element.innerHTML = item.dataset[isShiftSelected ? `${lang}Shift` : lang];
            }
          });

          if (isShiftSelected) {
            classList.add('key_active');
          } else {
            shiftKeys.forEach((item) => item.classList.remove('key_active'));
          }
          break;
        case 'CapsLock':
          isCapsLockSelected = !isCapsLockSelected;
          classList.toggle('key_capsLock-active');
          shiftKeys.forEach((item) => item.classList.remove('key_active'));
          isShiftSelected = false;

          if (isCapsLockKeyUp) {
            isCapsLockKeyUp = false;

            shiftChangedKeys.forEach((item) => {
              const element = item;

              if (isCapsLockSelected && capsLockKeys.includes(item)) {
                element.innerHTML = item.dataset[`${lang}Shift`];
              } else {
                element.innerHTML = item.dataset[lang];
              }
            });
          }
          break;
        default:
          textarea.value += childNodes[0].nodeValue;
      }

      if (!['ArrowLeft', 'ArrowRight'].includes(dataset.code)) {
        textarea.value += oldValue.slice(cursorEnd);
        cursorStart = textarea.value.length - (oldValue.length - cursorEnd);
        cursorEnd = cursorStart;
      }
    }
  });

  keyboard.addEventListener('mouseup', ({ target: { tagName, dataset, classList } }) => {
    textarea.focus();

    if (tagName === 'BUTTON') {
      const capsLockKeys = getCapsLockKeys();
      textarea.setSelectionRange(cursorEnd, cursorEnd);

      switch (dataset.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          break;
        case 'CapsLock':
          isCapsLockKeyUp = true;
          classList.remove('key_active');
          break;
        default:
          keys.forEach((key) => key.classList.remove('key_active'));

          shiftChangedKeys.forEach((item) => {
            const element = item;

            if (isCapsLockSelected && capsLockKeys.includes(item)) {
              element.innerHTML = item.dataset[`${lang}Shift`];
            } else {
              element.innerHTML = item.dataset[lang];
            }
          });
          isShiftSelected = false;
          shiftKeys.forEach((item) => item.classList.remove('key_active'));
      }
    }
  });
};

document.onload = createDom();
