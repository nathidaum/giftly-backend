import { Router, Request, Response } from "express";
import { RequestAddMessage } from "../types/requests";
import prisma from "../db/index";

const router = Router();

// Add a message to a card
router.post(
  "/:cardId/messages",
  async (req: RequestAddMessage, res: Response): Promise<any> => {
    const { cardId } = req.params;
    const { author, text, gifUrl, imageUrl } = req.body;

    if (!author) {
      return res.status(400).json({
        error: "Please provide your name.",
      });
    }

    if (!text) {
      return res.status(400).json({
        error: "Please provide a nice message.",
      });
    }

    try {
      const message = await prisma.message.create({
        data: {
          author,
          text,
          gifUrl,
          imageUrl,
          cardId,
        },
      });
      res.status(201).json(message);
    } catch (error) {
      console.error("Error adding message:", error);
      res
        .status(500)
        .json({ error: "Internal server error while adding message." });
    }
  }
);

// Get all messages for a card
router.get(
  "/:cardId/messages",
  async (req: Request<{ cardId: string }>, res: Response): Promise<any> => {
    const { cardId } = req.params;

    try {
      const messages = await prisma.message.findMany({
        where: { cardId },
      });

      if (messages.length === 0) {
        return res
          .status(404)
          .json({ error: "No messages found for this card." });
      }

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res
        .status(500)
        .json({ error: "Internal server error while fetching messages." });
    }
  }
);

// Get a single message by ID
router.get(
  "/:cardId/messages/:messageId",
  async (
    req: Request<{ cardId: string; messageId: string }>,
    res: Response
  ): Promise<any> => {
    const { cardId, messageId } = req.params;

    try {
      const message = await prisma.message.findUnique({
        where: {
          id: messageId,
          cardId,
        },
      });

      if (!message) {
        return res.status(404).json({ error: "Message not found." });
      }

      res.status(200).json(message);
    } catch (error) {
      console.error("Error fetching message:", error);
      res
        .status(500)
        .json({ error: "Internal server error while fetching message." });
    }
  }
);

// Delete a message
router.delete(
  "/:cardId/messages/:messageId",
  async (
    req: Request<{ cardId: string; messageId: string }>,
    res: Response
  ) => {
    const { cardId, messageId } = req.params;

    try {
      const deletedMessage = await prisma.message.delete({
        where: { id: messageId },
      });

      res.status(200).json(deletedMessage);
    } catch (error) {
      console.error("Error deleting message:", error);
      res
        .status(500)
        .json({ error: "Internal server error while deleting message." });
    }
  }
);

export default router;
