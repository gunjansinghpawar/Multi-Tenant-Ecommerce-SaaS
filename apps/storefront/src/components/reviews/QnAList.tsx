'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Question } from './types';
import { QuestionCard } from './QuestionCard';

interface QnAListProps {
  questions: Question[];
  currentUserId?: string;
  onAskQuestion?: (text: string) => void;
}

export function QnAList({ questions, currentUserId, onAskQuestion }: QnAListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const filteredQuestions = questions.filter((q) =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      onAskQuestion?.(newQuestion);
      setNewQuestion('');
      setIsAsking(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Search and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors sm:text-sm"
            placeholder="Search questions and answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => setIsAsking(!isAsking)}
          className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-black dark:border-white text-sm font-medium rounded-full text-black dark:text-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Ask a Question
        </button>
      </div>

      {/* Ask Form */}
      {isAsking && (
        <form onSubmit={handleAskSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl animate-in fade-in slide-in-from-top-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ask a new question</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Don't see your question? Ask the community and we'll get back to you.
          </p>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none mb-4"
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAsking(false)}
              className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newQuestion.trim()}
              className="px-5 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Post Question
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-2">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No questions found {searchQuery ? `for "${searchQuery}"` : ''}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setNewQuestion(searchQuery);
                  setIsAsking(true);
                }}
                className="text-black dark:text-white font-medium hover:underline"
              >
                Ask this question instead
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
