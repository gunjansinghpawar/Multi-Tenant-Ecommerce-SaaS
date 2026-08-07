'use client';

import { LucideIcon } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

interface SettingOption {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

interface NotificationChannelBlockProps {
  icon: LucideIcon;
  title: string;
  description: string;
  options: SettingOption[];
  onToggle: (optionId: string, newValue: boolean) => void;
  masterEnabled?: boolean;
}

export function NotificationChannelBlock({ 
  icon: Icon, 
  title, 
  description, 
  options,
  onToggle,
  masterEnabled = true
}: NotificationChannelBlockProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 transition-all hover:shadow-lg">
      <div className="flex items-start mb-8">
        <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-gray-900 dark:text-white">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {options.map((option) => (
          <div key={option.id} className="flex items-center justify-between">
            <div className="pr-4">
              <label className="text-sm font-medium text-gray-900 dark:text-white block">
                {option.label}
              </label>
              {option.description && (
                <p className="text-xs text-gray-500 mt-1">{option.description}</p>
              )}
            </div>
            <ToggleSwitch 
              enabled={option.enabled && masterEnabled} 
              onChange={(val) => onToggle(option.id, val)} 
              disabled={!masterEnabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
