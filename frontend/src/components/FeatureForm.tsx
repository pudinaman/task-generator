import { useState } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

import { Sparkles, Send } from 'lucide-react';

interface FeatureFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const FeatureForm = ({ onSubmit, isLoading }: FeatureFormProps) => {
  const [formData, setFormData] = useState({
    goal: '',
    users: '',
    constraints: '',
    template: 'web'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-6 text-primary-400">
        <Sparkles size={20} />
        <h2 className="text-xl font-semibold text-white">New Feature Spec</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Feature Goal (min 10 chars)</label>
          <textarea 
            required
            minLength={10}
            className="input-field w-full h-24 resize-none"
            placeholder="e.g., Enable users to track their daily water intake..."
            value={formData.goal}
            onChange={(e) => setFormData({...formData, goal: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Target Users (min 5 chars)</label>
            <input 
              required
              minLength={5}
              className="input-field w-full"
              placeholder="e.g., Health conscious adults"
              value={formData.users}
              onChange={(e) => setFormData({...formData, users: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Template</label>
            <select 
              className="input-field w-full"
              value={formData.template}
              onChange={(e) => setFormData({...formData, template: e.target.value})}
            >
              <option value="web">Web Application</option>
              <option value="mobile">Mobile App</option>
              <option value="internal">Internal Tool</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Constraints (min 5 chars)</label>
          <input 
            required
            minLength={5}
            className="input-field w-full"
            placeholder="e.g., Must work offline, accessibility compliant"
            value={formData.constraints}
            onChange={(e) => setFormData({...formData, constraints: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isLoading ? 'Generating Tasks...' : 'Generate Spec'}
          <Send size={18} />
        </button>
      </form>
    </MotionDiv>
  );
};

export default FeatureForm;
