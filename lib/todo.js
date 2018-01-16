const $l = require('./main.js');

const todoForm = $l('body').append("<div class='notepad2'></div>");
const title = $l('.todo-input').find('input').htmlEls[0].value;
