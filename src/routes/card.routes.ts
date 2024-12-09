import { Router, Request, Response } from "express";
import { RequestCreateCard, RequestUpdateCard } from "../types/requests";
import { nanoid } from "nanoid"; // For generating shareable links
import prisma from "../db/index";

const router = Router();

// CREATE: Create a new card
router.post(
  "/",
  async (req: RequestCreateCard, res: Response): Promise<any> => {
    const { title, message, templateId } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: "Title and message are required." });
    }

    if (!templateId) {
      return res.status(400).json({ error: "Template ID is required." });
    }

    try {
      // Dynamically import nanoid
      const { nanoid } = await import("nanoid");
      const shareableLink = nanoid();
      const card = await prisma.card.create({
        data: { title, message, templateId, shareableLink },
      });
      res.status(201).json(card);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error while creating card." });
    }
  }
);

// READ: Get all cards
router.get("/", async (req: Request, res: Response) => {
  try {
    const cards = await prisma.card.findMany();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching cards." });
  }
});

// READ: Get a card by ID
router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      const card = await prisma.card.findUnique({
        where: { id },
        include: { messages: true },
      });

      if (!card) {
        return res.status(404).json({ error: "Card not found." });
      }

      res.status(200).json(card);
    } catch (error) {
      console.error("Error fetching card:", error);
      res
        .status(500)
        .json({ error: "Internal server error while fetching the card." });
    }
  }
);

// GET card by shareable link
router.get(
  "/share/:shareableLink",
  async (req: Request<{ shareableLink: string }>, res: Response): Promise<any> => {
    const { shareableLink } = req.params;

    try {
      const card = await prisma.card.findUnique({
        where: { shareableLink },
        include: { messages: true },
      });

      if (!card) {
        return res.status(404).json({ error: "Card not found." });
      }

      res.status(200).json(card);
    } catch (error) {
      console.error("Error fetching card by shareable link:", error);
      res.status(500).json({
        error: "Internal server error while fetching the card by shareable link.",
      });
    }
  }
);

// UPDATE: Publish a card
router.put(
  "/:id",
  async (req: RequestUpdateCard, res: Response): Promise<any> => {
    const { id } = req.params;
    const { isPublished } = req.body;

    if (typeof isPublished !== "boolean") {
      return res.status(400).json({ error: "isPublished must be a boolean." });
    }

    try {
      const card = await prisma.card.update({
        where: { id },
        data: { isPublished },
      });
      res.status(200).json(card);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error while publishing card." });
    }
  }
);

// DELETE: Delete a card
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.card.delete({ where: { id } });
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting card:", error);
    res
      .status(500)
      .json({ error: "Internal server error while deleting the card." });
  }
});

export default router;
