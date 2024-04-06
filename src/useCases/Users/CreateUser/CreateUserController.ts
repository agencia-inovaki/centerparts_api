import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    // if (!request.file) throw new Error('Cannot find profile photo.');

    const { email, password } = request.body;
    // const imageKey = request.file.filename;

    try {
      await this.createUserUseCase.execute({
        email,
        password
      });

      return response.status(201).send();
    } catch (error: Error | any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
