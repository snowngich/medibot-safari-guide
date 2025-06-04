
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
  prevalenceScore: number; // Add base prevalence score
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

export interface DifferentialDiagnosis {
  name: string;
  confidence: number;
  reasoning: string;
  urgency: 'immediate' | 'urgent' | 'routine' | 'self-care';
  nextSteps: string[];
}

export interface EnhancedAnalysisResult {
  primaryDiagnosis: string;
  confidence: number;
  triageLevel: 'low' | 'medium' | 'high' | 'emergency';
  differentialDiagnoses: DifferentialDiagnosis[];
  treatmentGuidance: {
    immediate: string[];
    followUp: string[];
    referralNeeded: boolean;
    referralUrgency?: 'immediate' | 'within_24h' | 'within_week';
  };
  riskFlags: RiskFlag[];
  locationContext: {
    prevalentInRegion: boolean;
    seasonalRisk: boolean;
    outbreakRisk: boolean;
  };
  clinicalReasoning: string;
  redFlags: string[];
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
    triageLevel: 'high',
    prevalenceScore: 85
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
    triageLevel: 'high',
    prevalenceScore: 70
  },
  {
    id: 'typhoid',
    name: 'Typhoid Fever',
    category: 'Infectious',
    commonSymptoms: ['prolonged fever', 'headache', 'abdominal pain', 'rose spots', 'constipation', 'weakness'],
    riskFactors: ['contaminated water', 'poor sanitation', 'overcrowding', 'travel'],
    prevalentRegions: ['Kitui', 'Mandera', 'Wajir', 'Tana River'],
    seasonality: 'Year-round, peaks during dry seasons',
    treatmentGuidelines: [
      'Ciprofloxacin or Azithromycin',
      'Ceftriaxone for severe cases',
      'Supportive care with fluids'
    ],
    preventionMeasures: [
      'Safe water and sanitation',
      'Typhoid vaccination',
      'Food safety practices',
      'Hand hygiene'
    ],
    emergencySignals: ['intestinal bleeding', 'perforation', 'severe dehydration', 'neurological complications'],
    triageLevel: 'high',
    prevalenceScore: 60
  },
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
    triageLevel: 'emergency',
    prevalenceScore: 40
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    category: 'Infectious',
    commonSymptoms: ['persistent cough', 'weight loss', 'night sweats', 'fever', 'chest pain', 'blood in sputum'],
    riskFactors: ['HIV infection', 'malnutrition', 'overcrowding', 'poor ventilation', 'diabetes'],
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
    triageLevel: 'medium',
    prevalenceScore: 55
  },
  {
    id: 'acute_diarrhea',
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
    triageLevel: 'medium',
    prevalenceScore: 75
  },
  {
    id: 'malnutrition',
    name: 'Acute Malnutrition',
    category: 'Nutritional',
    commonSymptoms: ['weight loss', 'growth stunting', 'muscle wasting', 'edema', 'weakness', 'poor appetite'],
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
    triageLevel: 'high',
    prevalenceScore: 65
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
  ): EnhancedAnalysisResult => {
    const symptomsList = symptoms.map(s => s.toLowerCase());
    
    // Advanced symptom-disease matching with scoring
    let possibleDiseases = kenyanDiseases.map(disease => {
      let score = 0;
      let reasoning = '';
      
      // Base symptom matching (40% weight)
      const matchedSymptoms = disease.commonSymptoms.filter(symptom =>
        symptomsList.some(inputSymptom => inputSymptom.includes(symptom) || symptom.includes(inputSymptom))
      );
      const symptomScore = (matchedSymptoms.length / disease.commonSymptoms.length) * 40;
      score += symptomScore;
      
      if (matchedSymptoms.length > 0) {
        reasoning += `Symptoms match: ${matchedSymptoms.join(', ')}. `;
      }
      
      // Location-based prevalence (25% weight)
      if (location && disease.prevalentRegions.includes(location)) {
        score += 25;
        reasoning += `High prevalence in ${location}. `;
      }
      
      // Age-specific conditions (15% weight)
      if (patientProfile.age < 5 && disease.category === 'Child Health') {
        score += 15;
        reasoning += 'Common in children under 5. ';
      }
      if (patientProfile.age >= 15 && patientProfile.age <= 49 && disease.category === 'Maternal') {
        score += 15;
        reasoning += 'Relevant for reproductive age group. ';
      }
      
      // Seasonal factors (10% weight)
      const currentMonth = new Date().getMonth();
      const isRainySeason = currentMonth >= 2 && currentMonth <= 4 || currentMonth >= 9 && currentMonth <= 11;
      if (disease.seasonality && disease.seasonality.includes('rainy') && isRainySeason) {
        score += 10;
        reasoning += 'Currently in high-risk season. ';
      }
      
      // Outbreak context (10% weight)
      if (includeOutbreakContext && location) {
        const activeOutbreak = currentOutbreaks.find(o => 
          o.location === location && o.disease.toLowerCase().includes(disease.name.toLowerCase())
        );
        if (activeOutbreak) {
          score += 10;
          reasoning += `Active outbreak in area (${activeOutbreak.cases} cases). `;
        }
      }
      
      return {
        ...disease,
        confidence: Math.min(95, Math.max(5, score)),
        reasoning: reasoning.trim() || 'Based on symptom pattern analysis.'
      };
    });

    // Filter and sort by confidence
    possibleDiseases = possibleDiseases
      .filter(d => d.confidence > 15)
      .sort((a, b) => b.confidence - a.confidence);
    
    if (possibleDiseases.length === 0) {
      return createFallbackDiagnosis(symptoms, patientProfile, location);
    }

    const primaryDisease = possibleDiseases[0];
    
    // Generate comprehensive differential diagnoses
    const differentialDiagnoses: DifferentialDiagnosis[] = possibleDiseases.slice(0, 5).map(disease => ({
      name: disease.name,
      confidence: Math.round(disease.confidence),
      reasoning: disease.reasoning,
      urgency: determineUrgency(disease, symptomsList),
      nextSteps: generateNextSteps(disease, patientProfile)
    }));
    
    // Generate risk flags
    const riskFlags = generateRiskFlags(symptomsList, patientProfile, location);
    
    // Clinical reasoning
    const clinicalReasoning = generateClinicalReasoning(
      symptomsList, 
      patientProfile, 
      primaryDisease, 
      location
    );
    
    // Red flags
    const redFlags = identifyRedFlags(symptomsList, primaryDisease);
    
    return {
      primaryDiagnosis: primaryDisease.name,
      confidence: Math.round(primaryDisease.confidence),
      triageLevel: primaryDisease.triageLevel,
      differentialDiagnoses,
      treatmentGuidance: generateTreatmentGuidance(primaryDisease, patientProfile),
      riskFlags,
      locationContext: {
        prevalentInRegion: location ? primaryDisease.prevalentRegions.includes(location) : false,
        seasonalRisk: checkSeasonalRisk(primaryDisease),
        outbreakRisk: checkOutbreakRisk(primaryDisease, location)
      },
      clinicalReasoning,
      redFlags
    };
  },

  submitFeedback: (feedback: Omit<DiagnosisFeedback, 'id' | 'timestamp'>) => {
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
      accuracyRate: regionFeedback.length > 0 ? regionFeedback.filter(f => f.isCorrect).length / regionFeedback.length : 0,
      commonCorrections: Object.entries(commonCorrections)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([diagnosis, count]) => ({ diagnosis, count }))
    };
  }
};

