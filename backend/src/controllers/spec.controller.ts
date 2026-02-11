import type { Request, Response } from 'express';
import { SpecService } from '../services/spec.service.js';

const specService = new SpecService();

export class SpecController {
    async create(req: Request, res: Response) {
        try {
            const spec = await specService.generateSpec(req.body);
            res.status(201).json(spec);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRecent(req: Request, res: Response) {
        try {
            const specs = await specService.getRecentSpecs();
            res.json(specs);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            // Logic for updating tasks/order would go here
            res.status(501).json({ message: 'Update not fully implemented yet' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
