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
import { cn } from "@/lib/utils";
import { EARNING_KEY } from "@/querykeys";
import AttachmentService from "@/services/attachment.service";
import EarningService from "@/services/earning.service";
import { BookingSource } from "@/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Download, FileText, LoaderCircle, Upload, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface FormDataSchema {
    record_date: Date;
    earning_source: BookingSource;
    tds_value: number | string;
    gst_value: number | string;
    gross_amount: number | string;
    note: string;
}

const FILE_SIZE_MB = 5;

export default function EarningFormDialog({
    open,
    onOpenChange,
    earningId,
    propertyId,
    onSuccess,
}) {
    const [submitting, setSubmitting] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [attachments, setAttachments] = useState<
        { _id: string; label: string; saved: boolean }[]
    >([]);

    const [formData, setFormData] = useState<FormDataSchema>({
        record_date: new Date(),
        earning_source: "" as BookingSource,
        tds_value: "",
        gst_value: "",
        gross_amount: "",
        note: "",
    });

    const earningQueryKey = [EARNING_KEY, earningId, propertyId];

    const { data: earning, isLoading: earningLoading } = useQuery({
        queryKey: earningQueryKey,
        queryFn: () => EarningService.getEarning(earningId, propertyId),
        enabled: Boolean(earningId && propertyId),
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
            record_date,
            earning_source,
            tds_value,
            gst_value,
            gross_amount,
            note,
        }: FormDataSchema = formData;

        const required = [record_date, earning_source, gross_amount];

        if (required.some((v) => !v)) {
            toast.error("Please fill all required fields");
            return;
        }

        gross_amount = Number(gross_amount);
        tds_value = Number(tds_value);
        gst_value = Number(gst_value);

        if (isNaN(gross_amount) || gross_amount <= 0) {
            toast.error("Please enter a valid gross amount");
            return;
        }

        const attachmentIds = attachments.map((a) => a._id);

        setSubmitting(true);
        try {
            if (earningId) {
                await EarningService.updateEarning(
                    earningId,
                    propertyId,
                    record_date,
                    earning_source,
                    tds_value,
                    gst_value,
                    gross_amount,
                    note,
                    attachmentIds,
                );
                toast.success("Record updated successfully!");
            } else {
                await EarningService.addEarning(
                    propertyId,
                    record_date,
                    earning_source,
                    tds_value,
                    gst_value,
                    gross_amount,
                    note,
                    attachmentIds,
                );
                toast.success("Record added successfully!");
            }

            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error.message || "Failed to save record");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (
            !earningId ||
            !window.confirm(
                "Are you sure you want to delete this record? This action cannot be undone.",
            )
        ) {
            return;
        }

        setSubmitting(true);
        try {
            await EarningService.deleteEarning(earningId, propertyId);
            toast.success("Record deleted successfully!");
            onOpenChange(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error("Failed to delete record");
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

    const isRecordDateYearOld = useMemo(() => {
        if (!formData.record_date) return false;

        return dayjs(formData.record_date).isBefore(new Date(), "year");
    }, [formData.record_date]);

    useEffect(() => {
        if (earning) {
            setFormData({
                record_date: new Date(earning.record_date),
                earning_source: earning.earning_source,
                tds_value: earning.tds_value,
                gst_value: earning.gst_value,
                gross_amount: earning.gross_amount,
                note: earning.note || "",
            });

            if (earning.attachments?.length) {
                setAttachments(
                    earning.attachments.map((a) => ({
                        _id: a._id,
                        label: a.label,
                        saved: true,
                    })),
                );
            }
        }
    }, [earning]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-lg max-h-[90vh] overflow-y-auto"
                aria-describedby="Earning Form"
            >
                <DialogHeader>
                    <DialogTitle>
                        {earningId ? "Edit Earning" : "Add New Earning"}
                    </DialogTitle>
                </DialogHeader>

                {earningLoading ? (
                    <div className="mx-auto py-[30vh]">
                        <LoaderCircle className="animate-spin" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col justify-end">
                                <Label>Record date *</Label>
                                <Popover modal>
                                    <PopoverTrigger asChild className="mt-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            id="date-picker-simple"
                                            className="justify-start font-normal hover:bg-background"
                                        >
                                            {formData.record_date ? (
                                                dayjs(
                                                    formData.record_date,
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
                                            mode="single"
                                            className="w-full rounded-lg"
                                            selected={formData.record_date}
                                            onSelect={(d) =>
                                                setFormData({
                                                    ...formData,
                                                    record_date: d,
                                                })
                                            }
                                            defaultMonth={
                                                formData.record_date ||
                                                new Date()
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                {isRecordDateYearOld ? (
                                    <p className="bg-yellow-50 text-yellow-900 mt-2 p-1 font-medium rounded-sm text-xs w-fit">
                                        Note: Record date is older than current
                                        year
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                <Label>Earning source *</Label>
                                <Select
                                    key={formData.earning_source}
                                    value={formData.earning_source}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            earning_source:
                                                value as BookingSource,
                                        })
                                    }
                                    required
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select earning source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(BookingSource).map(
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
                            <Label>Received amount *</Label>
                            <Input
                                type="text"
                                required
                                min={0}
                                value={formData.gross_amount}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    const amount =
                                        isNaN(v) || !v
                                            ? ""
                                            : Math.abs(v).toString();

                                    setFormData({
                                        ...formData,
                                        gross_amount: amount,
                                    });
                                }}
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>GST amount</Label>
                                <Input
                                    type="text"
                                    min={0}
                                    value={formData.gst_value}
                                    onChange={(e) => {
                                        const v = Number(e.target.value);
                                        const amount =
                                            isNaN(v) || !v
                                                ? ""
                                                : Math.abs(v).toString();

                                        setFormData({
                                            ...formData,
                                            gst_value: amount,
                                        });
                                    }}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>TDS amount</Label>
                                <Input
                                    type="text"
                                    min={0}
                                    value={formData.tds_value}
                                    onChange={(e) => {
                                        const v = Number(e.target.value);
                                        const amount =
                                            isNaN(v) || !v
                                                ? ""
                                                : Math.abs(v).toString();

                                        setFormData({
                                            ...formData,
                                            tds_value: amount,
                                        });
                                    }}
                                    className="mt-1"
                                />
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
                            {earningId ? (
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
                                    : earningId
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
