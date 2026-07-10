import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadHeroSlideFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const file = req.file;
    const slide = await prisma.heroSlide.create({
      data: {
        imageUrl: `/uploads/${file.filename}`,
        imageAlt: file.originalname,
        title: file.originalname.replace(/\.[^.]+$/, ''),
      },
    });
    res.status(201).json(slide);
  } catch (error) {
    console.error('Failed to upload hero slide:', error);
    res.status(400).json({ error: 'Failed to upload hero slide' });
  }
};

export const getAllHeroSlides = async (_req: Request, res: Response) => {
  try {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });
    res.json(slides);
  } catch (error) {
    console.error('Failed to fetch hero slides:', error);
    res.status(500).json({ error: 'Failed to fetch hero slides' });
  }
};

export const getHeroSlide = async (req: Request, res: Response) => {
  try {
    const slide = await prisma.heroSlide.findUnique({ where: { id: req.params.id } });
    if (!slide) return res.status(404).json({ error: 'Hero slide not found' });
    res.json(slide);
  } catch (error) {
    console.error('Failed to fetch hero slide:', error);
    res.status(404).json({ error: 'Hero slide not found' });
  }
};

export const createHeroSlide = async (req: Request, res: Response) => {
  try {
    const { imageUrl, imageAlt, title, subtitle, order } = req.body;
    const slide = await prisma.heroSlide.create({
      data: { imageUrl, imageAlt, title, subtitle, order },
    });
    res.status(201).json(slide);
  } catch (error) {
    console.error('Failed to create hero slide:', error);
    res.status(400).json({ error: 'Failed to create hero slide' });
  }
};

export const updateHeroSlide = async (req: Request, res: Response) => {
  try {
    const { imageUrl, imageAlt, title, subtitle, order } = req.body;
    const slide = await prisma.heroSlide.update({
      where: { id: req.params.id },
      data: { imageUrl, imageAlt, title, subtitle, order },
    });
    res.json(slide);
  } catch (error) {
    console.error('Failed to update hero slide:', error);
    res.status(400).json({ error: 'Failed to update hero slide' });
  }
};

export const deleteHeroSlide = async (req: Request, res: Response) => {
  try {
    const slide = await prisma.heroSlide.findUnique({ where: { id: req.params.id } });
    if (slide?.imageUrl?.startsWith('/uploads/')) {
      const fs = await import('fs');
      const uploadPath = path.join(__dirname, '../uploads', slide.imageUrl.replace('/uploads/', ''));
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath);
      }
    }
    await prisma.heroSlide.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete hero slide:', error);
    res.status(400).json({ error: 'Failed to delete hero slide' });
  }
};
