import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import JobOpeningValidationSchema from '@/validation-schema/job-opening-form';
import useCreateJobOpening from '@/hooks/jobs-hook/create-job-hook';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { CONSTANTS } from '@/services/config/app-config';
import styles from '../../styles/create-job-form.module.css';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateJobOpeningForm = () => {
  const {
    designationsList,
    questionsListData,
    handleSubmitValue,
    handleChange,
    handleSubmit,
    handleSkillChange,
    questionList,
    candidateSkillsData,
    candidateQualificationData,
    createJobOpening,
    candidateSkills,
    candidateQualification,
  } = useCreateJobOpening();

  return (
    <div className="mt-2">
      <Container>
        <Box sx={{ width: '100%' }}>
          <Grid
            container
            justifyContent="center"
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <h4 className="text-center mt-4">Job Opening Form</h4>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              className="mt-3"
            >
              <Grid item xs={6} sm={6} md={4} lg={4}>
                <TextField
                  id="job_title"
                  label="Job Title"
                  variant="outlined"
                  name="job_title"
                  fullWidth
                  size="small"
                  margin="normal"
                  value={createJobOpening.job_title}
                  onChange={handleChange}
                  // {...formik.getFieldProps('job_title')}
                  // error={
                  //   formik.touched.job_title &&
                  //   Boolean(formik.errors.job_title)
                  // }
                  // helperText={
                  //   formik.touched.job_title && formik.errors.job_title
                  // }
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Designation"
                  name="designation"
                  margin="normal"
                  size="small"
                  value={createJobOpening.designation}
                  onChange={handleChange}
                  defaultValue=""
                  // helperText={
                  //   formik.touched.designation && formik.errors.designation
                  // }
                  fullWidth
                >
                  {designationsList?.length > 0 &&
                    designationsList?.map((designation: any) => (
                      <MenuItem
                        key={designation.value}
                        value={designation.value}
                      >
                        {designation.label}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  id="location"
                  label="Location"
                  variant="outlined"
                  select
                  name="custom_location"
                  value={createJobOpening.custom_location}
                  fullWidth
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                  // {...formik.getFieldProps('location')}
                  // error={
                  //   formik.touched.location && Boolean(formik.errors.location)
                  // }
                  // helperText={
                  //   formik.touched.location && formik.errors.location
                  // }
                >
                  {['All', 'Cairo', 'Riyadh']?.map((val: any) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} sm={6} md={4} lg={4}>
                <TextField
                  id="location_type"
                  name="custom_location_type"
                  label="Location Type"
                  variant="outlined"
                  value={createJobOpening.custom_location_type}
                  fullWidth
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                  select

                  // {...formik.getFieldProps('location_type')}
                  // error={
                  //   formik.touched.location_type &&
                  //   Boolean(formik.errors.location_type)
                  // }
                  // helperText={
                  //   formik.touched.location_type &&
                  //   formik.errors.location_type
                  // }
                >
                  {['All', 'On-site', 'Hybrid', 'Remote']?.map((val: any) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={4}>
                <TextField
                  id="work_type"
                  select
                  name="custom_work_type"
                  value={createJobOpening.custom_work_type}
                  label="Work Type"
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  onChange={handleChange}
                  // {...formik.getFieldProps('work_type')}
                  // error={
                  //   formik.touched.work_type &&
                  //   Boolean(formik.errors.work_type)
                  // }
                  // helperText={
                  //   formik.touched.work_type && formik.errors.work_type
                  // }
                >
                  {['All', 'Co-op', 'Full Time', 'Uncategorized']?.map(
                    (val: any) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  id="skills"
                  label="Skills"
                  fullWidth
                  name="skills"
                  size="small"
                  margin="normal"
                  value={candidateSkills}
                  onChange={handleSkillChange}
                />
              </Grid>
              <Grid item xs={4} className="d-flex align-items-center mt-2">
                <Button
                  variant="outlined"
                  onClick={() => handleSubmitValue('skills')}
                  className={styles.btn_job_form}
                >
                  Add New Skill
                </Button>
              </Grid>
            </Grid>
            {candidateSkillsData?.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Skills</th>
                  </tr>
                </thead>
                {candidateSkillsData?.length > 0 &&
                  candidateSkillsData.map((val: any, i: any) => (
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{val}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            ) : (
              ''
            )}
          </Box>

          <Box sx={{ width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  id="qualifications"
                  label="Qualifications"
                  fullWidth
                  value={candidateQualification}
                  name="qualifications"
                  size="small"
                  margin="normal"
                  onChange={handleSkillChange}
                />
              </Grid>
              <Grid item xs={4} className="d-flex align-items-center mt-2">
                <Button
                  variant="outlined"
                  onClick={() => handleSubmitValue('qualifications')}
                  className={styles.btn_job_add}
                >
                  Add New Qualification
                </Button>
              </Grid>
            </Grid>
            {candidateQualificationData?.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Qualification</th>
                  </tr>
                </thead>
                {candidateQualificationData?.length > 0 &&
                  candidateQualificationData?.map((val: any, i: any) => (
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{val}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            ) : (
              ''
            )}
          </Box>
        </Grid>

        <Box sx={{ width: '100%' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <FormControl className="input-selectField mt-4">
              <InputLabel id="demo-multiple-checkbox-label">
                Select Questions
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="questions_list"
                multiple
                value={questionList}
                onChange={handleChange}
                input={<OutlinedInput label="Select Questions" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                name="questions_list"
              >
                {questionsListData.map((name: any) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={questionList.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          className="mt-5"
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={styles.submit_btn_mob}
          >
            Submit
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateJobOpeningForm;
