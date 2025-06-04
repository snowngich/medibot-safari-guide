export interface County {
  id: string;
  name: string;
  subCounties: string[];
  coordinates: { lat: number; lng: number };
  population: number;
  mainLanguages: string[];
}

export interface HealthFacility {
  id: string;
  name: string;
  type: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5' | 'Level 6';
  county: string;
  subCounty: string;
  services: string[];
  specialties: string[];
  phone: string;
  coordinates: { lat: number; lng: number };
  capacity: 'High' | 'Medium' | 'Low';
  waitTime: string;
  distance?: string;
  travelTime?: string;
  estimatedTime?: string;
}

export const kenyanCounties: County[] = [
  {
    id: 'turkana',
    name: 'Turkana',
    subCounties: ['Turkana West', 'Turkana North', 'Turkana Central', 'Turkana South', 'Turkana East', 'Loima'],
    coordinates: { lat: 3.1167, lng: 35.5833 },
    population: 926976,
    mainLanguages: ['Turkana', 'Kiswahili', 'English']
  },
  {
    id: 'mandera',
    name: 'Mandera',
    subCounties: ['Mandera West', 'Mandera North', 'Mandera South', 'Mandera East', 'Lafey', 'Banissa'],
    coordinates: { lat: 3.9366, lng: 41.8570 },
    population: 1025756,
    mainLanguages: ['Somali', 'Kiswahili', 'English']
  },
  {
    id: 'marsabit',
    name: 'Marsabit',
    subCounties: ['Moyale', 'North Horr', 'Saku', 'Laisamis'],
    coordinates: { lat: 2.3284, lng: 37.9899 },
    population: 459785,
    mainLanguages: ['Borana', 'Rendille', 'Turkana', 'Kiswahili']
  },
  {
    id: 'tana-river',
    name: 'Tana River',
    subCounties: ['Garsen', 'Galole', 'Bura'],
    coordinates: { lat: -1.0333, lng: 39.9833 },
    population: 315943,
    mainLanguages: ['Pokomo', 'Orma', 'Kiswahili', 'English']
  },
  {
    id: 'kitui',
    name: 'Kitui',
    subCounties: ['Kitui West', 'Kitui Rural', 'Kitui Central', 'Kitui East', 'Kitui South', 'Mwingi North', 'Mwingi West', 'Mwingi Central'],
    coordinates: { lat: -1.3667, lng: 38.0167 },
    population: 1136187,
    mainLanguages: ['Kamba', 'Kiswahili', 'English']
  },
  {
    id: 'wajir',
    name: 'Wajir',
    subCounties: ['Wajir North', 'Wajir East', 'Tarbaj', 'Wajir West', 'Eldas', 'Wajir South'],
    coordinates: { lat: 1.7471, lng: 40.0573 },
    population: 781263,
    mainLanguages: ['Somali', 'Kiswahili', 'English']
  },
  {
    id: 'isiolo',
    name: 'Isiolo',
    subCounties: ['Isiolo North', 'Isiolo South'],
    coordinates: { lat: 0.3556, lng: 37.5833 },
    population: 268002,
    mainLanguages: ['Borana', 'Somali', 'Turkana', 'Kiswahili']
  },
  {
    id: 'baringo',
    name: 'Baringo',
    subCounties: ['Baringo North', 'Baringo Central', 'Baringo South', 'Mogotio', 'Eldama Ravine', 'Tiaty'],
    coordinates: { lat: 0.4667, lng: 35.9667 },
    population: 666763,
    mainLanguages: ['Kalenjin', 'Pokot', 'Kiswahili', 'English']
  },
  {
    id: 'samburu',
    name: 'Samburu',
    subCounties: ['Samburu West', 'Samburu North', 'Samburu East'],
    coordinates: { lat: 1.0000, lng: 36.8000 },
    population: 310327,
    mainLanguages: ['Samburu', 'Kiswahili', 'English']
  },
  {
    id: 'kilifi',
    name: 'Kilifi',
    subCounties: ['Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'],
    coordinates: { lat: -3.5105, lng: 39.8499 },
    population: 1453787,
    mainLanguages: ['Mijikenda', 'Kiswahili', 'English']
  }
];

