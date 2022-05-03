export default [
  [
    { value: { ru: 'ё', en: '`' }, shift: { ru: 'Ё', en: '~' }, code: 'Backquote' },
    { value: { ru: '1', en: '1' }, shift: { ru: '!', en: '!' }, code: 'Digit1' },
    { value: { ru: '2', en: '2' }, shift: { ru: '"', en: '@' }, code: 'Digit2' },
    { value: { ru: '3', en: '3' }, shift: { ru: '№', en: '#' }, code: 'Digit3' },
    { value: { ru: '4', en: '4' }, shift: { ru: ';', en: '$' }, code: 'Digit4' },
    { value: { ru: '5', en: '5' }, shift: { ru: '%', en: '%' }, code: 'Digit5' },
    { value: { ru: '6', en: '6' }, shift: { ru: ':', en: '^' }, code: 'Digit6' },
    { value: { ru: '7', en: '7' }, shift: { ru: '?', en: '&' }, code: 'Digit7' },
    { value: { ru: '8', en: '8' }, shift: { ru: '*', en: '*' }, code: 'Digit8' },
    { value: { ru: '9', en: '9' }, shift: { ru: '(', en: '(' }, code: 'Digit9' },
    { value: { ru: '0', en: '0' }, shift: { ru: ')', en: ')' }, code: 'Digit0' },
    { value: { ru: '-', en: '-' }, shift: { ru: '_', en: '_' }, code: 'Minus' },
    { value: { ru: '=', en: '=' }, shift: { ru: '+', en: '+' }, code: 'Equal' },
    { value: 'Backspace', code: 'Backspace', classes: ['key_backspace', 'key__large'] },
  ],
  [
    { value: 'Tab', code: 'Tab', classes: ['key_tab', 'key__medium'] },
    { value: { ru: 'й', en: 'q' }, shift: { ru: 'Й', en: 'Q' }, code: 'KeyQ' },
    { value: { ru: 'ц', en: 'w' }, shift: { ru: 'Ц', en: 'W' }, code: 'KeyW' },
    { value: { ru: 'у', en: 'e' }, shift: { ru: 'У', en: 'E' }, code: 'KeyE' },
    { value: { ru: 'к', en: 'r' }, shift: { ru: 'К', en: 'R' }, code: 'KeyR' },
    { value: { ru: 'е', en: 't' }, shift: { ru: 'Е', en: 'T' }, code: 'KeyT' },
    { value: { ru: 'н', en: 'y' }, shift: { ru: 'Н', en: 'Y' }, code: 'KeyY' },
    { value: { ru: 'г', en: 'u' }, shift: { ru: 'Г', en: 'U' }, code: 'KeyU' },
    { value: { ru: 'ш', en: 'i' }, shift: { ru: 'Ш', en: 'I' }, code: 'KeyI' },
    { value: { ru: 'щ', en: 'o' }, shift: { ru: 'Щ', en: 'O' }, code: 'KeyO' },
    { value: { ru: 'з', en: 'p' }, shift: { ru: 'З', en: 'P' }, code: 'KeyP' },
    { value: { ru: 'х', en: '[' }, shift: { ru: 'Х', en: '{' }, code: 'BracketLeft' },
    { value: { ru: 'ъ', en: ']' }, shift: { ru: 'Ъ', en: '}' }, code: 'BracketRight' },
    {
      value: { ru: '\\', en: '\\' }, shift: { ru: '/', en: '|' }, code: 'Backslash', classes: ['key_backslash'],
    },
  ],
  [
    { value: 'CapsLock', code: 'CapsLock', classes: ['key_capslock', 'key__large'] },
    { value: { ru: 'ф', en: 'a' }, shift: { ru: 'Ф', en: 'A' }, code: 'KeyA' },
    { value: { ru: 'ы', en: 's' }, shift: { ru: 'Ы', en: 'S' }, code: 'KeyS' },
    { value: { ru: 'в', en: 'd' }, shift: { ru: 'В', en: 'D' }, code: 'KeyD' },
    { value: { ru: 'а', en: 'f' }, shift: { ru: 'А', en: 'F' }, code: 'KeyF' },
    { value: { ru: 'п', en: 'g' }, shift: { ru: 'П', en: 'G' }, code: 'KeyG' },
    { value: { ru: 'р', en: 'h' }, shift: { ru: 'Р', en: 'H' }, code: 'KeyH' },
    { value: { ru: 'о', en: 'j' }, shift: { ru: 'О', en: 'J' }, code: 'KeyJ' },
    { value: { ru: 'л', en: 'k' }, shift: { ru: 'Л', en: 'K' }, code: 'KeyK' },
    { value: { ru: 'д', en: 'l' }, shift: { ru: 'Д', en: 'L' }, code: 'KeyL' },
    { value: { ru: 'ж', en: ';' }, shift: { ru: 'Ж', en: ':' }, code: 'Semicolon' },
    { value: { ru: 'э', en: "'" }, shift: { ru: 'Э', en: '"' }, code: 'Quote' },
    { value: 'Enter', code: 'Enter', classes: ['key_enter', 'key__large'] },
  ],
  [
    { value: 'Shift', code: 'ShiftLeft', classes: ['key_leftshift', 'key__medium'] },
    { value: { ru: 'я', en: 'z' }, shift: { ru: 'Я', en: 'Z' }, code: 'KeyZ' },
    { value: { ru: 'ч', en: 'x' }, shift: { ru: 'Ч', en: 'X' }, code: 'KeyX' },
    { value: { ru: 'с', en: 'c' }, shift: { ru: 'С', en: 'C' }, code: 'KeyC' },
    { value: { ru: 'м', en: 'v' }, shift: { ru: 'М', en: 'V' }, code: 'KeyV' },
    { value: { ru: 'и', en: 'b' }, shift: { ru: 'И', en: 'B' }, code: 'KeyB' },
    { value: { ru: 'т', en: 'n' }, shift: { ru: 'Т', en: 'N' }, code: 'KeyN' },
    { value: { ru: 'ь', en: 'm' }, shift: { ru: 'Ь', en: 'M' }, code: 'KeyM' },
    { value: { ru: 'б', en: ',' }, shift: { ru: 'Б', en: '<' }, code: 'Comma' },
    { value: { ru: 'ю', en: '.' }, shift: { ru: 'Ю', en: '>' }, code: 'Period' },
    { value: { ru: '.', en: '/' }, shift: { ru: ',', en: '?' }, code: 'Slash' },
    { value: '▲', code: 'ArrowUp' },
    { value: 'Shift', code: 'ShiftRight', classes: ['key_rightshift', 'key__medium'] },
  ],
  [
    { value: 'Ctrl', code: 'ControlLeft', classes: ['key_leftctrl', 'key__medium'] },
    { value: 'Alt', code: 'AltLeft', classes: ['key_leftalt', 'key__medium'] },
    { value: ' ', code: 'Space', classes: ['key_space', 'key__extra-large'] },
    { value: 'Alt', code: 'AltRight', classes: ['key_rightalt', 'key__medium'] },
    { value: 'Ctrl', code: 'ControlRight', classes: ['key_rightctrl', 'key__medium'] },
    { value: '◄', code: 'ArrowLeft' },
    { value: '▼', code: 'ArrowDown' },
    { value: '►', code: 'ArrowRight' },
    { value: { ru: 'RU', en: 'EN' }, code: 'Lang', classes: ['key_lang'] },
  ],
];
