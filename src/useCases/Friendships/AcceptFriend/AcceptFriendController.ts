import { Response, Request } from 'express';
import { AcceptFriendUseCase } from './AcceptFriendUseCase';

export class AcceptFriendController {
  constructor(private acceptFriendUseCase: AcceptFriendUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const requestId = +request.params.requestId;

    try {
      await this.acceptFriendUseCase.execute({ requestId });

      return response.status(200).json({ message: 'User accepted.' });
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
