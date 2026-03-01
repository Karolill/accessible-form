import React, { useState } from 'react';

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

export default function InaccessibleForm() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {submitted && (
        <div
          style={{
            background: '#e0e0e0',
            padding: '8px 12px',
            marginBottom: 12,
            borderRadius: 4,
          }}
        >
          Form submitted.
        </div>
      )}

      {/* No fieldset/legend — flat structure */}
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="First name"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Last name"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Email"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <select
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          defaultValue=""
        >
          <option value="" disabled>
            Language
          </option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 4, color: '#555' }}>Newsletter</div>
        {['Daily', 'Weekly', 'Monthly'].map((freq) => (
          <span key={freq} style={{ marginRight: 12 }}>
            <input type="radio" name="newsletter" value={freq.toLowerCase()} /> {freq}
          </span>
        ))}
      </div>

      {/* Country as 10 radio buttons — no fieldset/legend */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 4, color: '#555' }}>Country</div>
        {COUNTRIES.map((country) => (
          <div key={country} style={{ marginBottom: 4 }}>
            <input
              type="radio"
              name="country"
              value={country}
              checked={selectedCountry === country}
              onChange={(e) => setSelectedCountry(e.target.value)}
            />{' '}
            {country}
          </div>
        ))}
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          padding: '10px 24px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 15,
        }}
      >
        Submit
      </button>
    </div>
  );
}
