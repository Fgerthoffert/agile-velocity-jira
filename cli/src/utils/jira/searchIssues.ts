import axios from 'axios';

import { UserConfigJira } from '../../global';

const jiraSearchIssues = async (
  jiraConfig: UserConfigJira,
  jqlQuery: string,
  field: string,
) => {
  const response = await axios({
    method: 'get',
    url: jiraConfig.host + '/rest/api/2/search',
    auth: {
      username: jiraConfig.username,
      password: jiraConfig.password,
    },
    params: {
      jql: jqlQuery,
      startAt: 0,
      maxResults: 1500,
      fields: field,
    },
  });
  if (response.data.issues.length > 0) {
    return response.data.issues;
  }
  return [];
};

export default jiraSearchIssues;
