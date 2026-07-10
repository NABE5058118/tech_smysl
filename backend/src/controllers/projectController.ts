import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const showAll = req.query.all === 'true';
    const projects = showAll
      ? await prisma.project.findMany({ orderBy: { order: 'asc' } })
      : await prisma.project.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
    res.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: req.params.id } });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Failed to fetch project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, subtitle, slug, description, bgImage, imageUrl, benefits, useCases, tags, published, order } = req.body;
    const project = await prisma.project.create({
      data: { title, subtitle, slug, description, bgImage, imageUrl, benefits, useCases, tags, published, order },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(400).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const project = await prisma.project.update({ where: { id }, data });
    res.json(project);
  } catch (error) {
    console.error('Failed to update project:', error);
    res.status(400).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete project:', error);
    res.status(400).json({ error: 'Failed to delete project' });
  }
};