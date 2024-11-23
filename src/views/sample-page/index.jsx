import React, { useState } from 'react';
import { Check } from '@mui/icons-material';
import {
  Stepper,
  Step,
  StepLabel,
  Button as MUIButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Container,
  MenuItem,
  Select
} from '@mui/material';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import MainCard from 'ui-component/cards/MainCard';

const steps = ['Personal Information', 'Verification Information', 'Next of Kin Details'];

const SamplePage = () => {

  const initialFormValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    dob: '',
    address: '',
    passportNumber: '',
    dateOfIssue: '',
    dateOfExpire: '',
    ninNumber: '',
    state: '',
    lga: '',
    placeOfBirth: '',
    profession: '',
    guarantorName: '',
    guarantorPhone: '',
    mahramName: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
    profilePic: null // Added for profile picture
  };

  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);

  const handleNext = () => {
    console.log("Handling Next Step..."); // Debug log
    if (validateStep()) {
      setActiveStep((prevActiveStep) => {
        console.log("Moving to next step:", prevActiveStep + 1); // Debug log
        return prevActiveStep + 1;
      });
    } else {
      console.log("Validation failed"); // Debug log
    }
  };

  const validateStep = () => {
    const newErrors = {};

    console.log('Current form values:', formValues); // Log form values to debug

    // Personal Information Validation (Step 0)
    if (activeStep === 0) {
      if (!formValues.firstName || formValues.firstName.trim() === '') {
        newErrors.firstName = 'First name is required';
      }
      if (!formValues.lastName || formValues.lastName.trim() === '') {
        newErrors.lastName = 'Last name is required';
      }
      if (!formValues.email || formValues.email.trim() === '') {
        newErrors.email = 'Email is required';
      }
      if (!formValues.gender || formValues.gender.trim() === '') {
        newErrors.gender = 'Gender is required';
      }
      if (!formValues.phone || formValues.phone.trim() === '') {
        newErrors.phone = 'Phone number is required';
      }
      if (!formValues.dob || formValues.dob.trim() === '') {
        newErrors.dob = 'Date of birth is required';
      }
    }

    // Verification Information Validation (Step 1)
    if (activeStep === 1) {
      if (!formValues.passportNumber || formValues.passportNumber.trim() === '') {
        newErrors.passportNumber = 'Passport Number is required';
      }
      if (!formValues.dateOfIssue || formValues.dateOfIssue.trim() === '') {
        newErrors.dateOfIssue = 'Date of Issue is required';
      }
      if (!formValues.dateOfExpire || formValues.dateOfExpire.trim() === '') {
        newErrors.dateOfExpire = 'Date of Expire is required';
      }
      if (!formValues.ninNumber || formValues.ninNumber.trim() === '') {
        newErrors.ninNumber = 'NIN Number is required';
      }
      if (!formValues.state || formValues.state.trim() === '') {
        newErrors.state = 'State is required';
      }
      if (!formValues.placeOfBirth || formValues.placeOfBirth.trim() === '') {
        newErrors.placeOfBirth = 'Place of Birth is required';
      }
      if (!formValues.lga || formValues.lga.trim() === '') {
        newErrors.lga = 'Local govt is required';
      }
      if (!formValues.profession || formValues.profession.trim() === '') {
        newErrors.profession = 'Profession is required';
      }
    }

    // Next of Kin Details Validation (Step 2)
    if (activeStep === 2) {
      if (!formValues.guarantorName || formValues.guarantorName.trim() === '') {
        newErrors.guarantorName = 'Guarantor Name is required';
      }
      if (!formValues.guarantorPhone || formValues.guarantorPhone.trim() === '') {
        newErrors.guarantorPhone = 'Guarantor Phone Number is required';
      }
      if (!formValues.mahramName || formValues.mahramName.trim() === '') {
        newErrors.mahramName = 'Mahram Name is required';
      }
      if (!formValues.nextOfKinName || formValues.nextOfKinName.trim() === '') {
        newErrors.nextOfKinName = 'Next of Kin Name is required';
      }
      if (!formValues.nextOfKinRelationship || formValues.nextOfKinRelationship.trim() === '') {
        newErrors.nextOfKinRelationship = 'Next of Kin Relationship is required';
      }
      if (!formValues.nextOfKinPhone || formValues.nextOfKinPhone.trim() === '') {
        newErrors.nextOfKinPhone = 'Next of Kin Phone Number is required';
      }

    }

    console.log('Validation errors:', newErrors); // Log errors to debug
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      alert('Form Submitted Successfully');

      // Reset the form after successful submission
      setFormValues(initialFormValues);
      setErrors({});
      setProfilePreview(null);
      setActiveStep(0);
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, profilePic: file });
      setProfilePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <>
      <MainCard title="Enrollment Form">
        <Stepper activeStep={activeStep} alternativeLabel className="mb-5">
          {steps.map((label, index) => (
            <Step key={label} completed={index < activeStep}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Row>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.firstName}>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput
                  value={formValues.firstName}
                  onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
                />
                {errors.firstName && <Typography color="error">{errors.firstName}</Typography>}
              </FormControl>
            </Col>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth>
                <InputLabel>Middle Name</InputLabel>
                <OutlinedInput
                  value={formValues.middleName}
                  onChange={(e) => setFormValues({ ...formValues, middleName: e.target.value })}
                />
              </FormControl>
            </Col>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.lastName}>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput
                  value={formValues.lastName}
                  onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
                />
                {errors.lastName && <Typography color="error">{errors.lastName}</Typography>}
              </FormControl>
            </Col>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formValues.gender}
                  onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                >
                  <MenuItem value="select">select</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {errors.gender && <Typography color="error">{errors.gender}</Typography>}
              </FormControl>
            </Col>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.phone}>
                <InputLabel>Phone</InputLabel>
                <OutlinedInput
                  value={formValues.phone}
                  onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                />
                {errors.phone && <Typography color="error">{errors.phone}</Typography>}
              </FormControl>
            </Col>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.dob}>
                <InputLabel>Date of Birth</InputLabel>
                <OutlinedInput
                  type="date"
                  value={formValues.dob}
                  onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
                />
                {errors.dob && <Typography color="error">{errors.dob}</Typography>}
              </FormControl>
            </Col>
            <Col md={6}>
              <FormControl fullWidth error={!!errors.email}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />
                {errors.email && <Typography color="error">{errors.email}</Typography>}
              </FormControl>
            </Col>
            <Col md={6}>
              <FormControl fullWidth error={!!errors.address}>
                <InputLabel>Address</InputLabel>
                <OutlinedInput
                  value={formValues.address}
                  onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                />
                {errors.address && <Typography color="error">{errors.address}</Typography>}
              </FormControl>
            </Col>
            <Col md={4} className="mb-4">
              <Typography variant="h6">Profile Picture</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginTop: '8px', marginBottom: '8px' }}
              />
              {profilePreview && (
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  style={{ width: '100%', maxWidth: '150px', height: 'auto', borderRadius: '8px' }}
                />
              )}
            </Col>
          </Row>
        )}

        {activeStep === 1 && (
          <Row>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.passportNumber}>
                <InputLabel>Passport Number</InputLabel>
                <OutlinedInput
                  value={formValues.passportNumber}
                  onChange={(e) => setFormValues({ ...formValues, passportNumber: e.target.value })}
                />
                {errors.passportNumber && <Typography color="error" variant="caption">{errors.passportNumber}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.dateOfIssue}>
                <InputLabel>Date of Issue</InputLabel>
                <OutlinedInput
                  type="date"
                  value={formValues.dateOfIssue}
                  onChange={(e) => setFormValues({ ...formValues, dateOfIssue: e.target.value })}
                />
                {errors.dateOfIssue && <Typography color="error" variant="caption">{errors.dateOfIssue}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.dateOfExpire}>
                <InputLabel>Date of Expire</InputLabel>
                <OutlinedInput
                  type="date"
                  value={formValues.dateOfExpire}
                  onChange={(e) => setFormValues({ ...formValues, dateOfExpire: e.target.value })}
                />
                {errors.dateOfExpire && <Typography color="error" variant="caption">{errors.dateOfExpire}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.ninNumber}>
                <InputLabel>NIN Number</InputLabel>
                <OutlinedInput
                  value={formValues.ninNumber}
                  onChange={(e) => setFormValues({ ...formValues, ninNumber: e.target.value })}
                />
                {errors.ninNumber && <Typography color="error" variant="caption">{errors.ninNumber}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.state}>
                <InputLabel>State</InputLabel>
                <OutlinedInput
                  value={formValues.state}
                  onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
                />
                {errors.state && <Typography color="error" variant="caption">{errors.state}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.placeOfBirth}>
                <InputLabel>Place of Birth</InputLabel>
                <OutlinedInput
                  value={formValues.placeOfBirth}
                  onChange={(e) => setFormValues({ ...formValues, placeOfBirth: e.target.value })}
                />
                {errors.placeOfBirth && <Typography color="error" variant="caption">{errors.placeOfBirth}</Typography>}
              </FormControl>
            </Col>

            <Col md={6}>
              <FormControl fullWidth error={!!errors.lga}>
                <InputLabel>Select Local Government Area (LGA)</InputLabel>
                <OutlinedInput
                  value={formValues.lga}
                  onChange={(e) => setFormValues({ ...formValues, lga: e.target.value })}
                />
                {errors.lga && <Typography color="error" variant="caption">{errors.lga}</Typography>}
              </FormControl>
            </Col>

            <Col md={6}>
              <FormControl fullWidth error={!!errors.profession}>
                <InputLabel>profession</InputLabel>
                <OutlinedInput
                  value={formValues.profession}
                  onChange={(e) => setFormValues({ ...formValues, profession: e.target.value })}
                />
                {errors.profession && <Typography color="error" variant="caption">{errors.profession}</Typography>}
              </FormControl>
            </Col>

          </Row>

        )}

        {activeStep === 2 && (
          <Row>
            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.guarantorName}>
                <InputLabel>Guarantor Name</InputLabel>
                <OutlinedInput
                  value={formValues.guarantorName}
                  onChange={(e) => setFormValues({ ...formValues, guarantorName: e.target.value })}
                />
                {errors.guarantorName && <Typography color="error" variant="caption">{errors.guarantorName}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.guarantorPhone}>
                <InputLabel>Guarantor Phone Number</InputLabel>
                <OutlinedInput
                  value={formValues.guarantorPhone}
                  onChange={(e) => setFormValues({ ...formValues, guarantorPhone: e.target.value })}
                />
                {errors.guarantorPhone && <Typography color="error" variant="caption">{errors.guarantorPhone}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.mahramName}>
                <InputLabel>Mahram Name</InputLabel>
                <OutlinedInput
                  value={formValues.mahramName}
                  onChange={(e) => setFormValues({ ...formValues, mahramName: e.target.value })}
                />
                {errors.mahramName && <Typography color="error" variant="caption">{errors.mahramName}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.nextOfKinName}>
                <InputLabel>Next of Kin Name</InputLabel>
                <OutlinedInput
                  value={formValues.nextOfKinName}
                  onChange={(e) => setFormValues({ ...formValues, nextOfKinName: e.target.value })}
                />
                {errors.nextOfKinName && <Typography color="error" variant="caption">{errors.nextOfKinName}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.nextOfKinRelationship}>
                <InputLabel>Next of Kin Relationship</InputLabel>
                <OutlinedInput
                  value={formValues.nextOfKinRelationship}
                  onChange={(e) => setFormValues({ ...formValues, nextOfKinRelationship: e.target.value })}
                />
                {errors.nextOfKinRelationship && <Typography color="error" variant="caption">{errors.nextOfKinRelationship}</Typography>}
              </FormControl>
            </Col>

            <Col md={4} className='mb-4'>
              <FormControl fullWidth error={!!errors.nextOfKinPhone}>
                <InputLabel>Next of Kin Phone Number</InputLabel>
                <OutlinedInput
                  value={formValues.nextOfKinPhone}
                  onChange={(e) => setFormValues({ ...formValues, nextOfKinPhone: e.target.value })}
                />
                {errors.nextOfKinPhone && <Typography color="error" variant="caption">{errors.nextOfKinPhone}</Typography>}
              </FormControl>
            </Col>
          </Row>

        )}

        <Row className="mt-4">
          <Col md={6}>
            <MUIButton variant="contained" onClick={handleBack} disabled={activeStep === 0}>
              Back
            </MUIButton>
          </Col>
          <Col md={6} className="text-right">
            {activeStep === steps.length - 1 ? (
              <MUIButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </MUIButton>
            ) : (
              <MUIButton variant="contained" color="primary" onClick={handleNext}>
                Next
              </MUIButton>
            )}
          </Col>
        </Row>
      </MainCard>
    </>
  );
};

export default SamplePage;
