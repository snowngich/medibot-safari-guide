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

export interface PatientProfile {
  age: number;
  gender: 'male' | 'female';
  location: string;
  medicalHistory?: string[];
  pregnancyStatus?: 'pregnant' | 'not-pregnant' | 'postpartum';
}

export interface DiagnosisFeedback {
  id: string;
  diagnosisId: string;
  chwId: string;
  isCorrect: boolean;
  actualDiagnosis?: string;
  comments?: string;
  timestamp: string;
  location: string;
}

export interface RiskFlag {
  type: 'dehydration' | 'malnutrition' | 'respiratory_distress' | 'fever_cluster' | 'outbreak_risk';
  severity: 'low' | 'medium' | 'high';
  message: string;
  action: string;
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

export const expandedKenyanDiseases: Disease[] = [
  {
    id: 'cholera',
    name: 'Cholera',
    category: 'Infectious',
    commonSymptoms: ['watery diarrhea', 'severe dehydration', 'vomiting', 'leg cramps', 'rapid pulse'],
    riskFactors: ['contaminated water', 'poor sanitation', 'overcrowding', 'recent floods'],
    prevalentRegions: ['Tana River', 'Turkana', 'Mandera', 'Kilifi'],
    seasonality: 'Epidemic during floods and dry seasons',
    treatmentGuidelines: [
      'Immediate rehydration with ORS',
      'IV fluids for severe dehydration',
      'Zinc supplementation',
      'Antibiotic therapy if indicated'
    ],
    preventionMeasures: [
      'Safe water and sanitation',
      'Proper food handling',
      'Hand hygiene',
      'Oral cholera vaccine in outbreak areas'
    ],
    emergencySignals: ['severe dehydration', 'sunken eyes', 'poor skin elasticity', 'weak pulse'],
    triageLevel: 'emergency'
  },
  {
    id: 'maternal_sepsis',
    name: 'Maternal Sepsis',
    category: 'Maternal',
    commonSymptoms: ['high fever', 'chills', 'abdominal pain', 'foul-smelling discharge', 'rapid heartbeat'],
    riskFactors: ['prolonged labor', 'unclean delivery', 'retained placenta', 'cesarean section'],
    prevalentRegions: ['Turkana', 'Marsabit', 'Mandera', 'Wajir'],
    seasonality: 'Year-round, higher in areas with limited healthcare access',
    treatmentGuidelines: [
      'Immediate antibiotic therapy',
      'IV fluids and supportive care',
      'Source control of infection',
      'Emergency referral to hospital'
    ],
    preventionMeasures: [
      'Skilled birth attendance',
      'Clean delivery practices',
      'Antenatal care',
      'Early recognition of complications'
    ],
    emergencySignals: ['high fever >38.5°C', 'altered consciousness', 'severe abdominal pain', 'heavy bleeding'],
    triageLevel: 'emergency'
  },
  {
    id: 'neonatal_sepsis',
    name: 'Neonatal Sepsis',
    category: 'Child Health',
    commonSymptoms: ['poor feeding', 'lethargy', 'temperature instability', 'breathing difficulties', 'jaundice'],
    riskFactors: ['premature birth', 'low birth weight', 'prolonged rupture of membranes', 'maternal infection'],
    prevalentRegions: ['Turkana', 'Samburu', 'Marsabit', 'Baringo'],
    seasonality: 'Year-round, higher in resource-limited settings',
    treatmentGuidelines: [
      'Immediate antibiotic therapy',
      'Supportive care and monitoring',
      'Temperature regulation',
      'Feeding support'
    ],
    preventionMeasures: [
      'Clean delivery practices',
      'Immediate skin-to-skin contact',
      'Early breastfeeding initiation',
      'Proper cord care'
    ],
    emergencySignals: ['inability to feed', 'convulsions', 'severe breathing difficulties', 'hypothermia'],
    triageLevel: 'emergency'
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

export const diagnosisFeedback: DiagnosisFeedback[] = [
  {
    id: '1',
    diagnosisId: 'diag_001',
    chwId: 'chw_123',
    isCorrect: false,
    actualDiagnosis: 'Typhoid fever',
    comments: 'Patient had prolonged fever, should consider typhoid in this region',
    timestamp: '2024-01-15',
    location: 'Tana River'
  }
];

export const enhancedDiagnosisEngine = {
  analyzeSymptoms: (
    symptoms: string[], 
    patientProfile: PatientProfile,
    location?: string,
    includeOutbreakContext: boolean = true
  ): any => {
    const symptomsList = symptoms.map(s => s.toLowerCase());
    
    // Get all diseases (original + expanded)
    const allDiseases = [...kenyanDiseases, ...expandedKenyanDiseases];
    
    // Filter diseases by symptoms
    let possibleDiseases = allDiseases.filter(disease => 
      disease.commonSymptoms.some(symptom => 
        symptomsList.some(inputSymptom => inputSymptom.includes(symptom))
      )
    );

    // Apply contextual scoring
    possibleDiseases = possibleDiseases.map(disease => {
      let score = 0;
      
      // Base symptom matching
      const matchedSymptoms = disease.commonSymptoms.filter(symptom =>
        symptomsList.some(inputSymptom => inputSymptom.includes(symptom))
      );
      score += (matchedSymptoms.length / disease.commonSymptoms.length) * 60;
      
      // Location-based prevalence boost
      if (location && disease.prevalentRegions.includes(location)) {
        score += 20;
      }
      
      // Age-specific conditions
      if (patientProfile.age < 5 && disease.category === 'Child Health') {
        score += 15;
      }
      if (patientProfile.age >= 15 && patientProfile.age <= 49 && disease.category === 'Maternal') {
        score += 15;
      }
      
      // Gender-specific conditions
      if (patientProfile.gender === 'female' && disease.category === 'Maternal') {
        score += 10;
      }
      
      return { ...disease, confidence: Math.min(95, score) };
    });

    // Sort by confidence
    possibleDiseases.sort((a, b) => b.confidence - a.confidence);
    
    if (possibleDiseases.length === 0) {
      return {
        primaryDiagnosis: 'General medical consultation needed',
        confidence: 60,
        triageLevel: 'medium',
        recommendations: ['Detailed clinical assessment required'],
        differentialDiagnosis: [],
        riskFlags: [],
        locationContext: location
      };
    }

    const primaryDisease = possibleDiseases[0];
    
    // Generate risk flags
    const riskFlags = generateRiskFlags(symptomsList, patientProfile, location);
    
    return {
      primaryDiagnosis: primaryDisease.name,
      confidence: Math.round(primaryDisease.confidence),
      triageLevel: primaryDisease.triageLevel,
      recommendations: primaryDisease.treatmentGuidelines.slice(0, 3),
      differentialDiagnosis: possibleDiseases.slice(1, 4).map(d => ({
        name: d.name,
        confidence: Math.round(d.confidence)
      })),
      emergencySignals: primaryDisease.emergencySignals,
      preventionMeasures: primaryDisease.preventionMeasures.slice(0, 3),
      locationContext: location,
      prevalentInRegion: location ? primaryDisease.prevalentRegions.includes(location) : false,
      riskFlags: riskFlags,
      patientProfile: patientProfile
    };
  },

  submitFeedback: (feedback: Omit<DiagnosisFeedback, 'id' | 'timestamp'>) => {
    // In real implementation, this would update the ML model
    const newFeedback: DiagnosisFeedback = {
      ...feedback,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    diagnosisFeedback.push(newFeedback);
    console.log('Feedback submitted for learning:', newFeedback);
    return newFeedback;
  },

  getRegionalLearnings: (location: string) => {
    // Analyze feedback patterns for a specific region
    const regionFeedback = diagnosisFeedback.filter(f => f.location === location);
    const commonCorrections = regionFeedback
      .filter(f => !f.isCorrect)
      .reduce((acc, f) => {
        if (f.actualDiagnosis) {
          acc[f.actualDiagnosis] = (acc[f.actualDiagnosis] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
    
    return {
      totalFeedback: regionFeedback.length,
      accuracyRate: regionFeedback.filter(f => f.isCorrect).length / regionFeedback.length,
      commonCorrections: Object.entries(commonCorrections)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([diagnosis, count]) => ({ diagnosis, count }))
    };
  }
};

const generateRiskFlags = (symptoms: string[], profile: PatientProfile, location?: string): RiskFlag[] => {
  const flags: RiskFlag[] = [];
  
  // Dehydration risk
  if (symptoms.some(s => ['diarrhea', 'vomiting', 'dry mouth', 'sunken eyes'].some(term => s.includes(term)))) {
    flags.push({
      type: 'dehydration',
      severity: profile.age < 5 ? 'high' : 'medium',
      message: 'High probability of dehydration detected',
      action: 'Assess hydration status immediately and consider ORS'
    });
  }
  
  // Malnutrition risk for children
  if (profile.age < 5 && symptoms.some(s => ['weight loss', 'poor growth', 'weakness'].some(term => s.includes(term)))) {
    flags.push({
      type: 'malnutrition',
      severity: 'high',
      message: 'Possible acute malnutrition in child under 5',
      action: 'Measure MUAC and refer for nutrition assessment'
    });
  }
  
  // Respiratory distress
  if (symptoms.some(s => ['difficulty breathing', 'fast breathing', 'chest pain'].some(term => s.includes(term)))) {
    flags.push({
      type: 'respiratory_distress',
      severity: 'high',
      message: 'Respiratory distress detected',
      action: 'Monitor breathing rate and oxygen saturation if available'
    });
  }
  
  // Fever cluster risk
  if (symptoms.some(s => s.includes('fever')) && location) {
    flags.push({
      type: 'fever_cluster',
      severity: 'medium',
      message: `Fever case in ${location} - monitor for outbreak patterns`,
      action: 'Report to surveillance system and follow up contacts'
    });
  }
  
  return flags;
};

export { kenyanDiseases, mockSymptomPatterns, currentOutbreaks, diagnosisEngine };
