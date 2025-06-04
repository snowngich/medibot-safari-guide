
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { kenyanCounties, type County } from '@/data/kenyanLocations';

interface LocationSelectorProps {
  selectedCounty?: string;
  selectedSubCounty?: string;
  onCountyChange: (county: string) => void;
  onSubCountyChange: (subCounty: string) => void;
  className?: string;
}

const LocationSelector = ({
  selectedCounty,
  selectedSubCounty,
  onCountyChange,
  onSubCountyChange,
  className = ''
}: LocationSelectorProps) => {
  const [county, setCounty] = useState<County | undefined>(
    selectedCounty ? kenyanCounties.find(c => c.name === selectedCounty) : undefined
  );

  const handleCountyChange = (countyName: string) => {
    const selectedCountyData = kenyanCounties.find(c => c.name === countyName);
    setCounty(selectedCountyData);
    onCountyChange(countyName);
    onSubCountyChange(''); // Reset sub-county when county changes
  };

  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-red-600" />
            <h3 className="font-medium text-gray-900">Location</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Select value={selectedCounty} onValueChange={handleCountyChange}>
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select County" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {kenyanCounties.map((county) => (
                    <SelectItem key={county.id} value={county.name}>
                      {county.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sub-county">Sub-County</Label>
              <Select 
                value={selectedSubCounty} 
                onValueChange={onSubCountyChange}
                disabled={!county}
              >
                <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue placeholder="Select Sub-County" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {county?.subCounties.map((subCounty) => (
                    <SelectItem key={subCounty} value={subCounty}>
                      {subCounty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {county && (
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              <p><strong>Population:</strong> {county.population.toLocaleString()}</p>
              <p><strong>Languages:</strong> {county.mainLanguages.join(', ')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
