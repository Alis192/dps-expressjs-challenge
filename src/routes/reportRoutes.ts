import express from 'express';
import {
	createReport,
	getReportsForProject,
	getReportById,
	updateReport,
	deleteReport,
} from '../controllers/reportController';

const router = express.Router({ mergeParams: true });

// Nested under /projects/:projectId/
router.post('/', createReport);
router.get('/', getReportsForProject);

// Global routes
router.get('/reports/:id', getReportById);
router.put('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

export default router;
