import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { UserRepository } from '../../auth/repositories/user.repository';
import { EventEmitterName } from '../../common/enums/app.enum';
import { NotiUserDefineCode, TypeFCM } from '../enums/noti.enum';
import { ContractsRepository } from '../repositories/contracts.repository';
import { UserContractsRepository } from '../repositories/user-contracts.repository';

@Injectable()
export class CronNotification {
  constructor(
    private eventEmitter: EventEmitter2,
    private contractsRepo: ContractsRepository,
    private userContractsRepo: UserContractsRepository,
    private userRepo: UserRepository,
  ) {}
  @Cron('0 0 20 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleCronNotificationToRenter() {
    const contracts = await this.contractsRepo.findBy({
      status: 2,
    });
    const now = dayjs(dayjs().format('YYYY-MM-DD'));

    const contractList = contracts.filter((contract) => {
      return (
        dayjs(
          dayjs(dayjs(contract.pay_start).format('YYYY-MM-DD'))
            .add(
              now.diff(
                dayjs(dayjs(contract.pay_start).format('YYYY-MM-DD')),
                'month',
              ) + contract.payment_space,
              'month',
            )
            .format('YYYY-MM-DD'),
        ).diff(now, 'day') === 6
      );
    });
    contractList.forEach(async (contract) => {
      // this.eventEmitter.emit(EventEmitterName.NOTIFICATION, {
      //   user_id: contract.user_id,
      //   title:
      //     'Loa loa loa!!! Sắp đến ngày thanh toán tiền phòng, chủ nhà nhớ làm hóa đơn nha',
      //   content:
      //     'Chủ nhà thân mến, sắp đến ngày làm hóa đơn cho khách thuê rồi nè, hãy chuẩn bị trước để đảm bảo khách thuê sẽ thanh toán đúng hạn nha. Chúc bạn một ngày vui vẻ 🧡',
      //   type: TypeFCM.CONTRACT_HAS_CHANGED,
      //   role: NotiUserDefineCode.USER_IS_HOST,
      //   references_value: contract.id.toString(),
      // });
      const userContract = await this.userContractsRepo.findOneBy({
        contract_id: contract.id,
      });
      if (!userContract) return;
      const renter = await this.userRepo.findOneBy({
        phone_number: userContract.renter_phone_number,
      });
      if (renter) {
        this.eventEmitter.emit(EventEmitterName.NOTIFICATION, {
          user_id: renter.id,
          title: 'Chú ý! Chú ý! Sắp đến ngày thanh toán hóa đơn tiền phòng',
          content:
            'Bạn thân mến, sắp đến ngày thanh toán hóa đơn tiền phòng rồi nè. Bạn hãy chuẩn bị trước để đảm bảo thanh toán đúng hạn cho chủ nhà nha. Chúc bạn một ngày vui vẻ 🧡',
          type: TypeFCM.CONTRACT_HAS_CHANGED,
          role: NotiUserDefineCode.USER_NORMAL,
          references_value: contract.id.toString(),
        });
      }
    });
  }

  @Cron('0 0 20 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async handleCronNotificationToHost() {
    const hosts = await this.userRepo.findBy({
      is_host: 1,
    });
    hosts.forEach(async (host) => {
      this.eventEmitter.emit(EventEmitterName.NOTIFICATION, {
        user_id: host.id,
        title:
          'Loa loa loa!!! Sắp đến ngày thanh toán tiền phòng, chủ nhà nhớ làm hóa đơn nha',
        content:
          'Chủ nhà thân mến, sắp đến ngày làm hóa đơn cho khách thuê rồi nè, hãy chuẩn bị trước để đảm bảo khách thuê sẽ thanh toán đúng hạn nha. Chúc bạn một ngày vui vẻ 🧡',
        type: TypeFCM.EXTEND_BILL,
        role: NotiUserDefineCode.USER_IS_HOST,
        references_value: '',
      });
    });
  }
}
