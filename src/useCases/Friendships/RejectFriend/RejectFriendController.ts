import { Response, Request } from 'express';
import { RejectFriendUseCase } from './RejectFriendUseCase';

export class RejectFriendController {
  constructor(private rejectFriendUseCase: RejectFriendUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const requestId = request.params.requestId;

    try {
      await this.rejectFriendUseCase.execute({ requestId });

      return response.status(200).json({ message: 'User rejected.' });
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
