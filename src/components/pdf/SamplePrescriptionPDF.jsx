import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  watermark: {
    position: 'absolute',
    fontSize: 100,
    color: '#ff0000',
    opacity: 0.1,
    transform: 'rotate(-45deg)',
    top: '40%',
    left: '15%',
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 2,
    borderBottomColor: '#4b5563',
  },
  clinicName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
  },
  doctorInfo: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '48%',
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#111827',
  },
  prescriptionSection: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rxBadge: {
    backgroundColor: '#0891b2',
    color: '#ffffff',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 8,
  },
  prescriptionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
  },
  medication: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 4,
    border: 1,
    borderColor: '#bae6fd',
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  medicationDetails: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  medicationInstructions: {
    fontSize: 9,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  notes: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.8,
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: 2,
    borderTopColor: '#4b5563',
  },
  signature: {
    marginTop: 30,
    fontSize: 10,
  },
  signatureLabel: {
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  signatureName: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: 8,
  },
  date: {
    fontSize: 9,
    color: '#9ca3af',
    marginTop: 15,
  },
});

const SamplePrescriptionPDF = () => {
  const followUpDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>SAMPLE</Text>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.clinicName}>City Medical Center</Text>
          <View style={styles.doctorInfo}>
            <Text>Dr. Sarah Johnson, MD</Text>
            <Text>Specialty: Internal Medicine</Text>
            <Text>License: MED-123456</Text>
            <Text>Phone: +1 (555) 123-4567</Text>
            <Text>123 Medical Plaza, Suite 200, New York, NY 10001</Text>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.grid}>
            <Text style={styles.gridItem}>
              <Text style={styles.label}>Name: </Text>John Smith
            </Text>
            <Text style={styles.gridItem}>
              <Text style={styles.label}>Age: </Text>45 years
            </Text>
            <Text style={styles.gridItem}>
              <Text style={styles.label}>Gender: </Text>Male
            </Text>
            <Text style={styles.gridItem}>
              <Text style={styles.label}>Contact: </Text>+1 (555) 987-6543
            </Text>
            <Text style={[styles.gridItem, { width: '100%' }]}>
              <Text style={styles.label}>Address: </Text>456 Oak Street, Brooklyn, NY 11201
            </Text>
          </View>
        </View>

        {/* Clinical Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical Information</Text>
          <View style={styles.notes}>
            <Text>
              <Text style={styles.label}>Diagnosis: </Text>
              Hypertension (Stage 1), Type 2 Diabetes Mellitus
            </Text>
            <Text style={{ marginTop: 5 }}>
              <Text style={styles.label}>Symptoms: </Text>
              Elevated blood pressure, increased thirst, frequent urination
            </Text>
            <Text style={{ marginTop: 5 }}>
              <Text style={styles.label}>Lab Tests: </Text>
              CBC, Lipid Panel, HbA1c, Fasting Blood Sugar
            </Text>
          </View>
        </View>

        {/* Prescription */}
        <View style={styles.prescriptionSection}>
          <View style={styles.prescriptionHeader}>
            <Text style={styles.rxBadge}>Rx</Text>
            <Text style={styles.prescriptionTitle}>Prescription</Text>
          </View>

          <View style={styles.medication}>
            <Text style={styles.medicationName}>1. Lisinopril 10mg</Text>
            <Text style={styles.medicationDetails}>
              Dosage: 1 tablet | Frequency: Once daily | Duration: 30 days
            </Text>
            <Text style={styles.medicationInstructions}>
              Instructions: Take in the morning with water
            </Text>
          </View>

          <View style={styles.medication}>
            <Text style={styles.medicationName}>2. Metformin 500mg</Text>
            <Text style={styles.medicationDetails}>
              Dosage: 1 tablet | Frequency: Twice daily | Duration: 30 days
            </Text>
            <Text style={styles.medicationInstructions}>
              Instructions: Take with meals
            </Text>
          </View>

          <View style={styles.medication}>
            <Text style={styles.medicationName}>3. Aspirin 81mg</Text>
            <Text style={styles.medicationDetails}>
              Dosage: 1 tablet | Frequency: Once daily | Duration: 30 days
            </Text>
            <Text style={styles.medicationInstructions}>
              Instructions: Take after breakfast
            </Text>
          </View>
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <View style={styles.notes}>
            <Text>• Monitor blood pressure daily</Text>
            <Text>• Check blood sugar levels as directed</Text>
            <Text>• Follow low-sodium, diabetic-friendly diet</Text>
            <Text>• Regular exercise (30 minutes daily)</Text>
            <Text>• Avoid alcohol and smoking</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.gridItem}>
            <Text style={styles.label}>Follow-up Date: </Text>
            {followUpDate}
          </Text>

          <View style={styles.signature}>
            <Text style={styles.signatureLabel}>Doctor's Signature</Text>
            <Text style={styles.signatureName}>Dr. Sarah Johnson, MD</Text>
            <Text style={styles.date}>Date: {currentDate}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SamplePrescriptionPDF;
