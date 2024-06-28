import {User} from '../types.ts';

export const deleteUser = async (id: number) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
		method: 'DELETE'
	});
	if (!response.ok) {
		throw new Error('Error deleting user');
	}
	return true;
};

export const updateUser = async (id: number, data: Partial<User>) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error('Error updating user');
	}
	return response.json();
};

export const addUser = async (data: Partial<User>) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error('Error adding user');
	}
	return response.json();
};
