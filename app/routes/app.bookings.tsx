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
import { CalendarRange, Edit, Receipt, Users } from "lucide-react";
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

                <PropertySelector
                    properties={properties}
                    value={selectedProperty}
                    onSelect={setSelectedProperty}
                />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mb-6">
                <Button
                    data-testid="add-booking-dashboard-btn"
                    onClick={handleAddNew}
                    className=" bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Receipt className="w-4 h-4 mr-2" />
                    Add Booking
                </Button>
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
                                                    "MMM D, YYYY",
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-700">
                                                {dayjs(
                                                    booking.check_out,
                                                ).format("MMM D, YYYY")}
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge variant="info">
                                                    Direct
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4 text-right font-semibold">
                                                ₹
                                                {booking.amount.toLocaleString()}
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

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-3">
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: "easeOut",
                                        delay: index * 0.03,
                                    }}
                                    whileTap={{ scale: 0.985 }}
                                    className="rounded-lg bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                                >
                                    <div className="px-4 py-3">
                                        {/* Top Meta */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span className="truncate">
                                                {booking.ref}
                                            </span>
                                            <Badge variant="info">
                                                {booking.booking_source}
                                            </Badge>
                                        </div>

                                        {/* Main Row */}
                                        <div className="flex items-end justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {booking.guest_name}
                                                </p>

                                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
                                                    <Users className="h-3.5 w-3.5 text-gray-400" />
                                                    {booking.guest_count} guest
                                                </div>
                                            </div>

                                            {/* Dates */}
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <CalendarRange className="h-3.5 w-3.5 text-gray-400" />
                                                {dayjs(booking.check_in).format(
                                                    "Do MMM",
                                                )}{" "}
                                                →{" "}
                                                {dayjs(
                                                    booking.check_out,
                                                ).format("Do MMM")}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="my-2 h-px bg-gray-100/70" />

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm shrink-0">
                                                + ₹
                                                {booking.amount.toLocaleString()}
                                            </p>
                                            <motion.button
                                                onClick={() =>
                                                    handleBookingClick(
                                                        booking._id,
                                                    )
                                                }
                                                whileTap={{ scale: 0.9 }}
                                                className="rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700 p-2 transition-colors shrink-0"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </motion.button>
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
