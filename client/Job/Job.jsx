import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';

// import Comment from 'shared/Comment.jsx';
import CommentSection from 'Job/CommentSection.jsx';
import JobTile from 'shared/JobTile.jsx';
import OButton from 'oasisui/OButton.jsx';
import OFakeLink from 'oasisui/OFakeLink.jsx';
import Spinner from 'shared/Spinner.jsx';

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
          <OButton text="Follow" />
          <OButton text="Contribute info" />
          <OButton text="Comment" />
          <OButton text="Rate this job" />
        </section>
        <section className="job__info">
          <header className="job__infotabs">
            <OFakeLink
              onClick={setInfoTab.bind(null, 0)}
              medium={true}
              text="Description"
              isInactive={infoTab !== 0}
            />
            <OFakeLink
              onClick={setInfoTab.bind(null, 1)}
              medium={true}
              text="More Info"
              isInactive={infoTab !== 1}
            />
            <OFakeLink
              onClick={setInfoTab.bind(null, 2)}
              medium={true}
              text="Benefits"
              isInactive={infoTab !== 2}
            />
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
              onClick={setCommentTab.bind(null, 0)}
              text="Discussion"
              large={true}
              isInactive={commentTab !== 0}
            />
            <OFakeLink
              onClick={setCommentTab.bind(null, 1)}
              text="Reviews"
              large={true}
              isInactive={commentTab !== 1}
            />
          </header>
          <div className="job__bottomcontent">
            <TabSwitch tab={commentTab}>
              <CommentSection jobCode={shortCode} />
              <>reviews</>
            </TabSwitch>
          </div>
          {/*   {job.comments.map((comment, i) => ( */}
          {/*     <Comment */}
          {/*       key={comment.id} */}
          {/*       comment={comment} */}
          {/*       last={i === job.comments.length - 1} */}
          {/*     /> */}
          {/*   ))} */}
        </section>
      </div>
      <OButton alt={true} text="Update" />
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

export default Job;
