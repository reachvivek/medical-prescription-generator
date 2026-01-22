import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, FileText, Calendar, Download, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import { useToast } from '../components/ui/Toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const DashboardMock = () => {
  const toast = useToast();
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState('');

  // Load prescriptions from localStorage
  useEffect(() => {
    const loadPrescriptions = () => {
      try {
        const saved = localStorage.getItem('prescriptions');
        if (saved) {
          setPrescriptions(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load prescriptions:', error);
      }
    };

    loadPrescriptions();

    // Poll for changes every second
    const interval = setInterval(loadPrescriptions, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredPrescriptions = prescriptions.filter((p) =>
    p.patientDetails?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: prescriptions.length,
    thisMonth: prescriptions.filter((p) => {
      const created = new Date(p.createdAt);
      const now = new Date();
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length,
    completed: prescriptions.filter((p) => p.status === 'completed').length,
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      const updated = prescriptions.filter((p) => p.id !== id);
      localStorage.setItem('prescriptions', JSON.stringify(updated));
      setPrescriptions(updated);
      toast.success('Prescription deleted successfully');
    }
  };

  const handleDownload = (prescription) => {
    toast.info('PDF generation will be implemented soon!');
    console.log('Download prescription:', prescription);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your prescriptions and patient records
          </p>
        </div>
        <Link to="/create-prescription">
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            New Prescription
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Prescriptions
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.thisMonth}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.completed}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Prescriptions List */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <Card.Title>Recent Prescriptions</Card.Title>
            <div className="w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </Card.Header>

        {filteredPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              {search
                ? 'No prescriptions found'
                : 'No prescriptions yet'}
            </p>
            <Link to="/create-prescription">
              <Button variant="outline" size="sm" className="mt-2">
                Create your first prescription
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrescriptions.map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {prescription.patientDetails?.name || 'N/A'}
                      </div>
                      {prescription.patientDetails?.age && (
                        <div className="text-sm text-gray-500">
                          Age: {prescription.patientDetails.age}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(prescription.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {prescription.diagnosis || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {prescription.medications?.length || 0} medication(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {prescription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleDownload(prescription)}
                          variant="ghost"
                          size="sm"
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                        <Button
                          onClick={() => handleDelete(prescription.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardMock;
