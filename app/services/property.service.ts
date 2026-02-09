import API from "@/lib/api";

const PropertyService = {
    getProperty: async (propertyId: string) => {
        return await API.get("/api/v1/property?pid=" + propertyId);
    },
    getPropertyCount: async () => {
        return await API.get("/api/v1/property/count");
    },
    getProperties: async () => {
        return await API.get("/api/v1/property/all");
    },
    getMonthlyReport: async (
        propertyIds: string[],
        month: number,
        year: number,
        fullreport?: boolean,
    ) => {
        const params = new URLSearchParams();

        params.append("m", month.toString());
        params.append("y", year.toString());
        params.append("pids", propertyIds.join(","));

        if (fullreport) {
            params.append("fullreport", "1");
        }

        const queryStr = params.toString();

        return await API.get(`/api/v1/property/report/monthly?${queryStr}`);
    },
    addProperty: async (
        name: string,
        city: string,
        state: string,
        country: string,
        role: string,
    ) => {
        return await API.post("/api/v1/property", {
            name,
            city,
            state,
            country,
            role,
        });
    },
    updateProperty: async (
        propertyId: string,
        name: string,
        city: string,
        state: string,
        country: string,
        role: string,
    ) => {
        return await API.put("/api/v1/property", {
            propertyId,
            name,
            city,
            state,
            country,
            role,
        });
    },
};

export default PropertyService;
