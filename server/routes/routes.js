import express from 'express';

import { saveSentEmails, getEmails, moveEmailsToBin, toggleStarredEmail, deleteEmails} from '../controllers/emailController.js';

const routes = express.Router();

routes.post('/save', saveSentEmails);
routes.post('/save-draft', saveSentEmails);
routes.get('/emails/:type', getEmails);
routes.post('/starred', toggleStarredEmail);
routes.delete('/delete', deleteEmails);
routes.post('/bin', moveEmailsToBin);

export default routes;