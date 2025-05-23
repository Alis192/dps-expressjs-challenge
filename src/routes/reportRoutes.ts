import express from 'express';
import {
	createReport,
	getReportsForProject,
} from '../controllers/reportController';

const router = express.Router({ mergeParams: true });

router.post('/', createReport);
router.get('/', getReportsForProject);

export default router;
