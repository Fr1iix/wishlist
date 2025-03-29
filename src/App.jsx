import React, { useState } from 'react';

const WishList = () => {
  const [wishes, setWishes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const applyTheme = (isDark) => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--bg-color', '#1a202c');
      root.style.setProperty('--text-color', '#e2e8f0');
      root.style.setProperty('--container-bg', '#2d3748');
    } else {
      root.style.setProperty('--bg-color', '#f7fafc');
      root.style.setProperty('--text-color', '#1a202c');
      root.style.setProperty('--container-bg', '#ffffff');
    }
  };

  // Переключение темы
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
  };

  // Добавление желания
  const handleAddWish = () => {
    if (inputValue.trim()) {
      setWishes([...wishes, inputValue]);
      setInputValue('');
    }
  };

  // Удаление желания
  const handleRemoveWish = (index) => {
    setWishes(wishes.filter((_, i) => i !== index));
  };

  // Стили CSS. Такой выбор был сделан исключительно на мой вкус. Я сделал то, на что мне приятно смотреть.
  // По этой же причине была допом реализована темная тема(не реализовывал раньше, решил, что тут можно попробовать)
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '30px auto',
      padding: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: 'var(--container-bg)',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      color: 'var(--text-color)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px'
    },
    title: {
      margin: '0',
      fontSize: '28px',
      fontWeight: '600',
      color: 'var(--text-color)'
    },
    themeToggle: {
      padding: '8px 15px',
      backgroundColor: darkMode ? '#4a5568' : '#edf2f7',
      color: darkMode ? '#f7fafc' : '#2d3748',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    inputContainer: {
      display: 'flex',
      marginBottom: '25px',
      gap: '10px'
    },
    input: {
      flex: '1',
      padding: '12px 15px',
      border: darkMode ? '1px solid #4a5568' : '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: darkMode ? '#4a5568' : '#f7fafc',
      color: darkMode ? '#f7fafc' : '#1a202c',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap'
    },
    removeButton: {
      padding: '6px 12px',
      marginLeft: '10px',
      backgroundColor: '#e53e3e',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    wishItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 15px',
      backgroundColor: darkMode ? '#4a5568' : '#edf2f7',
      marginBottom: '10px',
      borderRadius: '8px',
      transition: 'all 0.2s ease'
    },
    emptyMessage: {
      color: darkMode ? '#a0aec0' : '#718096',
      textAlign: 'center',
      padding: '30px',
      fontSize: '16px'
    },
    wishText: {
      flex: '1',
      wordBreak: 'break-word'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Мой список желаний</h1>
        <button 
          onClick={toggleTheme} 
          style={styles.themeToggle}
          aria-label={darkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddWish()}
          placeholder="Введите ваше желание..."
          style={styles.input}
        />
        <button 
          onClick={handleAddWish} 
          style={styles.button}
        >
          Добавить
        </button>
      </div>
      
      {wishes.length === 0 ? (
        <p style={styles.emptyMessage}>Пока желаний нет... Добавьте первое!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {wishes.map((wish, index) => (
            <li key={index} style={styles.wishItem}>
              <span style={styles.wishText}>{wish}</span>
              <button 
                onClick={() => handleRemoveWish(index)} 
                style={styles.removeButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;