import { CreateBookingDto } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finaliseIdempotencyKey, getIdempotencyKey } from "../repositories/booking.repository";
import { NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";

export async function createBookingService(createBookingDto: CreateBookingDto) {
    const booking = await createBooking({
        userId: createBookingDto.userId,
        hotelId: createBookingDto.hotelId,
        totalGuests: createBookingDto.totalGuests,
        bookingAmount: createBookingDto.bookingAmount,
    })

    const idemportencyKey = generateIdempotencyKey();

    await createIdempotencyKey(idemportencyKey, booking.id);

    return {
        bookingId: booking.id,
        idemportencyKey: idemportencyKey,
    };
}

export async function confirmBookingService(idemportencyKey: string) {
    console.log("idemportencyKey: ", idemportencyKey);
    const idemportencyKeyData = await getIdempotencyKey(idemportencyKey);

    if(!idemportencyKeyData){
        throw new NotFoundError("Idempotency key not found");
    }

    if(idemportencyKeyData.finalized) {
        throw new NotFoundError("Idempotency key already finalized");
    }

    const booking = await confirmBooking(idemportencyKeyData.bookingId);
    await finaliseIdempotencyKey(idemportencyKey);

    return booking;
}


