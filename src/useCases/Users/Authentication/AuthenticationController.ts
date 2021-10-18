import { Response, Request } from 'express';
import { AuthenticationUseCase } from './AuthenticationUseCase';

export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    try {
      const userToken = await this.authenticationUseCase.execute({
        username,
        password,
      });

      return response.status(200).json({ token: userToken });
    } catch (error: Error | any) {
      return response
        .status(422)
        .json({ message: error.message || 'Unexpected error.' });
    }
  }
}
