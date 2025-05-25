import { z } from "zod";

export const createBookingSchema = z.object({
    userId: z.number({message: "User Id must be present"}),
    hotelId: z.number({message: "Hotel Id must be present"}),
    totalGuests: z.number({message: "Total guests must be present"}).min(1, {message: "Total guests value should be more than 0"}),
    bookingAmount: z.number({message: "Booking Amount must be present"}).min(1, {message: "Booking Amount value should be more than 0"}),
}) 