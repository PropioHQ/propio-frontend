import AmountLabel from "@/components/amountlabel";
import BookingFormDialog from "@/components/bookingformdialog";
import PropertySelector from "@/components/propertyselector";
import ScreenLoader from "@/components/screenloader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BOOKINGS_KEY, PROPERTIES_KEY } from "@/querykeys";
import BookingService from "@/services/booking.service";
import PropertyService from "@/services/property.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import {
    Calendar,
    CalendarRange,
    Edit,
    EllipsisVertical,
    Plus,
    Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Bookings() {
    const queryClient = useQueryClient();

    const [selectedProperty, setSelectedProperty] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState("");

    const currentYear: number = useMemo(() => dayjs().get("year"), []);
    const currentMonth: number = useMemo(() => dayjs().get("month") + 1, []);

    const { data: properties = [], isLoading: propertiesLoading } = useQuery({
        queryKey: [PROPERTIES_KEY],
        queryFn: PropertyService.getProperties,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
        queryKey: [BOOKINGS_KEY, currentMonth, currentYear, selectedProperty],
        queryFn: () =>
            BookingService.getBookings(
                selectedProperty,
                currentMonth,
                currentYear,
            ),
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!selectedProperty && !propertiesLoading,
    });

    const refreshBookings = () => {
        queryClient.invalidateQueries({
            queryKey: [
                BOOKINGS_KEY,
                currentMonth,
                currentYear,
                selectedProperty,
            ],
        });
    };

    const handleBookingClick = (bookingId: string) => {
        setSelectedBooking(bookingId);
        setShowDialog(true);
    };

    const handleAddNew = () => {
        setSelectedBooking("");
        setShowDialog(true);
    };

    useEffect(() => {
        if (!properties.length) {
            setSelectedProperty("");
            return;
        }

        const selectedPropertyExists = properties.some(
            (p) => p._id === selectedProperty,
        );

        // if selected property is not in the list, reset
        if (!selectedPropertyExists) {
            setSelectedProperty(properties[0]._id);
        }
    }, [properties]);

    if (propertiesLoading || bookingsLoading) {
        return <ScreenLoader />;
    }

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            data-testid="bookings-page"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">Bookings</h1>
                    <p className="text-gray-600 mt-1">
                        {dayjs()
                            .set("month", currentMonth - 1)
                            .set("year", currentYear)
                            .format("MMMM YYYY")}{" "}
                        Overview
                    </p>
                </div>

                <div className="flex flex-row items-center gap-3">
                    <Button
                        data-testid="add-booking-dashboard-btn"
                        onClick={handleAddNew}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Booking
                    </Button>
                    <PropertySelector
                        properties={properties}
                        value={selectedProperty}
                        onSelect={setSelectedProperty}
                    />
                </div>
            </div>

            <div className="bg-white" data-testid="bookings-list">
                {bookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 rounded-lg border border-gray-200">
                        No bookings recorded yet.
                    </div>
                ) : (
                    <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Guest
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Occupancy
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Check-in
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Check-out
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                            Source
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                            Amount
                                        </th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {bookings.map((booking, index) => (
                                        <motion.tr
                                            key={booking._id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                ease: "easeOut",
                                                delay: index * 0.03,
                                            }}
                                            whileTap={{ scale: 0.985 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {booking.ref}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {booking.guest_name}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {booking.guest_count}{" "}
                                                {booking.guest_count === 1
                                                    ? "guest"
                                                    : "guests"}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {dayjs(booking.check_in).format(
                                                    "Do MMM",
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {dayjs(
                                                    booking.check_out,
                                                ).format("Do MMM")}
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge
                                                    variant={
                                                        booking.booking_source
                                                    }
                                                >
                                                    {booking.booking_source}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm font-semibold">
                                                <AmountLabel
                                                    value={booking.amount}
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        handleBookingClick(
                                                            booking._id,
                                                        )
                                                    }
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <Edit />
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Table View */}
                        <div className="md:hidden space-y-3">
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeOut",
                                        delay: index * 0.03,
                                    }}
                                    whileTap={{ scale: 0.985 }}
                                    className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm active:shadow-md transition-shadow"
                                >
                                    {/* Amount Accent Strip */}
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gray-900/80" />

                                    <div className="p-4">
                                        {/* Header Row */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 space-y-1.5">
                                                <Badge
                                                    variant={
                                                        booking.booking_source
                                                    }
                                                >
                                                    {booking.booking_source}
                                                </Badge>

                                                <p className="text-[11px] text-gray-400">
                                                    #{booking.ref}
                                                </p>
                                            </div>

                                            <div className="text-right space-y-1">
                                                <p className="text-base font-semibold tracking-tight">
                                                    <AmountLabel
                                                        value={booking.amount}
                                                    />
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                    {booking.guest_count}{" "}
                                                    Guest(s)
                                                </p>
                                            </div>
                                        </div>

                                        {/* Breakdown Grid */}
                                        <div className="mt-4 grid grid-cols-10 gap-2 text-xs">
                                            <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                                <p className="text-[11px] text-gray-400">
                                                    Guest
                                                </p>
                                                <p className="text-gray-900 truncate">
                                                    {
                                                        booking.guest_name.split(
                                                            " ",
                                                        )[0]
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                                <p className="text-[11px] text-gray-400">
                                                    Check-in
                                                </p>
                                                <p className=" text-gray-900">
                                                    {dayjs(
                                                        booking.check_in,
                                                    ).format("Do MMM")}
                                                </p>
                                            </div>
                                            <div className="col-span-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-center">
                                                <p className="text-[11px] text-gray-400">
                                                    Check-out
                                                </p>
                                                <p className=" text-gray-900">
                                                    {dayjs(
                                                        booking.check_out,
                                                    ).format("Do MMM")}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    handleBookingClick(
                                                        booking._id,
                                                    )
                                                }
                                                variant="ghost"
                                                size="icon"
                                                aria-label="Edit expense"
                                            >
                                                <EllipsisVertical className="h-4 w-4 text-gray-700" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showDialog ? (
                <BookingFormDialog
                    open={showDialog}
                    onOpenChange={setShowDialog}
                    bookingId={selectedBooking}
                    propertyId={selectedProperty}
                    onSuccess={() => {
                        refreshBookings();
                        setSelectedBooking(null);
                    }}
                />
            ) : null}
        </div>
    );
}
