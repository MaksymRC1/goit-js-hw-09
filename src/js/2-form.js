// Отримуємо елементи форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Функція для збереження даних у локальне сховище
function saveToLocalStorage() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження даних з локального сховища
function loadFromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const formData = JSON.parse(savedData);
      emailInput.value = formData.email || '';
      messageTextarea.value = formData.message || '';
    } catch (error) {
      console.error('Помилка парсингу даних:', error);
    }
  }
}

// Функція для очищення локального сховища та форми
function clearLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

// Слухаємо подію 'input' на формі (викликається при кожному введенні)
form.addEventListener('input', saveToLocalStorage);

// Завантажуємо збережені дані при завантаженні сторінки
loadFromLocalStorage();

// Опціонально: очищаємо сховище при сабміті форми
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевіряємо, чи всі поля заповнені
  if (emailInput.value === '' || messageTextarea.value === '') {
    alert('Fill please all fields');
    return;
  }

  // Виводимо дані в консоль
  console.log('Відправлені дані:', {
    email: emailInput.value,
    message: messageTextarea.value,
  });

  // Очищаємо сховище та форму
  clearLocalStorage();
});
