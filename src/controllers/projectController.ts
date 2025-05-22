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
