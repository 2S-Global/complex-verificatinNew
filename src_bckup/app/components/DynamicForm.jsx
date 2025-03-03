'use client';

import { Formik, Form, Field } from 'formik';
import { useEffect, useState, useMemo } from "react";
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

const DynamicForm = ({ fields = [], onSubmit , submitButtonText = "Submit"  }) => {
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    console.log("Client Render:", initialValues);
  }, [initialValues]);

  // ✅ Memoize initialValues for efficiency
  useEffect(() => {
    const defaultValues = fields.reduce((acc, field) => {
      if (field.type === 'checkbox') acc[field.name] = [];
      else if (field.type === 'file') acc[field.name] = null;
      else if (field.type !== 'caption') acc[field.name] = '';
      return acc;
    }, {});

    setInitialValues(defaultValues);
  }, [fields]);

  // ✅ Prevent rendering until `initialValues` is set
  if (!initialValues) return <p>Loading form...</p>;

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form noValidate>
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
                      label={field.label}
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
                      label={field.label}
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

             // ✅ Render Select Fields
// ✅ Render Select Fields
if (field.type === 'select') {
  return (
    <Grid item xs={12} sm={columnSize} key={field.name}>
      <FormControl fullWidth error={!!errors[field.name] && touched[field.name]}>
        <InputLabel>{field.label}</InputLabel>
        <Field
          as={Select}
          name={field.name}
          label={field.label}
          sx={{
            height: "48px", // Adjust height of Select
            "& .MuiSelect-select": {
              padding: "10px 14px", // Adjust padding inside Select
              display: "flex",
              alignItems: "center", // Align text in center
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200, // Limit dropdown height
              },
            },
          }}
        >
          {(field.options || []).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
    </Grid>
  );
}




// ✅ Render Radio Buttons
if (field.type === 'radio') {
  return (
    <Grid item xs={12} sm={columnSize} key={field.name}>
      <FormControl component="fieldset" error={!!errors[field.name] && touched[field.name]}>
        <FormLabel sx={{ fontSize: "0.875rem" }}>{field.label}</FormLabel> {/* Decrease label font size */}
        <Field as={RadioGroup} name={field.name} row>
          {(field.options || []).map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio sx={{ transform: "scale(0.9)" }} />} // Decrease radio button size
              label={
                <Typography sx={{ fontSize: "0.85rem" }}> {/* Decrease label font size */}
                  {option.label}
                </Typography>
              }
            />
          ))}
        </Field>
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
              if (field.type === 'file') {
                return (
                  <Grid item xs={12} sm={columnSize} key={field.name}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ fontSize: "0.85rem" }}>{field.label}</FormLabel> {/* Reduce label size */}
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={values[field.name] ? values[field.name].name : ''}
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
                              sx={{
                                fontSize: "0.75rem", // Smaller button text
                                padding: "4px 8px", // Smaller padding
                                minWidth: "70px", // Reduce button width
                              }}
                            >
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
                          ),
                        }}
                        sx={{
                          fontSize: "0.85rem", // Reduce input text size
                          '& .MuiOutlinedInput-root': {
                            height: "48px", // Reduce input height
                            fontSize: "0.85rem", // Reduce font size inside input
                            padding: "4px 8px", // Adjust padding
                          },
                          '& .MuiFormHelperText-root': {
                            fontSize: "0.75rem", // Reduce helper text size
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                );
              }
              

              return null;
            })}
          </Grid>

          {/* ✅ Submit Button */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 5 }}>
            {submitButtonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
