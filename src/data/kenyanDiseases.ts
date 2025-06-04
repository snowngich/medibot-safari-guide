
export interface Disease {
  id: string;
  name: string;
  category: 'Infectious' | 'Parasitic' | 'Respiratory' | 'Nutritional' | 'Chronic' | 'Maternal' | 'Child Health';
  commonSymptoms: string[];
  riskFactors: string[];
  prevalentRegions: string[];
  seasonality?: string;
  treatmentGuidelines: string[];
  preventionMeasures: string[];
  emergencySignals: string[];
  triageLevel: 'low' | 'medium' | 'high' | 'emergency';
}

export interface SymptomPattern {
  id: string;
  symptoms: string[];
  location: string;
  timestamp: string;
  diagnosis: string;
  verified: boolean;
  outcome: string;
}

export interface OutbreakAlert {
  id: string;
  disease: string;
  location: string;
  cases: number;
  alertLevel: 'watch' | 'warning' | 'emergency';
  startDate: string;
  description: string;
}

export const kenyanDiseases: Disease[] = [
  {
    id: 'malaria',
    name: 'Malaria',
    category: 'Parasitic',
    commonSymptoms: ['fever', 'chills', 'headache', 'body aches', 'fatigue', 'nausea', 'vomiting'],
    riskFactors: ['mosquito exposure', 'poor sanitation', 'stagnant water', 'rainy season'],
    prevalentRegions: ['Turkana', 'Tana River', 'Kilifi', 'Marsabit'],
    seasonality: 'Higher during rainy seasons (March-May, October-December)',
    treatmentGuidelines: [
      'Artemether-lumefantrine for uncomplicated malaria',
      'Artesunate for severe malaria',
      'Complete full course of treatment'
    ],
    preventionMeasures: [
      'Use mosquito nets',
      'Eliminate standing water',
      'Indoor residual spraying',
      'Chemoprophylaxis for high-risk groups'
    ],
    emergencySignals: ['altered consciousness', 'severe anemia', 'respiratory distress', 'convulsions'],
    triageLevel: 'high'
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    category: 'Respiratory',
    commonSymptoms: ['cough', 'difficulty breathing', 'chest pain', 'fever', 'rapid breathing'],
    riskFactors: ['malnutrition', 'overcrowding', 'indoor air pollution', 'immunocompromised'],
    prevalentRegions: ['Turkana', 'Baringo', 'Samburu', 'Marsabit'],
    seasonality: 'More common during cold/dry seasons',
    treatmentGuidelines: [
      'Amoxicillin for outpatient treatment',
      'Benzylpenicillin for severe cases',
      'Oxygen therapy if available'
    ],
    preventionMeasures: [
      'Vaccination (PCV, Hib)',
      'Exclusive breastfeeding',
      'Adequate nutrition',
      'Reduced indoor air pollution'
    ],
    emergencySignals: ['severe respiratory distress', 'cyanosis', 'inability to feed', 'altered consciousness'],
    triageLevel: 'high'
  },
  {
    id: 'diarrhea',
    name: 'Acute Diarrheal Disease',
    category: 'Infectious',
    commonSymptoms: ['loose stools', 'dehydration', 'vomiting', 'abdominal pain', 'fever'],
    riskFactors: ['poor sanitation', 'contaminated water', 'poor hygiene', 'malnutrition'],
    prevalentRegions: ['Turkana', 'Mandera', 'Wajir', 'Tana River'],
    seasonality: 'Peak during dry seasons and floods',
    treatmentGuidelines: [
      'ORS (Oral Rehydration Solution)',
      'Zinc supplementation for children',
      'Continue feeding',
      'Antibiotics only for bloody diarrhea'
    ],
    preventionMeasures: [
      'Safe water storage',
      'Hand washing with soap',
      'Proper sanitation',
      'Food safety practices'
    ],
    emergencySignals: ['severe dehydration', 'blood in stool', 'high fever', 'persistent vomiting'],
    triageLevel: 'medium'
  },
  {
    id: 'malnutrition',
    name: 'Acute Malnutrition',
    category: 'Nutritional',
    commonSymptoms: ['weight loss', 'growth stunting', 'muscle wasting', 'edema', 'weakness'],
    riskFactors: ['food insecurity', 'poor feeding practices', 'repeated infections', 'poverty'],
    prevalentRegions: ['Turkana', 'Mandera', 'Marsabit', 'Wajir'],
    seasonality: 'Worsens during drought periods',
    treatmentGuidelines: [
      'RUTF (Ready-to-Use Therapeutic Food)',
      'Micronutrient supplementation',
      'Treatment of medical complications',
      'Nutrition counseling'
    ],
    preventionMeasures: [
      'Exclusive breastfeeding 0-6 months',
      'Appropriate complementary feeding',
      'Micronutrient supplementation',
      'Growth monitoring'
    ],
    emergencySignals: ['severe acute malnutrition', 'medical complications', 'appetite loss'],
    triageLevel: 'high'
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    category: 'Infectious',
    commonSymptoms: ['persistent cough', 'weight loss', 'night sweats', 'fever', 'chest pain'],
    riskFactors: ['HIV infection', 'malnutrition', 'overcrowding', 'poor ventilation'],
    prevalentRegions: ['Kitui', 'Kilifi', 'Baringo', 'Isiolo'],
    seasonality: 'Year-round transmission',
    treatmentGuidelines: [
      'DOTS (Directly Observed Treatment)',
      'Standard 6-month regimen',
      'Regular monitoring',
      'Contact tracing'
    ],
    preventionMeasures: [
      'BCG vaccination',
      'Improved ventilation',
      'Early case detection',
      'HIV testing and treatment'
    ],
    emergencySignals: ['hemoptysis', 'severe respiratory distress', 'drug resistance suspected'],
    triageLevel: 'medium'
  }
];

