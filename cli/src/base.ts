import Command from '@oclif/command';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as jsYaml from 'js-yaml';
import * as loadYamlFile from 'load-yaml-file';
import * as path from 'path';

import { IConfig } from './global';

export default abstract class extends Command {
  userConfig = {
    jira: {
      username: 'username',
      password: 'password',
      host: 'https://jira.myhost.org',
      fields: {
        points: 'customfield_10114',
        originalPoints: 'customfield_11115',
        parentInitiative: 'customfield_11112',
        parentEpic: 'customfield_10314',
      },
      excludeDays: ['1900-01-01'],
    },
    teams: [
      {
        name: 'Team 1',
        jqlCompletion:
          'Insert a JQL query to be used to record past completion',
        jqlRemaining:
          'Insert a JQL query to collect a list of tickets to be completed',
        jqlHistory: '2019-07-01',
        excludeDays: ['1900-01-01'],
        initiativeEffortPrct: 60,
        slack: {
          token: '',
          channel: '',
          explanation: '',
        },
      },
      {
        name: 'Team 2',
        jqlCompletion:
          'Insert a JQL query to be used to record past completion',
        jqlRemaining:
          'Insert a JQL query to collect a list of tickets to be completed',
        jqlHistory: '2019-07-01',
        excludeDays: ['1900-01-01'],
        initiativeEffortPrct: 40,
        slack: {
          token: '',
          channel: '',
          explanation: '',
        },
      },
    ],
    roadmap: {
      jqlInitiatives: 'type = initiative',
      forecastWeeks: 26,
      teams: ['Team 1, Team 2'],
    },
  };

  setUserConfig(userConfig: IConfig) {
    this.userConfig = userConfig;
  }

  async init() {
    if (process.env.CONFIG_DIR !== undefined) {
      this.config.configDir = process.env.CONFIG_DIR;
    }
    // If config file does not exists, initialize it:
    fse.ensureDirSync(this.config.configDir);
    fse.ensureDirSync(this.config.configDir + '/cache/');

    // eslint-disable-next-line no-negated-condition
    if (!fs.existsSync(path.join(this.config.configDir, 'config.yml'))) {
      fs.writeFileSync(
        path.join(this.config.configDir, 'config.yml'),
        jsYaml.safeDump(this.userConfig),
      );
      this.log(
        'Initialized configuration file with defaults in: ' +
          path.join(this.config.configDir, 'config.yml'),
      );
      this.log('Please EDIT the configuration file first');
      this.exit();
    } else {
      this.log(
        'Configuration file exists: ' +
          path.join(this.config.configDir, 'config.yml'),
      );

      const userConfig = await loadYamlFile(
        path.join(this.config.configDir, 'config.yml'),
      );
      this.setUserConfig(userConfig);
    }
  }
}
