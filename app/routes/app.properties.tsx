import PropertyForm from "@/components/propertyform";
import ScreenLoader from "@/components/screenloader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PROPERTIES_KEY } from "@/querykeys";
import PropertyService from "@/services/property.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Properties() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const { data: properties = [], isLoading: propertiesLoading } = useQuery({
        queryKey: [PROPERTIES_KEY],
        queryFn: PropertyService.getProperties,
    });

    const onSuccess = async () => {
        setIsDialogOpen(false);

        queryClient.invalidateQueries({
            queryKey: [PROPERTIES_KEY],
        });
    };

    if (propertiesLoading) {
        return <ScreenLoader />;
    }

    return (
        <div
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
            data-testid="properties-page"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Properties
                    </h1>
                </div>
                <Button
                    data-testid="add-expense-button"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                </Button>
            </div>

            {/* Desktop/Tablet Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Property Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Location
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                                Status
                            </th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {properties.map((property, index) => (
                            <motion.tr
                                key={property._id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                    delay: index * 0.03,
                                }}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-4 py-4 text-sm text-gray-700">
                                    {property.name}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-700 flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                                    <span>
                                        {property.city}, {property.state}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center text-gray-700">
                                    {property.is_active ? (
                                        <Badge variant="success">
                                            • Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">
                                            Inactive
                                        </Badge>
                                    )}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-700">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            data-testid={`reports-${property._id}`}
                                            onClick={() =>
                                                navigate("/app/reports", {
                                                    state: {
                                                        propertyId:
                                                            property._id,
                                                    },
                                                })
                                            }
                                            variant="outline"
                                            size="sm"
                                        >
                                            View Reports
                                        </Button>
                                        <Button
                                            data-testid={`edit-${property._id}`}
                                            onClick={() => {
                                                setSelectedProperty(property);
                                                setIsDialogOpen(true);
                                            }}
                                            variant="outline"
                                            size="sm"
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {properties.map((property, index) => (
                    <motion.div
                        key={property._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                            delay: index * 0.03,
                        }}
                        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                    {property.name}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">
                                        {property.city}, {property.state}
                                    </span>
                                </div>
                            </div>
                            {property.is_active ? (
                                <Badge variant="success">• Active</Badge>
                            ) : (
                                <Badge variant="destructive">Inactive</Badge>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                data-testid={`reports-${property._id}`}
                                onClick={() =>
                                    navigate("/app/reports", {
                                        state: {
                                            propertyId: property._id,
                                        },
                                    })
                                }
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                View Reports
                            </Button>
                            <Button
                                data-testid={`edit-${property._id}`}
                                onClick={() => {
                                    setSelectedProperty(property);
                                    setIsDialogOpen(true);
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                Edit
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {isDialogOpen ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent aria-describedby="Property Form">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedProperty
                                    ? "Update Property"
                                    : "Add Property"}
                            </DialogTitle>
                        </DialogHeader>

                        <PropertyForm
                            onSuccess={onSuccess}
                            onBack={() => setIsDialogOpen(false)}
                            property={selectedProperty}
                        />
                    </DialogContent>
                </Dialog>
            ) : null}
        </div>
    );
}
