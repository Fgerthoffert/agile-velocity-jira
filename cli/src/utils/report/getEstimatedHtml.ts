import { getMissingPoints } from '../report/getMissingPoints';

export const getEstimatedHtml = (initiativeIssue: any, userConfig: any) => {
  const missingPoints = getMissingPoints(initiativeIssue);
  let missingPointsMsg = '';
  if (missingPoints.length > 0) {
    missingPointsMsg = ` (<a href="${encodeURI(
      `${userConfig.jira.host}/issues/?jql=key in (${missingPoints.join()})`,
    )}">${
      initiativeIssue.metrics.points.missing
    } miss.</a>)`;
  }
  const totalIssues = initiativeIssue.metrics.issues.total;
  const pointMissing = initiativeIssue.metrics.points.missing;

  const estimated = Math.round(
    ((totalIssues - pointMissing) * 100) / totalIssues,
  );
  if (estimated < 50) return `🔴 ${estimated}% ${missingPointsMsg}`;
  if (estimated > 80) return `🟢 ${estimated}% ${missingPointsMsg}`;
  return `🟠 ${estimated}% ${missingPointsMsg}`;
};
