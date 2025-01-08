import React, { useState } from 'react';
import { Search, Github, Linkedin, Instagram } from 'lucide-react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import ErrorMessage from './components/ErrorMessage';

const socialLinks = {
  Github: {
    url: 'https://github.com/bernardoalvesc',
    icon: <Github className="w-5 h-5 text-gray-400" />,
  },
  Linkedin: {
    url: 'https://www.linkedin.com/in/bernardoalvesdev/',
    icon: <Linkedin className="w-5 h-5 text-gray-400" />,
  },
  Instagram: {
    url: 'https://www.instagram.com/bernardoalvesc_/',
    icon: <Instagram className="w-5 h-5 text-gray-400" />,
  },
};

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGithubData = async (username) => {
    if (!username) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    setRepos([]);

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      ]);

      if (!userResponse.ok) {
        throw new Error(
          userResponse.status === 404
            ? 'Usuário não encontrado'
            : 'Erro ao buscar dados do usuário'
        );
      }

      if (!reposResponse.ok) {
        throw new Error('Erro ao buscar repositórios');
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      setUserData(userData);
      setRepos(reposData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8 gap-2">
            <Github className="w-8 h-8" />
            <h1 className="text-3xl font-bold text-gray-800">GitHub Explorer</h1>
          </div>

          <SearchBar onSearch={fetchGithubData} loading={loading} />

          {error && <ErrorMessage message={error} />}

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {userData && !loading && (
            <div className="space-y-6">
              <UserProfile user={userData} />
              <RepoList repos={repos} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-white/10 backdrop-blur-xl bg-zinc-900/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 text-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Github className="text-gray-400" size={24} />
            </div>
            <span className="text-xl font-bold text-white">GitHub Explorer</span>
          </div>

          <div className="flex items-center gap-6">
            <ul className="flex gap-4">
              {Object.entries(socialLinks).map(([name, { url, icon }]) => (
                <li key={name} className="flex items-center gap-2">
                  {icon}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors capitalize"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-sm text-white">
              © 2025 GitHub Explorer. Todos os direitos reservados. Desenvolvido por Bernardo Alves.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
