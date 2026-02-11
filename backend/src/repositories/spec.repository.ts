import Spec, { ISpec } from '../models/spec.model.js';

export class SpecRepository {
    async create(specData: Partial<ISpec>): Promise<ISpec> {
        const spec = new Spec(specData);
        return await spec.save();
    }

    async findById(id: string): Promise<ISpec | null> {
        return await Spec.findById(id);
    }

    async findRecent(limit: number = 5): Promise<ISpec[]> {
        return await Spec.find().sort({ createdAt: -1 }).limit(limit);
    }

    async update(id: string, specData: Partial<ISpec>): Promise<ISpec | null> {
        return await Spec.findByIdAndUpdate(id, specData, { new: true });
    }
}
