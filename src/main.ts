import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { RolesGuard } from "./guards/roles/roles.guard";

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true
    });
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
