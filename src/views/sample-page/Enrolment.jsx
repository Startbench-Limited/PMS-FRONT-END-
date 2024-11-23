import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import Scrollbar from './Scrollbar';
import jsPDF from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // Auto table for jsPDF
import * as XLSX from 'xlsx'; // For Excel export

// Sample initial data
const initialData = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'A.',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    phone: '+123456789',
    dob: '1990-01-01',
    address: '123 Main St, New York, NY',
    passportNumber: 'A1234567',
    dateOfIssue: '2020-01-01',
    dateOfExpire: '2030-01-01',
    ninNumber: '123456789',
    state: 'New York',
    lga: 'Brooklyn',
    placeOfBirth: 'New York',
    profession: 'Software Developer',
    guarantorName: 'Jane Smith',
    guarantorPhone: '+987654321',
    mahramName: 'None',
    nextOfKinName: 'Anne Doe',
    nextOfKinRelationship: 'Sister',
    nextOfKinPhone: '+123123123',
    profilePic: null // No profile picture
  },
  {
    id: 2,
    firstName: 'Jane',
    middleName: 'B.',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    gender: 'Female',
    phone: '+987654321',
    dob: '1995-05-05',
    address: '456 Elm St, Toronto, ON',
    passportNumber: 'B9876543',
    dateOfIssue: '2021-06-15',
    dateOfExpire: '2031-06-15',
    ninNumber: '987654321',
    state: 'Ontario',
    lga: 'Toronto',
    placeOfBirth: 'Toronto',
    profession: 'Engineer',
    guarantorName: 'John Doe',
    guarantorPhone: '+123456789',
    mahramName: 'Michael Smith',
    nextOfKinName: 'James Smith',
    nextOfKinRelationship: 'Brother',
    nextOfKinPhone: '+654321987',
    profilePic: 'https://via.placeholder.com/50' // Placeholder image
  }
];

