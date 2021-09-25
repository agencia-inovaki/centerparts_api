import { RemoveFriendUseCase } from './RemoveFriendUseCase';
import { Response, Request } from 'express';

export class RemoveFriendController {
  constructor(private removeFriendUseCase: RemoveFriendUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;
    const { friendId } = request.params;

    try {
      await this.removeFriendUseCase.execute({ userId, friendId });

      return response.status(200).send();
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
