import { Request, Response } from 'express';
import db from '../services/db.service';

// Define Report interface for type safety
interface Report {
	id: string;
	text: string;
	projectId: string;
}

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
			{ projectId },
		);
		res.status(200).json(reports);
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to fetch reports' });
	}
};

export const getReportById = (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = db.query('SELECT * FROM reports WHERE id = @id', { id });

		if (result.length === 0) {
			return res.status(404).json({ error: 'Report not found' });
		}

		res.status(200).json(result[0]);
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to fetch report' });
	}
};

export const updateReport = (req: Request, res: Response) => {
	const { id } = req.params;
	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ error: 'Text is required' });
	}

	try {
		const result = db.run(
			'UPDATE reports SET text = @text WHERE id = @id',
			{
				id,
				text,
			},
		);

		if (result.changes === 0) {
			return res.status(404).json({ error: 'Report not found' });
		}

		res.status(200).json({ id, text });
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to update report' });
	}
};

export const deleteReport = (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const result = db.run('DELETE FROM reports WHERE id = @id', { id });

		if (result.changes === 0) {
			return res.status(404).json({ error: 'Report not found' });
		}

		res.status(204).send(); // No content
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to delete report' });
	}
};

export const getReportsWithRepeatedWords = (req: Request, res: Response) => {
	try {
		// Cast the result to Report[] so TypeScript knows its shape
		const reports = db.query('SELECT * FROM reports') as Report[];

		const filteredReports = reports.filter((report: Report) => {
			const wordCounts: Record<string, number> = {};
			const words = report.text
				.toLowerCase()
				.replace(/[^\w\s]/g, '') // remove punctuation
				.split(/\s+/); // split on whitespace

			for (const word of words) {
				wordCounts[word] = (wordCounts[word] || 0) + 1;
			}

			// Check if any word appears at least 3 times
			return Object.values(wordCounts).some((count) => count >= 3);
		});

		res.status(200).json(filteredReports);
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: 'Failed to analyze reports' });
	}
};
