import { Router } from 'express';
import {
  uploadMedia,
  getAllMedia,
  getMediaById,
  deleteMedia,
} from '../controllers/mediaController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.post('/', upload.single('file'), uploadMedia);
router.delete('/:id', deleteMedia);

export default router;