
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock,
  Car,
  Star,
  Navigation as NavigationIcon,
  Send,
  CheckCircle
} from 'lucide-react';

const Referrals = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [referralSent, setReferralSent] = useState(false);

  const facilities = [
    {
      id: 1,
      name: 'Kiambu District Hospital',
      type: 'District Hospital',
      distance: '2.3 km',
      travelTime: '8 mins',
      rating: 4.2,
      phone: '+254 20 2234567',
      services: ['Emergency', 'Maternity', 'Pediatrics', 'Surgery', 'Laboratory'],
      specialties: ['General Medicine', 'Obstetrics', 'Emergency Medicine'],
      capacity: 'High',
      waitTime: '30-45 mins',
      coordinates: { lat: -1.1743, lng: 36.8350 }
    },
    {
      id: 2,
      name: 'Thika Level 5 Hospital',
      type: 'Level 5 Hospital',
      distance: '15.7 km',
      travelTime: '25 mins',
      rating: 4.5,
      phone: '+254 67 22345',
      services: ['Emergency', 'ICU', 'Surgery', 'Radiology', 'Pharmacy'],
      specialties: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology'],
      capacity: 'Medium',
      waitTime: '45-60 mins',
      coordinates: { lat: -1.0332, lng: 37.0694 }
    },
    {
      id: 3,
      name: 'Limuru Health Centre',
      type: 'Health Centre',
      distance: '8.1 km',
      travelTime: '18 mins',
      rating: 3.8,
      phone: '+254 20 2023456',
      services: ['Outpatient', 'Maternity', 'Laboratory', 'Pharmacy'],
      specialties: ['Family Medicine', 'Maternal Health', 'Child Health'],
      capacity: 'High',
      waitTime: '15-30 mins',
      coordinates: { lat: -1.1053, lng: 36.6428 }
    },
    {
      id: 4,
      name: 'Ruiru District Hospital',
      type: 'District Hospital',
      distance: '12.4 km',
      travelTime: '22 mins',
      rating: 4.0,
      phone: '+254 20 2156789',
      services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'],
      specialties: ['General Surgery', 'Internal Medicine', 'Pediatrics'],
      capacity: 'Medium',
      waitTime: '30-45 mins',
      coordinates: { lat: -1.1395, lng: 36.9605 }
    }
  ];

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchLocation.toLowerCase()) ||
    facility.services.some(service => 
      service.toLowerCase().includes(searchLocation.toLowerCase())
    )
  );

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sendReferral = (facility: any) => {
    setSelectedFacility(facility);
    // Simulate sending referral
    setTimeout(() => {
      setReferralSent(true);
    }, 1000);
  };

  const getDirections = (facility: any) => {
    const { lat, lng } = facility.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Referral System</h1>
          <p className="text-gray-600">
            Find and refer patients to nearby health facilities
          </p>
        </div>

        {/* Success Alert */}
        {referralSent && selectedFacility && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Referral successfully sent to {selectedFacility.name}. 
              The facility has been notified via SMS.
            </AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by facility name, type, or service..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Facilities List */}
        <div className="space-y-4">
          {filteredFacilities.map((facility) => (
            <Card key={facility.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between space-y-3 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{facility.name}</h3>
                          <p className="text-sm text-gray-600">{facility.type}</p>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{facility.rating}</span>
                        </div>
                      </div>
                      
                      {/* Location Info */}
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {facility.distance}
                        </div>
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          {facility.travelTime}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Wait: {facility.waitTime}
                        </div>
                      </div>
                    </div>

                    {/* Capacity Badge */}
                    <Badge className={getCapacityColor(facility.capacity)}>
                      {facility.capacity} Capacity
                    </Badge>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Available Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.specialties.map((specialty, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => sendReferral(facility)}
                      className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-none"
                      disabled={referralSent && selectedFacility?.id === facility.id}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {referralSent && selectedFacility?.id === facility.id ? 'Sent' : 'Send Referral'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${facility.phone}`)}
                      className="flex-1 sm:flex-none"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => getDirections(facility)}
                      className="flex-1 sm:flex-none"
                    >
                      <NavigationIcon className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No facilities found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or check your connection.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Referrals;
