"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JewelryController = void 0;
const common_1 = require("@nestjs/common");
const jewelry_service_1 = require("./jewelry.service");
let JewelryController = class JewelryController {
    constructor(jewelryService) {
        this.jewelryService = jewelryService;
    }
    async create(jewel) {
        return await this.jewelryService.create(jewel);
    }
    async findAll() {
        return await this.jewelryService.findAll();
    }
    async query(material, fineness, size) {
        if (fineness === 'fineness') {
            if (size === 'size') {
                return await this.jewelryService.materialQuery(material);
            }
            if (material === 'material') {
                return await this.jewelryService.sizeQuery(size);
            }
            return await this.jewelryService.materialSizeQuery(material, size);
        }
        else if (material === 'material') {
            if (size === 'size') {
                return await this.jewelryService.finenessQuery(fineness);
            }
            if (fineness === 'fineness') {
                return await this.jewelryService.sizeQuery(size);
            }
            return await this.jewelryService.finenessSizeQuery(fineness, size);
        }
        else if (size === 'size') {
            if (fineness === 'fineness') {
                return await this.jewelryService.materialQuery(material);
            }
            if (material === 'material') {
                return await this.jewelryService.finenessQuery(fineness);
            }
            return await this.jewelryService.materialFinenessQuery(fineness, material);
        }
        return await this.jewelryService.fullQuery(material, fineness, size);
    }
    async update(id, jewel) {
        return this.jewelryService.update(+id, jewel);
    }
    async remove(id) {
        return this.jewelryService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JewelryController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JewelryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':material/:fineness/:size'),
    __param(0, common_1.Param('material')),
    __param(1, common_1.Param('fineness')),
    __param(2, common_1.Param('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], JewelryController.prototype, "query", null);
__decorate([
    common_1.Patch('update/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JewelryController.prototype, "update", null);
__decorate([
    common_1.Delete('delete/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JewelryController.prototype, "remove", null);
JewelryController = __decorate([
    common_1.Controller('jewelry'),
    __metadata("design:paramtypes", [jewelry_service_1.JewelryService])
], JewelryController);
exports.JewelryController = JewelryController;
//# sourceMappingURL=jewelry.controller.js.map