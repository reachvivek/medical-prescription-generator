import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, FileText, Calendar } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import usePrescription from '../hooks/usePrescription';
import { formatDate } from '../utils/helpers';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { prescriptions, loading, fetchPrescriptions, deletePrescription } =
    usePrescription();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchPrescriptions(user.id);
    }
  }, [user?.id, fetchPrescriptions]);

  const filteredPrescriptions = prescriptions.filter((p) =>
    p.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: prescriptions.length,
    thisMonth: prescriptions.filter((p) => {
      const created = new Date(p.created_at);
      const now = new Date();
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length,
    completed: prescriptions.filter((p) => p.status === 'completed').length,
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

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No prescriptions found</p>
            <Link to="/create-prescription">
              <Button variant="outline" size="sm" className="mt-4">
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrescriptions.map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {prescription.patient_name}
                      </div>
                      {prescription.patient_age && (
                        <div className="text-sm text-gray-500">
                          Age: {prescription.patient_age}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(prescription.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {prescription.diagnosis || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          prescription.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {prescription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {prescription.pdf_url && (
                        <a
                          href={prescription.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          View PDF
                        </a>
                      )}
                      <button
                        onClick={() => deletePrescription(prescription.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
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

export default Dashboard;
