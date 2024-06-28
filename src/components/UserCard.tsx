import React, {useState} from 'react';
import {User, UserCardProps} from '../types';
import {deleteUser, updateUser} from '../services/api';
import {TrashCanIcon} from '../assets/icons/TrashCanIcon.tsx';
import {PencilIcon} from '../assets/icons/PencilIcon.tsx';
import {toast} from 'react-toastify';

export const UserCard: React.FC<UserCardProps> = ({user, onDelete, onUpdate}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState<User>(user);

	const handleDelete = async () => {
		try {
			await deleteUser(user.id);
			onDelete(user.id);
		} catch (error) {
			console.error('Error deleting user:', error);
		} finally {
			toast("User successfully deleted", {
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
			});
		}
	};

	const handleChange = async () => {
		try {
			const updatedUser = await updateUser(user.id, editedUser);
			onUpdate(updatedUser);
			setIsEditing(false);
		} catch (error) {
			console.error('Error updating user:', error);
		} finally {
			toast("User successfully changed", {
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
			});
		}
	};

	return (
		<div className="drop-shadow-lg bg-zinc-700 h-full p-4 rounded-xl shadow lg:flex justify-between">
			<img src={`https://robohash.org/${user.id}?set=set5`} alt="User photo" className="lg:my-auto md:my-auto w-16 h-16 mx-auto lg:m-0 rounded-full border"/>
			<div className="lg:text-right text-center lg:my-auto md:my-auto">
				{isEditing ? (
					<>
						<p className="xl:text-lg text-md text-gray-300">User: <input
							type="text"
							value={editedUser.name}
							onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
							className="border w-auto text-gray-300 border-zinc-500 rounded bg-transparent"
						/></p>
						<p className="xl:text-lg text-md text-gray-300">Email: <input
							type="email"
							value={editedUser.email}
							onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
							className="border w-auto text-gray-300 border-zinc-500 rounded bg-transparent"
						/></p>
						<p className="xl:text-lg text-md text-gray-300">Phone: <input
							type="tel"
							value={editedUser.phone}
							onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
							className="border w-auto text-gray-300 border-zinc-500 rounded bg-transparent"
						/></p>
						<div className="flex gap-3 float-end">
							<button type="button" onClick={handleChange} className="text-blue-500 hover:text-blue-600 transition">Save</button>
							<button type="button" onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600 transition">Cancel
							</button>
						</div>
					</>
				) : (
					<>
						<h2 className="xl:text-lg text-md text-gray-300">User: <span
							className="text-gray-400">{user.name}</span></h2>
						<p className="xl:text-lg text-md text-gray-300">Email: <span
							className="text-gray-400">{user.email}</span></p>
						<p className="xl:text-lg text-md text-gray-300">Phone: <span
							className="text-gray-400">{user.phone}</span></p>
						<div className="flex gap-2 float-end sm:justify-center">
							<button type="button" onClick={handleDelete}
									className="text-red-500 hover:text-red-600 transition"><TrashCanIcon/></button>
							<button type="button" onClick={() => setIsEditing(true)}
									className="text-blue-500 hover:text-blue-600 transition"><PencilIcon/></button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
