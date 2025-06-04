
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
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

const Emergency = () => {
  const [emergencyActivated, setEmergencyActivated] = useState(false);
  const [location, setLocation] = useState<any>(null);

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
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback location
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

  const emergencyContacts = [
    {
      name: 'Kiambu District Hospital',
      phone: '+254 20 2234567',
      distance: '2.3 km',
      services: ['Emergency Room', 'Ambulance', 'ICU'],
      estimatedTime: '8 mins'
    },
    {
      name: 'Thika Level 5 Hospital',
      phone: '+254 67 22345',
      distance: '15.7 km',
      services: ['Emergency Room', 'Surgery', 'Pediatrics'],
      estimatedTime: '25 mins'
    },
    {
      name: 'Kenya Emergency Services',
      phone: '999',
      distance: 'National',
      services: ['Police', 'Fire', 'Medical Emergency'],
      estimatedTime: '5-15 mins'
    }
  ];

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
              Quick access to emergency protocols and contacts
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
                    Press the button below to activate emergency mode and get immediate assistance
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
                  This will share your location and alert nearby facilities
                </p>
              </CardContent>
            </Card>
          ) : (
            /* Emergency Activated */
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  Emergency mode activated! Your location has been shared with nearby facilities.
                </AlertDescription>
              </Alert>

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
                <span>Emergency Contacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {contact.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {contact.estimatedTime}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => window.open(`tel:${contact.phone}`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {contact.services.map((service, serviceIndex) => (
                        <Badge 
                          key={serviceIndex} 
                          variant="outline" 
                          className="text-xs border-gray-300"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
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
                onClick={() => setEmergencyActivated(false)}
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
