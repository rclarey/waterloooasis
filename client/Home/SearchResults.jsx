import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';
import { useParams } from '@reach/router';

function SearchResults({ query }) {
  const results = useFetch(`/api/search/${query}`);
  console.log(results);

  return (
    <>
      {/* {results.map(result => (
        <div>{result}</div>
      ))} */}
    </>
  );

  // const results = useFetch(`/api/search?queryString=${query}`);
  // const processedResults = results.map(result => result._source);

  // return (
  //   <div>
  //     {processedResults.map(job => (
  //       <Link
  //         to={`/jobs/${job.company.shortName}/${job.shortCode}`}
  //         key={job.id}
  //       >
  //         <JobTile job={job} />
  //       </Link>
  //     ))}
  //     <div className="trending__overlay" />
  //   </div>
  // );
  }
SearchResults.propTypes = {
  query: PropTypes.string,
};

export default memo(SearchResults);