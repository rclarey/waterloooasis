import React, { memo, useState, useCallback } from 'react';
import useFetch from 'fetch-suspense';
import { Link, navigate } from '@reach/router';
import { post } from 'utils.js';

import 'Home/Trending.css';
import 'Job/Job.css';

import OButton from 'oasisui/OButton.jsx';
import ODropdown from 'oasisui/ODropdown.jsx';
import OCombobox from 'oasisui/OCombobox.jsx';
import OTextarea from 'oasisui/OTextarea.jsx';
import OTextField from 'oasisui/OTextField.jsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import 'Home/MyReviews.css';

function ratingRange(pos, rating) {
  const n = rating - pos;
  if (n <= 0.12) {
    return 0;
  }
  if (n <= 0.37) {
    return 1;
  }
  if (n <= 0.62) {
    return 2;
  }
  if (n <= 0.87) {
    return 3;
  }

  return 4;
}

function ReviewForm() {

  let companies = [];

  fetch('api/company')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach(d => {
        companies.push(d["name"]);
      });

    });

  const [error, setError] = useState('Thank you for writing a review!');

  const studyTerms = [
    '1A',
    '1B',
    '2A',
    '2B',
    '3A',
    '3B',
    '4A',
    '4B',
  ];

  const seasons = [
    'Winter',
    'Summer',
    'Fall'
  ];

  const faculties = [
    'AHS',
    'ART',
    'ENG',
    'ENV',
    'MATH',
    'SCI',
  ];

  const applicationSources = [
    'Jobmine/WaterlooWorks',
    'Referral',
    'External Job Board',
    'Job Fair',
    'Company Website',
    'Cold Email',
    'Other',
  ];

  // TODO: fix this later maybe
  const years = [
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
  ];

  const interviewOptions = [
    {value: "1", label:"Offered an interview"},
    {value: "2", label:"Not offered an interview"},
    {value: "3", label:"Not contacted by recruiter"},
  ];

  const internshipOptions = [
    {value: "1", label:"Offered and accepted an internship"},
    {value: "2", label:"Offered an internship but did not accept it"},
    {value: "3", label:"Not offered an internship"},
  ];

  const [interviewState, setInterviewState] = useState('3');
  const [internshipState, setInternshipState] = useState('3');

  const interviewHandleChange = event => {
    setInterviewState(event.target.value);
  };

  const internshipHandleChange = event => {
    setInternshipState(event.target.value);
  };

  const currentRating = -1;
  const inds = [0, 1, 2, 3, 4];
  const [rating, setRating] = useState(currentRating);
  const [displayRating, setDisplayRating] = useState(currentRating);

  const onHover = useCallback(ind => {
    setDisplayRating(ind);
  }, []);
  const onMouseLeave = useCallback(() => onHover(rating), [rating]);

  const onClick = useCallback(ind => {
    setDisplayRating(ind);
    setRating(ind);
  }, []);

  const submitForm = async event => {
    try {
      setError('Submitting form');
      const body = {
         faculty: document.getElementById('facultyInput') ? document.getElementById('facultyInput').value : "",
         term: document.getElementById('termInput') ? document.getElementById('termInput').value : "",
         appSource: document.getElementById('appSourceInput') ? document.getElementById('appSourceInput').value : "",
         company: document.getElementById('companyInput') ? document.getElementById('companyInput').value : "",
         position: document.getElementById('positionInput') ? document.getElementById('positionInput').value : "",
         city: document.getElementById('cityInput') ? document.getElementById('cityInput').value : "",
         season: document.getElementById('seasonInput') ? document.getElementById('seasonInput').value : "",
         year: document.getElementById('yearInput') ? document.getElementById('yearInput').value : "",
         recruitmentExperience: document.getElementById('recruitmentExperienceInput') ? document.getElementById('recruitmentExperienceInput').value : "",
         interviewState: interviewState,
         interviewExperience: document.getElementById('interviewExperienceInput') ? document.getElementById('interviewExperienceInput').value : "",
         internshipState: internshipState,
         internshipExperience: document.getElementById('internshipExperienceInput') ? document.getElementById('internshipExperienceInput').value : "",
         rating: rating,
         salary: document.getElementById('salaryInput') ? document.getElementById('salaryInput').value : "0",
         rejectInternshipExperience: document.getElementById('rejectInternshipInput') ? document.getElementById('rejectInternshipInput').value : ""
       };
      await post('/review', body);
      window.location.pathname = '/myreviews';
    } catch (error) {
      if (error.reason) {
        setError(error.reason);
      } else {
        setError('Something went wrong. Please try again later');
      }
    }
  };

  // TODO: fix this
  return (
    <>
      <div className="reviewform__container">
        <p className="reviewform__header">How was your experience?</p>
        <p className="reviewform__prompt">About You</p>
        <OCombobox prompt="Faculty" identifier="facultyInput" options={faculties}/>
        <OCombobox prompt="Term Before Internship" identifier="termInput" options={studyTerms}/>
        <OCombobox prompt="Application Method" identifier="appSourceInput" options={applicationSources}/>
        <p className="reviewform__prompt">Position Information</p>
        <ODropdown prompt="Company Name" identifier="companyInput" options={companies} />
        <OTextField prompt="Position" identifier="positionInput" />
        <OTextField prompt="City" identifier="cityInput" />
        <div className="reviewform__flexbox">
          <OCombobox prompt="Season" identifier="seasonInput" options={seasons}/>
          <OCombobox prompt="Year" identifier="yearInput" options={years}/>
        </div>
        <p className="reviewform__prompt">Recruitment Experience</p>
        <OTextarea
          rowsMin={4}
          prompt="Tell us about your recruitment experience"
          identifier="recruitmentExperienceInput"
          maxLength={512}
        />
        <p className="reviewform__prompt">Interview Experience</p>
        <FormControl component="fieldset">
          <RadioGroup name="interviewStateGroup" onChange={interviewHandleChange}>
            {interviewOptions.map(option => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio color="primary" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <div className="reviewform__section">
          <Collapse in={interviewState == "1"}>
            <OTextarea
              rowsMin={4}
              prompt="Tell us about your interview (e.g. number of rounds, types of interviews, etc.)"
              identifier="interviewExperienceInput"
              maxLength={512}
            />
            <p className="reviewform__prompt">Internship Experience</p>
            <RadioGroup name="internshipStateGroup" onChange={internshipHandleChange}>
              {internshipOptions.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio color="primary" />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            <div className="reviewform__section">
              <Collapse in={internshipState == "1"}>
                <OTextarea
                  rowsMin={4}
                  prompt="Tell us about your internship (e.g. your responsibilities, intern events, etc.)"
                  identifier="internshipExperienceInput"
                  maxLength={512}
                />
                <OTextField prompt="Monthly Salary (CAD)" identifier="salaryInput" />
              </Collapse>
              <Collapse in={internshipState == "2"}>
                <OTextarea
                  rowsMin={4}
                  prompt="Are there any particular reasons why you turned down the offer?"
                  identifier="rejectInternshipInput"
                  maxLength={512}
                />
              </Collapse>
            </div>
          </Collapse>
        </div>
        <p className="reviewform__prompt">Overall Experience</p>
        <div>
          <span>
            {inds.map(i => (
              <img
                key={i}
                className="job__star"
                src={`/svg/star-${ratingRange(i, displayRating)}.svg`}
                onMouseEnter={onHover.bind(null, i + 1)}
                onMouseLeave={onMouseLeave}
                onClick={onClick.bind(null, i + 1)}
              />
            ))}
          </span>
        </div>
        <div className="reviewform__section">
          <p>{error}</p>
          <OButton text="Submit" onClick={submitForm}/>
        </div>
      </div>
      <div className="trending__overlay" />
    </>
  );
}

export default ReviewForm;
