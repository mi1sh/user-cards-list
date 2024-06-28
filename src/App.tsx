import React, {useEffect, useState} from 'react';
import {addUser, deleteUser, updateUser} from './services/api.ts';
import {Bounce, toast, ToastContainer} from 'react-toastify';
import {User} from './types';

import {SadIcon} from './assets/icons/SadIcon';
import {PlusIcon} from './assets/icons/PlusIcon';

import {UserCard} from './components/UserCard';
import {SearchPanel} from './components/SearchPanel';
import {AddUserModal} from './components/AddUserModal';
import {Loader} from './components/Loader';

import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(data => {
				setUsers(data);
				setFilteredUsers(data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error('Error fetching users:', error);
				setIsLoading(false);
			});
	}, []);

	const handleSearch = (query: string) => {
		const lowerCaseQuery = query.toLowerCase();
		const filtered = users.filter(user =>
			user.name.toLowerCase().includes(lowerCaseQuery) ||
			user.email.toLowerCase().includes(lowerCaseQuery) ||
			user.phone.toLowerCase().includes(lowerCaseQuery)
		);
		setFilteredUsers(filtered);
	};

	const handleDelete = async (id: number) => {
		setIsLoading(true);
		try {
			await deleteUser(id);
			const updatedUsers = users.filter(user => user.id !== id);
			setUsers(updatedUsers);
			setFilteredUsers(updatedUsers);
		} catch (error) {
			console.error('Error deleting user:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdate = async (updatedUser: User) => {
		setIsLoading(true);
		try {
			const updatedData = await updateUser(updatedUser.id, updatedUser);
			const updatedUsers = users.map(user => user.id === updatedData.id ? updatedData : user);
			setUsers(updatedUsers);
			setFilteredUsers(updatedUsers);
		} catch (error) {
			console.error('Error updating user:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddUser = async (newUser: Partial<User>) => {
		setIsLoading(true);
		try {
			const addedUser = await addUser(newUser);
			const updatedUsers = [...users, addedUser];
			setUsers(updatedUsers);
			setFilteredUsers(updatedUsers);
		} catch (error) {
			console.error('Error adding user:', error);
		} finally {
			setIsLoading(false);
			toast("User added successfully", {
				position: "top-left",
				autoClose: 2000,
				className: "bg-zinc-600",
				progressClassName: "bg-emerald-600",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
				transition: Bounce,
			});
		}
	};

	return (
		<>
			<header>
				<div className="w-full p-5">
					<h1 className="text-zinc-300 text-4xl text-center h-6xl">user-cards-list</h1>
				</div>
			</header>

			<main className="p-5">
				<ToastContainer
					position="top-left"
					autoClose={2000}
					limit={3}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
					transition: Bounce
				/>
				<div className="md:flex justify-between">
					<SearchPanel onSearch={handleSearch} />
					<button
						type="button"
						className="bg-zinc-600 hover:bg-zinc-500 transition text-gray-300 p-2 rounded mb-4 flex my-auto gap-1"
						onClick={() => setIsModalOpen(true)}
					>
						<PlusIcon /> Add user
					</button>
				</div>
				{isLoading ? (
					<Loader />
				) : (
					filteredUsers.length ? (
						<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
							{filteredUsers.map(user => (
								<li key={user.id}>
									<UserCard user={user} onDelete={handleDelete} onUpdate={handleUpdate} />
								</li>
							))}
						</ul>
					) : (
						<h1 className="flex w-full text-zinc-300 text-2xl justify-center gap-2">
							Users not found <SadIcon />
						</h1>
					)
				)}
			</main>

			{isModalOpen && (
				<AddUserModal
					onClose={() => setIsModalOpen(false)}
					onSave={handleAddUser}
				/>
			)}
		</>
	);
};
