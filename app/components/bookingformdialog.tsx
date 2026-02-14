import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { BOOKING_KEY } from "@/querykeys";
import AttachmentService from "@/services/attachment.service";
import BookingService from "@/services/booking.service";
import { BookingPaymentMode, BookingSource } from "@/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Download, FileText, LoaderCircle, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const FILE_SIZE_MB = 5;

export default function BookingFormDialog({
    open,
    onOpenChange,
    bookingId,
    propertyId,
    prefill,
    onSuccess,
}) {
    const [submitting, setSubmitting] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [attachments, setAttachments] = useState<
        { _id: string; label: string; saved: boolean }[]
    >([]);

    const [formData, setFormData] = useState({
        check_in: new Date(),
        check_out: new Date(),
        amount: "",
        booking_source: BookingSource.DIRECT,
        guest_name: "",
        guest_count: "",
        payment_mode: BookingPaymentMode.UPI,
        note: "",
        generate_receipt: false,
    });

    const bookingQueryKey = [BOOKING_KEY, bookingId, propertyId];

    const { data: booking, isLoading: bookingLoading } = useQuery({
        queryKey: bookingQueryKey,
        queryFn: () => BookingService.getBooking(bookingId, propertyId),
        enabled: Boolean(bookingId && propertyId),
        staleTime: 0,
    });

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;

        const file = acceptedFiles[0];

        if (file.size > FILE_SIZE_MB * 1024 * 1024) {
            toast.error(`File size must be less than ${FILE_SIZE_MB}MB`);
            return;
        }

        setUploadingFile(true);
        try {
            const { _id, label } = await AttachmentService.uploadFile(
                propertyId,
                file,
            );
            setAttachments([
                ...attachments,
                {
                    _id,
                    label,
                    saved: false,
                },
            ]);
            toast.success("File uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload file");
        } finally {
            setUploadingFile(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            "text/csv": [".csv"],
            "text/plain": [".txt"],
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/heic": [".heic"],
        },
        maxFiles: 1,
        disabled: uploadingFile,
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!propertyId) {
            toast.error("Please select a property");
            return;
        }

        let {
            check_in,
            check_out,
            amount,
            booking_source,
            guest_name,
            guest_count,
            payment_mode,
            note,
        }: {
            check_in: Date;
            check_out: Date;
            amount: string | number;
            booking_source: BookingSource;
            guest_name: string;
            guest_count: string | number;
            payment_mode: BookingPaymentMode;
            note?: string;
        } = formData;

        const required = [
            check_in,
            check_out,
            amount,
            booking_source,
            guest_name?.trim(),
            guest_count,
            payment_mode,
        ];

        if (required.some((v) => !v)) {
            toast.error("Please fill all required fields");
            return;
        }

        amount = Number(amount);
        guest_count = Number(guest_count);

        if (check_in > check_out) {
            toast.error("Check-in date should be before check-out date");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (isNaN(guest_count) || guest_count <= 0) {
            toast.error("Please enter a valid guest count");
            return;
        }

        const attachmentIds = attachments.map((a) => a._id);

        setSubmitting(true);
        try {
            if (bookingId) {
                await BookingService.updateBooking(
                    bookingId,
                    propertyId,
                    guest_name,
                    guest_count,
                    check_in,
                    check_out,
                    amount,
                    booking_source,
                    payment_mode,
                    note,
                    attachmentIds,
                );
                toast.success("Booking updated successfully!");
            } else {
                await BookingService.addBooking(
                    propertyId,
                    guest_name,
                    guest_count,
                    check_in,
                    check_out,
                    amount,
                    booking_source,
                    payment_mode,
                    note,
                    attachmentIds,
                );
                toast.success("Booking added successfully!");
            }

            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.message || "Failed to save booking");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (
            !bookingId ||
            !window.confirm(
                "Are you sure you want to delete this booking? This action cannot be undone.",
            )
        ) {
            return;
        }

        setSubmitting(true);
        try {
            await BookingService.deleteBooking(bookingId, propertyId);
            toast.success("Booking deleted successfully!");
            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error("Failed to delete booking");
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileDownload = async (fileId) => {
        toast.info("Downloading file...");
        try {
            const url = await AttachmentService.downloadFile(fileId);

            // open in separate tab
            window.open(url, "_blank");
        } catch (error) {
            toast.error("Failed to download file");
        }
    };

    const handleFileDelete = async (fileId) => {
        if (
            !fileId ||
            !window.confirm(
                "Are you sure you want to delete this file? This action cannot be undone.",
            )
        ) {
            return;
        }

        // Remove the attachment object from state
        // Files will be deleted by server upon saving
        setAttachments([...attachments.filter((a) => a._id !== fileId)]);
        toast.info("File will be deleted upon saving.");
    };

    useEffect(() => {
        const data = booking || prefill;

        if (data) {
            setFormData({
                check_in: new Date(data.check_in),
                check_out: new Date(data.check_out),
                amount: data.amount,
                booking_source: data.booking_source,
                guest_name: data.guest_name,
                guest_count: data.guest_count,
                payment_mode: data.payment_mode,
                note: data.note || "",
                generate_receipt: false,
            });

            if (data.attachments?.length) {
                setAttachments(
                    data.attachments.map((a) => ({
                        _id: a._id,
                        label: a.label,
                        saved: true,
                    })),
                );
            }
        }
    }, [booking, prefill]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-lg max-h-[90vh] overflow-y-auto"
                aria-describedby="Booking Form"
            >
                <DialogHeader>
                    <DialogTitle>
                        {bookingId ? "Edit Booking" : "Add New Booking"}
                    </DialogTitle>
                </DialogHeader>

                {bookingLoading ? (
                    <div className="mx-auto py-[30vh]">
                        <LoaderCircle className="animate-spin" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <Label>Check-in date *</Label>
                                <Popover modal>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            id="date-picker-simple"
                                            className="justify-start font-normal mt-1 hover:bg-background"
                                        >
                                            {formData.check_in ? (
                                                dayjs(formData.check_in).format(
                                                    "MMM D, YYYY",
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-52 p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            className="w-full rounded-lg"
                                            selected={formData.check_in}
                                            onSelect={(d) =>
                                                setFormData({
                                                    ...formData,
                                                    check_in: d,
                                                })
                                            }
                                            defaultMonth={
                                                formData.check_in || new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="flex flex-col">
                                <Label>Check-out date *</Label>
                                <Popover modal>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            id="date-picker-simple"
                                            className="justify-start font-normal mt-1 hover:bg-background"
                                        >
                                            {formData.check_out ? (
                                                dayjs(
                                                    formData.check_out,
                                                ).format("MMM D, YYYY")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-52 p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            className="w-full rounded-lg"
                                            mode="single"
                                            selected={formData.check_out}
                                            onSelect={(d) =>
                                                setFormData({
                                                    ...formData,
                                                    check_out: d,
                                                })
                                            }
                                            defaultMonth={
                                                formData.check_out || new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Guest name *</Label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.guest_name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            guest_name: e.target.value,
                                        })
                                    }
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label>Guest count *</Label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.guest_count}
                                    onChange={(e) => {
                                        const v = Number(e.target.value);
                                        const guest_count =
                                            isNaN(v) || !v
                                                ? ""
                                                : Math.abs(v).toString();

                                        setFormData({
                                            ...formData,
                                            guest_count,
                                        });
                                    }}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Amount *</Label>
                            <Input
                                type="text"
                                required
                                min={0}
                                value={formData.amount}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    const amount =
                                        isNaN(v) || !v
                                            ? ""
                                            : Math.abs(v).toString();

                                    setFormData({
                                        ...formData,
                                        amount,
                                    });
                                }}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Booking source *</Label>
                                <Select
                                    key={formData.booking_source}
                                    value={formData.booking_source}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            booking_source:
                                                value as BookingSource,
                                        })
                                    }
                                    required
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(BookingSource).map(
                                            (source) => (
                                                <SelectItem
                                                    key={source}
                                                    value={source}
                                                >
                                                    {source}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Payment mode *</Label>
                                <Select
                                    key={formData.payment_mode}
                                    value={formData.payment_mode}
                                    required
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            payment_mode:
                                                value as BookingPaymentMode,
                                        })
                                    }
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(BookingPaymentMode).map(
                                            (mode) => (
                                                <SelectItem
                                                    key={mode}
                                                    value={mode}
                                                >
                                                    {mode}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label>Notes</Label>
                            <Input
                                type="text"
                                value={formData.note}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        note: e.target.value,
                                    })
                                }
                                className="mt-1"
                            />
                        </div>

                        {/* Receipt Section */}
                        {
                            booking?.receipt_id ? (
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm font-medium">
                                                Booking Receipt
                                            </span>
                                        </div>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="link"
                                            onClick={() =>
                                                handleFileDownload(
                                                    booking.receipt_id,
                                                )
                                            }
                                        >
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            ) : null
                            // TODO: Development pending
                            // <div className="flex items-center justify-between">
                            //     <Label>Generate Receipt</Label>
                            //     <Switch
                            //         checked={formData.generate_receipt}
                            //         onCheckedChange={(checked) =>
                            //             setFormData({
                            //                 ...formData,
                            //                 generate_receipt: checked,
                            //             })
                            //         }
                            //     />
                            // </div>
                        }

                        {/* Attachments Section */}
                        <div>
                            <Label>Attachments (Max {FILE_SIZE_MB}MB)</Label>
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "mt-2 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
                                    isDragActive
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-300",
                                    uploadingFile
                                        ? "opacity-50 cursor-not-allowed"
                                        : "",
                                )}
                            >
                                <input {...getInputProps()} />
                                <Upload
                                    className={cn(
                                        "w-6 h-6 mx-auto mb-2",
                                        uploadingFile
                                            ? "animate-bounce text-gray-600"
                                            : "text-gray-400",
                                    )}
                                />
                                {uploadingFile ? (
                                    <p className="text-sm font-medium text-gray-900 mb-1">
                                        Uploading...
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-sm font-medium text-gray-900 mb-1">
                                            Drop your document here
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            or click to browse
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            PDF, PNG, JPG, or HEIC
                                        </p>
                                    </>
                                )}
                            </div>

                            {attachments.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {attachments.map((file) => (
                                        <div
                                            key={file._id}
                                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                        >
                                            <div className="flex-auto flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-gray-600" />
                                                <span className="text-sm truncate max-w-56">
                                                    {file.label}
                                                </span>
                                            </div>
                                            <div className="flex flex-row w-fit">
                                                {file.saved ? (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="link"
                                                        className="hover:scale-110 opacity-80 hover:opacity-100"
                                                        onClick={() =>
                                                            handleFileDownload(
                                                                file._id,
                                                            )
                                                        }
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                ) : null}
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="link"
                                                    className="hover:scale-110 opacity-80 hover:opacity-100"
                                                    onClick={() =>
                                                        handleFileDelete(
                                                            file._id,
                                                        )
                                                    }
                                                >
                                                    <X className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            {bookingId ? (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={submitting || uploadingFile}
                                    className="flex-1"
                                >
                                    Delete
                                </Button>
                            ) : null}
                            <Button
                                type="submit"
                                className="flex-1 bg-gray-900 hover:bg-gray-800"
                                disabled={submitting || uploadingFile}
                            >
                                {submitting
                                    ? "Saving..."
                                    : bookingId
                                      ? "Update"
                                      : "Save"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
