import { Request, Response } from 'express';
import db from '../services/db.service';

export const getProjects = (req: Request, res: Response) => {
	try {
		const projects = db.query('SELECT * FROM projects');
		res.status(200).json(projects);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch projects' });
	}
};

export const createProject = (req: Request, res: Response) => {
	const { id, name, description } = req.body;

	if (!id || !name || !description) {
		return res
			.status(400)
			.json({ error: 'ID, name, and description are required' });
	}

	try {
		db.run(
			'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)',
			{ id, name, description },
		);

		res.status(201).json({ id, name, description });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to create project' });
	}
};

export const updateProject = (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, description } = req.body;

	if (!name || !description) {
		return res
			.status(400)
			.json({ error: 'Name and description are required' });
	}

	try {
		const result = db.run(
			'UPDATE projects SET name = @name, description = @description WHERE id = @id',
			{ id, name, description },
		);

		if (result.changes === 0) {
			return res.status(404).json({ error: 'Project not found' });
		}

		res.status(200).json({ id, name, description });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to update project' });
	}
};

export const deleteProject = (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = db.run('DELETE FROM projects WHERE id = @id', { id });

		if (result.changes === 0) {
			return res.status(404).json({ error: 'Project not found' });
		}

		res.status(204).send(); // No content
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to delete project' });
	}
};
