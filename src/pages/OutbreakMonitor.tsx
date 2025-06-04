
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import LocationSelector from '@/components/LocationSelector';
import {
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  BarChart,
  Activity,
  Users,
  Clock
} from 'lucide-react';
import { currentOutbreaks, mockSymptomPatterns } from '@/data/kenyanDiseases';
import { kenyanCounties } from '@/data/kenyanLocations';

const OutbreakMonitor = () => {
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [timeRange, setTimeRange] = useState('7d');

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'watch': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOutbreaks = selectedCounty 
    ? currentOutbreaks.filter(outbreak => outbreak.location === selectedCounty)
    : currentOutbreaks;

  const getPatternsByLocation = (location?: string) => {
    if (!location) return mockSymptomPatterns;
    return mockSymptomPatterns.filter(pattern => pattern.location === location);
  };

  const generateTrendData = () => {
    // Mock trend data for visualization
    return [
      { disease: 'Malaria', cases: 47, trend: '+23%', color: 'red' },
      { disease: 'Diarrhea', cases: 23, trend: '+15%', color: 'orange' },
      { disease: 'Pneumonia', cases: 12, trend: '-5%', color: 'blue' },
      { disease: 'TB', cases: 8, trend: '0%', color: 'purple' }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Outbreak Monitor</h1>
            <p className="text-gray-600">
              Real-time disease surveillance and outbreak detection for rural Kenya
            </p>
          </div>

          {/* Active Alerts */}
          {filteredOutbreaks.filter(o => o.alertLevel === 'emergency' || o.alertLevel === 'warning').length > 0 && (
            <div className="mb-6 space-y-3">
              {filteredOutbreaks
                .filter(outbreak => outbreak.alertLevel === 'emergency' || outbreak.alertLevel === 'warning')
                .map((outbreak) => (
                <Alert key={outbreak.id} className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>{outbreak.alertLevel.toUpperCase()}</strong>: {outbreak.cases} cases of {outbreak.disease} reported in {outbreak.location}. {outbreak.description}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Location Filter */}
          <LocationSelector
            selectedCounty={selectedCounty}
            selectedSubCounty={selectedSubCounty}
            onCountyChange={setSelectedCounty}
            onSubCountyChange={setSelectedSubCounty}
            className="mb-6"
          />

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Disease Trends</TabsTrigger>
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Outbreaks</p>
                        <p className="text-2xl font-bold text-red-600">{filteredOutbreaks.length}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Cases (7d)</p>
                        <p className="text-2xl font-bold text-orange-600">70</p>
                      </div>
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Counties Affected</p>
                        <p className="text-2xl font-bold text-blue-600">2</p>
                      </div>
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Geographic Distribution */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span>Geographic Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kenyanCounties.slice(0, 5).map((county) => {
                      const countyOutbreaks = currentOutbreaks.filter(o => o.location === county.name);
                      const totalCases = countyOutbreaks.reduce((sum, o) => sum + o.cases, 0);
                      
                      return (
                        <div key={county.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{county.name}</p>
                            <p className="text-sm text-gray-600">Population: {county.population.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{totalCases} cases</p>
                            <p className="text-sm text-gray-600">{countyOutbreaks.length} outbreaks</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Disease Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    <span>Disease Trends (Last 7 Days)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generateTrendData().map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{item.disease}</p>
                            <p className="text-sm text-gray-600">Active cases</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{item.cases}</p>
                          <p className={`text-sm ${item.trend.startsWith('+') ? 'text-red-600' : item.trend.startsWith('-') ? 'text-green-600' : 'text-gray-600'}`}>
                            {item.trend}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Active Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <div className="space-y-4">
                {filteredOutbreaks.map((outbreak) => (
                  <Card key={outbreak.id} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{outbreak.disease} Outbreak</h3>
                          <p className="text-gray-600">{outbreak.location}</p>
                        </div>
                        <Badge className={getAlertColor(outbreak.alertLevel)}>
                          {outbreak.alertLevel}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{outbreak.cases} cases</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Started {outbreak.startDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{outbreak.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{outbreak.description}</p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Pattern Analysis Tab */}
            <TabsContent value="patterns" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-red-600" />
                    <span>Symptom Pattern Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getPatternsByLocation(selectedCounty).map((pattern) => (
                      <div key={pattern.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">{pattern.diagnosis}</p>
                            <p className="text-sm text-gray-600">{pattern.location} • {pattern.timestamp}</p>
                          </div>
                          <Badge className={pattern.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {pattern.verified ? 'Verified' : 'Pending'}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Reported Symptoms:</p>
                          <div className="flex flex-wrap gap-1">
                            {pattern.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          <strong>Outcome:</strong> {pattern.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default OutbreakMonitor;
