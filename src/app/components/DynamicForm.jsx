'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState, useMemo } from "react";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const DynamicForm = ({ fields = [], onSubmit , submitButtonText = "Submit" ,handleFileUpload ,addNext }) => {
  const [initialValues, setInitialValues] = useState(null);

  // useEffect(() => {
  //   console.log("Client Render:", initialValues);
  // }, [initialValues]);

  // ✅ Memoize initialValues for efficiency
  useEffect(() => {
    const defaultValues = fields.reduce((acc, field) => {
      if (field.type === 'checkbox') acc[field.name] = [];
      else if (field.type === 'file') acc[field.name] = null;
      else if (field.type !== 'caption') acc[field.name] = field.type === 'hidden' ? field.value || "false" : '';
      return acc;
    }, {});
  
    setInitialValues(defaultValues);
  }, [fields]);
  

  // ✅ Prevent rendering until `initialValues` is set
  if (!initialValues) return <p>Loading form...</p>;
  const validationSchema = Yup.object({
    ...fields.reduce((schema, field) => {
      if (field.required) {
        if (field.type === 'email') {
          schema[field.name] = Yup.string()
            .email('Invalid email')
            .required('This field is required');
        } else if (field.type === 'file') {
          schema[field.name] = Yup.mixed().required('File is required');
        } else if (field.type === 'checkbox') {
          schema[field.name] = Yup.array()
            .min(1, 'At least one option must be selected')
            .required('This field is required');
        } else if (field.type === 'date') {
          schema[field.name] = Yup.date()
            .transform((value, originalValue) => (originalValue ? new Date(originalValue) : null))
            .typeError('Invalid date format')
            .max(new Date(), 'Date cannot be in the future')
            .required('Date of Birth is required');
        } else {
          schema[field.name] = Yup.string().required('This field is required');
        }
      }
      return schema;
    }, {}),
    aadhaar: Yup.string(),
    epic: Yup.string(),
    driving_licence: Yup.string(),
  }).test(
    'at-least-one-required',
    'At least one of Aadhaar Number, EPIC Number, or DL Number is required',
    function (values) {
      const { aadhaar, epic, driving_licence } = values || {};
      return (
        (aadhaar && aadhaar.trim() !== '') ||
        (epic && epic.trim() !== '') ||
        (driving_licence && driving_licence.trim() !== '')
      );
    }
  );
  
  const getLabel = (field) => (
    <>
      {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
    </>
  );


  


  return (
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values, { setErrors, resetForm }) => {
    if (!values.aadhaar?.trim() && !values.epic?.trim() && !values.driving_licence?.trim()) {
      setErrors({
        aadhaar: "At least one of Aadhaar Number, EPIC Number, or DL Number is required",
        epic: "At least one of Aadhaar Number, EPIC Number, or DL Number is required",
        driving_licence: "At least one of Aadhaar Number, EPIC Number, or DL Number is required",
      });
      return; // ✅ Prevents form submission
    }

    console.log("Form Submitted:", values);
    onSubmit(values);
    resetForm(); // ✅ Resets form after successful submission
  }}
