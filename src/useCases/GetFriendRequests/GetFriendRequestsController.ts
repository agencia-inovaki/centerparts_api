import { Response, Request } from 'express';
import { GetFriendRequestsUseCase } from './GetFriendRequestsUseCase';

export class GetFriendRequestsController {
  constructor(private getFriendRequestsUseCase: GetFriendRequestsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.params.id;

    try {
      const friendRequestsList = await this.getFriendRequestsUseCase.execute({
        userId,
      });

      return response.status(200).json({ friendRequestsList });
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
