export interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export interface SearchPanelProps {
	onSearch: (query: string) => void;
}

export interface UserCardProps {
	user: User;
	onDelete: (id: number) => void;
	onUpdate: (user: User) => void;
}

export interface AddUserModalProps {
	onClose: () => void;
	onSave: (user: Partial<User>) => void;
}