// Helper functions
function createFallbackDiagnosis(symptoms: string[], profile: PatientProfile, location?: string): EnhancedAnalysisResult {
  return {
    primaryDiagnosis: 'Comprehensive clinical assessment needed',
    confidence: 40,
    triageLevel: 'medium',
    differentialDiagnoses: [
      {
        name: 'Viral syndrome',
        confidence: 60,
        reasoning: 'Common viral illness with non-specific symptoms',
        urgency: 'routine',
        nextSteps: ['Symptomatic treatment', 'Monitor for deterioration', 'Return if symptoms worsen']
      },
      {
        name: 'Bacterial infection',
        confidence: 40,
        reasoning: 'Possible bacterial cause requiring investigation',
        urgency: 'urgent',
        nextSteps: ['Consider antibiotics', 'Laboratory tests if available', 'Follow up in 24-48 hours']
      }
    ],
    treatmentGuidance: {
      immediate: ['Symptomatic relief', 'Maintain hydration', 'Monitor vital signs'],
      followUp: ['Return if symptoms persist >3 days', 'Seek immediate care if deteriorating'],
      referralNeeded: false
    },
    riskFlags: generateRiskFlags(symptoms, profile, location),
    locationContext: {
      prevalentInRegion: false,
      seasonalRisk: false,
      outbreakRisk: false
    },
    clinicalReasoning: 'Symptoms do not clearly match common regional disease patterns. Requires further clinical assessment and possibly laboratory investigation.',
    redFlags: []
  };
}

