// Функція для ініціалізації всієї логіки форми
const initializeForm = () => {
  // Отримуємо елементи форми
  const form = document.querySelector('.feedback-form');

  // Якщо форми немає на сторінці, виходимо
  if (!form) return;

  // Ключ для локального сховища
  const STORAGE_KEY = 'feedback-form-state';

  // ГЛОБАЛЬНИЙ ОБ'ЄКТ formData
  let formData = {
    email: '',
    message: '',
  };

  // Функція для синхронізації: DOM -> formData
  const syncFormDataFromDOM = () => {
    formData.email = form.elements.email.value;
    formData.message = form.elements.message.value;
  };

  // Функція для синхронізації: formData -> DOM
  const syncDOMFromFormData = () => {
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  };

  // Функція для збереження formData в localStorage
  const saveFormData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };

  // Функція для завантаження formData з localStorage
  const loadFormData = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        formData.email = parsed.email || '';
        formData.message = parsed.message || '';
        syncDOMFromFormData();
      } catch (error) {
        console.error('Помилка:', error);
      }
    }
  };

  // Функція для скидання formData
  const resetFormData = () => {
    formData.email = '';
    formData.message = '';
    syncDOMFromFormData();
    localStorage.removeItem(STORAGE_KEY);
  };

  // =============================================
  // ІНІЦІАЛІЗАЦІЯ - виконуємо ПЕРШОЮ
  // =============================================
  loadFormData();

  // =============================================
  // ПІДКЛЮЧЕННЯ ОБРОБНИКІВ ПОДІЙ
  // =============================================
  form.addEventListener('input', () => {
    syncFormDataFromDOM();
    saveFormData();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    syncFormDataFromDOM();

    if (!formData.email || !formData.message) {
      alert('Fill please all fields.');
      return;
    }

    console.log('Відправлені дані:', formData);
    resetFormData();
  });
};

// Чекаємо повного завантаження DOM перед ініціалізацією
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeForm);
} else {
  // DOM вже завантажено, виконуємо одразу
  initializeForm();
}
