// Отримуємо елементи форми
const form = document.querySelector('.feedback-form');

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// ГЛОБАЛЬНИЙ ОБ'ЄКТ formData
let formData = {
  email: '',
  message: '',
};

// ============= ФУНКЦІЇ СИНХРОНІЗАЦІЇ =============
const syncFormDataFromDOM = () => {
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
};

const syncDOMFromFormData = () => {
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
};

// ============= ФУНКЦІЇ РОБОТИ З LOCALSTORAGE =============
const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      formData.email = parsed.email || '';
      formData.message = parsed.message || '';
    } catch (error) {
      console.error('Помилка парсингу:', error);
    }
  }
};

// ============= ФУНКЦІЇ СКИДАННЯ =============
const resetForm = () => {
  formData.email = '';
  formData.message = '';
  localStorage.removeItem(STORAGE_KEY);
  syncDOMFromFormData();
};

// =============================================
// КРОК 1: ІНІЦІАЛІЗАЦІЯ (виконується ПЕРШОЮ)
// =============================================
loadFromLocalStorage(); // Завантажуємо збережені дані в formData
syncDOMFromFormData(); // Відображаємо дані в DOM

// =============================================
// КРОК 2: ПІДКЛЮЧЕННЯ ОБРОБНИКІВ ПОДІЙ
// =============================================
form.addEventListener('input', () => {
  syncFormDataFromDOM();
  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  syncFormDataFromDOM();

  if (formData.email && formData.message) {
    console.log('Відправлені дані:', formData);
    resetForm();
  } else {
    alert('Fill please all fields');
  }
});
