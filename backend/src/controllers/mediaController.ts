import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMedia = async (_req: Request, res: Response) => {
  try {
    const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(media);
  } catch (error) {
    console.error('Failed to fetch media:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};

export const getMediaById = async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findUnique({ where: { id: req.params.id } });
    if (!media) return res.status(404).json({ error: 'Media not found' });
    res.json(media);
  } catch (error) {
    console.error('Failed to fetch media:', error);
    res.status(404).json({ error: 'Media not found' });
  }
};

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = req.file;
    const type = file.mimetype.startsWith('image/') ? 'IMAGE' :
                 file.mimetype.startsWith('video/') ? 'VIDEO' : 'DOCUMENT';

    const media = await prisma.media.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`,
        type,
      },
    });
    res.status(201).json(media);
  } catch (error) {
    console.error('Failed to upload media:', error);
    res.status(400).json({ error: 'Failed to upload media' });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findUnique({ where: { id: req.params.id } });
    if (!media) return res.status(204).send();

    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.media.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete media:', error);
    res.status(400).json({ error: 'Failed to delete media' });
  }
};