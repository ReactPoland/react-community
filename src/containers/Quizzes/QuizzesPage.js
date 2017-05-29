import React from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import NavItem from 'react-bootstrap/lib/NavItem';
import TutorialsThumbnails from '../TutorialsPage/TutorialsPage/TutorialsThumbnails';

const QuizzesPage = ({ list, onSelectQuiz, finishTests }) => (
  <TutorialsThumbnails
    list={list}
    onSelect={onSelectQuiz}
    finishTests={finishTests} />
);

export default QuizzesPage;

// export default function QuizzesPage({ list, onSelectQuiz, finishTests }) {
//   if (!( list && list.length )) {
//     return (
//       <div className="container">Items not available</div>
//     );
//   }
//
//   return (
//     <div className="container">
//       {list.map((item, key) => {
//         const lastResult = finishTests[item.id];
//         let results = null;
//
//         if (lastResult) {
//           results = `Finish at ${lastResult.finishTime}. Percent:${lastResult.correctPercent}.`;
//         }
//
//         return (
//           <LinkContainer onClick={onSelectQuiz(item.id)} to={`quizzes/${item.id}`} key={key} >
//             <NavItem>
//               {item.title} <br />
//               {results}
//             </NavItem>
//           </LinkContainer>
//         );
//       })}
//     </div>
//   );
// }
