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
exports.JewelryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const jewelry_entity_1 = require("./jewelry.entity");
let JewelryService = class JewelryService {
    constructor(jewelryRepository) {
        this.jewelryRepository = jewelryRepository;
    }
    async create(jewel) {
        return await this.jewelryRepository.save(jewel);
    }
    async findAll() {
        return await this.jewelryRepository.find();
    }
    async fullQuery(material, fineness, size) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${material}%${fineness}%${size}%`) },
                { product: typeorm_1.ILike(`%${material}%${size}%${fineness}%`) },
                { product: typeorm_1.ILike(`%${fineness}%${material}%${size}%`) },
                { product: typeorm_1.ILike(`%${fineness}%${size}%${material}%`) },
                { product: typeorm_1.ILike(`%${size}%${material}%${fineness}%`) },
                { product: typeorm_1.ILike(`%${size}%${fineness}%${material}%`) }
            ]
        });
    }
    async materialQuery(material) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${material}%`) }
            ]
        });
    }
    async materialSizeQuery(material, size) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${material}%${size}%`) },
                { product: typeorm_1.ILike(`%${size}%${material}%`) }
            ]
        });
    }
    async finenessQuery(fineness) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${fineness}%`) }
            ]
        });
    }
    async finenessSizeQuery(fineness, size) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${fineness}%${size}%`) },
                { product: typeorm_1.ILike(`%${size}%${fineness}%`) }
            ]
        });
    }
    async sizeQuery(size) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${size}%`) }
            ]
        });
    }
    async materialFinenessQuery(material, fineness) {
        return await this.jewelryRepository.find({
            where: [
                { product: typeorm_1.ILike(`%${material}%${fineness}%`) },
                { product: typeorm_1.ILike(`%${fineness}%${material}%`) }
            ]
        });
    }
    async update(id, jewel) {
        return await this.jewelryRepository.update(id, jewel);
    }
    async remove(id) {
        return this.jewelryRepository.delete(id);
    }
};
JewelryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(jewelry_entity_1.Jewelry)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], JewelryService);
exports.JewelryService = JewelryService;
//# sourceMappingURL=jewelry.service.js.map