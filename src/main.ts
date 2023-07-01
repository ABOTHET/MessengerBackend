import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    const config = new DocumentBuilder()
        .setTitle("Messenger")
        .setDescription("Документация по соц. сети Messenger")
        .setVersion("1.0.0")
        .addTag("ABOTHET")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
    await app.listen(PORT, () => {
        console.log(`Server start on PORT: ${PORT}`);
    });
}

bootstrap();
