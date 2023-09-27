import { format } from 'date-fns-tz';

export class Helper {
  static validEmail(str: string): boolean {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(str);
  }

  static generateRandomNum(length = 6): string {
    const characters = '0123456789';
    const charactersLength = characters.length;
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  static getTimeNowString() {
    const timeZone = 'Asia/Ho_Chi_Minh';
    const dt = new Date();
    const formattedDate = format(dt, 'yyyy-MM-dd HH:mm:ss', { timeZone });
    return formattedDate;
  }
}
