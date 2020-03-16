const fetchAllFormFields = () =>
  new Promise((resolve, reject) => {
    const availableFormFields = localStorage.getItem('availableFormFields');
    try {
      if (!availableFormFields) resolve([]);
      else resolve(JSON.parse(availableFormFields));
    } catch (error) {
      reject(error);
    }
  });
const createFormField = newField =>
  new Promise((resolve, reject) => {
    const availableFormFields = localStorage.getItem('availableFormFields');
    try {
      if (!availableFormFields) {
        resolve(JSON.stringify([newField]));
        localStorage.setItem('availableFormFields', JSON.stringify([newField]));
      } else {
          resolve(JSON.stringify([...JSON.parse(availableFormFields), newField]));
        localStorage.setItem('availableFormFields', JSON.stringify([...JSON.parse(availableFormFields), newField]));
      }
    } catch (error) {
      reject(error);
    }
  });

export { fetchAllFormFields, createFormField };