function determineUrgency(disease: Disease, symptoms: string[]): 'immediate' | 'urgent' | 'routine' | 'self-care' {
  if (disease.triageLevel === 'emergency') return 'immediate';
  if (disease.triageLevel === 'high') return 'urgent';
  
  const emergencySymptoms = symptoms.filter(s => 
    disease.emergencySignals.some(signal => s.includes(signal) || signal.includes(s))
  );
  
  if (emergencySymptoms.length > 0) return 'immediate';
  if (disease.triageLevel === 'medium') return 'urgent';
  return 'routine';
}

function generateNextSteps(disease: Disease, profile: PatientProfile): string[] {
  const steps = [];
  
  if (disease.triageLevel === 'emergency' || disease.triageLevel === 'high') {
    steps.push('Immediate referral to health facility');
  }
  
  steps.push(...disease.treatmentGuidelines.slice(0, 2));
  
  if (profile.age < 5) {
    steps.push('Monitor closely for deterioration');
  }
  
  return steps;
}

function generateTreatmentGuidance(disease: Disease, profile: PatientProfile) {
  return {
    immediate: disease.treatmentGuidelines.slice(0, 2),
    followUp: disease.preventionMeasures.slice(0, 2),
    referralNeeded: disease.triageLevel === 'high' || disease.triageLevel === 'emergency',
    referralUrgency: disease.triageLevel === 'emergency' ? 'immediate' as const : 'within_24h' as const
  };
}

function generateClinicalReasoning(symptoms: string[], profile: PatientProfile, disease: Disease, location?: string): string {
  let reasoning = `Patient presents with ${symptoms.join(', ')}. `;
  reasoning += `Given the ${profile.age}-year-old ${profile.gender} patient profile `;
  
  if (location) {
    reasoning += `in ${location}, where ${disease.name} is ${disease.prevalentRegions.includes(location) ? 'prevalent' : 'less common'}, `;
  }
  
  reasoning += `the constellation of symptoms most likely suggests ${disease.name}. `;
  reasoning += `This diagnosis is supported by the regional epidemiology and symptom pattern. `;
  reasoning += `Confidence level reflects the specificity of symptoms and local disease prevalence.`;
  
  return reasoning;
}

function identifyRedFlags(symptoms: string[], disease: Disease): string[] {
  const redFlags = [];
  
  symptoms.forEach(symptom => {
    if (disease.emergencySignals.some(signal => symptom.includes(signal) || signal.includes(symptom))) {
      redFlags.push(`${symptom} - requires immediate attention`);
    }
  });
  
  return redFlags;
}

function checkSeasonalRisk(disease: Disease): boolean {
  if (!disease.seasonality) return false;
  
  const currentMonth = new Date().getMonth();
  const isRainySeason = currentMonth >= 2 && currentMonth <= 4 || currentMonth >= 9 && currentMonth <= 11;
  
  return disease.seasonality.includes('rainy') && isRainySeason;
}

function checkOutbreakRisk(disease: Disease, location?: string): boolean {
  if (!location) return false;
  
  return currentOutbreaks.some(outbreak => 
    outbreak.location === location && 
    outbreak.disease.toLowerCase().includes(disease.name.toLowerCase())
  );
}

function generateRiskFlags(symptoms: string[], profile: PatientProfile, location?: string): RiskFlag[] {
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
}
