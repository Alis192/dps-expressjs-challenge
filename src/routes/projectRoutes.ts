import express from 'express';
import {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
} from '../controllers/projectController';

import reportRoutes from './reportRoutes';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// ✅ Mount reports under /projects/:projectId/reports
router.use('/:projectId/reports', reportRoutes);

export default router;
