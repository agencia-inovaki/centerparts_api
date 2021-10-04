import { GetUserUseCase } from './GetUserUseCase';
import { Request, Response } from 'express';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    try {
      const user = await this.getUserUseCase.execute({ username });

      return response.status(200).json(user);
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
