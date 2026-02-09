import { Building2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function PropertySelector({
    properties,
    value,
    onSelect,
}: {
    properties: Record<string, any>[];
    value: string;
    onSelect: (value: string) => void;
}) {
    return (
        <Select value={value} onValueChange={onSelect}>
            <SelectTrigger
                data-testid="property-selector"
                className="w-full sm:w-52 bg-white"
            >
                <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
                {properties?.map((p) => (
                    <SelectItem key={p._id} value={p._id}>
                        {p.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
