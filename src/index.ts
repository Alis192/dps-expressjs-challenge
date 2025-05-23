import express, { Express } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';
import reportRoutes from './routes/reportRoutes'; // 👈 import report routes

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Register modular routes
app.use('/projects', projectRoutes);

// Register global report routes (e.g. /reports/:id)
app.use('/', reportRoutes); // Needed for GET/PUT/DELETE /reports/:id

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
