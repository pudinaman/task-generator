import { z } from 'zod';

export const CreateSpecSchema = z.object({
    body: z.object({
        goal: z.string().min(10),
        users: z.string().min(5),
        constraints: z.string().min(5),
        template: z.enum(['web', 'mobile', 'internal', 'other']),
    })
});

export const UpdateSpecSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        tasks: z.array(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            type: z.enum(['user_story', 'engineering_task']),
            group: z.string().optional(),
        })).optional(),
        risks: z.string().optional(),
    })
});
