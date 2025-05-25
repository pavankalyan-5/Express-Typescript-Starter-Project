import { NextFunction, Request, Response } from "express";
import { confirmBookingService, createBookingService } from "../services/booking.service";

export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    
    const booking = await createBookingService(
        req.body
    );

    res.status(201).json({
        bookingId: booking.bookingId,
        idempotencyKey: booking.idemportencyKey
    })
}

export const confirmBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    // console.log("req: ", req.params)
    const booking = await confirmBookingService(req.params.idempotencyKey);

    res.status(200).json({
        bookingId: booking.id,
        stats: booking.status
    })

}