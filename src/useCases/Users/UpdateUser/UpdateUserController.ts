import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const imageKey = request.file.filename ? request.file.filename : null;
    const { id } = request.params;
    const { name, biography } = request.body;

    try {
      await this.updateUserUseCase.execute({
        userId: id,
        name,
        biography,
        imageKey,
      });

      return response.status(201).send();
    } catch (error: Error | any) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
