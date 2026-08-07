'use client';

import { useState } from 'react';
import { ThumbsUp, MessageSquare, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Question } from './types';

interface QuestionCardProps {
  question: Question;
  currentUserId?: string;
}

export function QuestionCard({ question, currentUserId }: QuestionCardProps) {
  const [helpfulStatus, setHelpfulStatus] = useState<'up' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(question.helpfulVotes);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const handleVote = () => {
    if (helpfulStatus === 'up') {
      setHelpfulStatus(null);
      setHelpfulCount(helpfulCount - 1);
    } else {
      setHelpfulStatus('up');
      setHelpfulCount(helpfulCount + 1);
    }
  };

  return (
    <div className="py-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
      {/* Question */}
      <div className="flex items-start">
        <div className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
          Q
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {question.text}
          </h4>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <span className="font-medium">{question.user.name}</span>
            <span>•</span>
            <span>{format(new Date(question.createdAt), 'MMM d, yyyy')}</span>
          </div>

          {/* Answers */}
          <div className="mt-6 space-y-6">
            {question.answers.map((answer) => (
              <div key={answer.id} className="flex items-start">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  A
                </div>
                <div className="ml-4 flex-1 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {answer.text}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {answer.user.name}
                    </span>
                    {answer.isSeller && (
                      <span className="flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Seller
                      </span>
                    )}
                    <span>•</span>
                    <span>{format(new Date(answer.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Answer Form */}
            {showAnswerForm ? (
              <div className="ml-12 mt-4 flex items-start space-x-3">
                 <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex-shrink-0" />
                 <div className="flex-1 relative">
                   <textarea
                     value={answerText}
                     onChange={(e) => setAnswerText(e.target.value)}
                     placeholder="Write your answer..."
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                     rows={3}
                   />
                   <div className="mt-2 flex justify-end space-x-2">
                     <button
                       onClick={() => setShowAnswerForm(false)}
                       className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                     >
                       Cancel
                     </button>
                     <button
                       className="px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                     >
                       Post Answer
                     </button>
                   </div>
                 </div>
              </div>
            ) : (
              <div className="ml-12 mt-4 flex items-center space-x-4">
                <button
                  onClick={() => setShowAnswerForm(true)}
                  className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Answer this question
                </button>
                <button
                  onClick={handleVote}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    helpfulStatus === 'up'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${helpfulStatus === 'up' ? 'fill-current' : ''}`} />
                  <span>Helpful ({helpfulCount})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
