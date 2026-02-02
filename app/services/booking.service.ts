import API from "@/lib/api";
import { BookingPaymentMode, BookingSource } from "@/types";

const BookingService = {
    getBooking: async (bookingId: string, propertyId: string) => {
        return await API.get(
            `/api/v1/booking?bid=${bookingId}&pid=${propertyId}`,
        );
    },
    getBookings: async (propertyId: string, month: number, year: number) => {
        const params = new URLSearchParams();

        params.append("m", month.toString());
        params.append("y", year.toString());
        params.append("pid", propertyId);

        const queryStr = params.toString();

        return await API.get(`/api/v1/booking/all?${queryStr}`);
    },
    getMonthlyStats: async (
        propertyIds: string[],
        month: number,
        year: number,
    ) => {
        const params = new URLSearchParams();

        params.append("m", month.toString());
        params.append("y", year.toString());
        params.append("pids", propertyIds.join(","));

        const queryStr = params.toString();

        return await API.get(`/api/v1/booking/stats/monthly?${queryStr}`);
    },
    addBooking: async (
        property_id: string,
        guest_name: string,
        guest_count: number,
        check_in: Date,
        check_out: Date,
        amount: number,
        booking_source: BookingSource,
        payment_mode: BookingPaymentMode,
        note?: string,
        attachmentIds?: string[],
    ) => {
        return await API.post("/api/v1/booking", {
            property_id,
            guest_name,
            guest_count,
            check_in,
            check_out,
            amount,
            booking_source,
            payment_mode,
            note,
            attachmentIds,
        });
    },
    updateBooking: async (
        booking_id: string,
        property_id: string,
        guest_name: string,
        guest_count: number,
        check_in: Date,
        check_out: Date,
        amount: number,
        booking_source: BookingSource,
        payment_mode: BookingPaymentMode,
        note?: string,
        attachmentIds?: string[],
    ) => {
        return await API.put("/api/v1/booking", {
            booking_id,
            property_id,
            guest_name,
            guest_count,
            check_in,
            check_out,
            amount,
            booking_source,
            payment_mode,
            note,
            attachmentIds,
        });
    },
    deleteBooking: async (bookingId: string, propertyId: string) => {
        return await API.delete(
            `/api/v1/booking?bid=${bookingId}&pid=${propertyId}`,
        );
    },
};

export default BookingService;
