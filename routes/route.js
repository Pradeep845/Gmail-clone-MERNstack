import express from 'express';
import { saveSentEmails } from '../controller/email-controller.js';
import { getEmails } from '../controller/email-controller.js';
import { moveEmailsToBin,deleteEmail,toggleStarredEmails } from '../controller/email-controller.js';

const routes = express.Router();

routes.post('/save',saveSentEmails);
routes.get('/emails/:type',getEmails);
routes.post('/save-draft',saveSentEmails);
routes.post('/bin',moveEmailsToBin);
routes.post('/starred',toggleStarredEmails);
routes.delete('/delete',deleteEmail);

export default routes;

