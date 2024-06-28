<div align="center">
	<h1><b>🪪 User Cards List 🪪</b></h1>
	<p>A React application to display a list of users fetched from an API, with functionality to search, add, update, and delete users.</p>
	<img src="https://github.com/mi1sh/user-cards-list/assets/106558234/19a48f26-2420-44d8-a2f5-a2c7576f3fe4"/>
</div>

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React-Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

## 🌟 Features

- Fetch and display users as cards with photo, name, email, and phone number
- Search for users by name, email, or phone number
- Add new users
- Update existing users
- Delete users

## 🧑‍💻 Getting Started

### ❕ Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v12 or higher)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)

### 💿 Installation

1. Clone the repository:

```sh
git clone https://github.com/mi1sh/user-cards-list.git
```

2. Navigate to the project directory:

```sh
cd user-cards-list
```

3. Install dependencies:

```sh
npm install
```

or

```sh
yarn install
```

### 🏃 Running the Application

To start the development server, run:

```sh
npm dev
```

or

```sh
yarn run dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

- `src/`
	- `assets/` - Icons and other static assets
	- `components/` - React components
	- `services/` - API service functions
	- `types.ts` - TypeScript type definitions
	- `App.tsx` - Main application component
	- `main.tsx` - Entry point

## 🕸️ API Endpoints

- Fetch Users: `GET https://jsonplaceholder.typicode.com/users`
- Add User: `POST https://jsonplaceholder.typicode.com/users`
- Update User: `PATCH https://jsonplaceholder.typicode.com/users/{id}`
- Delete User: `DELETE https://jsonplaceholder.typicode.com/users/{id}`
