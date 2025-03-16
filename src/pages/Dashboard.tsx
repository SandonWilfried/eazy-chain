import { useState } from "react";
import Navbar from "@/components/Navbar";
import ShipmentCard, { ShipmentProps } from "@/components/ShipmentCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ship, Package, Calendar, CreditCard, Plus, Filter, Search, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BillOfLadingModal from "@/components/BillOfLadingModal";

// Mock shipment data
const mockShipments: ShipmentProps[] = [
  {
    id: "s1",
    trackingNumber: "CARGO12345678",
    status: "in-transit",
    origin: "Shanghai Port, China",
    destination: "Rotterdam Port, Netherlands",
    departureDate: "2023-10-25",
    estimatedArrival: "2023-11-20",
    containerCount: 2,
    paymentStatus: "paid",
    totalAmount: 4600,
  },
  {
    id: "s2",
    trackingNumber: "CARGO87654321",
    status: "pending",
    origin: "Hong Kong Port, China",
    destination: "Los Angeles Port, USA",
    departureDate: "2023-11-15",
    estimatedArrival: "2023-12-10",
    containerCount: 1,
    paymentStatus: "pending",
    totalAmount: 2700,
  },
  {
    id: "s3",
    trackingNumber: "CARGO23456789",
    status: "delivered",
    origin: "New York Port, USA",
    destination: "Hamburg Port, Germany",
    departureDate: "2023-09-05",
    estimatedArrival: "2023-09-25",
    containerCount: 3,
    paymentStatus: "paid",
    totalAmount: 7500,
  },
  {
    id: "s4",
    trackingNumber: "CARGO34567890",
    status: "cancelled",
    origin: "Singapore Port, Singapore",
    destination: "Sydney Port, Australia",
    departureDate: "2023-10-10",
    estimatedArrival: "2023-10-30",
    containerCount: 1,
    paymentStatus: "overdue",
    totalAmount: 3200,
  },
];

const Dashboard = () => {
  const [shipments] = useState<ShipmentProps[]>(mockShipments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentProps | null>(null);
  const navigate = useNavigate();

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Count shipments by status
  const activeShipments = shipments.filter(s => s.status === "in-transit" || s.status === "pending").length;
  const deliveredShipments = shipments.filter(s => s.status === "delivered").length;
  const pendingPayments = shipments.filter(s => s.paymentStatus === "pending" || s.paymentStatus === "overdue").length;

  // Handle opening the Bill of Lading modal
  const openDocumentModal = (shipment: ShipmentProps) => {
    setSelectedShipment(shipment);
    setIsDocumentModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your shipments and payments
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={() => navigate("/booking")}>
                <Plus className="mr-2 h-4 w-4" />
                New Shipment
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 */}
            <div className="glass-panel p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Ship className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Shipments</div>
                  <div className="text-2xl font-semibold mt-1">{activeShipments}</div>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="glass-panel p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Delivered</div>
                  <div className="text-2xl font-semibold mt-1">{deliveredShipments}</div>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="glass-panel p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pending Payments</div>
                  <div className="text-2xl font-semibold mt-1">{pendingPayments}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* My Documents Section */}
          <div className="glass-panel p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  My Documents
                </h2>
                <p className="text-muted-foreground mt-1">
                  Access and download your shipping documents
                </p>
              </div>
            </div>
            
            {shipments.length > 0 ? (
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Shipment ID</th>
                      <th className="py-3 px-4 text-left font-medium">Type</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={`doc-${shipment.id}`} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-4">{shipment.trackingNumber}</td>
                        <td className="py-3 px-4">Bill of Lading</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            shipment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {shipment.paymentStatus === 'paid' ? 'Available' : 'Pending Payment'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{shipment.departureDate}</td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={shipment.paymentStatus !== 'paid'}
                            onClick={() => openDocumentModal(shipment)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No documents available</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any shipping documents yet
                </p>
                <Button onClick={() => navigate("/booking")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Shipment
                </Button>
              </div>
            )}
          </div>
          
          <div className="glass-panel p-6">
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <TabsList>
                  <TabsTrigger value="all">All Shipments</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search shipments..." 
                      className="pl-10 w-full sm:w-auto"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="all" className="space-y-6 mt-6">
                {filteredShipments.length > 0 ? (
                  <div className="grid gap-6">
                    {filteredShipments.map((shipment) => (
                      <ShipmentCard key={shipment.id} shipment={shipment} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No shipments found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "You haven't created any shipments yet"}
                    </p>
                    <Button onClick={() => navigate("/booking")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Shipment
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="active" className="space-y-6 mt-6">
                {filteredShipments.filter(s => s.status === "in-transit" || s.status === "pending").length > 0 ? (
                  <div className="grid gap-6">
                    {filteredShipments
                      .filter(s => s.status === "in-transit" || s.status === "pending")
                      .map((shipment) => (
                        <ShipmentCard key={shipment.id} shipment={shipment} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Ship className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No active shipments</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any active shipments at the moment
                    </p>
                    <Button onClick={() => navigate("/booking")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Shipment
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-6 mt-6">
                {filteredShipments.filter(s => s.status === "delivered").length > 0 ? (
                  <div className="grid gap-6">
                    {filteredShipments
                      .filter(s => s.status === "delivered")
                      .map((shipment) => (
                        <ShipmentCard key={shipment.id} shipment={shipment} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No completed shipments</h3>
                    <p className="text-muted-foreground mb-6">
                      You don't have any completed shipments yet
                    </p>
                    <Button onClick={() => navigate("/booking")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Shipment
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CargoCaravan. All rights reserved.
        </div>
      </footer>

      {/* Bill of Lading Modal */}
      {selectedShipment && (
        <BillOfLadingModal
          open={isDocumentModalOpen}
          onOpenChange={setIsDocumentModalOpen}
          shipmentId={selectedShipment.trackingNumber}
          origin={selectedShipment.origin}
          destination={selectedShipment.destination}
          containerCount={selectedShipment.containerCount}
        />
      )}
    </div>
  );
};

export default Dashboard;
