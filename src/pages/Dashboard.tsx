
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { 
  Users, 
  ArrowUpRight, 
  Calendar, 
  AlertTriangle,
  Heart,
  Clock,
  MapPin,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('medibot_user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  const stats = [
    { label: 'Total Patients', value: '47', icon: Users, color: 'text-blue-600' },
    { label: 'Referrals Made', value: '12', icon: ArrowUpRight, color: 'text-green-600' },
    { label: 'Follow-ups Due', value: '8', icon: Calendar, color: 'text-orange-600' },
    { label: 'Emergency Cases', value: '2', icon: AlertTriangle, color: 'text-red-600' }
  ];

  const recentPatients = [
    { name: 'Grace Wanjiku', age: 28, condition: 'Pregnancy Check', urgency: 'low', time: '2h ago' },
    { name: 'John Mwangi', age: 45, condition: 'Hypertension', urgency: 'medium', time: '4h ago' },
    { name: 'Mary Achieng', age: 32, condition: 'Malaria Symptoms', urgency: 'high', time: '6h ago' },
    { name: 'Peter Kimani', age: 55, condition: 'Diabetes Follow-up', urgency: 'low', time: '1d ago' },
    { name: 'Sarah Njeri', age: 23, condition: 'Respiratory Issues', urgency: 'medium', time: '2d ago' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-gray-600">Here's what's happening in your community today</p>
        </div>

        {/* Quick Action */}
        <Card className="mb-6 bg-gradient-to-r from-red-600 to-red-700 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">Ready to help?</h2>
                <p className="text-red-100 text-sm mb-4">
                  Start a new patient consultation with AI assistance
                </p>
                <Button 
                  onClick={() => navigate('/symptom-checker')}
                  className="bg-white text-red-600 hover:bg-red-50"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Start Diagnosis
                </Button>
              </div>
              <Heart className="h-12 w-12 text-red-200" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Patients */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Recent Patients
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/patients')}
                className="text-red-600 hover:text-red-700"
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentPatients.map((patient, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate('/patients')}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                        <p className="text-xs text-gray-500">Age {patient.age} • {patient.condition}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getUrgencyColor(patient.urgency)}`}>
                      {patient.urgency}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {patient.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => navigate('/referrals')}
          >
            <MapPin className="h-6 w-6 text-red-600" />
            <span className="text-sm">Find Facilities</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => navigate('/emergency')}
          >
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span className="text-sm">Emergency</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
