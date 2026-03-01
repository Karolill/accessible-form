import React, { useState, useId } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Alert,
  Autocomplete,
} from '@mui/material';

const COUNTRIES = [
  'Norway',
  'Sweden',
  'Denmark',
  'Finland',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Portugal',
  'Netherlands',
];

const LANGUAGES = ['English', 'Norwegian', 'Swedish', 'Danish', 'Finnish', 'German', 'French'];

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  newsletterFrequency: string;
  country: string | null;
}

interface FormErrors {
  firstName?: string;
  email?: string;
  language?: string;
  country?: string;
}

const RequiredMark = () => (
  <Box component="span" sx={{ color: 'error.main', ml: 0.5 }} aria-hidden="true">
    *
  </Box>
);

export default function AccessibleForm() {
  const baseId = useId();
  const ids = {
    firstNameError: `${baseId}-firstName-error`,
    emailError: `${baseId}-email-error`,
    languageError: `${baseId}-language-error`,
    countryError: `${baseId}-country-error`,
    errorSummary: `${baseId}-error-summary`,
  };

  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    language: '',
    newsletterFrequency: 'weekly',
    country: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(vals: FormValues): FormErrors {
    const e: FormErrors = {};
    if (!vals.firstName.trim() || vals.firstName.trim().length < 2)
      e.firstName = 'First name is required and must be at least 2 characters.';
    if (!vals.email.trim()) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!vals.language) e.language = 'Please select a preferred language.';
    if (!vals.country) e.country = 'Please select a country.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    setSubmitted(true);
    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setTimeout(() => {
        document.getElementById(ids.errorSummary)?.focus();
      }, 50);
    }
  }

  const errorList = [
    errors.firstName,
    errors.email,
    errors.language,
    errors.country,
  ].filter(Boolean) as string[];

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Fields marked with{' '}
        <Box component="span" sx={{ color: 'error.main', fontWeight: 'bold' }}>
          *
        </Box>{' '}
        are required.
      </Typography>

      {submitted && errorList.length > 0 && (
        <Alert
          severity="error"
          id={ids.errorSummary}
          tabIndex={-1}
          aria-live="polite"
          aria-atomic="true"
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Please fix the following errors:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {errorList.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </Box>
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} aria-live="polite">
          Form submitted successfully!
        </Alert>
      )}

      {/* Personal Information fieldset */}
      <Box component="fieldset" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, mb: 3 }}>
        <Typography component="legend" variant="subtitle1" sx={{ fontWeight: 'bold', px: 0.5 }}>
          Personal Information
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl error={submitted && !!errors.firstName}>
            <Box
              component="label"
              htmlFor={`${baseId}-firstName`}
              sx={{ fontWeight: 500, mb: 0.5, display: 'block' }}
            >
              First Name <RequiredMark />
            </Box>
            <TextField
              id={`${baseId}-firstName`}
              value={values.firstName}
              onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))}
              autoComplete="given-name"
              inputProps={{
                'aria-required': 'true',
                'aria-describedby': errors.firstName ? ids.firstNameError : undefined,
                'aria-invalid': submitted && !!errors.firstName ? 'true' : undefined,
              }}
              size="small"
              error={submitted && !!errors.firstName}
            />
            {submitted && errors.firstName && (
              <FormHelperText id={ids.firstNameError} error>
                {errors.firstName}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <Box
              component="label"
              htmlFor={`${baseId}-lastName`}
              sx={{ fontWeight: 500, mb: 0.5, display: 'block' }}
            >
              Last Name <RequiredMark />
            </Box>
            <TextField
              id={`${baseId}-lastName`}
              value={values.lastName}
              onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))}
              autoComplete="family-name"
              inputProps={{ 'aria-required': 'true' }}
              size="small"
            />
          </FormControl>

          <FormControl error={submitted && !!errors.email}>
            <Box
              component="label"
              htmlFor={`${baseId}-email`}
              sx={{ fontWeight: 500, mb: 0.5, display: 'block' }}
            >
              Email <RequiredMark />
            </Box>
            <TextField
              id={`${baseId}-email`}
              type="email"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              autoComplete="email"
              inputProps={{
                'aria-required': 'true',
                'aria-describedby': errors.email ? ids.emailError : undefined,
                'aria-invalid': submitted && !!errors.email ? 'true' : undefined,
              }}
              size="small"
              error={submitted && !!errors.email}
            />
            {submitted && errors.email && (
              <FormHelperText id={ids.emailError} error>
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>

      {/* Preferences fieldset */}
      <Box component="fieldset" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, mb: 3 }}>
        <Typography component="legend" variant="subtitle1" sx={{ fontWeight: 'bold', px: 0.5 }}>
          Preferences
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Language select */}
          <FormControl size="small" error={submitted && !!errors.language}>
            <Box
              component="label"
              htmlFor={`${baseId}-language`}
              sx={{ fontWeight: 500, mb: 0.5, display: 'block' }}
            >
              Preferred Language <RequiredMark />
            </Box>
            <Select
              id={`${baseId}-language`}
              value={values.language}
              onChange={(e) => setValues((v) => ({ ...v, language: e.target.value }))}
              displayEmpty
              inputProps={{
                'aria-required': 'true',
                'aria-describedby': errors.language ? ids.languageError : undefined,
                'aria-invalid': submitted && !!errors.language ? 'true' : undefined,
              }}
            >
              <MenuItem value="" disabled>
                <em>Select a language</em>
              </MenuItem>
              {LANGUAGES.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
            {submitted && errors.language && (
              <FormHelperText id={ids.languageError}>{errors.language}</FormHelperText>
            )}
          </FormControl>

          {/* Newsletter frequency radio group */}
          <Box component="fieldset" sx={{ border: 'none', p: 0, m: 0 }}>
            <FormLabel component="legend" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
              Newsletter Frequency
            </FormLabel>
            <RadioGroup
              value={values.newsletterFrequency}
              onChange={(e) => setValues((v) => ({ ...v, newsletterFrequency: e.target.value }))}
              row
            >
              {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                <FormControlLabel
                  key={freq}
                  value={freq.toLowerCase()}
                  control={<Radio size="small" />}
                  label={freq}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Country autocomplete */}
          <FormControl error={submitted && !!errors.country}>
            <Box
              component="label"
              htmlFor={`${baseId}-country`}
              sx={{ fontWeight: 500, mb: 0.5, display: 'block' }}
            >
              Country <RequiredMark />
            </Box>
            <Autocomplete
              id={`${baseId}-country`}
              options={COUNTRIES}
              value={values.country}
              onChange={(_e, val) => setValues((v) => ({ ...v, country: val }))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Search country…"
                  error={submitted && !!errors.country}
                  inputProps={{
                    ...params.inputProps,
                    'aria-required': 'true',
                    'aria-describedby': errors.country ? ids.countryError : undefined,
                    'aria-invalid': submitted && !!errors.country ? 'true' : undefined,
                  }}
                />
              )}
            />
            {submitted && errors.country && (
              <FormHelperText id={ids.countryError} error>
                {errors.country}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>

      <Button type="submit" variant="contained" color="primary" size="large">
        Submit
      </Button>
    </Box>
  );
}
