import { Router } from 'express';
import {
  getAllPresentations,
  getPresentation,
  createPresentation,
  updatePresentation,
  deletePresentation,
  uploadPresentationFile,
} from '../controllers/presentationController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAllPresentations);
router.get('/:id', getPresentation);
router.post('/', createPresentation);
router.post('/upload', upload.single('file'), uploadPresentationFile);
router.put('/:id', updatePresentation);
router.delete('/:id', deletePresentation);

export default router;