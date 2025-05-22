import express, { Express } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Register the route
app.use('/projects', projectRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
