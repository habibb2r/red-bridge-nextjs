import { BloodRequest } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, User, Droplets } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface BloodRequestCardProps {
  request: BloodRequest;
  onContact?: (request: BloodRequest) => void;
}

const BloodRequestCard = ({ request, onContact }: BloodRequestCardProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "critical":
        return "bg-red-500 hover:bg-red-600 text-white shadow-lg";
      case "high":
        return "bg-orange-500 hover:bg-orange-600 text-white shadow-md";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md";
      case "low":
        return "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "fulfilled":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "rejected":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <Card className="relative hover:shadow-xl transition-all duration-300 border-none bg-white flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-800 mb-2">
              {request.title}
            </CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              {request.description}
            </CardDescription>
          </div>
          <div className="flex flex-col space-y-2 ml-4">
            <Badge className={getUrgencyColor(request.urgency)}>
              {request.urgency.charAt(0).toUpperCase() +
                request.urgency.slice(1)}
            </Badge>
            <Badge className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-red-500" />
            <span className="font-semibold text-red-500 text-lg">
              {request.bloodGroup}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Quantity:</span>
            <span className="font-medium text-gray-800">
              {request.quantity} units
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>
              Needed by: {format(new Date(request.dateNeeded), "PPP")}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>{request.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4 text-purple-500" />
            <span>Requested by: {request.requestedBy.name}</span>
          </div>
        </div>
      </CardContent>
      {request.status === "open" && (
        <div className="pt-2 mx-5 mb-3">
          <Button
            onClick={() =>
              toast.info(`Contact requester: ${request.requestedBy.name} 
             Email: ${request.requestedBy.email}`)
            }
            className="w-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Requester
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BloodRequestCard;
