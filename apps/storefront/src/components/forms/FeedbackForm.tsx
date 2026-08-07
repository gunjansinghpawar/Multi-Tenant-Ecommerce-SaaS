'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFTextarea } from '@commercex/ui';
import { MessageSquareHeart } from 'lucide-react';

const feedbackSchema = z.object({
  type: z.enum(['suggestion', 'bug', 'compliment', 'other']),
  message: z.string().min(10, 'Feedback must be at least 10 characters'),
  allowContact: z.boolean().optional(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { type: 'suggestion', message: '', allowContact: false },
  });

  const onSubmit = (data: FeedbackFormData) => {
    setIsLoading(true);
    console.log('Feedback submitted:', data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6 bg-card border rounded-xl animate-in fade-in zoom-in-95">
        <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          <MessageSquareHeart className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
        <p className="text-muted-foreground mb-6">Your feedback helps us improve our store experience.</p>
        <Button variant="outline" onClick={() => { setIsSuccess(false); form.reset(); }}>
          Submit More Feedback
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm max-w-lg mx-auto">
      <div className="mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold tracking-tight">Send Feedback</h3>
        <p className="text-muted-foreground">Tell us how we can improve your shopping experience.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Feedback Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'suggestion', label: 'Suggestion' },
                { value: 'bug', label: 'Bug Report' },
                { value: 'compliment', label: 'Compliment' },
                { value: 'other', label: 'Other' },
              ].map((type) => (
                <label 
                  key={type.value} 
                  className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    form.watch('type') === type.value ? 'border-primary bg-primary/5 font-medium' : 'hover:bg-muted'
                  }`}
                >
                  <input 
                    type="radio" 
                    value={type.value} 
                    className="sr-only" 
                    {...form.register('type')} 
                  />
                  {type.label}
                </label>
              ))}
            </div>
            {form.formState.errors.type && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.type.message}</p>
            )}
          </div>
          
          <RHFTextarea 
            name="message" 
            label="Your Feedback" 
            textareaProps={{ rows: 5, placeholder: 'What\'s on your mind?' }} 
          />

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="allowContact" 
              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
              {...form.register('allowContact')}
            />
            <label htmlFor="allowContact" className="text-sm font-medium">
              You can contact me about this feedback
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
            Submit Feedback
          </Button>
        </form>
      </Form>
    </div>
  );
}
