import {body} from 'express-validator'

export const noteValidator = [
    body('title', 'Минимум 3 символа').trim().isLength({min: 3}),
    body('text', 'Минимум 3 символа').trim().isLength({min: 3})
]