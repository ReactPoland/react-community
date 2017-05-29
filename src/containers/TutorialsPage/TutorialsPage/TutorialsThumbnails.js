import React from 'react';
import { Link } from 'react-router';
// LAYOUT
import Col from 'react-bootstrap/lib/Col';
import Paper from 'material-ui/Paper';
import ActionTrackChanges from 'material-ui/svg-icons/action/track-changes';
import styles from './TutorialsPage.scss';

export default function TutorialsThumbnails({
  list,
  onSelect,
  finishTests,
  linkGenerator = () => '#'
}) {
  if (!( list && list.length )) {
    return (
      <div className="container">Items not available</div>
    );
  }

  return (
    <div className="container">
      {list.map((item, key) => {
        let results = null;
        if (finishTests) {
          const lastResult = finishTests[item.id];

          if (lastResult) {
            const finishDate = new Date(lastResult.finishTime);
            const finishTime = `${finishDate.getHours()}:${finishDate.getMinutes()}`;
            results = `Finish at ${finishTime}. Percent: ${lastResult.correctPercent * 100}%.`;
          }
        }

        return (
          <Col md={6} key={key}>
            <Link onClick={onSelect(item.id)} to={linkGenerator(item.id)}>
              <Paper zDepth={1} className={styles['TutorialsPage-card']}>
                <ActionTrackChanges style={{ width: '15rem', height: '15rem' }} />
                <h3 className={styles['TutorialsPage-card-title']}>{item.title}</h3>
                {results}
              </Paper>
            </Link>
          </Col>
        );
      })}
    </div>
  );
}
