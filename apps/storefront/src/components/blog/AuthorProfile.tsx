import { Twitter, Linkedin, Github } from 'lucide-react';
import { Author } from './types';

interface AuthorProfileProps {
  author: Author;
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
      <img
        src={author.avatarUrl}
        alt={author.name}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-6 sm:mb-0 sm:mr-8 border-4 border-white dark:border-gray-800 shadow-lg"
      />
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          Written by {author.name}
        </h4>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
          {author.role}
        </p>
        {author.bio && (
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {author.bio}
          </p>
        )}
        {author.socials && (
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            {author.socials.twitter && (
              <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {author.socials.linkedin && (
              <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {author.socials.github && (
              <a href={author.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
