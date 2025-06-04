
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Navigation';
import { 
  Search, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MapPin,
  Save,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis - in real app, this would call your AI service
    setTimeout(() => {
      const mockAnalysis = {
        symptoms: symptoms,
        diagnosis: 'Possible Upper Respiratory Tract Infection',
        confidence: 85,
        triageLevel: 'medium',
        recommendations: [
          'Monitor symptoms for 24-48 hours',
          'Ensure adequate rest and hydration',
          'Consider referral if symptoms worsen'
        ],
        referralSuggestion: {
          needed: true,
          facility: 'Kiambu District Hospital',
          department: 'General Medicine',
          urgency: 'routine'
        },
        differentialDiagnosis: [
          'Common cold',
          'Influenza',
          'Bacterial sinusitis'
        ]
      };
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getTriageColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const saveToPatientLog = () => {
    // In real app, this would save to database
    alert('Analysis saved to patient log!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
            <p className="text-gray-600">
              Describe the patient's symptoms and get AI-powered diagnostic assistance
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-red-600" />
                <span>Patient Symptoms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the patient's symptoms in detail... e.g., 'Patient presents with fever, cough, and difficulty breathing for 3 days. Temperature 38.5°C, appears fatigued.'"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
              
              <Button
                onClick={handleAnalyze}
                disabled={!symptoms.trim() || isAnalyzing}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Primary Diagnosis */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Primary Diagnosis</span>
                    <Badge className={getTriageColor(analysis.triageLevel)}>
                      {analysis.triageLevel} priority
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {analysis.diagnosis}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Confidence: {analysis.confidence}%
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {analysis.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Suggestion */}
              {analysis.referralSuggestion.needed && (
                <Card className="border-0 shadow-sm border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <span>Referral Suggested</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {analysis.referralSuggestion.facility}
                        </p>
                        <p className="text-sm text-gray-600">
                          Department: {analysis.referralSuggestion.department}
                        </p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">
                        {analysis.referralSuggestion.urgency} referral
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/referrals')}
                        className="w-full"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Find Facility Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Differential Diagnosis */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Other Possible Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysis.differentialDiagnosis.map((condition: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <AlertTriangle className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
                  This AI analysis is for assistance only. Always use clinical judgment and 
                  follow local protocols. Seek immediate medical attention for emergency cases.
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
