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
