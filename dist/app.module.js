"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jewelry_module_1 = require("./jewelry/jewelry.module");
const typeorm_1 = require("@nestjs/typeorm");
const jewelry_entity_1 = require("./jewelry/jewelry.entity");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                port: 5432,
                username: process.env.POSTGRES_USERNAME || 'postgres',
                password: process.env.POSTGRES_PASSWORD || 'Jmilli0n!',
                database: process.env.POSTGRES_DATABASE || 'mcjewelry',
                entities: [jewelry_entity_1.Jewelry],
                synchronize: true,
                ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
            }), jewelry_module_1.JewelryModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '../client'),
                serveRoot: '',
                exclude: ['/jewelry*']
            })],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map