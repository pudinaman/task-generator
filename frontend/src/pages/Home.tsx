import { useState, useEffect } from 'react';
import FeatureForm from '../components/FeatureForm';
import TaskList from '../components/TaskList';
import { specService, type ISpec, type ITask } from '../services/app-service';
import { DownloadCloud, Copy, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionAnimatePresence = AnimatePresence as any;

const Home = () => {
  const [currentSpec, setCurrentSpec] = useState<ISpec | null>(null);
  const [history, setHistory] = useState<ISpec[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await specService.getRecent();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history', error);
    }
  };

  const handleGenerate = async (data: any) => {
    setLoading(true);
    try {
      const spec = await specService.create(data);
      setCurrentSpec(spec);
      loadHistory();
    } catch (error: any) {
      console.error('Generation failed', error);
      const message = error.response?.data?.[0]?.message || 'Generation failed. Please check your inputs.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!currentSpec) return;
    const text = `# ${currentSpec.goal}\n\n## Tasks\n` + 
      currentSpec.tasks.map(t => `- [ ] ${t.title}: ${t.description}`).join('\n');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        {!currentSpec ? (
          <FeatureForm onSubmit={handleGenerate} isLoading={loading} />
        ) : (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setCurrentSpec(null)}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                ← Back to Form
              </button>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="p-2 glass text-slate-300 hover:text-primary-400 rounded-lg transition-colors">
                  <Copy size={18} />
                </button>
                <button className="p-2 glass text-slate-300 hover:text-primary-400 rounded-lg transition-colors">
                  <DownloadCloud size={18} />
                </button>
              </div>
            </div>

            <div className="glass-card p-6 border-l-4 border-primary-500">
               <h2 className="text-2xl font-bold text-white mb-2">{currentSpec.goal}</h2>
               <div className="flex gap-4 text-sm text-slate-400">
                 <span>Users: {currentSpec.users}</span>
                 <span>•</span>
                 <span>Template: {currentSpec.template}</span>
               </div>
            </div>

            <TaskList 
              tasks={currentSpec.tasks} 
              onTasksChange={(tasks) => setCurrentSpec({ ...currentSpec, tasks })} 
            />

            {currentSpec.risks && (
              <div className="glass-card p-6 mt-8 border border-red-500/20 bg-red-500/5">
                <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  ⚠️ Potential Risks & Unknowns
                </h3>
                <p className="text-slate-300 text-sm">{currentSpec.risks}</p>
              </div>
            )}
          </MotionDiv>
        )}
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="glass-card p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-slate-300">
            <History size={20} />
            <h3 className="font-semibold text-lg">Recent Specs</h3>
          </div>
          
          <div className="space-y-4">
            <MotionAnimatePresence>
              {history.map((spec) => (
                <MotionDiv
                  key={spec._id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setCurrentSpec(spec)}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-primary-500/50 cursor-pointer transition-all"
                >
                  <p className="text-sm text-slate-200 font-medium truncate">{spec.goal}</p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(spec.createdAt).toLocaleDateString()}</p>
                </MotionDiv>
              ))}
            </MotionAnimatePresence>
            {history.length === 0 && (
              <p className="text-slate-500 text-sm italic">No history yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
