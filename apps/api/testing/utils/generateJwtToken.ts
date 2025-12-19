import { JwtService } from '@nestjs/jwt';

export function generateJwtToken(
  jwtService: JwtService,
  userId: string,
  email: string,
  tokenVersion = 0
): string {
  return jwtService.sign({
    sub: userId,
    email,
    tokenVersion,
  });
}
