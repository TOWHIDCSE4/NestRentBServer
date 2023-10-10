import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTowerDto } from '../dtos/create.tower.dto';
import { Tower } from '../entities/tower.entity';
import { TowerRepository } from '../repositories/tower.repo';

@Injectable()
export class TowerService {
  constructor(private towerRepository: TowerRepository) {}

  async createService(tower: CreateTowerDto): Promise<Tower> {
    const towerNameExist = await this.towerRepository.find({
      where: { towerName: tower.towerName },
    });
    if (towerNameExist.length > 0)
      throw new BadRequestException('tower name already exist');
    const service = this.towerRepository.create(tower);
    return await this.towerRepository.save(tower);
  }

  async update(id: number, updateTower: CreateTowerDto): Promise<Tower> {
    const towerExists = await this.towerRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!towerExists) {
      throw new NotFoundException(`tower with ID ${id} not found`);
    }

    towerExists.userId = updateTower.userId;
    towerExists.type = updateTower.type;
    towerExists.status = updateTower.status;
    towerExists.accuracy = updateTower.accuracy;
    towerExists.phoneNumber = updateTower.phoneNumber;
    towerExists.description = updateTower.description;
    towerExists.towerName = updateTower.towerName;
    towerExists.towerNameFilter = updateTower.towerNameFilter;
    towerExists.capacity = updateTower.capacity;
    towerExists.sex = updateTower.sex;
    towerExists.area = updateTower.area;
    towerExists.money = updateTower.money;
    towerExists.minMoney = updateTower.minMoney;
    towerExists.maxMoney = updateTower.maxMoney;
    towerExists.deposit = updateTower.deposit;
    towerExists.electricMoney = updateTower.electricMoney;
    towerExists.waterMoney = updateTower.waterMoney;
    towerExists.hasWifi = updateTower.hasWifi;
    towerExists.wifiMoney = updateTower.wifiMoney;
    towerExists.hasPark = updateTower.hasPark;
    towerExists.parkMoney = updateTower.parkMoney;
    towerExists.videoLink = updateTower.videoLink;
    towerExists.provinceName = updateTower.provinceName;
    towerExists.districtName = updateTower.districtName;
    towerExists.wardsName = updateTower.wardsName;
    towerExists.province = updateTower.province;
    towerExists.district = updateTower.district;
    towerExists.wards = updateTower.wards;
    towerExists.addressDetail = updateTower.addressDetail;
    towerExists.hasWc = updateTower.hasWc;
    towerExists.hasWindow = updateTower.hasWindow;
    towerExists.hasSecurity = updateTower.hasSecurity;
    towerExists.hasFreeMove = updateTower.hasFreeMove;
    towerExists.hasOwnOwner = updateTower.hasOwnOwner;
    towerExists.hasAirConditioner = updateTower.hasAirConditioner;
    towerExists.hasWaterHeater = updateTower.hasWaterHeater;
    towerExists.hasKitchen = updateTower.hasKitchen;
    towerExists.hasFridge = updateTower.hasFridge;
    towerExists.hasWashingMachine = updateTower.hasWashingMachine;
    towerExists.hasMezzanine = updateTower.hasMezzanine;
    towerExists.hasBed = updateTower.hasBed;
    towerExists.hasWardrobe = updateTower.hasWardrobe;
    towerExists.hasTivi = updateTower.hasTivi;
    towerExists.hasPet = updateTower.hasPet;
    towerExists.hasBalcony = updateTower.hasBalcony;
    towerExists.hourOpen = updateTower.hourOpen;
    towerExists.minuteOpen = updateTower.minuteOpen;
    towerExists.hourClose = updateTower.hourClose;
    towerExists.minuteClose = updateTower.minuteClose;
    towerExists.hasFingerPrint = updateTower.hasFingerPrint;
    towerExists.hasKitchenStuff = updateTower.hasKitchenStuff;
    towerExists.hasTable = updateTower.hasTable;
    towerExists.hasDecorativeLights = updateTower.hasDecorativeLights;
    towerExists.hasPicture = updateTower.hasPicture;
    towerExists.hasTree = updateTower.hasTree;
    towerExists.hasPillow = updateTower.hasPillow;
    towerExists.hasMattress = updateTower.hasMattress;
    towerExists.hasShoesRasks = updateTower.hasShoesRasks;
    towerExists.hasCurtain = updateTower.hasCurtain;
    towerExists.hasMirror = updateTower.hasMirror;
    towerExists.images = updateTower.images;
    towerExists.adminVerified = updateTower.adminVerified;
    towerExists.hasPost = updateTower.hasPost;
    towerExists.numberFloor = updateTower.numberFloor;
    towerExists.quantityVehicleParked = updateTower.quantityVehicleParked;
    towerExists.hasSofa = updateTower.hasSofa;
    towerExists.hasContract = updateTower.hasContract;
    towerExists.percentCommission = updateTower.percentCommission;
    towerExists.percentCommissionCollaborator =
      updateTower.percentCommissionCollaborator;
    towerExists.moneyCommissionAdmin = updateTower.moneyCommissionAdmin;
    towerExists.moneyCommissionUser = updateTower.moneyCommissionUser;
    towerExists.hasCeilingFans = updateTower.hasCeilingFans;
    towerExists.furniture = updateTower.furniture;

    return this.towerRepository.save(towerExists);
  }

  async getBytowerId(towerId: number): Promise<Tower> {
    try {
      const service = await this.towerRepository.findOneById(towerId);
      if (service == null)
        throw new NotFoundException(`Tower with ID ${towerId} not found`);
      return service;
    } catch (error) {
      throw new NotFoundException(`tower with ID ${towerId} not found`);
    }
  }

  async getAllByUserId(userId: number): Promise<Tower[]> {
    return this.towerRepository.find({ where: { userId: userId } });
  }

  async deleteByid(towerId: number): Promise<Tower> {
    try {
      const tower = await this.towerRepository.findOneById(towerId);
      if (tower === null)
        throw new NotFoundException(`Tower with ID ${towerId} not found`);
      await this.towerRepository.remove(tower);
      return tower;
    } catch (error) {
      throw new NotFoundException(`Tower with ID ${towerId} not found`);
    }
  }

  async getAll(): Promise<Tower[]> {
    return this.towerRepository.find({});
  }
}