export const mockSymptomPatterns: SymptomPattern[] = [
  {
    id: '1',
    symptoms: ['fever', 'chills', 'headache'],
    location: 'Tana River',
    timestamp: '2024-01-15',
    diagnosis: 'Malaria',
    verified: true,
    outcome: 'Recovered'
  },
  {
    id: '2',
    symptoms: ['cough', 'difficulty breathing', 'fever'],
    location: 'Turkana',
    timestamp: '2024-01-14',
    diagnosis: 'Pneumonia',
    verified: true,
    outcome: 'Referred'
  }
];

export const currentOutbreaks: OutbreakAlert[] = [
  {
    id: '1',
    disease: 'Malaria',
    location: 'Tana River',
    cases: 47,
    alertLevel: 'warning',
    startDate: '2024-01-10',
    description: 'Unusual spike in malaria cases following recent floods'
  },
  {
    id: '2',
    disease: 'Acute Diarrheal Disease',
    location: 'Turkana',
    cases: 23,
    alertLevel: 'watch',
    startDate: '2024-01-12',
    description: 'Cluster of diarrhea cases in Lodwar area'
  }
];

export const diagnosisEngine = {
  analyzeSymptoms: (symptoms: string[], location?: string): any => {
    // Enhanced AI diagnosis simulation with Kenyan disease context
    const symptomsList = symptoms.map(s => s.toLowerCase());
    
    // Match against disease database
    const possibleDiseases = kenyanDiseases.filter(disease => 
      disease.commonSymptoms.some(symptom => 
        symptomsList.some(inputSymptom => inputSymptom.includes(symptom))
      )
    );

    if (possibleDiseases.length === 0) {
      return {
        primaryDiagnosis: 'General medical consultation needed',
        confidence: 60,
        triageLevel: 'medium',
        recommendations: ['Detailed clinical assessment required'],
        differentialDiagnosis: [],
        locationContext: location
      };
    }

    const primaryDisease = possibleDiseases[0];
    const matchedSymptoms = primaryDisease.commonSymptoms.filter(symptom =>
      symptomsList.some(inputSymptom => inputSymptom.includes(symptom))
    );

    const confidence = Math.min(95, (matchedSymptoms.length / primaryDisease.commonSymptoms.length) * 100 + 10);

    return {
      primaryDiagnosis: primaryDisease.name,
      confidence: Math.round(confidence),
      triageLevel: primaryDisease.triageLevel,
      recommendations: primaryDisease.treatmentGuidelines.slice(0, 3),
      differentialDiagnosis: possibleDiseases.slice(1, 4).map(d => d.name),
      emergencySignals: primaryDisease.emergencySignals,
      preventionMeasures: primaryDisease.preventionMeasures.slice(0, 3),
      locationContext: location,
      prevalentInRegion: location ? primaryDisease.prevalentRegions.includes(location) : false
    };
  }
};
