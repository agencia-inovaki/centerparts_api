import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password, gender } = request.body;

    try {
      await this.createUserUseCase.execute({
        name,
        username,
        email,
        password,
        gender,
      });

      return response.status(201).send();
    } catch (error: Error | any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
