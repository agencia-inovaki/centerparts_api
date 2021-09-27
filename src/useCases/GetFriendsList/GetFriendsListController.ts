import { Response, Request } from 'express';
import { GetFriendsListUseCase } from './GetFriendsListUseCase';

export class GetFriendsListController {
  constructor(private getFriendsListUseCase: GetFriendsListUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    try {
      const friendsList = await this.getFriendsListUseCase.execute({ userId });

      return response.status(200).json(friendsList);
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
