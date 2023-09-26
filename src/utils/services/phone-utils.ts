export class PhoneUtils {
  static isNumberPhoneValid(numPhone: string): boolean {
    const lenNumPhone = numPhone.length;
    if (lenNumPhone > 11 || lenNumPhone < 10) return false;
    if (!/^\d+$/.test(numPhone)) return false;
    return true;
  }

  static convert(
    phonenumber: string,
    isAreaCode = false,
    areaCode = '84',
  ): string | null {
    if (phonenumber) {
      // Remove spaces, dots, dashes, parentheses, and plus signs
      phonenumber = phonenumber
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/-/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/\+/g, '');

      // Adjust the area code
      if (isAreaCode) {
        if (
          phonenumber.substr(0, 2) !== areaCode &&
          phonenumber.charAt(0) === '0'
        ) {
          phonenumber = areaCode + phonenumber.substr(1);
        }
      } else {
        if (phonenumber.substr(0, 2) === areaCode) {
          phonenumber = '0' + phonenumber.substr(2);
        }
        if (phonenumber.charAt(0) !== '0') {
          phonenumber = '0' + phonenumber;
        }
      }

      return phonenumber;
    } else {
      return null;
    }
  }
}
