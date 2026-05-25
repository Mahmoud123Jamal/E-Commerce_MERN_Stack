import { body } from "express-validator";
import { PRODUCT_CATEGORIES } from "../types/product.model.type";

export const createProductValidator = [
  body("name.en")
    .notEmpty()
    .withMessage("English name is required")
    .isLength({ min: 3 })
    .withMessage("English name must be at least 3 chars"),

  body("name.ar")
    .notEmpty()
    .withMessage("Arabic name is required")
    .isLength({ min: 3 })
    .withMessage("Arabic name must be at least 3 chars"),

  body("description.en")
    .notEmpty()
    .withMessage("English description is required")
    .isLength({ min: 10 })
    .withMessage("English description must be at least 10 chars"),

  body("description.ar")
    .notEmpty()
    .withMessage("Arabic description is required")
    .isLength({ min: 10 })
    .withMessage("Arabic description must be at least 10 chars"),

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

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(PRODUCT_CATEGORIES)
    .withMessage("Invalid category specified"),
];

export const updateProductValidator = [
  body("name.en")
    .optional()
    .isLength({ min: 3 })
    .withMessage("English name too short"),

  body("name.ar")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Arabic name too short"),

  body("description.en")
    .optional()
    .isLength({ min: 10 })
    .withMessage("English description too short"),

  body("description.ar")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Arabic description too short"),

  body("price").optional().isNumeric().withMessage("Price must be number"),

  body("stock").optional().isNumeric().withMessage("Stock must be number"),

  body("category")
    .optional()
    .isIn(PRODUCT_CATEGORIES)
    .withMessage("Invalid category specified"),
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
