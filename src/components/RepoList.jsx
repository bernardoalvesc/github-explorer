import React from 'react';
import { Star, GitBranch, Circle } from 'lucide-react';

const RepoList = ({ repos }) => {
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-600',
      Python: 'bg-green-500',
      Java: 'bg-red-600',
      'C++': 'bg-pink-600',
      Ruby: 'bg-red-500',
      PHP: 'bg-purple-500',
      default: 'bg-gray-400'
    };
    return colors[language] || colors.default;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Repositórios ({repos.length})</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map(repo => (
          <div key={repo.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {repo.name}
              </a>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center">
                  <GitBranch className="w-4 h-4 mr-1" />
                  {repo.forks_count}
                </div>
              </div>
            </div>
            
            {repo.description && (
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {repo.description}
              </p>
            )}
            
            <div className="mt-4 flex items-center space-x-4 text-sm">
              {repo.language && (
                <div className="flex items-center">
                  <Circle className={`w-3 h-3 mr-1 ${getLanguageColor(repo.language)}`} />
                  {repo.language}
                </div>
              )}
              <span className="text-gray-500">
                Atualizado em {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;