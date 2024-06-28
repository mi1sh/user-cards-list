import React, { useState } from 'react';
import {AddUserModalProps} from '../types';

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSave }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const handleSave = () => {
		onSave({ name, email, phone });
		onClose();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="flex flex-col gap-2 text-center bg-zinc-700 p-5 rounded-lg">
				<h2 className="text-lg text-gray-400 font-bold mb-4">Add New User</h2>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					className="w-80 border text-gray-300 border-zinc-500 p-2 rounded bg-transparent"
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="w-full border text-gray-300 border-zinc-500 p-2 rounded bg-transparent"
				/>
				<input
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder="Phone"
					className="w-full border text-gray-300 border-zinc-500 p-2 rounded bg-transparent"
				/>
				<div className="flex justify-end gap-2">
					<button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded">Save</button>
					<button onClick={onClose} className="bg-red-500 hover:bg-red-600 transition text-white p-2 rounded">Cancel</button>
				</div>
			</div>
		</div>
	);
};
