import { NextFunction, Request, Response } from "express"

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Api not found!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
}

export default notFoundHandler;