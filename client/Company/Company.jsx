import React, { Suspense, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';

import CommentSection from 'Job/CommentSection.jsx';
import JobTile from 'shared/JobTile.jsx';
import Modal from 'shared/Modal.jsx';
import OButton from 'oasisui/OButton.jsx';
import OFakeLink from 'oasisui/OFakeLink.jsx';
import Spinner from 'shared/Spinner.jsx';
import { maskSetState, post } from 'utils.js';

import 'Job/Job.css';

function Company({ companyId }) {
  return (
    <main className="company__container">
      <div />
      <Suspense fallback={<Spinner size={75} centre={true} />}>
        <JobContent shortCode={jobCode} />
      </Suspense>
    </main>
  );
}
Company.propTypes = {
  companyId: PropTypes.number.isRequired
};

function CompanyContent({ companyId }) {
  const company = useFetch(`/api/company/${companyId}`);

  if (!company) {
    return <Spinner size={75} centre={true} />;
  }

  return (<> </>);

}
CompanyContent.propTypes = {
  companyId: PropTypes.number.isRequired,
};

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

export default Company;
