import React, { Suspense, useCallback, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';

import JobTile from 'shared/JobTile.jsx';
import Modal from 'shared/Modal.jsx';
import OButton from 'oasisui/OButton.jsx';
import OFakeLink from 'oasisui/OFakeLink.jsx';
import Spinner from 'shared/Spinner.jsx';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chart from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

import ReviewTile from 'Review/ReviewTile.jsx';
import { maskSetState, post } from 'utils.js';

import 'Company/Company.css';

function Company({ companyId }) {
  return (
    <main className="company__container">
      <div />
      <Suspense fallback={<Spinner size={75} centre={true} />}>
        <CompanyContent companyId={parseInt(companyId)} />
      </Suspense>
    </main>
  );
}
Company.propTypes = {
  companyId: PropTypes.string.isRequired
};

function getProgramStats(reviews) {
  let programCount = {
    'AHS': 0,
    'ART': 0,
    'ENG': 0,
    'ENV': 0,
    'MATH': 0,
    'SCI': 0
  };
  let i = 0;
  for (i = 0; i < reviews.length; ++i) {
    programCount[reviews[i].faculty] += 1;
  }
  // TODO Change background colours to faculty colours
  let results = {
    labels:['AHS', 'ART', 'ENG', 'ENV', 'MATH', 'SCI'],
    datasets: [{
      label: "Faculties",
      backgroundColor: [
        'rgb(35,88,98)',
        'rgb(202,75,33)',
        'rgb(78,26,134)',
        'rgb(100,111,31)',
        'rgb(182,41,118)',
        'rgb(0,58,183)'
      ],
      data:[
            programCount['AHS'],
            programCount['ART'],
            programCount['ENG'],
            programCount['ENV'],
            programCount['MATH'],
            programCount['SCI']
          ],
      }]
  };
  return results;
}

function getTermStats(reviews) {
  let termCount = {
    '1A' : 0,
    '1B' : 0,
    '2A' : 0,
    '2B' : 0,
    '3A' : 0,
    '3B' : 0,
    '4A' : 0,
    '4B' : 0
  };
  let i = 0;
  for (i = 0; i < reviews.length; ++i) {
    termCount[reviews[i].term] += 1;
  }
  let results = {
    labels:['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'],
    datasets: [{
              label: "School Terms",
              backgroundColor: [
                '#32a628',
                '#65b800',
                '#a17c2c',
                '#a36f0f',
                '#39aba9',
                '#2f9aad',
                '#b03751',
                '#b31722'
              ],
              data:[
                    termCount['1A'],
                    termCount['1B'],
                    termCount['2A'],
                    termCount['2B'],
                    termCount['3A'],
                    termCount['3B'],
                    termCount['4A'],
                    termCount['4B']
                  ],
              }]

  };
  return results;
}

function getAppStats(reviews) {
  let appCount = {
    'Jobmine/WaterlooWorks' : 0,
    'Referral' : 0,
    'External Job Board' : 0,
    'Job Fair' : 0,
    'Company Website' : 0,
    'Cold Email' : 0,
    'Other' : 0
  };
  let i = 0;
  for (i = 0; i < reviews.length; ++i) {
    appCount[reviews[i].app_source] += 1;
  }
  // TODO Change background colours to faculty colours
  let results = {
    labels:[
      'Jobmine/WaterlooWorks',
      'Referral',
      'External Job Board',
      'Job Fair',
      'Company Website',
      'Cold Email',
      'Other'
    ],
    datasets: [{
              label: "Application Sources",
              backgroundColor: [
                '#65b800',
                '#baac6d',
                '#bf5900',
                '#c20154',
                '#c11ac4',
                '#692ac9',
                '#0e14cc'
              ],
              data:[
                    appCount['Jobmine/WaterlooWorks'],
                    appCount['Referral'],
                    appCount['External Job Board'],
                    appCount['Job Fair'],
                    appCount['Company Website'],
                    appCount['Cold Email'],
                    appCount['Other']
                  ],
              }]

  };
  return results;
}

function getConversionStats(reviews) {
  let stateCount = {
    'Rejected' : 0,
    'Interviewed No Offer' : 0,
    'Offer Not Accepted' : 0,
    'Interned At Company' : 0
  };
  let i = 0;

  for (i = 0; i < reviews.length; ++i ) {
    if (reviews[i].interview_state == 2 || reviews[i].interview_state == 3) {
      stateCount['Rejected'] += 1;
    } else {

      if (reviews[i].internship_state == 3) {
        stateCount['Interviewed No Offer'] += 1;
      } else if (reviews[i].internship_state == 2) {
        stateCount['Offer Not Accepted'] += 1;
      } else if (reviews[i].internship_state == 1) {
        stateCount['Interned At Company'] += 1;
      }
    }
  }

  let results = {
    labels:[
      'Rejected',
      'Interviewed No Offer',
      'Offer Not Accepted',
      'Interned At Company'
    ],
    datasets: [{
              label: "Application Sources",
              backgroundColor: [
                '#ff0048',
                '#ffe343',
                '#ff8c00',
                '#10ad0e'
              ],
              data:[
                  stateCount['Rejected'],
                  stateCount['Interviewed No Offer'],
                  stateCount['Offer Not Accepted'],
                  stateCount['Interned At Company']
                ]
              }]

  };
  return results;
}

function getSalaries(reviews) {
  let i = 0;
  let count = 0;
  let sum = 0;
  for (i = 0; i < reviews.length; ++i ) {
    if (reviews[i].interview_state == 1
        && reviews[i].internship_state == 1
        && reviews[i].monthly_salary != 0) {
      count += 1;
      sum += reviews[i].monthly_salary;
    }
  }

  if (count <= 0) {
    return 0;
  }

  return Math.round(sum/count);
}

function CompanyContent({ companyId }) {
  const companyList = useFetch(`/api/company/${companyId}`);
  const reviews = useFetch(`/api/reviews/${companyId}`);
  const isFollowing = useFetch(`/api/follow/${companyId}`);

  if (!companyList || !reviews) {
    return <Spinner size={75} centre={true} />;
  }

  const company = companyList[0];

  const programStats = getProgramStats(reviews);
  const termStats = getTermStats(reviews);
  const appSourceStats = getAppStats(reviews);
  const conversionStats = getConversionStats(reviews);
  const salary = getSalaries(reviews);

  const [following, setFollowing] = useState(isFollowing.length > 0);
  const [hovering, setHovering] = useState(false);

  const toggleFollowing = useCallback(async () => {
      try {
        setFollowing(old => {
          post(`/follow/${companyId}`, { value: !old });
          return !old;
        });
      } catch (e) {
        // TODO: better handling. for now toggle it back since we failed
        setFollowing(old => !old);
      }
    });
    const toggleHover = useCallback(e => {
      if (e.type === 'mouseenter') {
        setHovering(true);
      }
      if (e.type === 'mouseleave') {
        setHovering(false);
      }
    });

  return (
    <>
      <div className="company__content">
        <h3 className="company__companyname">{company.name}</h3>
        <div className="company__rating">
          <MemoedRatingStars rating={company.totalRating/company.numRatings} />
          <span>{company.numRatings}</span>
        </div>
        { (salary > 0)
          ? (
              <h4 className="company__salary">
                {`Average Salary: `}
                <span className="company__salaryvalue">
                  {`$${salary}/month`}
                </span>
              </h4>
            )
          : (<> </>)
        }

        <div className="company__follow">
          {following ? (
            <OButton
              alt={true}
              text={hovering ? 'Unfollow' : 'Following'}
              onClick={toggleFollowing}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
            />
          ) : (
            <OButton text="Follow" onClick={toggleFollowing} />
          )}
        </div>

        <div className="company__modalcontainer">
          <h4 className="company__modalheader">Statistics</h4>
           <div className="company__statistics">
            <div className="company__row">
              <div id="chart-display" className="company__chart">
                <h4 className="company__header">Program Statistics</h4>
                <Doughnut
                  data={programStats}
                />
              </div>
              <div id="chart-display" className="company__chart">
                <h4 className="company__header">School Term Statistics</h4>
                <Doughnut
                  data={termStats}
                />
              </div>
            </div>
            <div className="company__row">
              <div id="chart-display" className="company__chart">
                <h4 className="company__header">Application Source Statistics</h4>
                <Doughnut
                  data={appSourceStats}
                />
              </div>
              <div id="chart-display" className="company__chart">
                <h4 className="company__header">Conversion Statistics</h4>
                <Doughnut
                  data={conversionStats}
                />
              </div>
            </div>
           </div>
        </div>
        <div className="company__modalcontainer">
          <h4 className="company__modalheader">Reviews</h4>
          {
            reviews.map(review => (
              <ReviewTile review={review} doRedirect={false} />
            ))
          }
        </div>
      </div>
    </>
  );
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

function RatingStars({ rating }) {
  const inds = [0, 1, 2, 3, 4];
  return (
    <span className="reviewtile__stars">
      {inds.map(i => (
        <img
          key={i}
          className="reviewtile__star"
          src={`/svg/star-${ratingRange(i, rating)}.svg`}
        />
      ))}
    </span>
  );
}
RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};
const MemoedRatingStars = memo(RatingStars);

export default Company;
