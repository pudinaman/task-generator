import { Reorder } from 'framer-motion';

import { type ITask } from '../services/app-service';
import { CheckCircle2, Code, GripVertical } from 'lucide-react';

const MotionReorderGroup = Reorder.Group as any;
const MotionReorderItem = Reorder.Item as any;


interface TaskListProps {
  tasks: ITask[];
  onTasksChange: (tasks: ITask[]) => void;
}

const TaskList = ({ tasks, onTasksChange }: TaskListProps) => {
  return (
    <div className="mt-12 space-y-4">
      <h3 className="text-lg font-medium text-slate-300 flex items-center gap-2">
        <CheckCircle2 className="text-primary-500" size={20} />
        Generated Tasks
      </h3>
      
      <MotionReorderGroup axis="y" values={tasks} onReorder={onTasksChange} className="space-y-3">
        {tasks.map((task) => (
          <MotionReorderItem 
            key={task.id} 
            value={task}
            className="glass-card p-4 flex items-center gap-4 cursor-default select-none border border-slate-700/50 hover:border-primary-500/30 transition-colors"
          >
            <GripVertical className="text-slate-600 cursor-grab active:cursor-grabbing" size={20} />
            <div className={`p-2 rounded-lg ${task.type === 'user_story' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {task.type === 'user_story' ? <CheckCircle2 size={18} /> : <Code size={18} />}
            </div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-medium">{task.title}</h4>
              <p className="text-sm text-slate-500">{task.description}</p>
            </div>
            {task.group && (
              <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                {task.group}
              </span>
            )}
          </MotionReorderItem>
        ))}
      </MotionReorderGroup>
    </div>
  );
};

export default TaskList;
