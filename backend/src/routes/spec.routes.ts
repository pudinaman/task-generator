import { Router } from 'express';
import { SpecController } from '../controllers/spec.controller.js';
import { validate } from '../utils/validate.js';
import { CreateSpecSchema } from '../utils/validators.js';

const router = Router();
const specController = new SpecController();

router.post('/', validate(CreateSpecSchema), (req, res) => specController.create(req, res));
router.get('/recent', (req, res) => specController.getRecent(req, res));

export default router;
