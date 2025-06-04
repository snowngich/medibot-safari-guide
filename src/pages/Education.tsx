
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import {
  Search,
  BookOpen,
  Heart,
  Shield,
  GraduationCap,
  Clock,
  CheckCircle,
  Play,
  Users,
  Star,
  Award
} from 'lucide-react';
import { educationModules, getUserProgress, searchEducationContent, type EducationModule } from '@/data/educationContent';

const Education = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState<EducationModule | null>(null);
  
  const userProgress = getUserProgress('current-user');
  
  const filteredModules = searchQuery 
    ? searchEducationContent(searchQuery)
    : educationModules.filter(module => 
        selectedCategory === 'all' || module.category === selectedCategory
      );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Health Tips': return <Heart className="h-4 w-4" />;
      case 'Preventive Care': return <Shield className="h-4 w-4" />;
      case 'First Aid': return <BookOpen className="h-4 w-4" />;
      case 'Micro Lessons': return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getProgressForModule = (moduleId: string) => {
    return userProgress.find(p => p.moduleId === moduleId);
  };

  const calculateOverallProgress = () => {
    const completed = userProgress.filter(p => p.completed).length;
    return (completed / educationModules.length) * 100;
  };

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedModule(null)}
              className="mb-4"
            >
              ← Back to Education
            </Button>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">
                      {selectedModule.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-red-100 text-red-800">
                        {selectedModule.category}
                      </Badge>
                      <Badge variant="outline">
                        {selectedModule.level}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {selectedModule.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-700">{selectedModule.description}</p>
                
                {/* Course Content */}
                <div className="space-y-6">
                  {selectedModule.content.sections.map((section, index) => (
                    <div key={section.id} className="border-l-4 border-red-500 pl-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {index + 1}. {section.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{section.content}</p>
                      
                      {section.keyPoints && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                          <ul className="space-y-1">
                            {section.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quiz Section */}
                {selectedModule.content.quiz && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">
                      Knowledge Check
                    </h3>
                    {selectedModule.content.quiz.map((question, index) => (
                      <div key={question.id} className="mb-4">
                        <p className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                              <input type="radio" name={`q${question.id}`} className="text-red-600" />
                              <span className="text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button className="bg-red-600 hover:bg-red-700 text-white mt-4">
                      Submit Quiz
                    </Button>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark Complete
                  </Button>
                  <Button variant="outline">
                    <Star className="mr-2 h-4 w-4" />
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Education Center</h1>
            <p className="text-gray-600">
              Expand your knowledge with curated health education content
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Your Progress</h2>
                <Badge className="bg-red-100 text-red-800">
                  {userProgress.filter(p => p.completed).length} / {educationModules.length} completed
                </Badge>
              </div>
              <Progress value={calculateOverallProgress()} className="mb-2" />
              <p className="text-sm text-gray-600">
                {Math.round(calculateOverallProgress())}% of all modules completed
              </p>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <Card className="mb-6 border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search education content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Health Tips">Health Tips</TabsTrigger>
              <TabsTrigger value="Preventive Care">Prevention</TabsTrigger>
              <TabsTrigger value="First Aid">First Aid</TabsTrigger>
              <TabsTrigger value="Micro Lessons">Lessons</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((module) => {
                  const progress = getProgressForModule(module.id);
                  return (
                    <Card key={module.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(module.category)}
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              {module.category}
                            </Badge>
                          </div>
                          {progress?.completed && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">{module.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {module.targetAudience}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {module.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {progress && !progress.completed && (
                          <div>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>In Progress</span>
                              <span>{Math.round((progress.timeSpent / 900) * 100)}%</span>
                            </div>
                            <Progress value={(progress.timeSpent / 900) * 100} className="h-2" />
                          </div>
                        )}

                        <Button 
                          onClick={() => setSelectedModule(module)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          {progress?.completed ? (
                            <>
                              <Award className="mr-2 h-4 w-4" />
                              Review
                            </>
                          ) : progress ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Start Learning
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {filteredModules.length === 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Education;
