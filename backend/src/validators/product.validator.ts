import { body } from "express-validator";

export const createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description too short"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be number"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isNumeric()
    .withMessage("Stock must be number"),

  body("category").notEmpty().withMessage("Category is required"),
];

export const updateProductValidator = [
  body("name").optional().isLength({ min: 3 }).withMessage("Name too short"),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description too short"),

  body("price").optional().isNumeric().withMessage("Price must be number"),

  body("stock").optional().isNumeric().withMessage("Stock must be number"),

  body("category").optional().notEmpty().withMessage("Category required"),
];

export const addCommentValidator = [
  body("comment")
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 3 })
    .withMessage("Comment too short"),

  body("rating")
    .notEmpty()
    .withMessage("Rating required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];