export const healthFacilities: HealthFacility[] = [
  // Turkana County
  {
    id: 'turkana-1',
    name: 'Lodwar County Referral Hospital',
    type: 'Level 5',
    county: 'Turkana',
    subCounty: 'Turkana Central',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'Laboratory', 'Radiology'],
    specialties: ['General Surgery', 'Internal Medicine', 'Obstetrics', 'Pediatrics'],
    phone: '+254 54 21234',
    coordinates: { lat: 3.1167, lng: 35.5833 },
    capacity: 'Medium',
    waitTime: '45-60 mins',
    estimatedTime: '45-60 mins'
  },
  {
    id: 'turkana-2',
    name: 'Kakuma Mission Hospital',
    type: 'Level 4',
    county: 'Turkana',
    subCounty: 'Turkana West',
    services: ['Emergency', 'Maternity', 'Outpatient', 'Laboratory'],
    specialties: ['General Medicine', 'Maternal Health'],
    phone: '+254 54 22345',
    coordinates: { lat: 3.7500, lng: 34.7500 },
    capacity: 'Low',
    waitTime: '30-45 mins',
    estimatedTime: '30-45 mins'
  },
  
  // Mandera County
  {
    id: 'mandera-1',
    name: 'Mandera County Referral Hospital',
    type: 'Level 5',
    county: 'Mandera',
    subCounty: 'Mandera East',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'ICU'],
    specialties: ['General Surgery', 'Emergency Medicine', 'Pediatrics'],
    phone: '+254 46 52123',
    coordinates: { lat: 3.9366, lng: 41.8570 },
    capacity: 'Medium',
    waitTime: '60-90 mins',
    estimatedTime: '60-90 mins'
  },
  
  // Marsabit County
  {
    id: 'marsabit-1',
    name: 'Marsabit County Referral Hospital',
    type: 'Level 4',
    county: 'Marsabit',
    subCounty: 'Saku',
    services: ['Emergency', 'Maternity', 'Outpatient', 'Laboratory'],
    specialties: ['General Medicine', 'Maternal Health', 'Child Health'],
    phone: '+254 69 52234',
    coordinates: { lat: 2.3284, lng: 37.9899 },
    capacity: 'Low',
    waitTime: '45-60 mins',
    estimatedTime: '45-60 mins'
  },
  
  // Tana River County
  {
    id: 'tana-river-1',
    name: 'Hola District Hospital',
    type: 'Level 4',
    county: 'Tana River',
    subCounty: 'Galole',
    services: ['Emergency', 'Maternity', 'Surgery', 'Laboratory'],
    specialties: ['General Surgery', 'Obstetrics', 'General Medicine'],
    phone: '+254 46 21567',
    coordinates: { lat: -1.5000, lng: 40.0000 },
    capacity: 'Medium',
    waitTime: '30-45 mins',
    estimatedTime: '30-45 mins'
  },
  
  // Kitui County
  {
    id: 'kitui-1',
    name: 'Kitui County Referral Hospital',
    type: 'Level 5',
    county: 'Kitui',
    subCounty: 'Kitui Central',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'ICU', 'Radiology'],
    specialties: ['General Surgery', 'Internal Medicine', 'Obstetrics', 'Pediatrics'],
    phone: '+254 44 22890',
    coordinates: { lat: -1.3667, lng: 38.0167 },
    capacity: 'High',
    waitTime: '30-45 mins',
    estimatedTime: '30-45 mins'
  },
  {
    id: 'kitui-2',
    name: 'Mwingi District Hospital',
    type: 'Level 4',
    county: 'Kitui',
    subCounty: 'Mwingi Central',
    services: ['Emergency', 'Maternity', 'Outpatient', 'Laboratory'],
    specialties: ['General Medicine', 'Maternal Health'],
    phone: '+254 44 23456',
    coordinates: { lat: -0.9356, lng: 38.0589 },
    capacity: 'Medium',
    waitTime: '45-60 mins',
    estimatedTime: '45-60 mins'
  },
  
  // Wajir County
  {
    id: 'wajir-1',
    name: 'Wajir County Referral Hospital',
    type: 'Level 5',
    county: 'Wajir',
    subCounty: 'Wajir East',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'],
    specialties: ['General Surgery', 'Emergency Medicine', 'Child Health'],
    phone: '+254 46 21234',
    coordinates: { lat: 1.7471, lng: 40.0573 },
    capacity: 'Medium',
    waitTime: '60-75 mins',
    estimatedTime: '60-75 mins'
  },
  
  // Isiolo County
  {
    id: 'isiolo-1',
    name: 'Isiolo County Referral Hospital',
    type: 'Level 4',
    county: 'Isiolo',
    subCounty: 'Isiolo North',
    services: ['Emergency', 'Maternity', 'Surgery', 'Laboratory'],
    specialties: ['General Surgery', 'Maternal Health', 'Emergency Medicine'],
    phone: '+254 64 52345',
    coordinates: { lat: 0.3556, lng: 37.5833 },
    capacity: 'Medium',
    waitTime: '45-60 mins',
    estimatedTime: '45-60 mins'
  },
  
  // Baringo County
  {
    id: 'baringo-1',
    name: 'Kabarnet County Referral Hospital',
    type: 'Level 4',
    county: 'Baringo',
    subCounty: 'Baringo Central',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics'],
    specialties: ['General Surgery', 'Obstetrics', 'Pediatrics'],
    phone: '+254 53 21678',
    coordinates: { lat: 0.4917, lng: 35.7417 },
    capacity: 'Medium',
    waitTime: '30-45 mins',
    estimatedTime: '30-45 mins'
  },
  
  // Samburu County
  {
    id: 'samburu-1',
    name: 'Maralal District Hospital',
    type: 'Level 4',
    county: 'Samburu',
    subCounty: 'Samburu West',
    services: ['Emergency', 'Maternity', 'Outpatient', 'Laboratory'],
    specialties: ['General Medicine', 'Maternal Health', 'Child Health'],
    phone: '+254 65 62345',
    coordinates: { lat: 1.0917, lng: 36.6983 },
    capacity: 'Low',
    waitTime: '45-60 mins',
    estimatedTime: '45-60 mins'
  },
  
  // Kilifi County
  {
    id: 'kilifi-1',
    name: 'Kilifi County Hospital',
    type: 'Level 5',
    county: 'Kilifi',
    subCounty: 'Kilifi North',
    services: ['Emergency', 'Surgery', 'Maternity', 'Pediatrics', 'ICU'],
    specialties: ['General Surgery', 'Obstetrics', 'Pediatrics', 'Emergency Medicine'],
    phone: '+254 41 22567',
    coordinates: { lat: -3.5105, lng: 39.8499 },
    capacity: 'High',
    waitTime: '30-45 mins',
    estimatedTime: '30-45 mins'
  },
  {
    id: 'kilifi-2',
    name: 'Malindi District Hospital',
    type: 'Level 4',
    county: 'Kilifi',
    subCounty: 'Malindi',
    services: ['Emergency', 'Maternity', 'Surgery', 'Laboratory'],
    specialties: ['General Surgery', 'Maternal Health', 'General Medicine'],
    phone: '+254 42 31234',
    coordinates: { lat: -3.2194, lng: 40.1169 },
    capacity: 'Medium',
    waitTime: '45-60 mins',
    estimatedTime: '45-60 mins'
  }
];

export const getCountyById = (id: string): County | undefined => {
  return kenyanCounties.find(county => county.id === id);
};

export const getFacilitiesByCounty = (countyName: string): HealthFacility[] => {
  return healthFacilities.filter(facility => facility.county === countyName);
};

export const getFacilitiesBySubCounty = (subCounty: string): HealthFacility[] => {
  return healthFacilities.filter(facility => facility.subCounty === subCounty);
};

export const searchFacilities = (query: string): HealthFacility[] => {
  const lowercaseQuery = query.toLowerCase();
  return healthFacilities.filter(facility =>
    facility.name.toLowerCase().includes(lowercaseQuery) ||
    facility.county.toLowerCase().includes(lowercaseQuery) ||
    facility.subCounty.toLowerCase().includes(lowercaseQuery) ||
    facility.services.some(service => service.toLowerCase().includes(lowercaseQuery)) ||
    facility.specialties.some(specialty => specialty.toLowerCase().includes(lowercaseQuery))
  );
};
