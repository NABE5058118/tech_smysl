import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPresentationFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = req.file;
    const presentation = await prisma.presentation.create({
      data: {
        title: file.originalname.replace(/\.[^.]+$/, ''),
        fileUrl: `/uploads/${file.filename}`,
        slides: { create: [] },
      },
      include: { slides: true },
    });

    res.status(201).json(presentation);
  } catch (error) {
    console.error('Failed to upload presentation:', error);
    res.status(400).json({ error: 'Failed to upload presentation' });
  }
};

export const getAllPresentations = async (_req: Request, res: Response) => {
  try {
    const presentations = await prisma.presentation.findMany({
      include: { slides: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(presentations);
  } catch (error) {
    console.error('Failed to fetch presentations:', error);
    res.status(500).json({ error: 'Failed to fetch presentations' });
  }
};

export const getPresentation = async (req: Request, res: Response) => {
  try {
    const presentation = await prisma.presentation.findUnique({
      where: { id: req.params.id },
      include: { slides: { orderBy: { order: 'asc' } } },
    });
    if (!presentation) return res.status(404).json({ error: 'Presentation not found' });
    res.json(presentation);
  } catch (error) {
    console.error('Failed to fetch presentation:', error);
    res.status(404).json({ error: 'Presentation not found' });
  }
};

export const createPresentation = async (req: Request, res: Response) => {
  try {
    const { title, description, fileUrl, thumbnailUrl, slides, published } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: 'fileUrl is required' });
    }

    const presentation = await prisma.presentation.create({
      data: {
        title,
        description,
        fileUrl,
        thumbnailUrl,
        published: published ?? false,
        slides: {
          create: slides?.map((s: { title?: string; text?: string; imageUrl?: string; imageAlt?: string; order?: number }, i: number) => ({
            title: s.title,
            text: s.text,
            imageUrl: s.imageUrl,
            imageAlt: s.imageAlt,
            order: s.order ?? i,
          })) || [],
        },
      },
      include: { slides: true },
    });

    res.status(201).json(presentation);
  } catch (error) {
    console.error('Failed to create presentation:', error);
    res.status(400).json({ error: 'Failed to create presentation' });
  }
};

export const updatePresentation = async (req: Request, res: Response) => {
  try {
    const { title, description, fileUrl, thumbnailUrl, slides, published } = req.body;

    const presentation = await prisma.presentation.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        fileUrl,
        thumbnailUrl,
        published,
        slides: {
          deleteMany: {},
          create: slides?.map((s: { title?: string; text?: string; imageUrl?: string; imageAlt?: string; order?: number }, i: number) => ({
            title: s.title,
            text: s.text,
            imageUrl: s.imageUrl,
            imageAlt: s.imageAlt,
            order: s.order ?? i,
          })) || [],
        },
      },
      include: { slides: { orderBy: { order: 'asc' } } },
    });

    res.json(presentation);
  } catch (error) {
    console.error('Failed to update presentation:', error);
    res.status(400).json({ error: 'Failed to update presentation' });
  }
};

export const deletePresentation = async (req: Request, res: Response) => {
  try {
    const presentation = await prisma.presentation.findUnique({
      where: { id: req.params.id },
    });
    if (presentation?.fileUrl?.startsWith('/uploads/')) {
      const fs = await import('fs');
      const filePath = path.join(__dirname, '..', presentation.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await prisma.presentation.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete presentation:', error);
    res.status(400).json({ error: 'Failed to delete presentation' });
  }
};