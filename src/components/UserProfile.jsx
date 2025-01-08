import React from 'react';
import { MapPin, Link, Users, Building } from 'lucide-react';

const UserProfile = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-6">
        <img 
          src={user.avatar_url} 
          alt={user.login}
          className="w-24 h-24 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
              <a 
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                @{user.login}
              </a>
            </div>
            <div className="text-sm text-gray-600">
              Membro desde {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
          
          {user.bio && (
            <p className="mt-4 text-gray-700">{user.bio}</p>
          )}
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{user.followers} seguidores · {user.following} seguindo</span>
            </div>
            
            {user.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.company && (
              <div className="flex items-center text-gray-600">
                <Building className="w-4 h-4 mr-2" />
                <span>{user.company}</span>
              </div>
            )}
            
            {user.blog && (
              <div className="flex items-center text-gray-600">
                <Link className="w-4 h-4 mr-2" />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;