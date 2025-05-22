import express from 'express';
import { getProjects, createProject } from '../controllers/projectController';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject); // ← Add this line

export default router;