>

      {({ values, handleChange, setFieldValue, setFieldTouched, errors, touched ,validateForm,resetForm }) => (
              

    
     
        <Form noValidate>
           <input type="hidden" name="aadhaar_verified" value={values.aadhaar_verified} />
  <input type="hidden" name="epic_verified" value={values.epic_verified} />
  <input type="hidden" name="dl_verified" value={values.dl_verified} />
   
          <Grid container spacing={2}>
            {fields.map((field, index) => {
              const columnSize = field.sm || 6; // ✅ Dynamic `sm` value

              // ✅ Render Captions
              if (field.type === "caption") {
                return (
                  <Grid item xs={12} key={`caption-${index}`}>
                    <Typography 
                      variant="h6" 
                      sx={{ fontWeight: "bold", fontSize: "0.9rem", textDecoration: "underline", color:"black" }}
                    >
                      {field.text}
                    </Typography>
                  </Grid>
                );
              }

              // ✅ Render Text Fields
              if (field.type === 'text' || field.type === 'email') {
                return (
                  <Grid item xs={12} sm={columnSize} key={field.name}>
                    <TextField
                      fullWidth
                      label={getLabel(field)}
                      name={field.name}
                      type={field.type}
                      variant="outlined"
                      onChange={handleChange}
                      value={values[field.name] || ''}
                      error={!!errors[field.name] && touched[field.name]}
                      helperText={touched[field.name] && errors[field.name]}
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '48px', // Ensure consistent height
                          display: 'flex',
                          alignItems: 'center', // Vertically center text & placeholder
                        },
                      }}
                      slotProps={{
                        input: {
                          style: {
                            textAlign: 'left', // Keep text left-aligned
                   
                            lineHeight: 'normal', // Prevent unwanted stretching
                          },
                          readOnly: field.readOnly || false,
                        },
                      }}
                    />
                  </Grid>
                );
              }

              // ✅ Render Textarea
              if (field.type === 'textarea') {
                return (
                  <Grid item xs={12} sm={columnSize} key={field.name}>
                    <TextField
                      fullWidth
                      label={getLabel(field)}
                      name={field.name}
                      multiline
                      rows={4}
                      variant="outlined"
                      onChange={handleChange}
                      value={values[field.name] || ''}
                      error={!!errors[field.name] && touched[field.name]}
                      helperText={touched[field.name] && errors[field.name]}
                     
                    />
                  </Grid>
                );
              }

              if (field.type === 'date') {
                return (
                  <Grid item xs={12} sm={columnSize} key={field.name}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label={getLabel(field)}
                      format="DD-MM-YYYY"
                      value={values[field.name] ? dayjs(values[field.name]) : null}
                      onChange={(newValue) => {
                        setFieldTouched(field.name, true); // ✅ Ensure Formik knows the field was interacted with
                        setFieldValue(field.name, newValue ? dayjs(newValue).format('YYYY-MM-DD') : '');
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          name: field.name,
                          error: Boolean(touched[field.name] && errors[field.name]),
                          helperText: touched[field.name] && errors[field.name] ? errors[field.name] : '',
                        }
                      }}
                    />
                
                  </LocalizationProvider>
                </Grid>
                
                
                );
              }
              if (field.type === "hidden") {
                return (
                  <Field type="hidden" name={field.name} key={index} value={values[field.name]} />
                );
              }
              

             // ✅ Render Select Fields
// ✅ Render Select Fields
if (field.type === 'select') {
  return (
    <Grid item xs={12} sm={columnSize} key={field.name}>
    <FormControl fullWidth error={!!errors[field.name] && touched[field.name]}>
      {/* ✅ Label with Required Asterisk */}
      <InputLabel>
        {field.label} {field.required && <span style={{ color: "red" }}>*</span>}
      </InputLabel>
      <Field
        as={Select}
        name={field.name}
        label={field.label}
        fullWidth
        value={values[field.name] || ""} 
        onChange={(e) => {
          setFieldValue(field.name, e.target.value);
          if (field.onChange) {
            field.onChange(e.target.value, setFieldValue);
          }
        }}
        sx={{
          height: "48px",
          "& .MuiSelect-select": {
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 200, // ✅ Restrict dropdown height
              overflowY: "auto", // ✅ Enable scrolling
            },
          },
        }}
      >
        <MenuItem value="null">Select {field.label}</MenuItem>
        {(field.options || []).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Field>

      {/* ✅ Show Validation Error */}
      {errors[field.name] && touched[field.name] && (
        <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
          {errors[field.name]}
        </Typography>
      )}
    </FormControl>
  </Grid>
  );
}





// ✅ Render Radio Buttons
if (field.type === 'radio') {
  return (
    <Grid item xs={12} sm={columnSize} key={field.name}>
      <FormControl
        component="fieldset"
        error={!!errors[field.name] && touched[field.name]}
      >
        {/* Label with required asterisk */}
        <FormLabel sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
          {field.label} {field.required && <span style={{ color: "red" }}>*</span>}
        </FormLabel>

        <RadioGroup
          row
          name={field.name}
          value={values[field.name] || ''} // Ensure controlled value
          onChange={(event) => setFieldValue(field.name, event.target.value)} // ✅ Update Formik state
        >
          {(field.options || []).map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio sx={{ transform: "scale(0.9)" }} />}
              label={
                <Typography sx={{ fontSize: "0.85rem" }}>
                  {option.label}
                </Typography>
              }
            />
          ))}
        </RadioGroup>

        {/* ✅ Show Validation Error */}
        {errors[field.name] && touched[field.name] && (
          <Typography sx={{ color: "red", fontSize: "0.75rem", mt: 1 }}>
            {errors[field.name]}
          </Typography>
        )}
      </FormControl>
    </Grid>
  );
}


              // ✅ Render Checkbox
              if (field.type === 'checkbox') {
                return (
                  <Grid item xs={12} sm={columnSize} key={field.name}>
                    <FormLabel sx={{ fontSize: "1rem", marginRight: "0.65rem" }}>{field.label}</FormLabel>
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
                        label={<Typography sx={{ fontSize: "0.95rem" }}>{option.label}</Typography>}
                      />
                    ))}
                  </Grid>
                );
              }

              // ✅ Render File Upload
          // ✅ Render File Upload
          if (field.type === 'file') {
            return (
              <Grid item xs={12} sm={columnSize} key={field.name}>
                <FormControl fullWidth>
                  <FormLabel sx={{ fontSize: "0.85rem" }}>{field.label}</FormLabel>
          
                  <TextField
  fullWidth
  variant="outlined"
  value={
    values[field.name]?.uploadedFilename || // ✅ Show uploaded filename if available
    values[field.name]?.file?.name || // ✅ Show selected file name
    "" // ✅ Ensure the field never becomes undefined
  }
  placeholder="No file selected"
  error={!!errors[field.name] && touched[field.name]}
  helperText={touched[field.name] && errors[field.name]}
  InputProps={{
    readOnly: true,
    endAdornment: (
      <Button
        variant="contained"
        component="label"
        color="primary"
        sx={{ fontSize: "0.75rem", padding: "4px 8px", minWidth: "70px" }}
      >
        Upload
        <input
  type="file"
  name={field.name}
  hidden
  onChange={(event) => {
    const file = event.currentTarget.files[0];

    if (file) {
      console.log(`Selected file for ${field.name}:`, file);
      setFieldValue(field.name, { file, uploadedFilename: "" }); // ✅ Store file object
      handleFileUpload(file, field.name, setFieldValue); // ✅ Upload file and update filename
      event.target.value = "";
    } else {
      console.log(`No file selected for ${field.name}`);
      setFieldValue(field.name, { file: null, uploadedFilename: "" });
    }
  }}
  onBlur={() => setFieldTouched(field.name, true)}
/>

      </Button>
    ),
  }}
  sx={{
    fontSize: "0.85rem",
    "& .MuiOutlinedInput-root": {
      height: "48px",
      fontSize: "0.85rem",
      padding: "4px 8px",
    },
    "& .MuiFormHelperText-root": { fontSize: "0.75rem" },
  }}
/>


          
                  {/* ✅ Show "Download File" Button if `demoFileUrl` Exists */}
                  {field.demoFileUrl && (
                    <div style={{ textAlign: "right" }}>
                      <a
                        href={field.demoFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "8px",
                          fontSize: "0.75rem",
                          width: "30%",
                          padding: "4px 8px",
                          color: "#1976d2",
                          textDecoration: "none",
                          textAlign: "right",
                          borderRadius: "4px",
                        }}
                      >
                        Download File
                      </a>
                    </div>
                  )}
                </FormControl>
              </Grid>
            );
          }
          
              

              return null;
            })}
          </Grid>

          {/* ✅ Submit Button */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 5 }}        onClick={async (e) => {
    e.preventDefault();
    Object.keys(values).forEach((key) => setFieldTouched(key, true));

    // ✅ Wait for Formik validation to complete
    const validationErrors = await validateForm();

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values, "add_more");
      resetForm(); 
    }
  }}
>
            {submitButtonText}
          </Button>

          {addNext && (
  <Button
  type="button"
  variant="contained"
  color="secondary"
  sx={{ marginTop: 5, marginLeft: 2 }}
  onClick={async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    await Promise.all(Object.keys(values).map((key) => setFieldTouched(key, true, true)));

    // Validate form
    const validationErrors = await validateForm();

    // If there are errors, stop submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // If validation passes, submit form
    onSubmit(values, "save_next");
    resetForm();
  }}
>
  {addNext}
</Button>

)}

        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
