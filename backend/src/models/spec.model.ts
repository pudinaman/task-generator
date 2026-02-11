import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
    id: string;
    title: string;
    description: string;
    type: 'user_story' | 'engineering_task';
    group?: string;
}

export interface ISpec extends Document {
    goal: string;
    users: string;
    constraints: string;
    template: string;
    tasks: ITask[];
    risks?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['user_story', 'engineering_task'], required: true },
    group: { type: String },
});

const SpecSchema = new Schema({
    goal: { type: String, required: true },
    users: { type: String, required: true },
    constraints: { type: String, required: true },
    template: { type: String, required: true },
    tasks: [TaskSchema],
    risks: { type: String },
}, { timestamps: true });

export default mongoose.model<ISpec>('Spec', SpecSchema);
