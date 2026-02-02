import API from "@/lib/api";
import { BookingSource } from "@/types";

const EarningService = {
    getEarning: async (earningId: string, propertyId: string) => {
        return await API.get(
            `/api/v1/earning?eid=${earningId}&pid=${propertyId}`,
        );
    },
    getEarnings: async (propertyId: string, month: number, year: number) => {
        const params = new URLSearchParams();

        params.append("m", month.toString());
        params.append("y", year.toString());
        params.append("pid", propertyId);

        const queryStr = params.toString();

        return await API.get(`/api/v1/earning/all?${queryStr}`);
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

        return await API.get(`/api/v1/earning/stats/monthly?${queryStr}`);
    },
    addEarning: async (
        property_id: string,
        record_date: Date,
        earning_source: BookingSource,
        tds_value: number,
        gst_value: number,
        gross_amount: number,
        note?: string,
    ) => {
        return await API.post("/api/v1/earning", {
            property_id,
            record_date,
            earning_source,
            tds_value,
            gst_value,
            gross_amount,
            note,
        });
    },
    updateEarning: async (
        earning_id: string,
        property_id: string,
        record_date: Date,
        earning_source: BookingSource,
        tds_value: number,
        gst_value: number,
        gross_amount: number,
        note?: string,
    ) => {
        return await API.put("/api/v1/earning", {
            earning_id,
            property_id,
            record_date,
            earning_source,
            tds_value,
            gst_value,
            gross_amount,
            note,
        });
    },
    deleteEarning: async (earningId: string, propertyId: string) => {
        return await API.delete(
            `/api/v1/earning?eid=${earningId}&pid=${propertyId}`,
        );
    },
};

export default EarningService;
