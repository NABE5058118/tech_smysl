import { Router } from 'express';
import {
  getAllSettings,
  getSettingByKey,
  updateSetting,
} from '../controllers/settingsController.js';

const router = Router();

router.get('/', getAllSettings);
router.get('/:key', getSettingByKey);
router.put('/:key', updateSetting);

export default router;