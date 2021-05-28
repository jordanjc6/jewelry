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
                host: 'ec2-184-73-198-174.compute-1.amazonaws.com',
                port: 5432,
                username: 'kyxchwnubzztkw',
                password: '3debcefe3a17b1cc886b8a53ed4f38d0581dd8140b984b1168fb5d2f03d21dd6',
                database: 'd3nfjc2luf98tf',
                entities: [jewelry_entity_1.Jewelry],
                synchronize: true,
            }), jewelry_module_1.JewelryModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'client'),
                serveRoot: '',
                exclude: ['/jewelry*']
            })],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map