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

function Company({ CompanyCode }) {
  return (
    <main className="job__container">
      <div />
      <Suspense fallback={<Spinner size={75} centre={true} />}>
        <JobContent shortCode={jobCode} />
      </Suspense>
    </main>
  );
}
Company.propTypes = {
  jobCode: PropTypes.string.isRequired,
};

function JobContent({ shortCode }) {
  const job = useFetch(`/api/jobs/${shortCode}`);
  if (!job) {
    return <Spinner size={75} centre={true} />;
  }

  const [infoTab, setInfoTab] = useState(0);
  const [commentTab, setCommentTab] = useState(0);
  const [following, setFollowing] = useState(job.following);
  const [hovering, setHovering] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);

  const toggleFollowing = useCallback(async () => {
    try {
      setFollowing(old => {
        post('/follow', { value: !old, jobId: job.id });
        return !old;
      });
    } catch (e) {
      // TODO: better handling. for now toggle it back since we failed
      setFollowing(old => !old);
    }
  }, [job.id]);
  const toggleHover = useCallback(e => {
    if (e.type === 'mouseenter') {
      setHovering(true);
    }
    if (e.type === 'mouseleave') {
      setHovering(false);
    }
  }, []);

  return (
    <>
      <div className="job__content">
        <section className="job__tile">
          <img
            className="job__logo"
            width="100px"
            height="100px"
            alt={`${job.company.name} logo`}
            src={`/img/${job.company.shortName}_logo.png`}
          />
          <JobTile job={job} big={true} />
        </section>
        <section className="job__buttons">
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
          <OButton
            text="Update status"
            onClick={maskSetState.bind(null, setStatusOpen, true)}
          />
          <OButton
            text="Rate this job"
            onClick={maskSetState.bind(null, setRateOpen, true)}
          />
        </section>
        <section className="job__info">
          <header className="job__infotabs">
            <OFakeLink
              onClick={maskSetState.bind(null, setInfoTab, 0)}
              medium={true}
              text="Description"
              isInactive={infoTab !== 0}
            />
            {/* <OFakeLink */}
            {/*   onClick={maskSetState.bind(null, setInfoTab, 1)} */}
            {/*   medium={true} */}
            {/*   text="More Info" */}
            {/*   isInactive={infoTab !== 1} */}
            {/* /> */}
            {/* <OFakeLink */}
            {/*   onClick={maskSetState.bind(null, setInfoTab, 2)} */}
            {/*   medium={true} */}
            {/*   text="Benefits" */}
            {/*   isInactive={infoTab !== 2} */}
            {/* /> */}
          </header>
          <div className="job__infocontent">
            <TabSwitch tab={infoTab}>
              <>
                {job.description.split('\n').map((p, i) => (
                  <p key={`desc${i}`}>{p}</p>
                ))}
              </>
              <>info info info</>
              <>benefits info</>
            </TabSwitch>
          </div>
        </section>
        <div className="job__divider" />
        <section className="job__commentsection">
          <header className="job__commenttabs">
            <OFakeLink
              onClick={maskSetState.bind(null, setCommentTab, 0)}
              text="Discussion"
              large={true}
              isInactive={commentTab !== 0}
            />
            {/* <OFakeLink */}
            {/*   onClick={maskSetState.bind(null, setCommentTab, 1)} */}
            {/*   text="Reviews" */}
            {/*   large={true} */}
            {/*   isInactive={commentTab !== 1} */}
            {/* /> */}
          </header>
          <div className="job__bottomcontent">
            <TabSwitch tab={commentTab}>
              <Suspense fallback={<Spinner size={75} centre={true} />}>
                <CommentSection jobId={job.id} companyId={job.company.id} />
              </Suspense>
              <>reviews</>
            </TabSwitch>
          </div>
        </section>
      </div>
      {statusOpen ? (
        <Modal close={maskSetState.bind(null, setStatusOpen, false)}>
          <StatusForm jobId={job.id} currentStatus={job.status} />
        </Modal>
      ) : rateOpen ? (
        <Modal close={maskSetState.bind(null, setRateOpen, false)}>
          <RateForm jobId={job.id} currentRating={job.rating} />
        </Modal>
      ) : null}
    </>
  );
}
JobContent.propTypes = {
  shortCode: PropTypes.string.isRequired,
};

function TabSwitch({ tab, children }) {
  return children[tab];
}
TabSwitch.propTypes = {
  tab: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.node.isRequired).isRequired,
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
