
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';
import LocationSelector from '@/components/LocationSelector';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock,
  Car,
  Star,
  Navigation as NavigationIcon,
  Send,
  CheckCircle,
  Filter
} from 'lucide-react';
import { 
  healthFacilities, 
  getFacilitiesByCounty, 
  getFacilitiesBySubCounty, 
  searchFacilities,
  type HealthFacility 
} from '@/data/kenyanLocations';

const Referrals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null);
  const [referralSent, setReferralSent] = useState(false);
  const [filteredFacilities, setFilteredFacilities] = useState<HealthFacility[]>(healthFacilities);

  useEffect(() => {
    let facilities = healthFacilities;

    // Filter by county if selected
    if (selectedCounty) {
      facilities = getFacilitiesByCounty(selectedCounty);
    }

    // Filter by sub-county if selected
    if (selectedSubCounty) {
      facilities = getFacilitiesBySubCounty(selectedSubCounty);
    }

    // Apply search filter
    if (searchQuery) {
      facilities = searchFacilities(searchQuery).filter(facility => {
        if (selectedCounty && facility.county !== selectedCounty) return false;
        if (selectedSubCounty && facility.subCounty !== selectedSubCounty) return false;
        return true;
      });
    }

    // Calculate distances (simulated based on coordinates)
    const facilitiesWithDistance = facilities.map(facility => {
      // Simulate distance calculation - in real app, this would use actual geolocation
      const distance = Math.random() * 50 + 2; // 2-52 km
      const travelTime = Math.round(distance * 2.5); // rough estimate
      
      return {
        ...facility,
        distance: `${distance.toFixed(1)} km`,
        travelTime: `${travelTime} mins`
      };
    });

    setFilteredFacilities(facilitiesWithDistance);
  }, [selectedCounty, selectedSubCounty, searchQuery]);

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sendReferral = (facility: HealthFacility) => {
    setSelectedFacility(facility);
    setTimeout(() => {
      setReferralSent(true);
    }, 1000);
  };

  const getDirections = (facility: HealthFacility) => {
    const { lat, lng } = facility.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const clearFilters = () => {
    setSelectedCounty('');
    setSelectedSubCounty('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Referral System</h1>
          <p className="text-gray-600">
            Find and refer patients to health facilities across rural Kenya
          </p>
        </div>

        {/* Success Alert */}
        {referralSent && selectedFacility && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Referral successfully sent to {selectedFacility.name} in {selectedFacility.county}. 
              The facility has been notified via SMS.
            </AlertDescription>
          </Alert>
        )}

        {/* Location Selector */}
        <LocationSelector
          selectedCounty={selectedCounty}
          selectedSubCounty={selectedSubCounty}
          onCountyChange={setSelectedCounty}
          onSubCountyChange={setSelectedSubCounty}
          className="mb-6"
        />

        {/* Search and Filters */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by facility name, type, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              
              {(selectedCounty || selectedSubCounty || searchQuery) && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span>
                      Showing {filteredFacilities.length} facilities
                      {selectedCounty && ` in ${selectedCounty}`}
                      {selectedSubCounty && `, ${selectedSubCounty}`}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
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
                          <p className="text-sm text-red-600 font-medium">{facility.county}, {facility.subCounty}</p>
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
                Try adjusting your search criteria or location filters.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Referrals;
