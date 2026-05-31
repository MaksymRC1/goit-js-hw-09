// Отримуємо елементи форми
const form = document.querySelector('.feedback-form');

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Глобальний об'єкт formData, який завжди відображає поточний стан форми
let formData = {
  email: '',
  message: '',
};

// Функція для збереження даних у локальне сховище та оновлення глобального об'єкта
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для оновлення глобального об'єкта formData з DOM
function updateFormData() {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
}

// Функція для оновлення DOM з глобального об'єкта formData
function updateDomFromFormData() {
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// Функція для завантаження даних з локального сховища
function loadFromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      // Оновлюємо глобальний об'єкт formData
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';
      // Оновлюємо DOM
      updateDomFromFormData();
    } catch (error) {
      console.error('Помилка парсингу даних:', error);
    }
  }
}

// Функція для скидання всього (глобальний об'єкт, localStorage, DOM)
function resetForm() {
  // Скидаємо глобальний об'єкт formData
  formData.email = '';
  formData.message = '';
  // Очищаємо localStorage
  localStorage.removeItem(STORAGE_KEY);
  // Очищаємо DOM
  form.reset();
}

// Обробник події input - оновлює глобальний об'єкт та зберігає в localStorage
form.addEventListener('input', () => {
  // Оновлюємо глобальний об'єкт formData з поточними значеннями полів
  updateFormData();
  // Зберігаємо оновлений об'єкт у localStorage
  saveToLocalStorage();
});

// Обробник події submit
form.addEventListener('submit', event => {
  event.preventDefault();

  // Оновлюємо глобальний об'єкт перед відправкою
  updateFormData();

  // Перевіряємо, чи всі поля заповнені
  if (formData.email === '' || formData.message === '') {
    alert('Будь ласка, заповніть всі поля форми!');
    return;
  }

  // Виводимо дані з глобального об'єкта formData в консоль
  console.log('Відправлені дані:', formData);

  // Скидаємо форму (очищаємо глобальний об'єкт, localStorage, DOM)
  resetForm();
});

// Завантажуємо збережені дані при завантаженні сторінки
loadFromLocalStorage();
