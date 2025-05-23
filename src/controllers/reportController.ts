import { Request, Response } from 'express';
import db from '../services/db.service';

export const createReport = (req: Request, res: Response) => {
	const { projectId } = req.params;
	const { id, text } = req.body;

	if (!id || !text) {
		return res.status(400).json({ error: 'ID and text are required' });
	}

	// Check that project exists
	const project = db.query('SELECT * FROM projects WHERE id = @id', {
		id: projectId,
	});
	if (project.length === 0) {
		return res.status(404).json({ error: 'Project not found' });
	}

	try {
		db.run(
			'INSERT INTO reports (id, "text", projectId) VALUES (@id, @text, @projectId)',
			{ id, text, projectId },
		);

		res.status(201).json({ id, text, projectId });
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to create report' });
	}
};

export const getReportsForProject = (req: Request, res: Response) => {
	const { projectId } = req.params;

	try {
		const reports = db.query(
			'SELECT * FROM reports WHERE projectId = @projectId',
			{
				projectId,
			},
		);
		res.status(200).json(reports);
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to fetch reports' });
	}
};
