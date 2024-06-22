import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //? 강의자료에는 아래 코드가 추가되어있는데 뭐지?
  (app as any).set('etag', false); // => 캐싱을 비활성화 하는 옵션?
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by'); //* => from ChatGPT: 이 헤더는 서버가 어떤 기술로 구동되고 있는지 정보를 제공합니다. 보안상의 이유로 제거하는 것이 좋습니다.
    res.removeHeader('date'); //* => from ChatGPT: 이 헤더는 응답이 생성된 시간을 포함합니다. 특정 보안 요구 사항이나 성능 최적화를 위해 제거할 수 있습니다.
    /**
     *! 위 추가설정처럼 설정하면 좋은 것들.
     * ? - Helmet: 여러 보안 헤더를 설정해주는 미들웨어
     * ? - CORS 설정: 외부 도메인 요청 제어
     * ? - Rate Limiting: 요청 속도를 제한하여 DOS 공격을 방지합니다. (npm: express-rate-limit)
     *
     * ++ 성능 최적화
     * - Compression: 응답 데이터를 압축하여 네트워크 성능을 향상시킵니다.
     * - Cache Control: 정적 파일이나 API응답에 대한 캐싱을 설정합니다.
     *
     */
    next();
  });
  await app.listen(3000);
}
bootstrap();
