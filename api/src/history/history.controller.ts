import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get('/:teamId/:initiativeKey')
  async getHistory(@Param() params) {
    const history = await this.historyService.getHistory(
      params.teamId,
      params.initiativeKey,
    );
    return history;
  }
}
