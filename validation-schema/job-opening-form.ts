import * as Yup from 'yup';

const JobOpeningValidationSchema = Yup.object().shape({
  job_title: Yup.string().required('Job title is required'),
  designation: Yup.string().required('Designation is required'),
  location_type: Yup.string().required('Location Type is required'),
  location: Yup.string().required('Location is required'),
  work_type: Yup.string().required('Work type is required'),
  skills: Yup.array()
    .of(Yup.string().required('Skills are required'))
    .min(1, 'At least one skill is required'),
  qualifications: Yup.array()
    .of(Yup.string().required('Qualifications are required'))
    .min(1, 'At least one qualification is required'),
});

export default JobOpeningValidationSchema;