const EnrolmentTable = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSearch = (event) => setSearch(event.target.value);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEditData(item);
  };


  const handlePayment = (item) => {
    setPaymentData(item);
  };

  const handlePaymentSave = () => {
    alert(`Payment of ${amount} added for ${paymentData.firstName}`);
    setPaymentData(null);
    setAmount('');
  };

  const filteredData = data.filter(
    (row) =>
      row.firstName.toLowerCase().includes(search.toLowerCase()) ||
      row.lastName.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4'); // A4 page size
    const margin = 10; // Margins
    const pageWidth = doc.internal.pageSize.width - margin * 2; // Available width
    const pageHeight = doc.internal.pageSize.height - margin * 2; // Available height

    // Map grouped data
    const groupedData = data.map((row) => [
      `Name: ${row.firstName} ${row.middleName} ${row.lastName}\nDOB: ${row.dob}\nGender: ${row.gender}\nProfession: ${row.profession}`,
      `Email: ${row.email}\nPhone: ${row.phone}\nAddress: ${row.address}`,
      `Passport No: ${row.passportNumber}\nIssued: ${row.dateOfIssue}\nExpires: ${row.dateOfExpire}\nPlace of Birth: ${row.placeOfBirth}`,
      `NIN: ${row.ninNumber}\nState: ${row.state}\nLGA: ${row.lga}\nGuarantor: ${row.guarantorName} (${row.guarantorPhone})\nNext of Kin: ${row.nextOfKinName} (${row.nextOfKinRelationship}, ${row.nextOfKinPhone})`
    ]);

    // Add title
    doc.setFontSize(14);
    doc.text('Pilgrim Enrolment List', margin, 15);

    groupedData.forEach((row, index) => {
      // Add page break if necessary
      if (doc.lastAutoTable && doc.lastAutoTable.finalY + 40 > pageHeight) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text('Pilgrim Enrolment List (Continued)', margin, 15);
      }

      // Generate table for each row
      doc.autoTable({
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 25,
        head: [['Personal Information', 'Contact Information', 'Travel Details', 'Other Details']],
        body: [row],
        styles: {
          fontSize: 10,
          cellPadding: 4,
          lineColor: [200, 200, 200], // Soft gray lines
          lineWidth: 0.2
        },
        headStyles: {
          fillColor: [0, 123, 255], // Soft blue header
          textColor: [255, 255, 255],
          fontSize: 11,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          valign: 'top',
          halign: 'left',
          cellWidth: 'wrap' // Automatically wrap text
        },
        theme: 'grid',
        columnStyles: {
          0: { cellWidth: pageWidth / 4 - 2 },
          1: { cellWidth: pageWidth / 4 - 2 },
          2: { cellWidth: pageWidth / 4 - 2 },
          3: { cellWidth: pageWidth / 4 - 2 }
        }
      });

      // Footer for each page
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(9);
      doc.text(
        `Page ${pageCount}`,
        pageWidth / 2 + margin,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    });

    // Save the PDF
    doc.save('pilgrim_data_responsive.pdf');
  };


  // Export to Excel
  const exportToExcel = () => {
    const headers = [
      'First Name',
      'Middle Name',
      'Last Name',
      'Email',
      'Gender',
      'Phone',
      'DOB',
      'Address',
      'Passport Number',
      'Date of Issue',
      'Date of Expire',
      'NIN Number',
      'State',
      'LGA',
      'Place of Birth',
      'Profession',
      'Guarantor Name',
      'Guarantor Phone',
      'Mahram Name',
      'Next of Kin Name',
      'Next of Kin Relationship',
      'Next of Kin Phone'
    ];

    const rows = data.map((row) => [
      row.firstName,
      row.middleName,
      row.lastName,
      row.email,
      row.gender,
      row.phone,
      row.dob,
      row.address,
      row.passportNumber,
      row.dateOfIssue,
      row.dateOfExpire,
      row.ninNumber,
      row.state,
      row.lga,
      row.placeOfBirth,
      row.profession,
      row.guarantorName,
      row.guarantorPhone,
      row.mahramName,
      row.nextOfKinName,
      row.nextOfKinRelationship,
      row.nextOfKinPhone
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pilgrim Data');
    XLSX.writeFile(workbook, 'pilgrim_data.xlsx');
  };

  return (
    <MainCard title="Pilgrim List">
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            Export to PDF
          </Button>
          <Button variant="contained" color="success">
            Export to Excel
          </Button>
        </div>
      </div>
      <Scrollbar>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Full Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Passport Number</th>
              <th>NIN </th>
              <th>State</th>
              <th>LGA</th>
              <th>Place of Birth</th>
              <th>Profession</th>
              <th>Guarantor Name</th>
              <th>Guarantor Phone</th>
              <th>Mahram Name</th>
              <th>Next of Kin Name</th>
              <th>Next of Kin Relationship</th>
              <th>Next of Kin Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.profilePic ? (
                    <Avatar alt={row.firstName} src={row.profilePic} />
                  ) : (
                    <Avatar>{row.firstName.charAt(0)}</Avatar>
                  )}
                </td>
                <td>{row.firstName}</td>
                <td>{row.middleName}</td>
                <td>{row.lastName}</td>
                <td>{row.email}</td>
                <td>{row.gender}</td>
                <td>{row.phone}</td>
                <td>{row.dob}</td>
                <td>{row.address}</td>
                <td>{row.passportNumber}</td>
                <td>{row.ninNumber}</td>
                <td>{row.state}</td>
                <td>{row.lga}</td>
                <td>{row.placeOfBirth}</td>
                <td>{row.profession}</td>
                <td>{row.guarantorName}</td>
                <td>{row.guarantorPhone}</td>
                <td>{row.mahramName}</td>
                <td>{row.nextOfKinName}</td>
                <td>{row.nextOfKinRelationship}</td>
                <td>{row.nextOfKinPhone}</td>
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(row)}
                    style={{ marginRight: '5px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row.id)}
                    style={{ marginRight: '5px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handlePayment(row)}
                  >
                    Add Payment
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Scrollbar>


      {/* Payment Modal */}
      {paymentData && (
        <Dialog open={Boolean(paymentData)} onClose={() => setPaymentData(null)}>
          <DialogTitle>Add Payment</DialogTitle>
          <DialogContent>
            {/* Amount Input */}
            <TextField
              label="Amount"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              style={{ marginBottom: '20px' }}
            />

            {/* Evidence of Payment Image Upload */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="evidence-upload" style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>
                Upload Evidence of Payment:
              </label>
              <input
                id="evidence-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPaymentData({ ...paymentData, evidence: reader.result });
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ marginBottom: '10px' }}
              />
              {paymentData.evidence && (
                <img
                  src={paymentData.evidence}
                  alt="Evidence of Payment"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                />
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPaymentData(null)}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handlePaymentSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

    </MainCard>
  );
};

export default EnrolmentTable;
