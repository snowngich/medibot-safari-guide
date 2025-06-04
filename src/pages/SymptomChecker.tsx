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
  Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { enhancedDiagnosisEngine, type PatientProfile, type RiskFlag } from '@/data/kenyanDiseases';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female'>('male');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
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
        symptoms: symptoms,
        timestamp: new Date().toISOString(),
        location: selectedCounty || 'Unknown',
        diagnosisId: `diag_${Date.now()}`
      });
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
      diagnosisId: analysis.diagnosisId,
      chwId: 'current-user', // In real app, get from auth
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Enhanced AI Symptom Checker</h1>
            <p className="text-gray-600">
              Context-aware diagnostic assistance with learning capabilities
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
                <Brain className="h-5 w-5 text-red-600" />
                <span>Symptoms & Clinical Presentation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe symptoms in detail, including duration, severity, and context... e.g., 'Child presents with high fever (39°C) for 2 days, vomiting, refuses to eat, lives near stagnant water'"
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
                    Analyzing with Enhanced AI...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze with Context
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Risk Flags */}
              {analysis.riskFlags && analysis.riskFlags.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Flag className="h-5 w-5 text-red-600" />
                      <span>AI Risk Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskFlags.map((flag: RiskFlag, index: number) => (
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

              {/* Primary Diagnosis */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Enhanced AI Diagnosis</span>
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
                        Confidence: {analysis.confidence}%
                        {analysis.prevalentInRegion && (
                          <span className="ml-2 text-orange-600">• Common in {analysis.locationContext}</span>
                        )}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Treatment Recommendations:</h4>
                      <ul className="space-y-1">
                        {analysis.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Emergency Signals */}
                    {analysis.emergencySignals && analysis.emergencySignals.length > 0 && (
                      <div>
                        <h4 className="font-medium text-red-900 mb-2">⚠️ Emergency Signs to Watch:</h4>
                        <ul className="space-y-1">
                          {analysis.emergencySignals.map((signal: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-red-700">{signal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prevention Measures */}
                    {analysis.preventionMeasures && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Shield className="h-4 w-4 mr-1" />
                          Prevention Measures:
                        </h4>
                        <ul className="space-y-1">
                          {analysis.preventionMeasures.map((measure: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Differential Diagnosis with Confidence */}
              {analysis.differentialDiagnosis && analysis.differentialDiagnosis.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Alternative Diagnoses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.differentialDiagnosis.map((condition: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{condition.name}</span>
                          <Badge variant="outline">{condition.confidence}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Feedback Section */}
              {!feedbackSubmitted && (
                <Card className="border-0 shadow-sm bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>Help Improve AI Accuracy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">
                      Your feedback trains our AI to better serve rural Kenya. Was this diagnosis accurate?
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => submitFeedback(true)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Accurate
                      </Button>
                      <Button 
                        onClick={() => submitFeedback(false, prompt('What was the actual diagnosis?') || undefined, prompt('Additional comments?') || undefined)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Needs correction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {feedbackSubmitted && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Feedback submitted! This helps our AI learn and improve for your region.
                  </AlertDescription>
                </Alert>
              )}

              {/* Referral Suggestion */}
              {analysis.triageLevel === 'high' || analysis.triageLevel === 'emergency' && (
                <Card className="border-0 shadow-sm border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <span>Referral Recommended</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        Based on severity, immediate referral to a health facility is recommended.
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
                  onClick={saveToPatientLog}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save to Patient Log
                </Button>
                <Button 
                  onClick={() => navigate('/patients/new')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Create Patient Record
                </Button>
              </div>

              {/* Disclaimer */}
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  This AI analysis is trained on Kenyan disease patterns but is for assistance only. 
                  Always use clinical judgment and follow local protocols. Seek immediate medical 
                  attention for emergency cases.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  function saveToPatientLog() {
    // In real app, this would save to database and contribute to learning
    console.log('Saving analysis for learning:', analysis);
    alert('Analysis saved to patient log and contributed to AI learning!');
  }
};

export default SymptomChecker;
