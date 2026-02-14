import API from "@/lib/api";
import type { Modules } from "@/types";

const AgentService = {
    scanDocument: async (attachmentId: string, module: Modules) => {
        return await API.post(`/api/v1/agent/task/document`, {
            attachmentId,
            module,
        });
    },
    getScannedDocument: async (taskId: string) => {
        return await API.get(`/api/v1/agent/task?tid=${taskId}`);
    },
};

export default AgentService;
