
/// Не трогай 
const showElem = document.querySelector('.show_select');
const hint = document.querySelector('.hint_wrapper .hint_hint')
console.log(hint)
showElem.addEventListener('click', () => hint.classList.toggle('hint_active'))