import React, { useState } from 'react';
import { SearchPanelProps } from '../types.ts';

export const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleSearch = () => {
		onSearch(query);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className="flex gap-2 mb-4">
			<input
				type="text"
				value={query}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				className="border w-full text-gray-300 border-zinc-500 p-2 rounded bg-transparent"
				placeholder="Search users..."
			/>
			<button
				onClick={handleSearch}
				className="bg-zinc-600 hover:bg-zinc-500 transition text-gray-300 p-2 rounded"
			>
				Search
			</button>
		</div>
	);
};
