import { Router } from 'express';
import {
  uploadHeroSlideFile,
  getAllHeroSlides,
  getHeroSlide,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroSlideController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getAllHeroSlides);
router.get('/:id', getHeroSlide);
router.post('/', createHeroSlide);
router.post('/upload', upload.single('file'), uploadHeroSlideFile);
router.put('/:id', updateHeroSlide);
router.delete('/:id', deleteHeroSlide);

export default router;
