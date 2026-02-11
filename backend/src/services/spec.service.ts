import { SpecRepository } from '../repositories/spec.repository.js';
import { ISpec, ITask } from '../models/spec.model.js';
import { v4 as uuidv4 } from 'uuid';

export class SpecService {
    private specRepository: SpecRepository;

    constructor() {
        this.specRepository = new SpecRepository();
    }

    async generateSpec(data: { goal: string; users: string; constraints: string; template: string }): Promise<ISpec> {
        // Basic mock generation logic based on template
        const tasks: ITask[] = this.generateTasks(data.template, data.goal);

        const specData: Partial<ISpec> = {
            ...data,
            tasks,
            risks: "Potential integration delays; scalability concerns."
        };

        return await this.specRepository.create(specData);
    }

    private generateTasks(template: string, goal: string): ITask[] {
        const tasks: ITask[] = [];

        if (template === 'web') {
            tasks.push(
                { id: uuidv4(), title: 'User Authentication', description: 'Implement login and signup flows.', type: 'user_story', group: 'Auth' },
                { id: uuidv4(), title: 'Dashboard UI', description: 'Create a responsive dashboard with charts.', type: 'user_story', group: 'UI' },
                { id: uuidv4(), title: 'Setup Database Schema', description: 'Define Mongoose models and connections.', type: 'engineering_task', group: 'Backend' },
                { id: uuidv4(), title: 'API Endpoints', description: 'Implement RESTful APIs for the features.', type: 'engineering_task', group: 'Backend' }
            );
        } else if (template === 'mobile') {
            tasks.push(
                { id: uuidv4(), title: 'Mobile Navigation', description: 'Setup React Native navigation stacks.', type: 'engineering_task', group: 'App Structure' },
                { id: uuidv4(), title: 'Offline Support', description: 'Enable offline data caching with SQLite.', type: 'user_story', group: 'Performance' }
            );
        } else {
            tasks.push(
                { id: uuidv4(), title: 'Core Logic Implementation', description: `Implement basic logic for ${goal}`, type: 'engineering_task', group: 'Core' },
                { id: uuidv4(), title: 'User Interface', description: 'Main screen for the feature.', type: 'user_story', group: 'UI' }
            );
        }

        return tasks;
    }

    async getRecentSpecs(): Promise<ISpec[]> {
        return await this.specRepository.findRecent(5);
    }
}
