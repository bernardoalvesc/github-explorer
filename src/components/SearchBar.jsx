import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite um usuário do GitHub..."
          className="w-full px-4 py-2 pl-10 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          disabled={loading}
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3" />
        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;