
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import LocationSelector from '@/components/LocationSelector';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock,
  Heart,
  Users,
  Navigation as NavigationIcon,
  Siren
} from 'lucide-react';
import { getFacilitiesByCounty, type HealthFacility } from '@/data/kenyanLocations';

const Emergency = () => {
  const [emergencyActivated, setEmergencyActivated] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [nearbyFacilities, setNearbyFacilities] = useState<HealthFacility[]>([]);

  const handleEmergencyActivation = () => {
    setEmergencyActivated(true);
    
    // Simulate getting location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          
          // Auto-detect county based on coordinates (simplified)
          detectCountyFromCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to Nairobi coordinates
          setLocation({
            latitude: -1.2921,
            longitude: 36.8219,
            accuracy: 100,
            fallback: true
          });
        }
      );
    }
  };

  const detectCountyFromCoordinates = (lat: number, lng: number) => {
    // Simplified county detection based on rough coordinates
    // In a real app, this would use proper geocoding
    if (lat > 3 && lng < 36) {
      setSelectedCounty('Turkana');
      updateNearbyFacilities('Turkana');
    } else if (lat > 3 && lng > 40) {
      setSelectedCounty('Mandera');
      updateNearbyFacilities('Mandera');
    } else if (lat > 2 && lng > 37 && lng < 39) {
      setSelectedCounty('Marsabit');
      updateNearbyFacilities('Marsabit');
    } else if (lat < 0 && lng > 39) {
      setSelectedCounty('Tana River');
      updateNearbyFacilities('Tana River');
    } else if (lat < 0 && lng > 37 && lng < 39) {
      setSelectedCounty('Kitui');
      updateNearbyFacilities('Kitui');
    } else if (lat > 1 && lng > 39) {
      setSelectedCounty('Wajir');
      updateNearbyFacilities('Wajir');
    } else if (lat > 0 && lat < 1 && lng > 37 && lng < 38) {
      setSelectedCounty('Isiolo');
      updateNearbyFacilities('Isiolo');
    } else if (lat > 0 && lat < 1 && lng > 35 && lng < 37) {
      setSelectedCounty('Baringo');
      updateNearbyFacilities('Baringo');
    } else if (lat > 0 && lng > 36 && lng < 37) {
      setSelectedCounty('Samburu');
      updateNearbyFacilities('Samburu');
    } else if (lat < -3 && lng > 39) {
      setSelectedCounty('Kilifi');
      updateNearbyFacilities('Kilifi');
    } else {
      // Default to Kitui for central Kenya
      setSelectedCounty('Kitui');
      updateNearbyFacilities('Kitui');
    }
  };

  const updateNearbyFacilities = (county: string) => {
    const facilities = getFacilitiesByCounty(county);
    // Add distance calculation for emergency context
    const facilitiesWithDistance = facilities.map(facility => {
      const distance = Math.random() * 30 + 1; // 1-31 km for emergency
      const travelTime = Math.round(distance * 2); // faster emergency travel
      
      return {
        ...facility,
        distance: `${distance.toFixed(1)} km`,
        estimatedTime: `${travelTime} mins`
      };
    }).sort((a, b) => parseFloat(a.distance!) - parseFloat(b.distance!)); // Sort by distance
    
    setNearbyFacilities(facilitiesWithDistance);
  };

  const handleCountyChange = (county: string) => {
    setSelectedCounty(county);
    updateNearbyFacilities(county);
  };

  const criticalProtocols = [
    {
      title: 'Cardiac Arrest',
      steps: [
        'Check responsiveness and breathing',
        'Call for help immediately',
        'Start CPR (30:2 ratio)',
        'Continue until help arrives'
      ],
      priority: 'critical'
    },
    {
      title: 'Severe Bleeding',
      steps: [
        'Apply direct pressure to wound',
        'Elevate injured area if possible',
        'Apply pressure bandage',
        'Monitor for shock signs'
      ],
      priority: 'high'
    },
    {
      title: 'Respiratory Distress',
      steps: [
        'Position patient upright',
        'Clear airway if obstructed',
        'Administer oxygen if available',
        'Prepare for rapid transport'
      ],
      priority: 'high'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
              Emergency Mode
            </h1>
            <p className="text-gray-600">
              Quick access to emergency protocols and nearby facilities in rural Kenya
            </p>
          </div>

          {!emergencyActivated ? (
            /* Emergency Activation */
            <Card className="mb-6 border-2 border-red-600 bg-red-50">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="bg-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Siren className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-red-900 mb-2">
                    Emergency Activation
                  </h2>
                  <p className="text-red-800">
                    Press the button below to activate emergency mode and find the nearest health facilities
                  </p>
                </div>
                
                <Button
                  onClick={handleEmergencyActivation}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 h-auto"
                >
                  <AlertTriangle className="mr-3 h-6 w-6" />
                  ACTIVATE EMERGENCY
                </Button>
                
                <p className="text-xs text-red-700 mt-4">
                  This will detect your location and alert nearby facilities
                </p>
              </CardContent>
            </Card>
          ) : (
            /* Emergency Activated */
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  Emergency mode activated! Location detected: {selectedCounty} County. Nearby facilities listed below.
                </AlertDescription>
              </Alert>

              {/* Location Override */}
              <LocationSelector
                selectedCounty={selectedCounty}
                selectedSubCounty={selectedSubCounty}
                onCountyChange={handleCountyChange}
                onSubCountyChange={setSelectedSubCounty}
              />

              {/* Location Info */}
              {location && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <span>Current Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Accuracy: ±{Math.round(location.accuracy)}m
                      </p>
                      <p className="text-sm font-medium text-red-600">
                        Detected County: {selectedCounty}
                      </p>
                      {location.fallback && (
                        <Badge className="bg-orange-100 text-orange-800">
                          Approximate location (GPS unavailable)
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Emergency Contacts */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span>Nearest Emergency Facilities</span>
                {selectedCounty && (
                  <Badge className="bg-red-100 text-red-800">{selectedCounty} County</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyFacilities.length > 0 ? nearbyFacilities.map((facility, index) => (
                  <div key={facility.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{facility.name}</h3>
                        <p className="text-sm text-gray-600">{facility.type} - {facility.subCounty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {facility.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {facility.estimatedTime}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => window.open(`tel:${facility.phone}`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {facility.services.slice(0, 4).map((service, serviceIndex) => (
                        <Badge 
                          key={serviceIndex} 
                          variant="outline" 
                          className="text-xs border-gray-300"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const { lat, lng } = facility.coordinates;
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                        window.open(url, '_blank');
                      }}
                      className="w-full mt-2"
                    >
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600">Select a county to see nearby emergency facilities</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Critical Protocols */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Emergency Protocols</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {criticalProtocols.map((protocol, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm">{protocol.title}</h3>
                      <Badge 
                        className={
                          protocol.priority === 'critical' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-orange-100 text-orange-800'
                        }
                      >
                        {protocol.priority}
                      </Badge>
                    </div>
                    <ol className="space-y-1">
                      {protocol.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-xs text-gray-600">
                          {stepIndex + 1}. {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {emergencyActivated && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setEmergencyActivated(false);
                  setNearbyFacilities([]);
                  setSelectedCounty('');
                  setSelectedSubCounty('');
                }}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Deactivate Emergency Mode
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Emergency;
