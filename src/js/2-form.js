// Отримуємо елементи форми
const form = document.querySelector('.feedback-form');

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// ГЛОБАЛЬНИЙ ОБ'ЄКТ formData, який завжди відображає поточний стан форми
let formData = {
  email: '',
  message: '',
};

// Функція для оновлення глобального об'єкта formData з DOM
function updateFormDataFromDOM() {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
}

// Функція для оновлення DOM з глобального об'єкта formData
function updateDOMFromFormData() {
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// Функція для збереження глобального об'єкта formData у локальне сховище
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження даних з локального сховища у глобальний об'єкт formData
function loadFromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      // Оновлюємо глобальний об'єкт formData
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';
      // Оновлюємо DOM з глобального об'єкта
      updateDOMFromFormData();
    } catch (error) {
      console.error('Помилка парсингу даних:', error);
    }
  }
}

// Функція для скидання глобального об'єкта formData
function resetFormData() {
  formData.email = '';
  formData.message = '';
}

// Функція для повного скидання форми
function resetForm() {
  resetFormData(); // Скидаємо глобальний об'єкт
  localStorage.removeItem(STORAGE_KEY); // Очищаємо localStorage
  updateDOMFromFormData(); // Оновлюємо DOM з порожнього об'єкта
}

// ОБРОБНИК ПОДІЇ input - оновлює глобальний об'єкт та зберігає в localStorage
form.addEventListener('input', () => {
  updateFormDataFromDOM(); // Оновлюємо глобальний об'єкт з DOM
  saveToLocalStorage(); // Зберігаємо глобальний об'єкт у localStorage
});

// ОБРОБНИК ПОДІЇ submit
form.addEventListener('submit', event => {
  event.preventDefault();

  // Оновлюємо глобальний об'єкт перед відправкою
  updateFormDataFromDOM();

  // Перевіряємо, чи всі поля заповнені
  if (formData.email === '' || formData.message === '') {
    alert('Будь ласка, заповніть всі поля форми!');
    return;
  }

  // ВИКОРИСТОВУЄМО ГЛОБАЛЬНИЙ ОБ'ЄКТ formData для виведення в консоль
  console.log('Відправлені дані:', formData);

  // Повне скидання форми (глобальний об'єкт, localStorage, DOM)
  resetForm();
});

// ІНІЦІАЛІЗАЦІЯ - завантажуємо збережені дані при старті
loadFromLocalStorage();
