
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { 
  Users, 
  Search, 
  Plus, 
  Filter,
  Calendar,
  MapPin,
  Phone,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  const patients = [
    {
      id: 1,
      name: 'Grace Wanjiku',
      age: 28,
      gender: 'Female',
      phone: '+254 712 345 678',
      lastVisit: '2024-06-03',
      condition: 'Pregnancy Check',
      status: 'active',
      urgency: 'low',
      location: 'Kiambu'
    },
    {
      id: 2,
      name: 'John Mwangi',
      age: 45,
      gender: 'Male',
      phone: '+254 723 456 789',
      lastVisit: '2024-06-02',
      condition: 'Hypertension',
      status: 'follow-up',
      urgency: 'medium',
      location: 'Thika'
    },
    {
      id: 3,
      name: 'Mary Achieng',
      age: 32,
      gender: 'Female',
      phone: '+254 734 567 890',
      lastVisit: '2024-06-01',
      condition: 'Malaria Symptoms',
      status: 'referred',
      urgency: 'high',
      location: 'Limuru'
    },
    {
      id: 4,
      name: 'Peter Kimani',
      age: 55,
      gender: 'Male',
      phone: '+254 745 678 901',
      lastVisit: '2024-05-30',
      condition: 'Diabetes Follow-up',
      status: 'completed',
      urgency: 'low',
      location: 'Kiambu'
    },
    {
      id: 5,
      name: 'Sarah Njeri',
      age: 23,
      gender: 'Female',
      phone: '+254 756 789 012',
      lastVisit: '2024-05-28',
      condition: 'Respiratory Issues',
      status: 'active',
      urgency: 'medium',
      location: 'Ruiru'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'follow-up': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'referred': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Management</h1>
            <p className="text-gray-600">Manage and track all your patients</p>
          </div>
          <Button 
            onClick={() => navigate('/patients/new')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('active')}
                  className={filterStatus === 'active' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === 'follow-up' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('follow-up')}
                  className={filterStatus === 'follow-up' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Follow-up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-600">
                        {patient.age} years old • {patient.gender}
                      </p>
                      <p className="text-sm text-red-600 font-medium mt-1">
                        {patient.condition}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {patient.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {patient.lastVisit}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end space-y-2">
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <Badge className={getUrgencyColor(patient.urgency)}>
                        {patient.urgency}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Start by adding your first patient.'
                }
              </p>
              <Button 
                onClick={() => navigate('/patients/new')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Patients;
