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

function Job({ jobCode }) {
  return (
    <main className="job__container">
      <div />
      <Suspense fallback={<Spinner size={75} centre={true} />}>
        <JobContent shortCode={jobCode} />
      </Suspense>
    </main>
  );
}
Job.propTypes = {
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

const interviewStatus = 'Interview selections complete';
const statusStates = [
  'Applications available',
  'Coding challenge out',
  'Applications closed',
  interviewStatus,
  'Rankings out',
  'Host matching',
  'Host matching complete',
  'Applications cancelled',
];
const interviewRounds = [1, 2, 3];

function StatusForm({ jobId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus.string);
  const [round, setRound] = useState(currentStatus.round);
  const statuses = useMemo(() => {
    const start = statusStates.indexOf(currentStatus.string);
    if (start === -1) {
      return statusStates;
    }
    return statusStates.slice(start);
  }, [currentStatus.string]);

  const rounds = useMemo(() => {
    return interviewRounds.slice(currentStatus.round - 1);
  }, [currentStatus.round]);

  const onStatusChange = useCallback(e => {
    setStatus(e.target.value);
  }, []);

  const onRoundChange = useCallback(e => {
    setRound(Number(e.target.value));
  }, []);

  const onSubmit = useCallback(() => {
    post('/updatestatus', {
      jobId,
      status,
      round: status === interviewStatus ? round : 1,
    });
    window.location.reload();
  }, [jobId, status, round]);

  return (
    <div className="job__modal">
      <h3 className="job__modalheader">Update the status of this job</h3>
      <div className="job__statuspicker">
        <select
          className="job__statusselect"
          value={status}
          onChange={onStatusChange}
        >
          {statuses.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {status === interviewStatus ? (
          <span>
            Round
            <select
              className="job__roundpicker"
              value={round}
              onChange={onRoundChange}
            >
              {rounds.map(r => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </span>
        ) : null}
      </div>
      <OButton text="Submit" onClick={onSubmit} />
    </div>
  );
}
StatusForm.propTypes = {
  jobId: PropTypes.number.isRequired,
  currentStatus: PropTypes.shape({
    string: PropTypes.string.isRequired,
    round: PropTypes.number.isRequired,
  }).isRequired,
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

function RateForm({ jobId, currentRating }) {
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

  const onSubmit = useCallback(() => {
    post('/ratejob', { jobId, rating });
    window.location.reload();
  }, [rating]);

  return (
    <div className="job__modal">
      <h3 className="job__modalheader">Rate this job</h3>
      <span className="job__stars">
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
      <OButton text="Submit" onClick={onSubmit} />
    </div>
  );
}
RateForm.propTypes = {
  jobId: PropTypes.number.isRequired,
  currentRating: PropTypes.number.isRequired,
};

export default Job;
