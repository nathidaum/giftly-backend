import { Request } from "express";

// Request for creating a card
export interface RequestCreateCard extends Request {
  body: {
    title: string;
    message: string;
    templateId: number;
  };
}

// Request for updating a card (e.g., publishing it)
export interface RequestUpdateCard extends Request {
  body: {
    isPublished: boolean;
  };
}

// Request for adding a message to a card
export interface RequestAddMessage extends Request {
  body: {
    author: string;
    text: string;
    gifUrl?: string;
    imageUrl?: string;
  };
}

