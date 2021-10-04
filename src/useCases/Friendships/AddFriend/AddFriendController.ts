import { Response, Request } from 'express';
import { AddFriendUseCase } from './AddFriendUseCase';

export class AddFriendController {
  constructor(private addFriendUseCase: AddFriendUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { senderId, receiverId } = request.body;

    try {
      await this.addFriendUseCase.execute({ senderId, receiverId });

      return response.status(200).json({ message: 'Your request was sent!' });
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
