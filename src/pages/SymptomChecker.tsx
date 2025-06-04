
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { diagnosisEngine } from '@/data/kenyanDiseases';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Enhanced AI analysis with Kenyan disease context
    setTimeout(() => {
      const symptomsList = symptoms.toLowerCase().split(/[,.\s]+/).filter(s => s.length > 2);
      const analysisResult = diagnosisEngine.analyzeSymptoms(symptomsList, selectedCounty);
      
      setAnalysis({
        ...analysisResult,
        symptoms: symptoms,
        timestamp: new Date().toISOString(),
        location: selectedCounty || 'Unknown'
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

  const saveToPatientLog = () => {
    // In real app, this would save to database and contribute to learning
    console.log('Saving analysis for learning:', analysis);
    alert('Analysis saved to patient log and contributed to AI learning!');
  };

  const submitFeedback = (isCorrect: boolean) => {
    // This would feed back into the AI learning system
    console.log('Feedback submitted:', { isCorrect, analysis });
    setFeedbackSubmitted(true);
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
              AI-powered diagnostic assistance trained on Kenyan disease patterns
            </p>
          </div>

          {/* Location Context */}
          <LocationSelector
            selectedCounty={selectedCounty}
            selectedSubCounty={selectedSubCounty}
            onCountyChange={setSelectedCounty}
            onSubCountyChange={setSelectedSubCounty}
            className="mb-6"
          />

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
                placeholder="Describe the patient's symptoms in detail... e.g., 'Patient presents with fever (39°C), severe headache, chills, and body aches for 3 days. Lives in rural area near stagnant water.'"
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
                    Analyzing with AI...
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
                    <span>AI Diagnosis</span>
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

                    {/* Recommendations */}
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

              {/* Differential Diagnosis */}
              {analysis.differentialDiagnosis && analysis.differentialDiagnosis.length > 0 && (
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
              )}

              {/* AI Learning Feedback */}
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
                      Was this diagnosis helpful? Your feedback helps improve our AI for rural Kenya.
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => submitFeedback(true)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Yes, helpful
                      </Button>
                      <Button 
                        onClick={() => submitFeedback(false)}
                        size="sm"
                        variant="outline"
                      >
                        Needs improvement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {feedbackSubmitted && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Thank you! Your feedback helps train our AI to better serve rural Kenya.
                  </AlertDescription>
                </Alert>
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
};

export default SymptomChecker;
