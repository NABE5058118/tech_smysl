import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSettings = async (_req: Request, res: Response) => {
  try {
    const settings = await prisma.setting.findMany();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

export const getSettingByKey = async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: req.params.key },
    });
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch setting' });
  }
};

export const updateSetting = async (req: Request, res: Response) => {
  try {
    const setting = await prisma.setting.upsert({
      where: { key: req.params.key },
      update: { value: req.body.value },
      create: { key: req.params.key, value: req.body.value },
    });
    res.json(setting);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update setting' });
  }
};