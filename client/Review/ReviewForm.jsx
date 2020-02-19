import React, { memo } from 'react';
import useFetch from 'fetch-suspense';
import { Link, navigate } from '@reach/router';

import 'Home/Trending.css';
import 'Job/Job.css';

import OButton from 'oasisui/OButton.jsx';
import ODropdown from 'oasisui/ODropdown.jsx';
import OCombobox from 'oasisui/OCombobox.jsx';
import OTextarea from 'oasisui/OTextarea.jsx';

import 'Home/MyReviews.css';

function ReviewForm() {
  //const myreviews = useFetch('api/myreviews');

  const studyterms = [
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

  const years = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
  ];

  // TODO: fix this
  return (
    <>
      <div className="reviewform__container">
        <p className="reviewform__header">How was your experience?</p>
        <p className="reviewform__prompt">Company Name</p>
        <ODropdown prompt="Company Name" identifier="companyInput" />
        <p className="reviewform__prompt">Term Information</p>
        <div className="reviewform__flexbox">
          <OCombobox prompt="Season" identifier="seasonInput"/>
          <OCombobox prompt="Year" identifier="yearInput"/>
          <OCombobox prompt="Study Term" identifier="termInput"/>
        </div>
        <p className="reviewform__prompt">Recruitment Experience</p>
        <OTextarea
          rowsMin={4}
          prompt="Tell us about your recruitment experience"
          identifier="recruitmentExperienceInput"
        />
        <p className="reviewform__prompt">Interview Experience</p>
        <>
        <p className="reviewform__prompt">Term</p>
        <p className="reviewform__prompt">Term</p>
      </div>
      <div className="trending__overlay" />
    </>
  );
}

export default ReviewForm;
