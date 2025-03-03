'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  
} from '@mui/material';

const DynamicForm = ({ fields = [], onSubmit }) => {

  // Generate initial values dynamically
  const initialValues = fields.reduce((acc, field) => {
    if (field.type === 'checkbox') acc[field.name] = [];
    else if (field.type === 'file') acc[field.name] = null;
    else acc[field.name] = '';
    return acc;
  }, {});


  // Generate Yup validation schema dynamically
  const validationSchema = Yup.object(
    fields.reduce((schema, field) => {
      if (field.required) {
        if (field.type === 'email') {
          schema[field.name] = Yup.string().email('Invalid email').required('This field is required');
        } else if (field.type === 'file') {
          schema[field.name] = Yup.mixed().required('File is required');
        } else if (field.type === 'checkbox') {
          schema[field.name] = Yup.array()
            .min(1, 'At least one option must be selected')
            .required('This field is required');
        } else {
          schema[field.name] = Yup.string().required('This field is required');
        }
      }
      return schema;
    }, {})
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form noValidate>
          <Grid container spacing={2}>
            {fields.map((field) => {
              switch (field.type) {
                case 'text':
                case 'email':
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        variant="outlined"
                        onChange={handleChange}
                        value={values[field.name]}
                        error={!!errors[field.name] && touched[field.name]}
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    </Grid>
                  );

                case 'textarea':
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                        value={values[field.name]}
                        error={!!errors[field.name] && touched[field.name]}
                        helperText={touched[field.name] && errors[field.name]}
                      />
                    </Grid>
                  );

                case 'file':
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <FormControl fullWidth>
                        <FormLabel>{field.label}</FormLabel>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs>
                            <TextField
                              fullWidth
                              variant="outlined"
                              value={values[field.name] ? values[field.name].name : ''}
                              placeholder="No file selected"
                              InputProps={{ readOnly: true }}
                              error={!!errors[field.name] && touched[field.name]}
                              helperText={touched[field.name] && errors[field.name]}
                            />
                          </Grid>
                          <Grid item>
                            <Button variant="contained" component="label" color="primary">
                              Upload
                              <input
                                type="file"
                                name={field.name}
                                hidden
                                onChange={(event) => {
                                  setFieldValue(field.name, event.currentTarget.files[0]);
                                }}
                              />
                            </Button>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  );

                case 'radio':
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <FormControl component="fieldset" error={!!errors[field.name] && touched[field.name]}>
                        <FormLabel>{field.label}</FormLabel>
                        <Field as={RadioGroup} name={field.name} row>
                          {(field.options || []).map((option) => (
                            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                          ))}
                        </Field>
                        <ErrorMessage name={field.name} component="div" style={{ color: 'red', fontSize: '12px' }} />
                      </FormControl>
                    </Grid>
                  );

                case 'checkbox':
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <FormLabel>{field.label}</FormLabel>
                      {(field.options || []).map((option) => (
                        <FormControlLabel
                          key={option.value}
                          control={
                            <Checkbox
                              name={field.name}
                              value={option.value}
                              checked={values[field.name]?.includes(option.value)}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setFieldValue(field.name, [...(values[field.name] || []), option.value]);
                                } else {
                                  setFieldValue(field.name, (values[field.name] || []).filter((val) => val !== option.value));
                                }
                              }}
                            />
                          }
                          label={option.label}
                        />
                      ))}
                      <ErrorMessage name={field.name} component="div" style={{ color: 'red', fontSize: '12px' }} />
                    </Grid>
                  );

                case 'select':
                  return (
                    <Grid item xs={12} sm={6} key={field.name}>
                      <FormControl fullWidth variant="outlined" error={!!errors[field.name] && touched[field.name]}>
                        <InputLabel>{field.label}</InputLabel>
                        <Field as={Select} name={field.name} label={field.label}>
                          {(field.options || []).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage name={field.name} component="div" style={{ color: 'red', fontSize: '12px' }} />
                      </FormControl>
                    </Grid>
                  );

                default:
                  return null;
              }
            })}
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
