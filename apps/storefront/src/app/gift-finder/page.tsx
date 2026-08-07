'use client';

import { useState } from 'react';
import { Sparkles, Gift, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GiftFinderPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // State
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else generateGifts();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const generateGifts = () => {
    setIsGenerating(true);
    // Simulate AI thinking
    setTimeout(() => {
      setResults([
        { id: '1', name: 'Premium Coffee Maker', price: 149.99, image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=800&auto=format&fit=crop' },
        { id: '2', name: 'Noise Cancelling Headphones', price: 299.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
        { id: '3', name: 'Artisan Chocolate Box', price: 45.00, image: 'https://images.unsplash.com/photo-1540306129841-f67385f0fc98?q=80&w=800&auto=format&fit=crop' }
      ]);
      setIsGenerating(false);
      setStep(5);
    }, 3000);
  };

  const OptionButton = ({ value, state, setter }: { value: string, state: string, setter: (val: string) => void }) => (
    <button 
      onClick={() => setter(value)}
      className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all ${state === value ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : 'border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'}`}
    >
      {value}
    </button>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-4">
      
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        
        {step < 5 && !isGenerating && (
          <div className="mb-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">AI Gift Finder</h1>
            <p className="text-gray-500 text-lg">Let our AI curate the perfect gift based on a few simple questions.</p>
          </div>
        )}

        {/* Wizard Steps */}
        {!isGenerating && step < 5 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 animate-in slide-in-from-bottom-8">
            
            {/* Progress */}
            <div className="flex justify-between mb-8">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-2 flex-1 mx-1 rounded-full ${i <= step ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-800'}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <h2 className="text-2xl font-bold mb-6 text-center">Who are you shopping for?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <OptionButton value="Partner" state={recipient} setter={setRecipient} />
                  <OptionButton value="Parent" state={recipient} setter={setRecipient} />
                  <OptionButton value="Friend" state={recipient} setter={setRecipient} />
                  <OptionButton value="Colleague" state={recipient} setter={setRecipient} />
                  <OptionButton value="Child" state={recipient} setter={setRecipient} />
                  <OptionButton value="Myself" state={recipient} setter={setRecipient} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-bold mb-6 text-center">What's the occasion?</h2>
                <div className="grid grid-cols-2 gap-4">
                  <OptionButton value="Birthday" state={occasion} setter={setOccasion} />
                  <OptionButton value="Anniversary" state={occasion} setter={setOccasion} />
                  <OptionButton value="Holiday" state={occasion} setter={setOccasion} />
                  <OptionButton value="Wedding" state={occasion} setter={setOccasion} />
                  <OptionButton value="Housewarming" state={occasion} setter={setOccasion} />
                  <OptionButton value="Just Because" state={occasion} setter={setOccasion} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-bold mb-6 text-center">What's your budget?</h2>
                <div className="space-y-3">
                  <OptionButton value="Under $50" state={budget} setter={setBudget} />
                  <OptionButton value="$50 - $150" state={budget} setter={setBudget} />
                  <OptionButton value="$150 - $300" state={budget} setter={setBudget} />
                  <OptionButton value="Over $300" state={budget} setter={setBudget} />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-bold mb-6 text-center">What are their interests? (Select a few)</h2>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Technology', 'Fashion', 'Home Decor', 'Fitness', 'Cooking', 'Travel', 'Gaming', 'Art', 'Reading', 'Music'].map(interest => (
                    <button 
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full font-medium border transition-colors ${interests.includes(interest) ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300'}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-12 pt-6 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={handleBack} 
                className={`flex items-center font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </button>
              
              <button 
                onClick={handleNext} 
                disabled={
                  (step === 1 && !recipient) || 
                  (step === 2 && !occasion) || 
                  (step === 3 && !budget) || 
                  (step === 4 && interests.length === 0)
                }
                className="flex items-center px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {step === 4 ? (
                  <><Sparkles className="w-5 h-5 mr-2" /> Find Gifts</>
                ) : (
                  <>Next <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
              <Sparkles className="w-12 h-12 text-white absolute inset-0 m-auto" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Millions of Products...</h2>
            <p className="text-gray-500">Curating the perfect selections for a {recipient}'s {occasion}.</p>
          </div>
        )}

        {/* Results */}
        {step === 5 && !isGenerating && (
          <div className="animate-in fade-in slide-in-from-bottom-8 max-w-4xl w-[90vw]">
            <div className="text-center mb-12">
              <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">We found the perfect gifts.</h2>
              <p className="text-gray-500 text-lg">Curated specifically based on your answers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {results.map(product => (
                <div key={product.id} className="bg-white dark:bg-gray-900 rounded-3xl p-4 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 relative">
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-lg z-10 flex items-center">
                       <Sparkles className="w-3 h-3 mr-1" /> 98% Match
                    </div>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg line-clamp-1 text-gray-900 dark:text-white mb-1">{product.name}</h3>
                  <p className="text-gray-500 mb-4">${product.price.toFixed(2)}</p>
                  <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button onClick={() => { setStep(1); setInterests([]); }} className="text-gray-500 hover:text-black dark:hover:text-white font-medium transition-colors">
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
