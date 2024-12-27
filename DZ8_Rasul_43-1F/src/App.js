import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const App = () => {
  const [users, setUsers] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Получение данных с сервера
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Создание нового пользователя
  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/users', data);
      fetchUsers();
      setModalMessage('Пользователь успешно создан');
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
    }
  };

  // Удаление пользователя
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
      setModalMessage('Пользователь удален');
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  return (
    <div>
      <h1>Управление пользователями</h1>

      {modalMessage && (
        <div className="modal">
          <p>{modalMessage}</p>
          <button onClick={() => setModalMessage('')}>Закрыть</button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Имя:</label>
          <input 
            {...register('name', { required: 'Это поле обязательно' })} 
            placeholder="Введите имя"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input 
            {...register('email', { required: 'Это поле обязательно' })} 
            placeholder="Введите email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Username:</label>
          <input 
            {...register('username', { required: 'Это поле обязательно' })} 
            placeholder="Введите username"
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <button type="submit">Создать пользователя</button>
      </form>

      <h2>Список пользователей</h2>
      {users.length === 0 ? (
        <p>Список пуст</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Username</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;



