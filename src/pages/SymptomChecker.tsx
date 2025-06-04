
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import LocationSelector from '@/components/LocationSelector';
import { 
  Search, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MapPin,
  Save,
  ArrowRight,
  TrendingUp,
  Shield,
  User,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Stethoscope,
  Activity,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { enhancedDiagnosisEngine, type PatientProfile, type EnhancedAnalysisResult } from '@/data/kenyanDiseases';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female'>('male');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<EnhancedAnalysisResult | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!symptoms.trim() || !patientAge) return;
    
    setIsAnalyzing(true);
    
    // Enhanced AI analysis with patient profile and contextual factors
    setTimeout(() => {
      const symptomsList = symptoms.toLowerCase().split(/[,.\s]+/).filter(s => s.length > 2);
      
      const patientProfile: PatientProfile = {
        age: parseInt(patientAge),
        gender: patientGender,
        location: selectedCounty,
        medicalHistory: medicalHistory ? medicalHistory.split(',').map(h => h.trim()) : []
      };
      
      const analysisResult = enhancedDiagnosisEngine.analyzeSymptoms(
        symptomsList, 
        patientProfile,
        selectedCounty,
        true
      );
      
      setAnalysis({
        ...analysisResult,
        timestamp: new Date().toISOString(),
        location: selectedCounty || 'Unknown',
        diagnosisId: `diag_${Date.now()}`
      } as any);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getTriageColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-500 text-white';
      case 'urgent': return 'bg-orange-500 text-white';
      case 'routine': return 'bg-blue-500 text-white';
      case 'self-care': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskFlagColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'low': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const submitFeedback = (isCorrect: boolean, actualDiagnosis?: string, comments?: string) => {
    if (!analysis) return;
    
    enhancedDiagnosisEngine.submitFeedback({
      diagnosisId: (analysis as any).diagnosisId,
      chwId: 'current-user',
      isCorrect,
      actualDiagnosis,
      comments,
      location: selectedCounty
    });
    
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Enhanced AI Diagnostic Assistant</h1>
            <p className="text-gray-600">
              Doctor-level diagnostic support with location-aware intelligence and comprehensive analysis
            </p>
          </div>

          {/* Patient Profile */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-red-600" />
                <span>Patient Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="Enter patient age"
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={patientGender} onValueChange={(value: 'male' | 'female') => setPatientGender(value)}>
                    <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="history">Medical History (optional)</Label>
                <Input
                  id="history"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  placeholder="Previous illnesses, allergies, medications..."
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Context */}
          <LocationSelector
            selectedCounty={selectedCounty}
            selectedSubCounty={selectedSubCounty}
            onCountyChange={setSelectedCounty}
            onSubCountyChange={setSelectedSubCounty}
            className="mb-6"
          />

          {/* Symptoms Input */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-5 w-5 text-red-600" />
                <span>Clinical Presentation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe symptoms comprehensively, including duration, severity, and context... e.g., '3-day history of high fever (39°C), severe headache, vomiting x2, patient reports living near stagnant water, no mosquito net use'"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
              
              <Button
                onClick={handleAnalyze}
                disabled={!symptoms.trim() || !patientAge || isAnalyzing}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Processing Clinical Analysis...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Generate Differential Diagnosis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Risk Flags */}
              {analysis.riskFlags && analysis.riskFlags.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Flag className="h-5 w-5 text-red-600" />
                      <span>Critical Risk Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskFlags.map((flag, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getRiskFlagColor(flag.severity)}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{flag.message}</h4>
                              <p className="text-sm mt-1 opacity-90">{flag.action}</p>
                            </div>
                            <Badge className="capitalize">{flag.severity}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Red Flags */}
              {analysis.redFlags && analysis.redFlags.length > 0 && (
                <Card className="border-0 shadow-sm border-l-4 border-l-red-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-700">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Emergency Warning Signs</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.redFlags.map((flag, index) => (
                        <div key={index} className="flex items-center space-x-2 text-red-700">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm font-medium">{flag}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Primary Diagnosis */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-red-600" />
                      <span>Primary Diagnosis</span>
                    </span>
                    <Badge className={getTriageColor(analysis.triageLevel)}>
                      {analysis.triageLevel} priority
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {analysis.primaryDiagnosis}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Clinical Confidence: {analysis.confidence}%
                        {analysis.locationContext.prevalentInRegion && (
                          <span className="ml-2 text-orange-600">• Endemic in {selectedCounty}</span>
                        )}
                        {analysis.locationContext.seasonalRisk && (
                          <span className="ml-2 text-blue-600">• High seasonal risk</span>
                        )}
                        {analysis.locationContext.outbreakRisk && (
                          <span className="ml-2 text-red-600">• Active outbreak area</span>
                        )}
                      </p>
                    </div>

                    {/* Clinical Reasoning */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                        <Brain className="h-4 w-4 mr-1" />
                        Clinical Reasoning:
                      </h4>
                      <p className="text-sm text-blue-800">{analysis.clinicalReasoning}</p>
                    </div>

                    {/* Treatment Guidance */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Immediate Management:</h4>
                      <ul className="space-y-1">
                        {analysis.treatmentGuidance.immediate.map((treatment, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Referral Guidance */}
                    {analysis.treatmentGuidance.referralNeeded && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-medium text-orange-900 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Referral Required:
                        </h4>
                        <p className="text-sm text-orange-800">
                          {analysis.treatmentGuidance.referralUrgency === 'immediate' 
                            ? 'IMMEDIATE referral to nearest health facility' 
                            : `Refer within ${analysis.treatmentGuidance.referralUrgency?.replace('_', ' ')}`}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Comprehensive Differential Diagnosis */}
              {analysis.differentialDiagnoses && analysis.differentialDiagnoses.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <span>Differential Diagnoses</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.differentialDiagnoses.map((condition, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{condition.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{condition.reasoning}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <Badge variant="outline">{condition.confidence}%</Badge>
                              <Badge className={getUrgencyColor(condition.urgency)} variant="secondary">
                                {condition.urgency}
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Next Steps:</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {condition.nextSteps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start space-x-1">
                                  <span className="text-gray-400">•</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Follow-up Care */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Follow-up & Prevention</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Follow-up Instructions:</h4>
                      <ul className="space-y-1">
                        {analysis.treatmentGuidance.followUp.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Section */}
              {!feedbackSubmitted && (
                <Card className="border-0 shadow-sm bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>Improve AI Accuracy - CHW Feedback</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">
                      Your clinical expertise helps train our AI for better rural Kenya healthcare. Was this diagnostic assessment accurate?
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => submitFeedback(true)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Accurate Diagnosis
                      </Button>
                      <Button 
                        onClick={() => submitFeedback(false, prompt('What was the actual diagnosis?') || undefined, prompt('Clinical comments for learning?') || undefined)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Needs Correction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {feedbackSubmitted && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Clinical feedback submitted! This helps our AI learn regional disease patterns and improve diagnostic accuracy for {selectedCounty}.
                  </AlertDescription>
                </Alert>
              )}

              {/* Referral Suggestion */}
              {analysis.treatmentGuidance.referralNeeded && (
                <Card className="border-0 shadow-sm border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <span>Referral Required</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        Based on clinical assessment, {analysis.treatmentGuidance.referralUrgency === 'immediate' ? 'IMMEDIATE' : 'prompt'} referral to a health facility is recommended.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/referrals')}
                        className="w-full"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Find Nearest Health Facility
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => console.log('Saving analysis:', analysis)}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Clinical Assessment
                </Button>
                <Button 
                  onClick={() => navigate('/patients/new')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Create Patient Record
                </Button>
              </div>

              {/* Medical Disclaimer */}
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  This AI diagnostic assistant is trained on Kenyan disease patterns and clinical protocols but serves as a clinical decision support tool only. 
                  Always apply professional clinical judgment, follow local treatment guidelines, and seek immediate medical attention for emergency cases.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SymptomChecker;
